import { useEffect, useState } from "react";
import { DrinkCard } from "./components/DrinkCard";
import drinksJSON from "./data/drinks.json";

interface Drink {
  id: number;
  name: string;
  price: number;
}

function App() {
  const [drinks, setDrinks] = useState<Drink[]>(drinksJSON);
  const [prevPrices, setPrevPrices] = useState<Map<number, number>>(
    new Map(drinksJSON.map((d) => [d.id, d.price]))
  );

  // ⏱ Auto-uppdatera priser var 10:e sekund
  useEffect(() => {
    const interval = setInterval(() => {
      // 🔁 Uppdatera prevPrices inför varje ny beräkning
      setPrevPrices(new Map(drinks.map((d) => [d.id, d.price])));

      // 🎲 Nytt pris per dryck (slumpmässigt)
      setDrinks((prev) =>
        prev.map((d) => {
          const delta = Math.floor(Math.random() * 5 - 2); // -2 till +2
          const newPrice = Math.max(20, d.price + delta);
          return { ...d, price: newPrice };
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
    </div>
  );
}

export default App;
