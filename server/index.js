import express from "express";
import cors from "cors";
import fs from "fs";

import { calculateNewPrices } from "./calculatePrices.js";

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = "./drinks.json";

function loadData() {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}

function saveData(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

app.get("/drinks", (req, res) => {
    res.json(loadData());
});

app.post("/update", (req, res) => {
    const { id, sold, min, max } = req.body;
    const data = loadData();
    const drink = data.find((d) => d.id === id);
    if (!drink) return res.status(404).send("Not found");

    drink.sold = sold;
    drink.min = min;
    drink.max = max;

    saveData(data);
    res.send("Updated");
});

app.post("/recalculate", (req, res) => {
    const data = loadData();
    const newPrices = calculateNewPrices(data, req.body.mode || "normal");

    for (const drink of data) {
        drink.previousPrice = drink.price;
        drink.price = newPrices[drink.id];
    }

    saveData(data);
    res.send("Prices recalculated");
});

app.listen(4000, () => {
    console.log("✅ Backend listening on http://localhost:4000");
});