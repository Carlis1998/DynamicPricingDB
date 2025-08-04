import { useEffect, useState } from "react";
import { DrinkAdminRow } from "../components/DrinkAdminRow";

interface Drink {
  id: number;
  name: string;
  price: number;
  previousPrice: number;
  sold: number;
  min: number;
  max: number;
}

export function AdminPage() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/drinks")
      .then((res) => res.json())
      .then((data) => {
        setDrinks(data);
        setLoading(false);
      });
  }, []);

  const updateDrink = (id: number, field: keyof Drink, value: number) => {
    const updated = drinks.map((d) =>
      d.id === id ? { ...d, [field]: value } : d
    );
    setDrinks(updated);

    fetch("http://localhost:4000/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, [field]: value }),
    });
  };

  const handleRegister = () => {
    fetch("http://localhost:4000/recalculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: "normal" }),
    })
      .then((res) => res.text())
      .then(() => alert("✅ Priser kalkylerade!"));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6 font-mono">
        <p>Laddar drycker...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono">
      <h1 className="text-3xl mb-6">🛠 Adminläge – Drinkbörsen</h1>

      <div className="space-y-3">
        {drinks.map((drink) => (
          <DrinkAdminRow
            key={drink.id}
            id={drink.id}
            name={drink.name}
            sold={drink.sold}
            minPrice={drink.min}
            maxPrice={drink.max}
            onSoldChange={(id, val) => updateDrink(id, "sold", val)}
            onMinChange={(id, val) => updateDrink(id, "min", val)}
            onMaxChange={(id, val) => updateDrink(id, "max", val)}
          />
        ))}
      </div>

      <button
        onClick={handleRegister}
        className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold"
      >
        🔁 Kalkylera priser
      </button>
    </div>
  );
}
