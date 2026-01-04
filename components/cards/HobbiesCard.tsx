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
import { useTranslation } from "@/lib/i18n";

function HobbiesCard() {
  const { t } = useTranslation();
  const [showGame, setShowGame] = useState(false);
  const [openBook, setOpenBook] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  // Preload the book cover image when the user shows intent (hover/focus/touch)
  const preloadBookCover = () => {
    try {
      if (typeof window !== "undefined") {
        const img = new window.Image();
        img.src = "/favBook.jpg";
      }
    } catch (_) {}
  };

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
          quote={t("book.quote")}
          author={t("book.author")}
          setOpenBook={setOpenBook}
        />
      </div>
    );
  }

  return (
    <div className="border border-neutral-800 bg-neutral-950 p-6 rounded-lg h-full flex flex-col justify-between">
      <h3 className="font-semibold text-white tracking-wider mb-4">
        {t("hobbies.title")}
      </h3>
      <p className="text-sm text-neutral-400 mb-4">
        {t("hobbies.description")} <br />
        {t("hobbies.projectsIntro")}
      </p>

      <div className="flex gap-4 mt-6 flex-wrap">
        <Button
          onClick={() => {
            setShowGame(true);
            setFullscreen(false);
          }}
        >
          <Image
            src="/chess/icons/bk.png"
            alt={t("hobbies.playChess")}
            width={16}
            height={16}
            className="mr-1"
          />
          {t("hobbies.playChess")}
        </Button>
        <Button
          variant="outline"
          onMouseEnter={preloadBookCover}
          onFocus={preloadBookCover}
          onTouchStart={preloadBookCover}
          onClick={() => setOpenBook(true)}
        >
          <Book size={16} className="mr-1" />
          {t("hobbies.favoriteBook")}
        </Button>
        <Button className="bg-[#171a21] text-white hover:text-black">
          <Link
            href="https://steamcommunity.com/id/dovahkciin"
            target="_blank"
            className="flex items-center gap-2"
          >
            <FaSteam size={16} />
            {t("hobbies.trophyHunter")}
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
