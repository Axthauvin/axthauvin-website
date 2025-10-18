import { Card } from "@/components/ui/card";
import Image from "next/image";

const IntroCard = () => (
  <Card className="relative overflow-hidden border-neutral-800 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 group h-full flex flex-col">
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-amber-900/10 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-neutral-700/5 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
    </div>
    <div className="relative p-8 flex flex-col md:flex-row md:justify-around h-full min-h-80 items-center md:space-y-0 space-y-6">
      <div className="transform group-hover:scale-105 transition-transform duration-500">
        <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-700/15 via-transparent to-orange-800/10 rounded-full blur-2xl group-hover:blur-3xl group-hover:from-amber-600/20 group-hover:to-orange-700/15 transition-all duration-500"></div>
          <div className="relative w-32 h-32 z-10 rounded-full object-cover group-hover:ring-neutral-600 transition-all duration-500 shadow-2xl bg-neutral-800 flex items-center justify-center overflow-hidden">
            <Image
              src="/moi dans la nature.jpg"
              alt="Axel Thauvin"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-15 bg-gradient-to-r from-amber-400/0 via-transparent to-orange-400/0 group-hover:from-amber-400/20 group-hover:to-orange-400/20 transition-all duration-500"></div>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h1 className="font-bold text-3xl sm:text-5xl text-white group-hover:text-neutral-100 transition-colors duration-500">
            Axel Thauvin
          </h1>
        </div>
        <p className="text-sm sm:text-lg text-neutral-300 leading-relaxed max-w-sm mx-auto md:mx-0 group-hover:text-neutral-200 transition-colors duration-300">
          J&apos;aime transformer des idées techniques en outils simples et
          concrets.
          <br />
          J&apos;adore apprendre, transmettre et créer des solutions utiles.
        </p>
      </div>
    </div>
  </Card>
);

export default IntroCard;
