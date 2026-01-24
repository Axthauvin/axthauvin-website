import { db } from "@/lib/firebase-config";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

const servers: RTCConfiguration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

export type MessageCallback = (message: string) => void;
export type ConnectionStateCallback = (state: RTCPeerConnectionState) => void;

export class P2PConnection {
  private peerConnection: RTCPeerConnection;
  private dataChannel: RTCDataChannel | null = null;
  private roomId: string | null = null;
  private onMessageCallback: MessageCallback | null = null;
  private onConnectionStateChangeCallback: ConnectionStateCallback | null =
    null;

  constructor() {
    this.peerConnection = new RTCPeerConnection(servers);
    this.setupConnectionStateListener();
  }

  private setupConnectionStateListener() {
    this.peerConnection.onconnectionstatechange = () => {
      if (this.onConnectionStateChangeCallback) {
        this.onConnectionStateChangeCallback(
          this.peerConnection.connectionState,
        );
      }
    };
  }

  onMessage(callback: MessageCallback) {
    this.onMessageCallback = callback;
  }

  onConnectionStateChange(callback: ConnectionStateCallback) {
    this.onConnectionStateChangeCallback = callback;
  }

  /**
   * Créer une nouvelle room et devenir le "caller"
   * @returns Le roomId pour partager avec l'autre utilisateur
   */
  async createRoom(): Promise<string> {
    const roomsRef = collection(db, "rooms");
    const roomDocRef = doc(roomsRef);
    this.roomId = roomDocRef.id;

    // Créer le data channel (le caller doit le créer)
    this.dataChannel = this.peerConnection.createDataChannel("chat");
    this.setupDataChannel();

    // Collecter les ICE candidates du caller
    const callerCandidatesCollection = collection(
      roomDocRef,
      "callerCandidates",
    );
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        addDoc(callerCandidatesCollection, event.candidate.toJSON());
      }
    };

    // Créer l'offre
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);

    // Sauvegarder l'offre dans Firestore
    await setDoc(roomDocRef, {
      offer: {
        type: offer.type,
        sdp: offer.sdp,
      },
      createdAt: new Date().toISOString(),
    });

    // Écouter la réponse
    onSnapshot(roomDocRef, async (snapshot) => {
      const data = snapshot.data();
      if (data?.answer && !this.peerConnection.currentRemoteDescription) {
        const answer = new RTCSessionDescription(data.answer);
        await this.peerConnection.setRemoteDescription(answer);
      }
    });

    // Écouter les ICE candidates du callee
    const calleeCandidatesCollection = collection(
      roomDocRef,
      "calleeCandidates",
    );
    onSnapshot(calleeCandidatesCollection, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          this.peerConnection.addIceCandidate(candidate);
        }
      });
    });

    return this.roomId;
  }

  /**
   * Rejoindre une room existante en tant que "callee"
   * @param roomId L'identifiant de la room à rejoindre
   */
  async joinRoom(roomId: string): Promise<void> {
    this.roomId = roomId;
    const roomDocRef = doc(db, "rooms", roomId);
    const roomSnapshot = await getDoc(roomDocRef);

    if (!roomSnapshot.exists()) {
      throw new Error("Room not found");
    }

    const roomData = roomSnapshot.data();

    // Écouter le data channel créé par le caller
    this.peerConnection.ondatachannel = (event) => {
      this.dataChannel = event.channel;
      this.setupDataChannel();
    };

    // Collecter les ICE candidates du callee
    const calleeCandidatesCollection = collection(
      roomDocRef,
      "calleeCandidates",
    );
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        addDoc(calleeCandidatesCollection, event.candidate.toJSON());
      }
    };

    // Récupérer et appliquer l'offre
    if (roomData.offer) {
      const offer = new RTCSessionDescription(roomData.offer);
      await this.peerConnection.setRemoteDescription(offer);
    }

    // Créer la réponse
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);

    // Sauvegarder la réponse dans Firestore
    await updateDoc(roomDocRef, {
      answer: {
        type: answer.type,
        sdp: answer.sdp,
      },
    });

    // Écouter les ICE candidates du caller
    const callerCandidatesCollection = collection(
      roomDocRef,
      "callerCandidates",
    );
    onSnapshot(callerCandidatesCollection, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          this.peerConnection.addIceCandidate(candidate);
        }
      });
    });
  }

  private setupDataChannel() {
    if (!this.dataChannel) return;

    this.dataChannel.onopen = () => {
      console.log("Data channel is open");
    };

    this.dataChannel.onclose = () => {
      console.log("Data channel is closed");
    };

    this.dataChannel.onmessage = (event) => {
      if (this.onMessageCallback) {
        this.onMessageCallback(event.data);
      }
    };
  }

  /**
   * Envoyer un message via le canal P2P
   * @param message Le message à envoyer
   */
  sendMessage(message: string): boolean {
    if (this.dataChannel && this.dataChannel.readyState === "open") {
      this.dataChannel.send(message);
      return true;
    }
    return false;
  }

  /**
   * Obtenir l'état actuel de la connexion
   */
  getConnectionState(): RTCPeerConnectionState {
    return this.peerConnection.connectionState;
  }

  /**
   * Obtenir l'état du data channel
   */
  getDataChannelState(): RTCDataChannelState | null {
    return this.dataChannel ? this.dataChannel.readyState : null;
  }

  /**
   * Fermer la connexion et nettoyer les ressources
   */
  close() {
    if (this.dataChannel) {
      this.dataChannel.close();
    }
    this.peerConnection.close();
  }

  /**
   * Obtenir le roomId actuel
   */
  getRoomId(): string | null {
    return this.roomId;
  }
}
