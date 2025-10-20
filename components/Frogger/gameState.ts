import {
  FrogState,
  Lane,
  Obstacle,
  Particle,
  ScreenShake,
  TileSize,
} from "./types";
import {
  updateParticles,
  updateScreenShake,
  checkRectCollision,
} from "./gameUtils";
import { updateObstacles, updateFrog } from "./gameLogic";

/**
 * Update game state for one frame
 */
export function update(
  dt: number,
  frog: FrogState,
  tile: TileSize,
  obstacles: Obstacle[],
  particles: Particle[],
  shake: ScreenShake,
  canvasW: number,
  onLoseLife: () => void,
  onNextLevel: () => void
): {
  updatedObstacles: Obstacle[];
  updatedParticles: Particle[];
  updatedShake: ScreenShake;
} {
  updateFrog(frog, tile, dt);

  const updatedObstacles = updateObstacles(obstacles, dt, canvasW);

  const updatedParticles = updateParticles(particles, dt);

  const updatedShake = updateScreenShake(shake, dt);

  const frogHit = {
    x: frog.x - tile.w * 0.25,
    y: frog.y - tile.h * 0.25,
    w: tile.w * 0.5,
    h: tile.h * 0.5,
  };
  for (const o of updatedObstacles) {
    const rect = { x: o.x, y: o.y, w: o.w, h: o.h };
    if (checkRectCollision(frogHit, rect)) {
      onLoseLife();
      break;
    }
  }

  if (frog.row <= 1 && frog.moveTimer <= 0) {
    onNextLevel();
  }

  return { updatedObstacles, updatedParticles, updatedShake };
}
