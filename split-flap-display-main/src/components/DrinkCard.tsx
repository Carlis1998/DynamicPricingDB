import React from "react";
import { SplitFlap } from "../SplitFlap";

interface DrinkCardProps {
  name: string;
  price: number;
  prevPrice: number;
}

export function DrinkCard({ name, price, prevPrice }: DrinkCardProps) {
  const diff = price - prevPrice;
  const trend = diff > 0 ? "up" : diff < 0 ? "down" : "same";
  const trendSymbol = diff > 0 ? "↑" : diff < 0 ? "↓" : "→";
  const trendText = diff !== 0 ? `${trendSymbol} ${Math.abs(diff)}` : "→";

  const trendColor = {
    up: "border-green-400 text-green-300",
    down: "border-red-400 text-red-300",
    same: "border-gray-500 text-gray-300",
  }[trend];

  return (
    <div className={`bg-stone-800 p-4 rounded-md h-32 border-l-4 ${trendColor}`}>
      <div className="text-xl font-mono mb-2">{name}</div>
      <div className="flex items-center gap-2 text-2xl font-mono">
        <div className="flex gap-[2px]">
          {String(price).padStart(3, " ").split("").map((char, i) => (
            <SplitFlap key={`${name}-${i}-${char}`} character={char} />
          ))}
        </div>
        <div className="ml-2 text-xl">
          {trendText}
        </div>
      </div>
    </div>
  );
}
