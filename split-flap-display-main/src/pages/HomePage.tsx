// src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import { DrinkCard } from "../components/DrinkCard";
import drinksJSON from "../data/drinks.json";

interface Drink {
  id: number;
  name: string;
  price: number;
}

export default function HomePage() {
  const [drinks, setDrinks] = useState<Drink[]>(drinksJSON);
  const [prevPrices, setPrevPrices] = useState<Map<number, number>>(
    new Map(drinksJSON.map((d) => [d.id, d.price]))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevPrices(new Map(drinks.map((d) => [d.id, d.price])));
      setDrinks((prev) =>
        prev.map((d) => {
          const delta = Math.floor(Math.random() * 5 - 2);
          return { ...d, price: Math.max(20, d.price + delta) };
        })
      );
    }, 10000);
    return () => clearInterval(interval);
  }, [drinks]);

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

      {/* Admin-knapp i nedre vänstra hörnet */}
      <a
        href="/admin"
        className="fixed bottom-4 left-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition"
        title="Admin"
      />
    </div>
  );
}
