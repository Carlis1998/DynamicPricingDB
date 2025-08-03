import { useState } from "react";
import drinksData from "../data/drinks.json";
import { DrinkAdminRow } from "../components/DrinkAdminRow";

interface Drink {
  id: number;
  name: string;
  price: number;
}

interface AdminDrinkState {
  sold: number;
  min: number;
  max: number;
}

export function AdminPage() {
  const [adminState, setAdminState] = useState<Record<number, AdminDrinkState>>(
    () =>
      Object.fromEntries(
        drinksData.map((d) => [
          d.id,
          { sold: 0, min: d.price - 10, max: d.price + 10 },
        ])
      )
  );

  const handleSoldChange = (id: number, value: number) => {
    setAdminState((prev) => ({
      ...prev,
      [id]: { ...prev[id], sold: value },
    }));
  };

  const handleMinChange = (id: number, value: number) => {
    setAdminState((prev) => ({
      ...prev,
      [id]: { ...prev[id], min: value },
    }));
  };

  const handleMaxChange = (id: number, value: number) => {
    setAdminState((prev) => ({
      ...prev,
      [id]: { ...prev[id], max: value },
    }));
  };

  const handleRegister = () => {
    // I framtiden: skicka till backend!
    console.log("🔁 Skickar till modell:", adminState);
    alert("✅ Försäljning registrerad (lokalt)!");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono">
      <h1 className="text-3xl mb-6">🛠 Adminläge – Drinkbörsen</h1>

      <div className="space-y-3">
        {drinksData.map((drink) => (
          <DrinkAdminRow
            key={drink.id}
            id={drink.id}
            name={drink.name}
            sold={adminState[drink.id]?.sold ?? 0}
            minPrice={adminState[drink.id]?.min ?? 0}
            maxPrice={adminState[drink.id]?.max ?? 0}
            onSoldChange={handleSoldChange}
            onMinChange={handleMinChange}
            onMaxChange={handleMaxChange}
          />
        ))}
      </div>

      <button
        onClick={handleRegister}
        className="mt-6 px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-bold"
      >
        ✅ Registrera köp
      </button>
    </div>
  );
}
