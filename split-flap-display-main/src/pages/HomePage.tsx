import { useEffect, useState } from "react";
import { DrinkCard } from "../components/DrinkCard";
import drinksJSON from "../data/drinks.json";
import { calculateNewPrices, PriceMode } from "../utils/calculateNewPrices";

interface Drink {
  id: number;
  name: string;
  price: number;
}

interface DrinkMeta {
  sold: number;
  min: number;
  max: number;
}

export default function HomePage() {
  const [drinks, setDrinks] = useState<Drink[]>(drinksJSON);
  const [prevPrices, setPrevPrices] = useState<Map<number, number>>(
    new Map(drinksJSON.map((d) => [d.id, d.price]))
  );

  // Sätt dummy-metadata (dessa kommer i framtiden från backend/admin)
  const [meta] = useState<Record<number, DrinkMeta>>(() =>
    Object.fromEntries(
      drinksJSON.map((d) => [
        d.id,
        {
          sold: Math.floor(Math.random() * 20), // just nu dummy
          min: d.price - 10,
          max: d.price + 10,
        },
      ])
    )
  );

  useEffect(() => {
    const interval = setInterval(() => {
      // Spara tidigare priser
      setPrevPrices(new Map(drinks.map((d) => [d.id, d.price])));

      // Konstruera modellens input
      const enriched = drinks.map((d) => ({
        id: d.id,
        basePrice: d.price,
        sold: meta[d.id]?.sold ?? 0,
        min: meta[d.id]?.min ?? 10,
        max: meta[d.id]?.max ?? 999,
      }));

      const newPrices = calculateNewPrices(enriched, "normal");

      setDrinks((prev) =>
        prev.map((d) => ({
          ...d,
          price: newPrices[d.id],
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [drinks, meta]);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-4xl font-mono mb-6 text-center tracking-widest">
        🍻 Drinkbörsen
      </h1>
      <div className="grid grid-cols-4 gap-4 max-w-6xl mx-auto">
        {drinks.map((drink) => (
          <DrinkCard
            key={drink.id}
            name={drink.name}
            price={drink.price}
            prevPrice={prevPrices.get(drink.id) ?? drink.price}
          />
        ))}
      </div>

      <a
        href="/admin"
        className="fixed bottom-4 left-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition"
        title="Admin"
      />
    </div>
  );
}
