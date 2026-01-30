import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Chess, Square } from "chess.js";
import {
  X,
  Copy,
  History,
  ExternalLink,
  Users,
  Bot,
  Link2,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { getBestMove } from "@/lib/stockfish";
import { useTranslation } from "@/lib/i18n/context";
import { Dialog } from "@/components/ui/dialog";
import { P2PConnection } from "@/lib/p2p-chess";

const tileColor1 = "#4B7399";
const tileColor2 = "#EAE9D2";

function playMoveSound(moveType: string) {
  switch (moveType) {
    case "capture":
      new Audio("/chess/sounds/capture.mp3").play();
      break;
    case "castle":
      new Audio("/chess/sounds/castle.mp3").play();
      break;
    case "check":
      new Audio("/chess/sounds/check.mp3").play();
      break;
    case "checkmate":
      new Audio("/chess/sounds/checkmate.mp3").play();
      break;
    default:
      new Audio("/chess/sounds/move.mp3").play();
      break;
  }
}

interface ChessBoardProps {
  game: Chess;
  onMove: (from: string, to: string) => void;
  isFlipped: boolean;
  boardSize?: string;
}

const pieceIcons = {
  p: "/chess/icons/bp.png",
  r: "/chess/icons/br.png",
  n: "/chess/icons/bn.png",
  b: "/chess/icons/bb.png",
  q: "/chess/icons/bq.png",
  k: "/chess/icons/bk.png",
  P: "/chess/icons/wp.png",
  R: "/chess/icons/wr.png",
  N: "/chess/icons/wn.png",
  B: "/chess/icons/wb.png",
  Q: "/chess/icons/wq.png",
  K: "/chess/icons/wk.png",
};

function ChessPieceIcon(pieceKey: keyof typeof pieceIcons) {
  const src = pieceIcons[pieceKey];
  return (
    <Image
      src={src}
      alt={pieceKey}
      fill
      className="object-contain p-0.5"
      sizes="12.5vmin"
    />
  );
}

const ChessBoard = ({
  game,
  onMove,
  isFlipped,
  boardSize = "24rem",
}: ChessBoardProps) => {
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [legalMoves, setLegalMoves] = useState<string[]>([]);

  const files = "abcdefgh".split("");
  const ranks = [1, 2, 3, 4, 5, 6, 7, 8];

  const getSquareColor = (file: string | number, rank: number) => {
    if (typeof file === "number") {
      file = String.fromCharCode(file + 97);
    }

    return (file.charCodeAt(0) + rank) % 2 === 0 ? tileColor1 : tileColor2;
  };

  const handleSquareClick = (square: string) => {
    if (selectedSquare === square) {
      setSelectedSquare(null);
      setLegalMoves([]);
      return;
    }

    const piece = game.get(square as Square);
    const moves = game.moves({ square: square as Square, verbose: true });

    if (selectedSquare && legalMoves.some((m) => m === square)) {
      onMove(selectedSquare, square);
      setSelectedSquare(null);
      setLegalMoves([]);
    } else if (
      piece &&
      ((game.turn() === "w" && piece.color === "w") ||
        (game.turn() === "b" && piece.color === "b"))
    ) {
      setSelectedSquare(square);
      setLegalMoves(moves.map((m) => m.to));
    }
  };

  const board = game.board();
  const displayBoard = isFlipped
    ? board.map((r) => [...r].reverse()).reverse()
    : board;

  return (
    <div
      className="inline-block border-4 border-amber-900"
      style={{ width: boardSize }}
    >
      <div className="grid grid-cols-8">
        {displayBoard.map((rank, rankIdx) =>
          rank.map((square, fileIdx) => {
            const file = isFlipped ? files[7 - fileIdx] : files[fileIdx];
            const r = isFlipped ? ranks[rankIdx] : ranks[7 - rankIdx];
            const squareId = file + r;
            const isSelected = selectedSquare === squareId;
            const isLegal = legalMoves.includes(squareId);

            return (
              <button
                key={squareId}
                onClick={() => handleSquareClick(squareId)}
                className={`w-full aspect-square flex items-center justify-center text-2xl cursor-pointer transition-all relative hover:opacity-80`}
                style={{
                  backgroundColor: getSquareColor(file.charCodeAt(0) - 97, r),
                  boxShadow: isSelected
                    ? "inset 0 0 0 3px rgb(74, 222, 128)"
                    : isLegal
                      ? "inset 0 0 0 3px rgb(96, 165, 250)"
                      : "none",
                }}
              >
                {square
                  ? ChessPieceIcon(
                      (square.color === "w"
                        ? square.type.toUpperCase()
                        : square.type.toLowerCase()) as keyof typeof pieceIcons,
                    )
                  : ""}
              </button>
            );
          }),
        )}
      </div>
    </div>
  );
};

interface ChessGameProps {
  onClose: () => void;
  isFullscreen: boolean;
}

type GameMode = "select" | "ai" | "p2p";
type P2PMode = "none" | "create" | "join" | "connected";

function convertToSan(moveHistory: string[]): string[] {
  const chess = new Chess();
  const sanHistory = [];

  console.log("Converting move history to SAN:", moveHistory);

  for (const move of moveHistory) {
    console.log("Processing move:", move);
    // Parse the "from" and "to" from the string (e.g., "a1f8")
    const from = move.substring(0, 2);
    const to = move.substring(2, 4);

    // Handle promotion if present (e.g., "a7a8q")
    const promotion = move.length > 4 ? move.substring(4, 5) : undefined;

    // Execute the move. chess.js handles the validation and SAN generation
    const result = chess.move({
      from: from,
      to: to,
      promotion: promotion,
    });

    if (result) {
      sanHistory.push(result.san);
      console.log("Converted to SAN:", result.san);
    } else {
      console.error(`Invalid move encountered: ${move}`);
      break;
    }
  }

  return sanHistory;
}

function getSanHistoryString(moveHistory: string[]): string {
  const sanMoves = convertToSan(moveHistory);
  let sanString = "";
  sanMoves.forEach((san, index) => {
    if (index % 2 === 0) {
      sanString += `${Math.floor(index / 2) + 1}. ${san} `;
    } else {
      sanString += `${san} `;
    }
  });
  return sanString.trim();
}

function getChessComUrl(moveHistory: string[]): string {
  const sanMoves = convertToSan(moveHistory);
  const baseUrl = "https://www.chess.com/analysis?tab=analysis&moves=";
  const movesParam = sanMoves.join("%20");
  return baseUrl + movesParam;
}

const ChessGame = ({ onClose, isFullscreen }: ChessGameProps) => {
  const { t } = useTranslation();
  const [game, setGame] = useState(new Chess());
  const [status, setStatus] = useState(t("chess.youStart"));
  const [isThinking, setIsThinking] = useState(false);
  const [gameHistory, setGameHistory] = useState<string[]>([]);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [showGameOverDialog, setShowGameOverDialog] = useState(false);

  // Memoize SAN conversion to avoid recalculating on every render
  const sanHistoryString = useMemo(() => {
    console.log("Generating SAN history string for:", gameHistory);
    return getSanHistoryString(gameHistory);
  }, [gameHistory]);

  // P2P states
  const [gameMode, setGameMode] = useState<GameMode>("select");
  const [p2pMode, setP2PMode] = useState<P2PMode>("none");
  const [roomId, setRoomId] = useState("");
  const [roomIdInput, setRoomIdInput] = useState("");
  const [isWhite, setIsWhite] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const p2pRef = useRef<P2PConnection | null>(null);

  const gameEnded = () => {
    return game.isGameOver();
  };

  // Cleanup P2P connection on unmount
  useEffect(() => {
    return () => {
      if (p2pRef.current) {
        p2pRef.current.close();
      }
    };
  }, []);

  const addToGameHistory = (from: string, to: string) => {
    setGameHistory((prev) => {
      const moveString = `${from}${to}`;
      if (prev[prev.length - 1] === moveString) {
        return prev; // Avoid duplicate moves
      }
      return [...prev, `${from}${to}`];
    });
  };

  const handleOpponentMove = useCallback((from: string, to: string) => {
    console.log("Received opponent move:", from, to);

    setGame((currentGame) => {
      const newGame = new Chess(currentGame.fen());
      const moves = newGame.moves({ verbose: true });
      const legalMove = moves.find((m) => m.from === from && m.to === to);

      if (!legalMove) {
        console.error("Illegal move received:", from, to);
        return currentGame;
      }

      const isCapture = newGame.get(to as Square) !== undefined;
      const isCastle = legalMove.san.includes("-");

      newGame.move({ from, to, promotion: "q" });

      const isCheck = newGame.isCheck();
      const isCheckmate = newGame.isCheckmate();

      playMoveSound(
        isCheckmate
          ? "checkmate"
          : isCheck
            ? "check"
            : isCapture
              ? "capture"
              : isCastle
                ? "castle"
                : "move",
      );

      if (isCheckmate) {
        setStatus(t("chess.youLost"));
        setTimeout(() => setShowGameOverDialog(true), 500);
      } else if (newGame.isDraw()) {
        setStatus(t("chess.drawP2P"));
        setTimeout(() => setShowGameOverDialog(true), 500);
      } else if (isCheck) {
        setStatus(t("chess.checkYourTurn"));
      } else {
        setStatus(t("chess.yourTurnP2P"));
      }

      addToGameHistory(from, to);

      return new Chess(newGame.fen());
    });
  }, []);

  const createP2PRoom = async () => {
    try {
      const p2p = new P2PConnection();
      p2pRef.current = p2p;

      // Configure callbacks immediately
      p2p.onMessage((message) => {
        console.log("Message received:", message);
        try {
          const data = JSON.parse(message);
          if (data.type === "move") {
            handleOpponentMove(data.from, data.to);
          }
        } catch (e) {
          console.error("Error parsing P2P message:", e);
        }
      });

      p2p.onConnectionStateChange((state) => {
        console.log("Connection state:", state);
        setConnectionStatus(state);
        if (state === "connected") {
          setP2PMode("connected");
          toast.success(t("chess.p2pConnected"));
        } else if (state === "disconnected" || state === "failed") {
          toast.error(t("chess.p2pLost"));
        }
      });

      const id = await p2p.createRoom();
      setRoomId(id);
      setIsWhite(true);
      setP2PMode("create");
      setStatus(t("chess.waitingForOpponent"));
      toast.success(t("chess.roomCreated"));
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error(t("chess.createRoomError"));
    }
  };

  const joinP2PRoom = async () => {
    if (!roomIdInput.trim()) {
      toast.error(t("chess.enterRoomIdError"));
      return;
    }
    try {
      const p2p = new P2PConnection();
      p2pRef.current = p2p;

      // Configure callbacks immediately
      p2p.onMessage((message) => {
        console.log("Message received:", message);
        try {
          const data = JSON.parse(message);
          if (data.type === "move") {
            handleOpponentMove(data.from, data.to);
          }
        } catch (e) {
          console.error("Error parsing P2P message:", e);
        }
      });

      p2p.onConnectionStateChange((state) => {
        console.log("Connection state:", state);
        setConnectionStatus(state);
        if (state === "connected") {
          setP2PMode("connected");
          toast.success(t("chess.p2pConnected"));
        } else if (state === "disconnected" || state === "failed") {
          toast.error(t("chess.p2pLost"));
        }
      });

      await p2p.joinRoom(roomIdInput.trim());
      setRoomId(roomIdInput.trim());
      setIsWhite(false);
      setP2PMode("join");
      setStatus(t("chess.connecting"));
    } catch (error) {
      console.error("Error joining room:", error);
      toast.error(t("chess.connectionError"));
    }
  };

  const getStockfishMove = async (gameState: Chess): Promise<string | null> => {
    try {
      const fen = gameState.fen();
      const promise = getBestMove(fen);
      const timeout = new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error("AbortError")), 5000),
      );
      const bestMove = await Promise.race([promise, timeout]);
      return bestMove;
    } catch (error) {
      const isAbort = (error as any)?.name === "AbortError";
      console.error("Error fetching move from chess-api:", error);
      toast.error(
        isAbort ? t("chess.stockfishTimeout") : t("chess.aiServiceUnavailable"),
        {
          description: t("chess.cannotGetStockfishMove"),
        },
      );
      return null;
    }
  };

  const handlePlayerMove = async (from: string, to: string) => {
    console.log("Player move:", from, to);
    // P2P Mode: check if it's player's turn
    if (gameMode === "p2p") {
      const currentTurn = game.turn();
      const isPlayerTurn =
        (isWhite && currentTurn === "w") || (!isWhite && currentTurn === "b");
      if (!isPlayerTurn) {
        toast.error(t("chess.notYourTurn"));
        return;
      }
    }

    const newGame = new Chess(game.fen());
    const moves = newGame.moves({ verbose: true });
    const legalMove = moves.find((m) => m.from === from && m.to === to);

    if (!legalMove) return;

    const isCapture = newGame.get(to as Square) !== undefined;
    const isCastle = legalMove.san.includes("-");

    newGame.move({ from, to, promotion: "q" });

    const isCheck = newGame.isCheck();
    const isCheckmate = newGame.isCheckmate();

    playMoveSound(
      isCheckmate
        ? "checkmate"
        : isCheck
          ? "check"
          : isCapture
            ? "capture"
            : isCastle
              ? "castle"
              : "move",
    );

    setGame(new Chess(newGame.fen()));
    addToGameHistory(from, to);

    // Send move to opponent in P2P mode
    if (gameMode === "p2p" && p2pRef.current) {
      const message = JSON.stringify({ type: "move", from, to });
      p2pRef.current.sendMessage(message);
    }

    if (isCheckmate) {
      setStatus(gameMode === "p2p" ? t("chess.youWonP2P") : t("chess.youWon"));
      setTimeout(() => setShowGameOverDialog(true), 500);
      return;
    }
    if (newGame.isDraw()) {
      setStatus(t("chess.draw"));
      setTimeout(() => setShowGameOverDialog(true), 500);
      return;
    }

    if (gameMode === "p2p") {
      if (isCheck) {
        setStatus(t("chess.checkOpponentTurn"));
      } else {
        setStatus(t("chess.opponentTurn"));
      }
      return;
    }

    // AI Mode
    if (isCheck) {
      setStatus(t("chess.check"));
    } else {
      setStatus(t("chess.stockfishTurn"));
    }

    setIsThinking(true);
    setTimeout(async () => {
      try {
        const stockfishMove = await getStockfishMove(newGame);
        console.log("Stockfish move:", stockfishMove);
        if (stockfishMove) {
          const stockfishTo = stockfishMove.slice(2, 4);
          const isCapture = newGame.get(stockfishTo as Square) !== undefined;
          const isCastle = stockfishMove.includes("-");
          newGame.move(stockfishMove);
          setGame(new Chess(newGame.fen()));
          setGameHistory((prev) => [...prev, stockfishMove]);

          const isCheck = newGame.isCheck();
          const isCheckmate = newGame.isCheckmate();

          playMoveSound(
            isCheckmate
              ? "checkmate"
              : isCheck
                ? "check"
                : isCapture
                  ? "capture"
                  : isCastle
                    ? "castle"
                    : "move",
          );

          if (isCheckmate) {
            setStatus(t("chess.stockfishWon"));
            setTimeout(() => setShowGameOverDialog(true), 500);
          } else if (newGame.isDraw()) {
            setStatus(t("chess.draw"));
            setTimeout(() => setShowGameOverDialog(true), 500);
          } else if (isCheck) {
            setStatus(t("chess.check"));
          } else {
            setStatus(t("chess.yourTurn"));
          }
        }
      } catch (e) {
        setStatus(t("chess.aiServiceUnavailable"));
      }
      setIsThinking(false);
    }, 500);
  };

  const resetGame = () => {
    setGame(new Chess());
    setStatus(
      gameMode === "p2p"
        ? isWhite
          ? t("chess.yourTurnP2P")
          : t("chess.opponentTurn")
        : t("chess.youStart"),
    );
    setGameHistory([]);
    setShowGameOverDialog(false);
  };

  const backToMenu = () => {
    if (p2pRef.current) {
      p2pRef.current.close();
      p2pRef.current = null;
    }
    setGameMode("select");
    setP2PMode("none");
    setRoomId("");
    setRoomIdInput("");
    setGame(new Chess());
    setGameHistory([]);
    setStatus("");
  };

  const copyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      toast.success(t("chess.roomIdCopied"));
    }
  };

  const copyHistoryToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sanHistoryString);
      toast.success(t("chess.historyCopied") || "History copied to clipboard!");
    } catch (error) {
      toast.error(t("chess.copyFailed") || "Failed to copy history");
    }
  };

  const analyzeOnChessCom = () => {
    const pgn = `[Event "Browser Game"]\n[Site "axthauvin.com"]\n[Date "${new Date().toISOString().split("T")[0]}"]\n[White "You"]\n[Black "Stockfish"]\n\n${sanHistoryString}`;
    const encodedPgn = encodeURIComponent(pgn);
    window.open(`https://www.chess.com/analysis?pgn=${encodedPgn}`, "_blank");
  };

  const containerClass = isFullscreen
    ? "fixed inset-0 bg-black/90 flex items-center justify-center z-50"
    : "p-6 bg-neutral-950 rounded-lg";

  // Mode selection screen
  if (gameMode === "select") {
    return (
      <Dialog
        title={t("chess.gameMode")}
        description={t("chess.chooseOpponent")}
        isOpen={true}
        onClose={onClose}
      >
        <div className="space-y-3">
          <button
            onClick={() => {
              setGameMode("ai");
              setStatus(t("chess.youStart"));
            }}
            className="w-full p-4 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-lg text-white text-left transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center  transition-colors">
                <Bot size={20} className="text-neutral-300" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">
                  {t("chess.playAgainstAI")}
                </p>
                <p className="text-xs text-neutral-500">
                  {t("chess.faceStockfish")}
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setGameMode("p2p")}
            className="w-full p-4 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-lg text-white text-left transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center  transition-colors">
                <Users size={20} className="text-neutral-300" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">{t("chess.playP2P")}</p>
                <p className="text-xs text-neutral-500">
                  {t("chess.playWithFriend")}
                </p>
              </div>
            </div>
          </button>
        </div>
        {/* Learn how i created this P2P chess app*/}
        <div className="mt-6 p-3 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors">
          <a
            href="/projects/portfolio-chess"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-900/20 flex items-center justify-center flex-shrink-0">
              <ExternalLink size={16} className="text-blue-500" />
            </div>
            <p className="text-sm font-medium text-white">
              {t("chess.learnHowBuilt") || "Learn How I Built This"}
            </p>
          </a>
        </div>
      </Dialog>
    );
  }

  // P2P setup screen
  if (gameMode === "p2p" && p2pMode === "none") {
    return (
      <Dialog
        isOpen={true}
        onClose={onClose}
        title={t("chess.p2pMode")}
        description={t("chess.createOrJoin")}
      >
        <div className="space-y-4">
          <button
            onClick={createP2PRoom}
            className="w-full p-4 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-lg text-white text-left transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-700 transition-colors">
                <Link2 size={18} className="text-neutral-300" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">
                  {t("chess.createGame")}
                </p>
                <p className="text-xs text-neutral-500">
                  {t("chess.generateCode")}
                </p>
              </div>
            </div>
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-800"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-neutral-950 text-neutral-600">
                {t("chess.or")}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={roomIdInput}
              onChange={(e) => setRoomIdInput(e.target.value)}
              placeholder={t("chess.enterRoomId")}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 focus:border-neutral-600 rounded-lg text-white placeholder-neutral-600 focus:outline-none transition-colors text-sm"
            />
            <Button
              onClick={joinP2PRoom}
              className="w-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 text-white transition-all"
            >
              <Users size={16} className="mr-2" />
              {t("chess.joinGame")}
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }

  // P2P waiting/connecting screen
  if (
    gameMode === "p2p" &&
    (p2pMode === "create" || p2pMode === "join") &&
    connectionStatus !== "connected"
  ) {
    return (
      <Dialog isOpen={true} onClose={onClose} title={t("chess.p2pMode")}>
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-neutral-800 flex items-center justify-center">
                <Users size={24} className="text-neutral-400" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-t-neutral-500 animate-spin"></div>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-white mb-2">
            {p2pMode === "create"
              ? t("chess.waitingForOpponent")
              : t("chess.connecting")}
          </h2>
          <p className="text-sm text-neutral-500 mb-6">
            {connectionStatus === "connecting" ? t("chess.establishing") : ""}
          </p>

          {p2pMode === "create" && roomId && (
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <p className="text-xs text-neutral-500 mb-2">
                {t("chess.roomId")}
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={roomId}
                  readOnly
                  className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded text-white text-sm font-mono"
                />
                <Button
                  onClick={copyRoomId}
                  className="bg-neutral-800 border border-neutral-700 hover:border-neutral-600 hover:bg-neutral-700 text-white px-3"
                  size="sm"
                >
                  <Copy size={16} />
                </Button>
              </div>
              <p className="text-xs text-neutral-600 mt-3">
                {t("chess.shareCode")}
              </p>
            </div>
          )}
        </div>
      </Dialog>
    );
  }

  return (
    <>
      <div className={containerClass}>
        <div
          className={`${
            isFullscreen ? "bg-neutral-900 p-8 rounded-lg w-full h-full" : ""
          }`}
        >
          <button
            onClick={onClose}
            className={`${
              isFullscreen ? "absolute top-4 left-4" : ""
            } text-white hover:text-neutral-400`}
          >
            <X size={24} />
          </button>

          <div className="flex flex-col items-center gap-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                {gameMode === "p2p"
                  ? `P2P Chess ${isWhite ? t("chess.white") : t("chess.black")}`
                  : t("chess.title")}
              </h2>
              <p className="text-sm text-neutral-400">{status}</p>
              {gameMode === "p2p" && (
                <p className="text-xs text-neutral-500 mt-1">
                  Room: {roomId.slice(0, 8)}... | {connectionStatus}
                </p>
              )}
            </div>

            <ChessBoard
              game={game}
              onMove={handlePlayerMove}
              isFlipped={gameMode === "p2p" && !isWhite}
              boardSize={"70vmin"}
            />

            {gameMode === "ai" && (
              <div className="text-sm text-neutral-400 text-center">
                <p>{t("chess.explanation")}</p>
              </div>
            )}

            <div className="flex justify-between gap-4">
              <Button
                onClick={backToMenu}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded font-semibold transition-colors"
              >
                Menu
              </Button>
              <Button
                onClick={resetGame}
                disabled={isThinking}
                className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {t("chess.resetGame")}
              </Button>
              {gameHistory.length > 0 && (
                <Button
                  onClick={() => setShowHistoryDialog(true)}
                  disabled={isThinking}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <History size={16} />
                  {t("chess.showHistory") || "Show History"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* History Dialog */}
      <Dialog
        isOpen={showHistoryDialog}
        onClose={() => setShowHistoryDialog(false)}
        title={t("chess.gameHistory") || "Game History"}
        description={
          t("chess.gameHistoryDescription") ||
          "Copy this to import into chess.com"
        }
        footer={
          <div className="flex gap-2 w-full">
            <Button
              onClick={copyHistoryToClipboard}
              className="flex-1 bg-green-700 hover:bg-green-600 text-white flex items-center justify-center gap-2"
            >
              <Copy size={16} />
              {t("chess.copy") || "Copy"}
            </Button>
          </div>
        }
      >
        <div className="bg-zinc-900 p-4 rounded-md border border-zinc-700">
          <code className="text-sm text-zinc-300 break-words whitespace-pre-wrap">
            {sanHistoryString}
          </code>
        </div>
      </Dialog>

      {/* Game Over Dialog */}
      {gameEnded() && (
        <Dialog
          isOpen={showGameOverDialog}
          onClose={() => setShowGameOverDialog(false)}
          title={t("chess.thanksForPlaying")}
          footer={
            <div className="flex flex-col gap-2 w-full">
              <Button
                onClick={analyzeOnChessCom}
                className="w-full bg-[#80b54b] text-white hover:bg-[#6fa43e] flex items-center justify-center gap-2"
              >
                <ExternalLink size={16} />
                {t("chess.analyzeOnChessCom") || "Analyze on Chess.com"}
              </Button>
              <div className="flex gap-2 w-full">
                <Button
                  onClick={() => {
                    resetGame();
                    setShowGameOverDialog(false);
                  }}
                  className="flex-1 bg-amber-700 hover:bg-amber-600 text-white"
                >
                  {t("chess.playAgain")}
                </Button>
                <Button
                  onClick={copyHistoryToClipboard}
                  className="flex-1 bg-green-700 hover:bg-green-600 text-white flex items-center justify-center gap-2"
                >
                  <Copy size={16} />
                  {t("chess.copy") || "Copy"}
                </Button>
              </div>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-zinc-300 mb-4">
                {game.isCheckmate()
                  ? status
                  : game.isDraw()
                    ? t("chess.drawMessage")
                    : ""}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-zinc-400 mb-2">
                {t("chess.gameHistory") || "Game History"}
              </h3>
              <div className="bg-zinc-900 p-4 rounded-md border border-zinc-700 max-h-40 overflow-y-auto">
                <code className="text-sm text-zinc-300 break-words whitespace-pre-wrap">
                  {sanHistoryString}
                </code>
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                {t("chess.copyToChessCom") || "Copy to import on chess.com"}
              </p>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default ChessGame;
