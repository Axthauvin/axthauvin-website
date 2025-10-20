import { FrogState, Lane, Obstacle, TileSize } from "./types";

/**
 * Build lane configuration based on level and canvas dimensions
 */
export function buildLanes(
  canvasW: number,
  canvasH: number,
  gridRows: number,
  gridCols: number,
  level: number,
  tileSizeRef: React.MutableRefObject<TileSize>
): Lane[] {
  const tileH = Math.floor(canvasH / gridRows);
  tileSizeRef.current = { w: Math.floor(canvasW / gridCols), h: tileH };
  const lanes: Lane[] = [];
  const roadStartRow = 3;
  const laneCount = Math.max(4, Math.min(7, 3 + level));
  const laneRows = Array.from(
    { length: laneCount },
    (_, i) => roadStartRow + i
  );
  for (let i = 0; i < laneRows.length; i++) {
    const row = laneRows[i];
    const y = row * tileH + Math.floor(tileH * 0.1);
    const dir: 1 | -1 = i % 2 === 0 ? 1 : -1;
    const baseSpeed = 80 + level * 20 + i * 5;
    const minGap = Math.max(180 - level * 8, 100);
    lanes.push({
      y,
      dir,
      speed: baseSpeed,
      minGap,
      lastSpawnX: dir > 0 ? -9999 : 9999,
      color: i % 2 ? "#334155" : "#111827",
    });
  }
  return lanes;
}

/**
 * Spawn obstacles (skill chips) in lanes if needed
 */
export function spawnObstaclesIfNeeded(
  lanes: Lane[],
  obstacles: Obstacle[],
  canvasW: number,
  level: number,
  skills: Array<{ name: string; icon: any; url: string }>,
  tileSizeRef: React.MutableRefObject<TileSize>
): Obstacle[] {
  const skillList = skills.length
    ? skills
    : [{ name: "Skill", icon: "", url: "" }];
  const newObstacles = [...obstacles];

  lanes.forEach((lane, li) => {
    const chipsInLane = newObstacles.filter((o) => Math.abs(o.y - lane.y) < 1);
    if (chipsInLane.length === 0) {
      const count = 4 + Math.floor(level / 2);
      const baseX = canvasW * (0.2 + Math.random() * 0.6);
      for (let k = -2; k <= 2 && k < count; k++) {
        const s = skillList[(li + (k + 2)) % skillList.length];
        const w = Math.max(80, Math.min(220, 28 + s.name.length * 10));
        const h = Math.max(18, Math.floor(tileSizeRef.current.h * 0.6));
        const x = baseX + k * (w + lane.minGap);
        newObstacles.push({
          x,
          y: lane.y,
          w,
          h,
          speed: lane.speed * lane.dir,
          color: "#16a34a",
          label: s.name,
        });
      }
      lane.lastSpawnX = baseX + 2 * (150 + lane.minGap);
    } else {
      const edgeX =
        lane.dir > 0
          ? Math.max(...chipsInLane.map((c) => c.x + c.w))
          : Math.min(...chipsInLane.map((c) => c.x));
      const canSpawn =
        lane.dir > 0 ? edgeX < canvasW - lane.minGap : edgeX > lane.minGap;
      if (canSpawn) {
        const s = skillList[(li + chipsInLane.length) % skillList.length];
        const w = Math.max(80, Math.min(220, 28 + s.name.length * 10));
        const h = Math.max(18, Math.floor(tileSizeRef.current.h * 0.6));
        const x =
          lane.dir > 0 ? -w - Math.random() * 60 : canvasW + Math.random() * 60;
        newObstacles.push({
          x,
          y: lane.y,
          w,
          h,
          speed: lane.speed * lane.dir,
          color: "#16a34a",
          label: s.name,
        });
        lane.lastSpawnX = x;
      }
    }
  });

  return newObstacles;
}

/**
 * Update obstacles positions and cull off-screen ones
 */
export function updateObstacles(
  obstacles: Obstacle[],
  dt: number,
  canvasW: number
): Obstacle[] {
  const updated = obstacles.map((o) => ({
    ...o,
    x: o.x + (o.speed * dt) / 1000,
  }));
  return updated.filter((o) => o.x + o.w > -20 && o.x < canvasW + 20);
}

/**
 * Reset frog to starting position
 */
export function resetFrog(frog: FrogState, gridCols: number, gridRows: number) {
  frog.col = Math.floor(gridCols / 2);
  frog.row = Math.max(0, gridRows - 2);
  frog.targetCol = frog.col;
  frog.targetRow = frog.row;
  frog.moveTimer = 0;
  frog.alive = true;
}

/**
 * Update frog position (tween animation)
 */
export function updateFrog(frog: FrogState, tile: TileSize, dt: number) {
  if (frog.moveTimer > 0) {
    frog.moveTimer -= dt;
    const t = 1 - Math.max(0, frog.moveTimer) / frog.moveDuration;
    frog.x =
      (frog.col * tile.w + tile.w / 2) * (1 - t) +
      (frog.targetCol * tile.w + tile.w / 2) * t;
    frog.y =
      (frog.row * tile.h + tile.h / 2) * (1 - t) +
      (frog.targetRow * tile.h + tile.h / 2) * t;
    if (frog.moveTimer <= 0) {
      frog.col = frog.targetCol;
      frog.row = frog.targetRow;
      frog.x = frog.col * tile.w + tile.w / 2;
      frog.y = frog.row * tile.h + tile.h / 2;
    }
  } else {
    frog.x = frog.col * tile.w + tile.w / 2;
    frog.y = frog.row * tile.h + tile.h / 2;
  }
}
