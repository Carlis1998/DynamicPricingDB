import { useEffect, useState } from "react";
import { DrinkCard } from "../components/DrinkCard";

interface Drink {
  id: number;
  name: string;
  price: number;
  previousPrice: number;
}

export default function HomePage() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [prevPrices, setPrevPrices] = useState<Map<number, number>>(new Map());

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:4000/drinks")
        .then((res) => res.json())
        .then((data) => {
          setPrevPrices(new Map(data.map((d: Drink) => [d.id, d.previousPrice])));
          setDrinks(data);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

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
