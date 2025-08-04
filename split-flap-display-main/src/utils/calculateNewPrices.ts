export type PriceMode = "normal" | "crash";

interface EnrichedDrink {
  id: number;
  basePrice: number;
  sold: number;
  min: number;
  max: number;
}

export function calculateNewPrices(
  drinks: EnrichedDrink[],
  mode: PriceMode = "normal"
): Record<number, number> {
  const totalSold = drinks.reduce((acc, d) => acc + d.sold, 0);
  const avgSold = totalSold / drinks.length || 1;

  return Object.fromEntries(
    drinks.map((d) => {
      let change = d.sold - avgSold;

      if (mode === "crash") {
        change = change - 5; // Drastiskt fall
      }

      const raw = d.basePrice + change;
      const newPrice = Math.min(Math.max(raw, d.min), d.max);

      return [d.id, Math.round(newPrice)];
    })
  );
}
