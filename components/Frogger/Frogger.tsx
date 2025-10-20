"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Pause, Play, RotateCcw, Volume1, VolumeX, X } from "lucide-react";
import confetti from "canvas-confetti";
import {
  FroggerSkillsGameProps,
  FrogState,
  Obstacle,
  Particle,
  ScreenShake,
} from "./types";
import { buildLanes, spawnObstaclesIfNeeded, resetFrog } from "./gameLogic";
import {
  addParticles,
  triggerScreenShake,
  ensureAudioContext,
  beep,
} from "./gameUtils";
import { update } from "./gameState";
import { draw } from "./renderer";
import Link from "next/link";
import { SiPostgresql } from "react-icons/si";

function nameToIcon(iconName: string) {
  const icons: { [key: string]: React.ElementType } = {
    SiJavascript: require("react-icons/si").SiJavascript,
    SiTypescript: require("react-icons/si").SiTypescript,
    SiReact: require("react-icons/si").SiReact,
    SiNextdotjs: require("react-icons/si").SiNextdotjs,
    SiNodedotjs: require("react-icons/si").SiNodedotjs,
    SiPython: require("react-icons/si").SiPython,
    SiPhp: require("react-icons/si").SiPhp,
    SiC: require("react-icons/si").SiC,
    SiMysql: require("react-icons/si").SiMysql,
    SiPostgresql: require("react-icons/si").SiPostgresql,
    SiDocker: require("react-icons/si").SiDocker,
    SiLinux: require("react-icons/si").SiLinux,
    SiGit: require("react-icons/si").SiGit,
    SiUnity: require("react-icons/si").SiUnity,
    SiTailwindcss: require("react-icons/si").SiTailwindcss,
    RiJavaFill: require("react-icons/ri").RiJavaFill,
    TbBrandCSharp: require("react-icons/tb").TbBrandCSharp,
    SiElectron: require("react-icons/si").SiElectron,
    SiSpring: require("react-icons/si").SiSpring,
    SiDatabase: require("react-icons/si").SiDatabase,
  };

  if (!iconName || !icons[iconName]) {
    return require("react-icons/fa").FaQuestion;
  }

  return icons[iconName];
}

export const FroggerSkillsGame = (tempCvData: FroggerSkillsGameProps) => {
  const [gameState, setGameState] = useState<
    "idle" | "playing" | "paused" | "level-complete" | "game-over"
  >("idle");
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);

  const skills = useMemo(
    () =>
      tempCvData.skills.map((skill) => ({
        ...skill,
        icon: nameToIcon(skill.icon),
      })),
    [tempCvData.skills]
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const gridCols = 11;
  const gridRows = 13;
  const tileSizeRef = useRef({ w: 32, h: 32 });

  const frogRef = useRef<FrogState>({
    col: Math.floor(gridCols / 2),
    row: Math.max(0, gridRows - 2),
    x: 0,
    y: 0,
    targetCol: Math.floor(gridCols / 2),
    targetRow: Math.max(0, gridRows - 2),
    moveTimer: 0,
    moveDuration: 100,
    alive: true,
  });

  const obstaclesRef = useRef<Obstacle[]>([]);
  const lanesRef = useRef<any[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const shakeRef = useRef<ScreenShake>({ t: 0, mag: 0 });
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initializeLanes = useCallback(
    (canvasW: number, canvasH: number) => {
      lanesRef.current = buildLanes(
        canvasW,
        canvasH,
        gridRows,
        gridCols,
        level,
        tileSizeRef
      );
      obstaclesRef.current = [];
    },
    [level]
  );

  const spawnObstacles = useCallback(
    function spawnObstacles(canvasW: number) {
      obstaclesRef.current = spawnObstaclesIfNeeded(
        lanesRef.current,
        obstaclesRef.current,
        canvasW,
        level,
        skills,
        tileSizeRef
      );
    },
    [level, skills]
  );

  const handleLoseLife = useCallback(
    function handleLoseLife() {
      setLives((lv) => {
        const n = lv - 1;
        beep(audioCtxRef, audioEnabled, 110, 150, "sawtooth", 0.04);
        shakeRef.current = triggerScreenShake(shakeRef.current);
        addParticles(
          particlesRef,
          frogRef.current.x,
          frogRef.current.y,
          20,
          "#ef4444"
        );
        if (n <= 0) {
          setGameState("game-over");
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
        } else {
          resetFrog(frogRef.current, gridCols, gridRows);
        }
        return n;
      });
    },
    [audioEnabled]
  );

  const handleNextLevel = useCallback(
    function handleNextLevel() {
      setLevel((l) => l + 1);
      setScore((s) => s + 250);
      confetti({ particleCount: 120, spread: 60 });
      beep(audioCtxRef, audioEnabled, 880, 140, "square", 0.03);
      resetFrog(frogRef.current, gridCols, gridRows);
      const canvas = canvasRef.current;
      if (canvas) {
        const cssW = canvas.width / (window.devicePixelRatio || 1);
        const cssH = canvas.height / (window.devicePixelRatio || 1);
        initializeLanes(cssW, cssH);
      }
    },
    [audioEnabled, initializeLanes]
  );

  const tryMove = useCallback(
    (dx: number, dy: number) => {
      const frog = frogRef.current;
      if (frog.moveTimer > 0) return;
      const targetCol = Math.min(Math.max(0, frog.col + dx), gridCols - 1);
      const targetRow = Math.min(Math.max(0, frog.row + dy), gridRows - 1);
      if (targetCol === frog.col && targetRow === frog.row) return;
      frog.targetCol = targetCol;
      frog.targetRow = targetRow;
      frog.moveTimer = frog.moveDuration;
      addParticles(particlesRef, frog.x, frog.y, 6, "#22c55e");
      beep(audioCtxRef, audioEnabled, 520, 60, "triangle", 0.01);
      if (dy < 0) setScore((s) => s + 10);
    },
    [audioEnabled]
  );

  useEffect(() => {
    if (gameState !== "playing") return;
    const handler = (e: KeyboardEvent) => {
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "w",
          "a",
          "s",
          "d",
        ].includes(e.key)
      )
        e.preventDefault();
      if (e.key === "ArrowLeft" || e.key === "a") tryMove(-1, 0);
      if (e.key === "ArrowRight" || e.key === "d") tryMove(1, 0);
      if (e.key === "ArrowUp" || e.key === "w") tryMove(0, -1);
      if (e.key === "ArrowDown" || e.key === "s") tryMove(0, 1);
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        togglePause();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [gameState, tryMove]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;
    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(Math.min(420, Math.max(260, rect.width * 0.45)));
      canvas.width = w * (window.devicePixelRatio || 1);
      canvas.height = h * (window.devicePixelRatio || 1);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      initializeLanes(w, h);
      const tile = tileSizeRef.current;
      frogRef.current.x = frogRef.current.col * tile.w + tile.w / 2;
      frogRef.current.y = frogRef.current.row * tile.h + tile.h / 2;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    return () => ro.disconnect();
  }, [level, initializeLanes]);

  const gameLoop = useCallback(
    (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = Math.min(time - lastTimeRef.current, 50);
      lastTimeRef.current = time;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const cssW = canvas.width / (window.devicePixelRatio || 1);
      spawnObstacles(cssW);

      const { updatedObstacles, updatedParticles, updatedShake } = update(
        dt,
        frogRef.current,
        tileSizeRef.current,
        obstaclesRef.current,
        particlesRef.current,
        shakeRef.current,
        canvas.width,
        handleLoseLife,
        handleNextLevel
      );

      obstaclesRef.current = updatedObstacles;
      particlesRef.current = updatedParticles;
      shakeRef.current = updatedShake;

      ctx.save();
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
      draw(
        ctx,
        cssW,
        canvas.height / (window.devicePixelRatio || 1),
        tileSizeRef.current,
        gridCols,
        gridRows,
        obstaclesRef.current,
        particlesRef.current,
        frogRef.current,
        shakeRef.current
      );
      ctx.restore();

      rafRef.current = requestAnimationFrame(gameLoop);
    },
    [spawnObstacles, handleLoseLife, handleNextLevel]
  );

  useEffect(() => {
    if (gameState !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (container && (canvas.width === 300 || canvas.height === 150)) {
      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(Math.min(420, Math.max(260, rect.width * 0.45)));
      canvas.width = w * (window.devicePixelRatio || 1);
      canvas.height = h * (window.devicePixelRatio || 1);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      initializeLanes(w, h);
      const tile = tileSizeRef.current;
      frogRef.current.x = frogRef.current.col * tile.w + tile.w / 2;
      frogRef.current.y = frogRef.current.row * tile.h + tile.h / 2;
    }

    lastTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [gameState, gameLoop, initializeLanes]);

  useEffect(() => {
    if (gameState !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touchStartX = t.clientX;
      touchStartY = t.clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStartX;
      const dy = t.clientY - touchStartY;
      const threshold = 24;
      if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > threshold) tryMove(dx > 0 ? 1 : -1, 0);
      } else {
        if (Math.abs(dy) > threshold) tryMove(0, dy > 0 ? 1 : -1);
      }
    };
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [gameState, tryMove]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function togglePause() {
    setGameState((s) => (s === "playing" ? "paused" : "playing"));
  }

  function closeGame() {
    setGameState("idle");
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }

  function startGame() {
    setGameState("playing");
    setScore(0);
    setLevel((l) => Math.max(1, l));
    setLives(3);
    resetFrog(frogRef.current, gridCols, gridRows);
    beep(audioCtxRef, audioEnabled, 660, 120, "square", 0.02);
  }

  if (gameState === "idle") {
    return (
      <section className="relative mb-8 rounded-lg overflow-hidden">
        <h2 className="text-lg mb-6 border-b border-gray-200 dark:border-gray-800 border-gray-200 pb-2">
          {tempCvData.title} <span className="text-green-400">Frogger</span>
        </h2>
        <p className="text-gray-300 mb-4 mx-auto">
          Plutôt qu’une longue liste de compétences, j’ai préféré les montrer en
          action. Testez-les directement dans mon jeu{" "}
          <span className="text-green-400">Frogger</span> !
        </p>
        <button
          onClick={startGame}
          className="mb-8 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors shadow-md flex items-center gap-2 mx-auto"
        >
          <Play size={18} /> Jouer à Frogger
        </button>

        <div className="pb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-2">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <Link
                href={skill.url}
                key={i}
                className="flex items-center gap-2 px-3 py-2 bg-[hsl(0,0%,97%)] dark:bg-gray-800/60 border border-gray-700 rounded-full text-sm text-gray-900 dark:text-gray-200 shadow transition-all duration-300 hover:scale-105 hover:bg-green-100/80 dark:hover:bg-green-900/40 hover:border-green-400 group"
              >
                <Icon
                  className="text-green-400 flex-shrink-0 transition-transform duration-300 group-hover:scale-125"
                  size={20}
                />
                <span className="truncate font-medium">{skill.name}</span>
              </Link>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="relative mb-8 rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-xl">
      {/* HUD */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/80 border-b border-gray-700">
        <div className="flex gap-4 text-sm text-white flex-wrap">
          <span>Score: {score}</span>
          <span>Niveau: {level}</span>
          <span>Vies: {"🐸".repeat(lives)}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="p-1.5 hover:bg-gray-700 rounded transition-colors text-white"
            title={audioEnabled ? "Mute" : "Unmute"}
          >
            {audioEnabled ? <Volume1 size={18} /> : <VolumeX size={18} />}
          </button>
          <button
            onClick={togglePause}
            className="p-1.5 hover:bg-gray-700 rounded transition-colors text-white"
            title={gameState === "paused" ? "Resume" : "Pause"}
          >
            {gameState === "paused" ? <Play size={18} /> : <Pause size={18} />}
          </button>
          <button
            onClick={closeGame}
            className="p-1.5 hover:bg-gray-700 rounded transition-colors text-white"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative" style={{ touchAction: "none" }}>
        <canvas ref={canvasRef} className="w-full bg-gray-900" />
        {gameState === "paused" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <div className="text-center text-white">
              <Pause size={48} className="mx-auto mb-2" />
              <p className="text-xl font-bold">Pause</p>
              <p className="text-sm text-gray-300">
                Cliquer sur le bouton pour reprendre
              </p>
            </div>
          </div>
        )}
        {gameState === "game-over" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <div className="text-center text-white bg-gray-800/90 p-6 rounded-lg">
              <p className="text-2xl font-bold mb-2">
                Mince, vous avez perdu :(
              </p>
              <p className="text-lg mb-4">Score: {score}</p>
              <button
                onClick={startGame}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-semibold transition-colors flex items-center gap-2 mx-auto"
              >
                <RotateCcw size={16} /> Rejouer
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
