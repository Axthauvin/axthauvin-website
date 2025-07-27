"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import confetti from "canvas-confetti";
import React from "react";

interface FroggerSkillsGameProps {
  title: string;
  skills: { name: string; icon: string; url: string }[];
}

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
    FaDatabase: require("react-icons/fa").FaDatabase,
  };

  if (!iconName || !icons[iconName]) {
    // console.warn(`Icon "${iconName}" not found, using default icon.`);
    return require("react-icons/fa").FaQuestion; // Default icon if not found
  }

  return icons[iconName];
}

export const FroggerSkillsGame = (tempCvData: FroggerSkillsGameProps) => {
  const [gameActive, setGameActive] = useState(false);
  const [frogPosition, setFrogPosition] = useState({ x: 50, y: 5 });
  const [showCongrats, setShowCongrats] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);

  const skills = tempCvData.skills.map((skill) => ({
    ...skill,
    icon: nameToIcon(skill.icon),
  }));

  // Vérification continue des collisions pendant le jeu
  useEffect(() => {
    if (!gameActive) return;

    const checkCollisionInterval = setInterval(() => {
      checkCollision();
    }, 50); // Vérifier toutes les 50ms

    return () => clearInterval(checkCollisionInterval);
  }, [gameActive, frogPosition]);

  // Gérer les clics dans la zone de jeu
  const handleGameClick = (e: {
    currentTarget: { getBoundingClientRect: () => any };
    clientY: number;
  }) => {
    if (!gameActive || showGameOver) return;

    // La grenouille monte d'un nombre fixe de pixels à chaque clic
    setFrogPosition((prev) => {
      const step = 10; // pourcentage à monter à chaque clic
      const newY = Math.min(95, prev.y + step);

      // Vérifier victoire
      if (newY >= 90) {
        setGameActive(false);
        setShowCongrats(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }

      return { ...prev, y: newY };
    });
  };

  const startGame = () => {
    setGameActive(true);
    setFrogPosition({ x: 50, y: 5 });
    setShowCongrats(false);
    setShowGameOver(false);
  };

  const closeGame = () => {
    setGameActive(false);
    setShowCongrats(false);
    setShowGameOver(false);
    setFrogPosition({ x: 50, y: 5 });
  };

  // Fonction de collision corrigée
  type RectLike = {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
  };

  function isColliding(rect1: RectLike, rect2: RectLike): boolean {
    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
  }

  function checkCollision() {
    if (!gameActive || showGameOver) return;

    // Get frog DOM node
    const frog = document.getElementById("frog");
    if (!frog) return;

    const frogRect = frog.getBoundingClientRect();

    // Calculate reduced hitbox (50% of frog size, centered)
    const hitboxWidth = frogRect.width * 0.5;
    const hitboxHeight = frogRect.height * 0.5;
    const hitboxX = frogRect.left + (frogRect.width - hitboxWidth) / 2;
    const hitboxY = frogRect.top + (frogRect.height - hitboxHeight) / 2;

    // Create hitbox rect
    const hitboxRect = {
      left: hitboxX,
      top: hitboxY,
      right: hitboxX + hitboxWidth,
      bottom: hitboxY + hitboxHeight,
      width: hitboxWidth,
      height: hitboxHeight,
    };

    // Get all skill items
    const skillItems = document.querySelectorAll(".skill-item");
    let collision = false;

    skillItems.forEach((item) => {
      const itemRect = item.getBoundingClientRect();

      if (isColliding(hitboxRect, itemRect)) {
        collision = true;
      }
    });

    if (collision) {
      // Game Over, on remet la grenouille à sa position de départ !
      startGame();
      // setGameActive(false);
      // setShowGameOver(true);
    }
  }

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-lg mb-6 border-b pb-2 dark:border-gray-800 border-gray-200">
          {!gameActive
            ? tempCvData.title
            : "Cliquez dans la zone pour faire avancer la grenouille !"}
        </h2>
      </div>

      {/* Zone de jeu */}
      <div
        className={`relative w-full overflow-hidden cursor-pointer transition-all duration-300 ${
          gameActive
            ? "h-96 bg-gray-900/40 border-2 border-green-500 rounded-lg dark:border-green-500 border-green-300"
            : "h-auto"
        }`}
        onClick={handleGameClick}
      >
        {gameActive && (
          <>
            <div className="absolute top-2 right-2 z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeGame();
                }}
                className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Ligne d'arrivée */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-sm font-bold text-white dark:from-green-400 dark:to-green-600 from-green-200 to-green-400">
              🏁 ARRIVÉE 🏁
            </div>
          </>
        )}

        {/* Carrousel de skills avec espacement pour le jeu */}
        {[0, 1, 2].map((row) => (
          <div
            key={row}
            className={`flex animate-marquee py-4 ${
              gameActive ? "gap-20 py-8" : "gap-6"
            }`}
            style={{
              animationDuration: gameActive ? "60s" : "100s",
              animationDirection: row % 2 === 0 ? "normal" : "reverse",
              marginTop: gameActive && row === 0 ? "2rem" : "0",
            }}
          >
            {[
              ...skills.slice(
                row * Math.ceil(skills.length / 3),
                (row + 1) * Math.ceil(skills.length / 3)
              ),
              ...skills.slice(
                row * Math.ceil(skills.length / 3),
                (row + 1) * Math.ceil(skills.length / 3)
              ),
            ].map((skill, idx) => (
              <a
                key={`row${row}-${idx}`}
                href={gameActive ? undefined : skill.url}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-[hsl(0, 0%, 95%)] dark:bg-gray-800/50 border border-gray-600 rounded-full text-sm text-gray-800 dark:text-gray-300 whitespace-nowrap flex-shrink-0 hover:bg-gray-700/50 hover:text-white transition-all duration-300 dark:bg-gray-800/50 dark:border-gray-600 bg-gray-100/50 border-gray-300 skill-item select-none"
              >
                {React.createElement(skill.icon)}
                <span>{skill.name}</span>
              </a>
            ))}
          </div>
        ))}

        {/* Grenouille */}
        {gameActive && (
          <div
            className="absolute text-4xl z-10 transition-all duration-500 ease-out pointer-events-none"
            style={{
              left: `${frogPosition.x}%`,
              bottom: `${frogPosition.y}%`,
              transform: "translate(-50%, 50%)",
            }}
            id="frog"
          >
            🐸
          </div>
        )}
      </div>

      {/* Popup de félicitations */}
      {showCongrats && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4 text-green-600">
              Félicitations 🎉
            </h2>
            <p className="mb-6">Vous avez aidé la grenouille à arriver !</p>
            <button
              onClick={closeGame}
              className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Popup de Game Over */}
      {showGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4 text-red-600">
              Game Over 💥
            </h2>
            <p className="mb-6">La grenouille a touché un obstacle !</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={startGame}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
              >
                Rejouer
              </button>
              <button
                onClick={closeGame}
                className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bouton pour lancer le jeu */}
      {!gameActive && (
        <div className="text-center mb-8 mt-4">
          <button
            onClick={startGame}
            className="inline-flex items-center gap-2 px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-all duration-300 hover:scale-105 shadow dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
          >
            <Play size={18} className="text-gray-400 dark:text-gray-300" />
            <span className="font-medium">Jouer à Frogger 🐸</span>
          </button>
        </div>
      )}
    </section>
  );
};
