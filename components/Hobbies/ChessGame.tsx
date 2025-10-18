import { useState } from "react";
import { Chess, Square } from "chess.js";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

const playMoveSound = (isCapture: boolean = false) => {
  const audioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  if (isCapture) {
    // Deux notes pour une capture
    oscillator.frequency.value = 523.25;
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1
    );
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);

    const osc2 = audioContext.createOscillator();
    osc2.connect(gainNode);
    osc2.frequency.value = 392;
    osc2.start(audioContext.currentTime + 0.05);
    osc2.stop(audioContext.currentTime + 0.15);
  } else {
    // Note simple pour un coup normal
    oscillator.frequency.value = 784;
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.15
    );
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
  }
};

interface ChessBoardProps {
  game: Chess;
  onMove: (from: string, to: string) => void;
  isFlipped: boolean;
}

const pieceIcons = {
  p: "/chessIcons/bp.png",
  r: "/chessIcons/br.png",
  n: "/chessIcons/bn.png",
  b: "/chessIcons/bb.png",
  q: "/chessIcons/bq.png",
  k: "/chessIcons/bk.png",
  P: "/chessIcons/wp.png",
  R: "/chessIcons/wr.png",
  N: "/chessIcons/wn.png",
  B: "/chessIcons/wb.png",
  Q: "/chessIcons/wq.png",
  K: "/chessIcons/wk.png",
};

function ChessPieceIcon(pieceKey: keyof typeof pieceIcons, size = 32) {
  const src = pieceIcons[pieceKey];
  return <Image src={src} alt={pieceKey} width={size} height={size} />;
}

const ChessBoard = ({ game, onMove, isFlipped }: ChessBoardProps) => {
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [legalMoves, setLegalMoves] = useState<string[]>([]);

  const files = "abcdefgh".split("");
  const ranks = [1, 2, 3, 4, 5, 6, 7, 8];

  const getSquareColor = (file: string | number, rank: number) => {
    if (typeof file === "number") {
      file = String.fromCharCode(file + 97);
    }
    return (file.charCodeAt(0) + rank) % 2 === 0
      ? "bg-green-100"
      : "bg-green-700";
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
    <div className="inline-block border-4 border-amber-900">
      {displayBoard.map((rank, rankIdx) => (
        <div key={rankIdx} className="flex">
          {rank.map((square, fileIdx) => {
            const file = isFlipped ? files[7 - fileIdx] : files[fileIdx];
            const r = isFlipped ? ranks[rankIdx] : ranks[7 - rankIdx];
            const squareId = file + r;
            const isSelected = selectedSquare === squareId;
            const isLegal = legalMoves.includes(squareId);

            return (
              <button
                key={squareId}
                onClick={() => handleSquareClick(squareId)}
                className={`w-12 h-12 flex items-center justify-center text-2xl cursor-pointer transition-all relative
                  ${getSquareColor(file.charCodeAt(0) - 97, r)}
                  hover:opacity-80`}
                style={{
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
                        : square.type.toLowerCase()) as keyof typeof pieceIcons
                    )
                  : ""}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

interface ChessGameProps {
  onClose: () => void;
  isFullscreen: boolean;
  setFullscreen: (value: boolean) => void;
}

const ChessGame = ({
  onClose,
  isFullscreen,
  setFullscreen,
}: ChessGameProps) => {
  const [game, setGame] = useState(new Chess());
  const [status, setStatus] = useState("À vous de commencer!");
  const [isThinking, setIsThinking] = useState(false);
  const [gameHistory, setGameHistory] = useState<string[]>([]);

  const getStockfishMove = async (gameState: Chess): Promise<string | null> => {
    try {
      const fen = gameState.fen();
      const response = await fetch(`https://chess-api.com/v1/`, {
        method: "POST",
        body: JSON.stringify({ fen }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.move) {
        return data.move;
      }
      return null;
    } catch (error) {
      console.error("Error fetching move from chess-api:", error);
      return null;
    }
  };

  const handlePlayerMove = async (from: string, to: string) => {
    const newGame = new Chess(game.fen());
    const moves = newGame.moves({ verbose: true });
    const legalMove = moves.find((m) => m.from === from && m.to === to);

    if (!legalMove) return;

    const isCapture = newGame.get(to as Square) !== undefined;
    newGame.move({ from, to, promotion: "q" });
    playMoveSound(isCapture);
    setGame(new Chess(newGame.fen()));
    setGameHistory([...gameHistory, `${from}${to}`]);

    if (newGame.isCheckmate()) {
      setStatus("Vous avez gagné! 🎉");
      return;
    }
    if (newGame.isDraw()) {
      setStatus("Partie nulle! ⚖️");
      return;
    }
    if (newGame.isCheck()) {
      setStatus("Échec!");
    } else {
      setStatus("Au tour de Stockfish...");
    }

    setIsThinking(true);
    setTimeout(async () => {
      try {
        const stockfishMove = await getStockfishMove(newGame);
        console.log("Stockfish move:", stockfishMove);
        if (stockfishMove) {
          const isCapture =
            newGame.get(stockfishMove.slice(2, 4) as Square) !== undefined;
          if (isCapture) playMoveSound(true);
          newGame.move(stockfishMove);
          setGame(new Chess(newGame.fen()));
          setGameHistory([...gameHistory, `${from}${to}`, stockfishMove]);

          if (newGame.isCheckmate()) {
            setStatus("Échec et mat! Stockfish gagne! 🤖");
          } else if (newGame.isDraw()) {
            setStatus("Partie nulle! ⚖️");
          } else if (newGame.isCheck()) {
            setStatus("À vous de jouer! (Échec)");
          } else {
            setStatus("À vous de jouer!");
          }
        }
      } catch (e) {
        setStatus("Erreur API Stockfish");
      }
      setIsThinking(false);
    }, 500);
  };

  const resetGame = () => {
    setGame(new Chess());
    setStatus("À vous de commencer!");
    setGameHistory([]);
  };

  const containerClass = isFullscreen
    ? "fixed inset-0 bg-black/90 flex items-center justify-center z-50"
    : "p-6 bg-neutral-950 rounded-lg";

  return (
    <div className={containerClass}>
      <div
        className={`${
          isFullscreen ? "bg-neutral-900 p-8 rounded-lg w-full h-full" : ""
        }`}
      >
        {isFullscreen && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-neutral-400"
          >
            <X size={24} />
          </button>
        )}

        <div className="flex flex-col items-center gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              Échecs vs Stockfish
            </h2>
            <p className="text-sm text-neutral-400">{status}</p>
          </div>

          <ChessBoard game={game} onMove={handlePlayerMove} isFlipped={false} />

          <div className="text-sm text-neutral-400 text-center">
            <p>Vous jouez les blancs • Stockfish joue les noirs</p>
            {/* {gameHistory.length > 0 && (
              <p className="mt-2">Coups: {gameHistory.join(" ")}</p>
            )} */}
          </div>

          <div className="flex justify-between gap-4">
            <Button
              onClick={resetGame}
              disabled={isThinking}
              className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Relancer une partie
            </Button>

            <Button
              variant="outline"
              onClick={() => setFullscreen(!isFullscreen)}
              className="px-4 py-2"
            >
              {isFullscreen
                ? "Quitter le mode plein écran"
                : "Mode plein écran"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessGame;
