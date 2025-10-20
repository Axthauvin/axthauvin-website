import { Particle, ScreenShake } from "./types";

/**
 * Add particle effects at a specific position
 */
export function addParticles(
  particlesRef: React.MutableRefObject<Particle[]>,
  x: number,
  y: number,
  count = 8,
  color = "#22c55e"
) {
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const sp = 60 + Math.random() * 140;
    particlesRef.current.push({
      x,
      y,
      vx: Math.cos(a) * sp,
      vy: Math.sin(a) * sp,
      life: 300 + Math.random() * 300,
      color,
    });
  }
}

/**
 * Update particles for one frame
 */
export function updateParticles(particles: Particle[], dt: number): Particle[] {
  const updated = particles.map((p) => ({
    ...p,
    x: p.x + (p.vx * dt) / 1000,
    y: p.y + (p.vy * dt) / 1000,
    vx: p.vx * 0.98,
    vy: p.vy * 0.98 + 40 * (dt / 1000),
    life: p.life - dt,
  }));
  return updated.filter((p) => p.life > 0);
}

/**
 * Trigger screen shake effect
 */
export function triggerScreenShake(
  shake: ScreenShake,
  mag = 6,
  time = 200
): ScreenShake {
  return {
    mag: Math.max(shake.mag, mag),
    t: Math.max(shake.t, time),
  };
}

/**
 * Update screen shake for one frame
 */
export function updateScreenShake(shake: ScreenShake, dt: number): ScreenShake {
  return {
    t: Math.max(0, shake.t - dt),
    mag: shake.mag * 0.92,
  };
}

/**
 * Get shake offset from shake state
 */
export function getShakeOffset(shake: ScreenShake): {
  shakeX: number;
  shakeY: number;
} {
  const shakeX = (Math.random() * 2 - 1) * shake.mag * (shake.t > 0 ? 1 : 0);
  const shakeY = (Math.random() * 2 - 1) * shake.mag * (shake.t > 0 ? 1 : 0);
  return { shakeX, shakeY };
}

/**
 * Ensure audio context is initialized (lazy)
 */
export function ensureAudioContext(
  audioCtxRef: React.MutableRefObject<AudioContext | null>,
  audioEnabled: boolean
): AudioContext | null {
  if (!audioEnabled) return null;
  if (!audioCtxRef.current) {
    try {
      audioCtxRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    } catch (e) {
      // ignore audio errors
    }
  }
  return audioCtxRef.current;
}

/**
 * Play a simple beep sound
 */
export function beep(
  audioCtxRef: React.MutableRefObject<AudioContext | null>,
  audioEnabled: boolean,
  freq: number,
  timeMs = 100,
  type: OscillatorType = "square",
  gain = 0.02
) {
  const ctx = ensureAudioContext(audioCtxRef, audioEnabled);
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const vol = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  vol.gain.value = gain;
  osc.connect(vol).connect(ctx.destination);
  const now = ctx.currentTime;
  osc.start(now);
  osc.stop(now + timeMs / 1000);
}

/**
 * Check collision between two rectangles
 */
export function checkRectCollision(
  rect1: { x: number; y: number; w: number; h: number },
  rect2: { x: number; y: number; w: number; h: number }
): boolean {
  return (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  );
}
