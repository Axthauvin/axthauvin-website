import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const CVCard = () => (
  <Card className="border-neutral-800 bg-neutral-950 p-6 hover:border-neutral-700 transition-all duration-300 group cursor-pointer h-full flex flex-col">
    <Link href="/cv" className="flex flex-col justify-between">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-semibold text-white group-hover:text-neutral-200 transition-colors">
          Étudiant en 4ᵉ année à l’EPITA
        </h3>
        <ExternalLink className="w-4 h-4 text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-sm text-neutral-400 mb-4">
        Passionné par le développement d’outils simples et accessibles.
      </p>
      <Button
        variant="outline"
        className="w-full mt-6 border-neutral-800 hover:bg-neutral-900 text-sm"
      >
        Voir mon CV
      </Button>
    </Link>
  </Card>
);
export default CVCard;
