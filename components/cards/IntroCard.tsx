import { Card } from "@/components/ui/card";
import Image from "next/image";

const IntroCard = () => (
  <Card className="relative overflow-hidden border-neutral-800 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 group cursor-pointer h-full flex flex-col">
    {/* Gradient animated background */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
    </div>

    <div className="relative p-8 flex justify-around h-full min-h-80 items-center space-y-6">
      <div className="transform group-hover:scale-105 transition-transform duration-500">
        <div className="relative w-32 h-32 mx-auto flex items-center justify-center group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl group-hover:blur-2xl group-hover:from-blue-500/40 group-hover:to-purple-500/40 transition-all duration-500"></div>

          {/* Image */}
          <Image
            src="/moi dans la nature.jpg"
            alt="Axel Thauvin"
            width={128}
            height={128}
            className="relative sm:w-32 sm:h-32 z-10 rounded-full object-cover ring-2 ring-neutral-700 group-hover:ring-blue-500/50 transition-all duration-500 shadow-2xl w-24 h-24"
          />

          {/* Border animation */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"></div>
        </div>
      </div>

      {/* Text section */}
      <div className="space-y-4">
        <div>
          <h1 className="font-bold text-3xl sm:text-5xl bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-blue-300 transition-all duration-500">
            Axel Thauvin
          </h1>
        </div>
        <p className="text-sm sm:text-lg text-neutral-300 leading-relaxed max-w-sm mx-auto group-hover:text-neutral-200 transition-colors duration-300">
          J’aime transformer des idées techniques en outils simples et concrets.
          <br />
          J’adore apprendre, transmettre et créer des solutions utiles.
        </p>
      </div>
    </div>
  </Card>
);

export default IntroCard;
