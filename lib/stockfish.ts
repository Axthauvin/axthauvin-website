"use client";

export async function getBestMove(fen: string, depth = 8): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const worker =
        typeof Worker !== "undefined" ? new Worker("/stockfish.js") : null;

      if (!worker) {
        return reject(
          new Error("Web Workers are not supported in this environment.")
        );
      }

      worker.onerror = (error) => {
        console.error("Worker error:", error);
        reject(error);
      };

      worker.onmessage = (event: MessageEvent) => {
        const msg = event.data as string;
        if (msg.startsWith("bestmove")) {
          const bestMove = msg.split(" ")[1];
          resolve(bestMove);
        }
      };

      worker.postMessage("uci");
      worker.postMessage("isready");
      worker.postMessage(`position fen ${fen}`);
      worker.postMessage(`go depth ${depth}`);
    } catch (error) {
      console.error("Error:", error);
      reject(error);
    }
  });
}
