import React from "react";

interface DrinkAdminRowProps {
  id: number;
  name: string;
  sold: number;
  minPrice: number;
  maxPrice: number;
  onSoldChange: (id: number, val: number) => void;
  onMinChange: (id: number, val: number) => void;
  onMaxChange: (id: number, val: number) => void;
}

export function DrinkAdminRow({
  id,
  name,
  sold,
  minPrice,
  maxPrice,
  onSoldChange,
  onMinChange,
  onMaxChange,
}: DrinkAdminRowProps) {
  return (
    <div className="flex items-center justify-between gap-2 bg-zinc-800 p-2 rounded">
      <div className="w-28 font-mono">{name}</div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onSoldChange(id, Math.max(0, sold - 1))}
          className="px-2 bg-zinc-600 rounded hover:bg-zinc-500"
        >
          −
        </button>
        <span className="w-6 text-center">{sold}</span>
        <button
          onClick={() => onSoldChange(id, sold + 1)}
          className="px-2 bg-zinc-600 rounded hover:bg-zinc-500"
        >
          +
        </button>
      </div>

      <input
        type="number"
        value={minPrice}
        onChange={(e) => onMinChange(id, Number(e.target.value))}
        className="w-14 p-1 rounded bg-zinc-700 text-white text-sm"
        placeholder="Min"
      />

      <input
        type="number"
        value={maxPrice}
        onChange={(e) => onMaxChange(id, Number(e.target.value))}
        className="w-14 p-1 rounded bg-zinc-700 text-white text-sm"
        placeholder="Max"
      />
    </div>
  );
}
