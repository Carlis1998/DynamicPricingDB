import React from "react";

interface AdminPanelProps {
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (v: number) => void;
  onMaxPriceChange: (v: number) => void;
  sales: Record<number, number>;
  onSalesChange: (id: number, value: number) => void;
  onClose: () => void;
  drinkNames: Record<number, string>;
}

export function AdminPanel({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  sales,
  onSalesChange,
  onClose,
  drinkNames,
}: AdminPanelProps) {
  return (
    <div className="fixed bottom-6 left-6 bg-zinc-800 text-white p-4 rounded-lg shadow-lg w-80 z-50">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">Adminpanel</h2>
        <button
          className="text-sm px-2 py-1 bg-red-500 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Stäng
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm">Minpris:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => onMinPriceChange(Number(e.target.value))}
          className="w-full p-1 mt-1 rounded bg-zinc-700 text-white"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm">Maxpris:</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-full p-1 mt-1 rounded bg-zinc-700 text-white"
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-1">Sålda per dryck:</h3>
        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
          {Object.entries(drinkNames).map(([id, name]) => (
            <div key={id}>
              <label className="text-xs">{name}</label>
              <input
                type="number"
                value={sales[Number(id)] ?? 0}
                onChange={(e) =>
                  onSalesChange(Number(id), Number(e.target.value))
                }
                className="w-full p-1 rounded bg-zinc-700 text-white text-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
