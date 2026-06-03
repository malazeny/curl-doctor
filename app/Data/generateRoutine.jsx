import { routineRules } from "./routines";
import { productRecommendations } from "./products";

export function generateRoutine(answers) {
  const routine = {
    daily: [],
    weekly: [],
    monthly: [],
    everyThreeMonths: [],
    products: [],
};

const curlPattern = answers[1];
const porosity = answers[2];
const density = answers[3];
const thickness = answers[4];
const concerns = Array.isArray(answers[5]) ? answers[5] : [answers[5]];
const heatUse = answers[6];
const colorTreated = answers[7];
const scalp = answers[8];
const washFrequency = answers[9];
const goals = Array.isArray(answers[10]) ? answers[10] : [answers[10]];

const selectedNeeds = [...concerns,...goals].filter(Boolean);

selectedNeeds.forEach((need) => {
    const rules = routineRules[need];

    if(rules){
        routine.daily.push(...rules.daily);
        routine.weekly.push(...rules.weekly);
        routine.monthly.push(...rules.monthly);
        routine.everyThreeMonths.push(...rules.everyThreeMonths);
    }
    if(productRecommendations[need]){
        routine.products.push(...productRecommendations[need]);
    }
});

if(porosity === "Low Porosity"){
    routine.weekly.push("Use lightweight products to avoid buildup.");
    routine.products.push("Lightweight leave-in conditioner");
}

if (porosity === "High Porosity") {
    routine.daily.push("Seal moisture with a cream or oil.");
    routine.products.push("Moisturizing cream");
}

if (scalp === "Dry") {
    routine.weekly.push("Use a gentle scalp oil or soothing scalp treatment.");
    routine.products.push("Scalp oil");
}

if (scalp === "Oily") {
    routine.weekly.push("Cleanse your scalp consistently to prevent buildup.");
    routine.products.push("Gentle clarifying shampoo");
}

if (heatUse?.includes("Frequently") || heatUse === "Daily") {
    routine.weekly.push("Use heat protectant before any heat styling.");
    routine.products.push("Heat protectant");
}

if (colorTreated === "Yes") {
    routine.weekly.push("Use color-safe moisturizing products.");
    routine.products.push("Color-safe shampoo");
}

return {
    daily: [...new Set(routine.daily)],
    weekly: [...new Set(routine.weekly)],
    monthly: [...new Set(routine.monthly)],
    everyThreeMonths: [...new Set(routine.everyThreeMonths)],
    products: [...new Set(routine.products)],
  };
}
