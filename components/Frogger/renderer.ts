import { FrogState, Obstacle, Particle, ScreenShake, TileSize } from "./types";
import { getShakeOffset } from "./gameUtils";

/**
 * Draw the game to canvas
 */
export function draw(
  ctx: CanvasRenderingContext2D,
  canvasW: number,
  canvasH: number,
  tile: TileSize,
  gridCols: number,
  gridRows: number,
  obstacles: Obstacle[],
  particles: Particle[],
  frog: FrogState,
  shake: ScreenShake
) {
  const w = canvasW;

  ctx.clearRect(0, 0, w, canvasH);

  ctx.fillStyle = "#166534";
  ctx.fillRect(0, 0, w, tile.h * 1.5);
  ctx.fillStyle = "#14532d";
  for (let i = 0; i < gridCols; i++) {
    if (i % 2 === 0)
      ctx.fillRect(i * tile.w, tile.h * 0.5, tile.w, tile.h * 0.2);
  }
  ctx.fillStyle = "#064e3b";
  ctx.fillRect(0, (gridRows - 1) * tile.h, w, tile.h);

  ctx.fillStyle = "#1f2937";
  ctx.fillRect(0, tile.h * 2, w, tile.h * (gridRows - 3));
  ctx.strokeStyle = "#374151";
  ctx.lineWidth = 2;
  for (let r = 3; r < gridRows - 1; r++) {
    const y = r * tile.h;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  for (const o of obstacles) {
    const isChip = !!o.label;
    if (isChip) {
      ctx.fillStyle = "#16a34a";
      const radius = 10;
      ctx.beginPath();
      ctx.moveTo(o.x + radius, o.y);
      ctx.lineTo(o.x + o.w - radius, o.y);
      ctx.quadraticCurveTo(o.x + o.w, o.y, o.x + o.w, o.y + radius);
      ctx.lineTo(o.x + o.w, o.y + o.h - radius);
      ctx.quadraticCurveTo(o.x + o.w, o.y + o.h, o.x + o.w - radius, o.y + o.h);
      ctx.lineTo(o.x + radius, o.y + o.h);
      ctx.quadraticCurveTo(o.x, o.y + o.h, o.x, o.y + o.h - radius);
      ctx.lineTo(o.x, o.y + radius);
      ctx.quadraticCurveTo(o.x, o.y, o.x + radius, o.y);
      ctx.fill();
      if (o.label) {
        ctx.fillStyle = "#e5e7eb";
        ctx.font = `${Math.max(
          12,
          Math.floor(o.h * 0.6)
        )}px ui-sans-serif, system-ui, -apple-system`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(o.label, o.x + o.w / 2, o.y + o.h / 2);
      }
    } else {
      ctx.fillStyle = o.color;
      ctx.fillRect(o.x, o.y, o.w, o.h);
    }
  }

  for (const p of particles) {
    ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 400));
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, 2, 2);
  }
  ctx.globalAlpha = 1;

  const { shakeX, shakeY } = getShakeOffset(shake);

  const fx = frog.x + shakeX;
  const fy = frog.y + shakeY;
  const fontSize = Math.floor(Math.min(tile.w, tile.h) * 0.9);
  ctx.font = `${fontSize}px emoji, Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🐸", fx, fy);
}
