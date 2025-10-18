import Image from "next/image";
import React, { useState } from "react";

export default function Book3D({
  coverImage,
  quote,
  author,
  setOpenBook,
}: {
  coverImage: string;
  quote: string;
  author?: string;
  setOpenBook: (value: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setOpenBook(false)}
      className="w-full h-screen fixed bg-black/80 flex items-center justify-center p-8 top-0 left-0 z-50"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="relative cursor-pointer"
        style={{
          perspective: "1200px",
          aspectRatio: "3 / 5",
          width: "24rem",
          maxWidth: "50%",
          transform: isOpen ? "translateX(50%)" : "translateX(0)",
          transition: "transform 300ms ease-out",
        }}
      >
        {/* Book Container */}
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Book Cover (front and back) */}
          <div
            className="absolute w-full h-full cursor-pointer"
            style={{
              transformStyle: "preserve-3d",
              transform: isOpen ? "rotateY(-180deg)" : "rotateY(0deg)",
              transformOrigin: "left center",
              transition: "transform 700ms ease-out",
            }}
          >
            {/* Cover Front */}
            <div
              className="absolute w-full h-full rounded-r-lg shadow-2xl overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <Image
                src={coverImage}
                alt="Couverture du livre"
                fill
                objectFit="cover"
                className="w-full h-full"
                priority
              />
              {/* Spine effect */}
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-r from-black/30 to-transparent" />
            </div>

            {/* Cover Back */}
            <div
              className="absolute w-full h-full bg-amber-200 rounded-l-lg shadow-2xl"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            />
          </div>

          {/* Pages (visible in front, layered on top) */}
          <div
            className="absolute w-full h-full"
            style={{
              transform: isOpen
                ? "translateZ(20px) rotateY(0deg)"
                : "translateZ(-10px) rotateY(0deg)",
              transition: "transform 700ms ease-out",
              zIndex: isOpen ? 10 : -1,
            }}
          >
            {/* Multiple page layers */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-gradient-to-br from-amber-50 to-orange-50 rounded-r-lg"
                style={{
                  width: "100%",
                  height: "100%",
                  transform: `translateX(${i * 2}px) translateY(${i * 1}px)`,
                  boxShadow: `${i * 2}px ${i * 2}px ${
                    4 + i * 2
                  }px rgba(0,0,0,0.15)`,
                  zIndex: i,
                }}
              />
            ))}

            {/* Main interior page with quote */}
            <div
              className="absolute w-full h-full bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 rounded-r-lg shadow-2xl p-4 sm:p-12 flex flex-col items-center justify-center overflow-hidden"
              style={{
                zIndex: 100,
              }}
            >
              {/* Quote Content */}
              <div className="relative z-10 text-center space-y-8">
                <blockquote className="text-sm font-light text-slate-700 italic leading-relaxed md:text-3xl sm:text-2xl">
                  “{quote}”
                </blockquote>

                {author && (
                  <p className="text-slate-500 font-medium pt-4">{author}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Status Text */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-slate-300 text-sm whitespace-nowrap">
          {isOpen ? "Cliquer pour fermer" : "Cliquer pour ouvrir"}
        </div>
      </div>
    </div>
  );
}
