export function calculateNewPrices(drinks, mode = "normal") {
    const totalSold = drinks.reduce((sum, d) => sum + d.sold, 0) || 1;

    const prices = {};
    for (const drink of drinks) {
        let share = drink.sold / totalSold;
        let factor = 1 + (0.5 - share); // populära drycker går upp
        if (mode === "crash") factor *= 0.5;
        if (mode === "happyhour") factor *= 0.75;

        let newPrice = Math.round(drink.basePrice * factor);
        prices[drink.id] = Math.max(drink.min, Math.min(drink.max, newPrice));
    }

    return prices;
}