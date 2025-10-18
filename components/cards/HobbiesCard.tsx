"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ChessGame from "@/components/Hobbies/ChessGame";
import Link from "next/link";
import Image from "next/image";
import { Book } from "lucide-react";
import { SiChessdotcom } from "react-icons/si";
import { FaSteam } from "react-icons/fa";
import Book3D from "../Hobbies/Book";

function HobbiesCard() {
  const [showGame, setShowGame] = useState(false);
  const [openBook, setOpenBook] = useState(false);
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

  if (openBook) {
    return (
      <div className="col-span-1 md:col-span-3">
        <Book3D
          coverImage="/favBook.jpg"
          quote="J'ai peur. Pas de la vie ou de la mort , ou du néant mais de tout perdre comme si je n'avais jamais été."
          author="Daniel Keyes"
          setOpenBook={setOpenBook}
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
        <Button variant="outline" onClick={() => setOpenBook(true)}>
          <Book size={16} className="mr-1" />
          Mon livre préféré
        </Button>
        <Button className="bg-[#171a21] text-white hover:text-black">
          <Link
            href="https://steamcommunity.com/id/dovahkciin"
            target="_blank"
            className="flex items-center gap-2"
          >
            <FaSteam size={16} />
            Chasseur de trophées
          </Link>
        </Button>
        <Button className="bg-[#80b54b] text-white hover:bg-[#6fa43e]">
          <Link
            href="https://www.chess.com/member/axthauvin"
            target="_blank"
            className="flex items-center gap-2"
          >
            <SiChessdotcom size={16} />
            Chess.com
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default HobbiesCard;
