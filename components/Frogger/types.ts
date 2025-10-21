export interface FroggerSkillsGameProps {
  title: string;
  skills: { name: string; iconName: string; url: string }[];
}

export type GameState =
  | "idle"
  | "playing"
  | "paused"
  | "level-complete"
  | "game-over";

export interface Obstacle {
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
  color: string;
  label?: string;
  safe?: boolean;
}

export interface Lane {
  y: number;
  dir: 1 | -1;
  speed: number;
  minGap: number;
  lastSpawnX: number;
  color: string;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export interface FrogState {
  col: number;
  row: number;
  x: number;
  y: number;
  targetCol: number;
  targetRow: number;
  moveTimer: number;
  moveDuration: number;
  alive: boolean;
}

export interface TileSize {
  w: number;
  h: number;
}

export interface ScreenShake {
  t: number;
  mag: number;
}
