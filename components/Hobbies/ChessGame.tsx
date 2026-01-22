import { useState } from "react";
import { Chess, Square } from "chess.js";
import { X, Copy, History, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { getBestMove } from "@/lib/stockfish";
import { useTranslation } from "@/lib/i18n/context";
import { Dialog } from "@/components/ui/dialog";

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
                className={`w-full aspect-square flex items-center justify-center text-2xl cursor-pointer transition-all relative ${getSquareColor(
                  file.charCodeAt(0) - 97,
                  r,
                )} hover:opacity-80`}
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

function convertToSan(moveHistory: string[]): string[] {
  const chess = new Chess();
  const sanHistory = [];

  for (const move of moveHistory) {
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

  const gameEnded = () => {
    return game.isGameOver();
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
    setGameHistory([...gameHistory, `${from}${to}`]);

    if (isCheckmate) {
      setStatus(t("chess.youWon"));
      setTimeout(() => setShowGameOverDialog(true), 500);
      return;
    }
    if (newGame.isDraw()) {
      setStatus(t("chess.draw"));
      setTimeout(() => setShowGameOverDialog(true), 500);
      return;
    }
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
          setGameHistory([...gameHistory, `${from}${to}`, stockfishMove]);

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
    setStatus(t("chess.youStart"));
    setGameHistory([]);
    setShowGameOverDialog(false);
  };

  const copyHistoryToClipboard = async () => {
    const sanHistory = getSanHistoryString(gameHistory);
    try {
      await navigator.clipboard.writeText(sanHistory);
      toast.success(t("chess.historyCopied") || "History copied to clipboard!");
    } catch (error) {
      toast.error(t("chess.copyFailed") || "Failed to copy history");
    }
  };

  const analyzeOnChessCom = () => {
    const sanHistory = getSanHistoryString(gameHistory);
    const pgn = `[Event "Browser Game"]\n[Site "axthauvin.com"]\n[Date "${new Date().toISOString().split("T")[0]}"]\n[White "You"]\n[Black "Stockfish"]\n\n${sanHistory}`;
    const encodedPgn = encodeURIComponent(pgn);
    window.open(`https://www.chess.com/analysis?pgn=${encodedPgn}`, "_blank");
  };

  const containerClass = isFullscreen
    ? "fixed inset-0 bg-black/90 flex items-center justify-center z-50"
    : "p-6 bg-neutral-950 rounded-lg";

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
                {t("chess.title")}
              </h2>
              <p className="text-sm text-neutral-400">{status}</p>
            </div>

            <ChessBoard
              game={game}
              onMove={handlePlayerMove}
              isFlipped={false}
              boardSize={"70vmin"}
            />

            <div className="text-sm text-neutral-400 text-center">
              <p>{t("chess.explanation")}</p>
            </div>

            <div className="flex justify-between gap-4">
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
            {getSanHistoryString(gameHistory)}
          </code>
        </div>
      </Dialog>

      {/* Game Over Dialog */}
      {gameEnded() && (
        <Dialog
          isOpen={showGameOverDialog}
          onClose={() => setShowGameOverDialog(false)}
          title={status}
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
                  ? !status.toLowerCase().includes("stockfish")
                    ? "🎉 " + t("chess.congratulations")
                    : "😔 " + t("chess.betterLuckNextTime")
                  : game.isDraw()
                    ? "🤝 " + t("chess.drawMessage")
                    : ""}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-zinc-400 mb-2">
                {t("chess.gameHistory") || "Game History"}
              </h3>
              <div className="bg-zinc-900 p-4 rounded-md border border-zinc-700 max-h-40 overflow-y-auto">
                <code className="text-sm text-zinc-300 break-words whitespace-pre-wrap">
                  {getSanHistoryString(gameHistory)}
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
