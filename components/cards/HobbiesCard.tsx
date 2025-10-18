"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ChessGame from "@/components/Hobbies/ChessGame";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SiSteam } from "react-icons/si";
import { FaSteam } from "react-icons/fa";
import { TbSteam } from "react-icons/tb";

function HobbiesCard() {
  const [showGame, setShowGame] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  if (showGame) {
    return (
      <div className="col-span-1 md:col-span-3">
        <ChessGame
          onClose={() => {
            setShowGame(false);
            setFullscreen(false);
          }}
          isFullscreen={fullscreen}
          setFullscreen={setFullscreen}
        />
      </div>
    );
  }

  return (
    <div className="border border-neutral-800 bg-neutral-950 p-6 rounded-lg h-full flex flex-col justify-between">
      <h3 className="font-semibold text-white uppercase tracking-wider mb-4">
        Mes hobbies
      </h3>
      <p className="text-sm text-neutral-400 mb-4">
        Passionné par les échecs. On se fait une petite partie ? (je suis pas
        dispo, donc je vais laisser Stockfish jouer pour moi)
      </p>

      <div className="flex gap-4 mt-6 flex-wrap">
        <Button
          onClick={() => {
            setShowGame(true);
            setFullscreen(false);
          }}
        >
          <Image
            src="/chessIcons/bk.png"
            alt="Jouer aux échecs"
            width={16}
            height={16}
            className="mr-1"
          />
          Jouer aux échecs
        </Button>
        <Button variant="outline">
          <Link
            href="https://www.bibliothequesonore.ch/livre/31726"
            target="_blank"
            className="flex items-center gap-2"
          >
            <ExternalLink size={12} />
            Mon livre préféré
          </Link>
        </Button>
        <Button>
          <Link
            href="https://steamcommunity.com/id/dovahkciin"
            target="_blank"
            className="flex items-center gap-2"
          >
            <FaSteam />
            Chasseur de trophées
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default HobbiesCard;
