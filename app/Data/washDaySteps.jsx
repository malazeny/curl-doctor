export function generateWashDaySteps(answers) {
    const porosity = answers[2];
    const scalp = answers[8];
    const colorTreated = answers[7];
    const concerns = Array.isArray(answers[5]) ? answers[5] : [answers[5]];
    const goals = Array.isArray(answers[10]) ? answers[10] : [answers[10]];
    const allNeeds = [...concerns, ...goals].filter(Boolean);

    const steps = [];

    // Step 1 — Pre-poo
    if (allNeeds.includes("Breakage") || allNeeds.includes("Damage Repair")) {
        steps.push({
            id: "prepoo",
            title: "Pre-Poo Treatment",
            description: "Apply a protective oil (like coconut or olive oil) to dry hair before washing to reduce breakage.",
        });
    }

    // Step 2 — Detangle
    steps.push({
        id: "detangle",
        title: "Detangle",
        description: "Use your fingers or a wide-tooth comb to gently detangle from ends to roots while hair is dry.",
    });

    // Step 3 — Clarify (if oily scalp or buildup)
    if (scalp === "Oily" || allNeeds.includes("Scalp Health")) {
        steps.push({
            id: "clarify",
            title: "Clarifying Shampoo",
            description: "Use a clarifying shampoo to remove buildup from your scalp before conditioning.",
        });
    } else if (colorTreated === "Yes") {
        steps.push({
            id: "shampoo",
            title: "Color-Safe Shampoo",
            description: "Gently cleanse with a sulfate-free, color-safe shampoo to protect your color.",
        });
    } else {
        steps.push({
            id: "cowash",
            title: "Shampoo or Co-Wash",
            description: "Cleanse your scalp thoroughly. Focus on the roots and let the product rinse through the ends.",
        });
    }

    // Step 4 — Protein treatment
    if (
        porosity === "High Porosity" ||
        allNeeds.includes("Breakage") ||
        allNeeds.includes("Damage Repair")
    ) {
        const proteinFrequency =
            porosity === "High Porosity"
                ? "Do this every other wash day (biweekly)."
                : porosity === "Medium Porosity"
                ? "Do this once a month."
                : null;

        if (porosity !== "Low Porosity") {
            steps.push({
                id: "protein",
                title: "Protein Treatment",
                description: `Apply a protein treatment to strengthen hair bonds. Leave on for the recommended time before rinsing.${proteinFrequency ? " " + proteinFrequency : ""}`,
            });
        }
    }

    // Step 5 — Deep condition
    if (
        allNeeds.includes("Dryness") ||
        allNeeds.includes("Moisture & Hydration") ||
        porosity === "High Porosity"
    ) {
        steps.push({
            id: "deepcondition",
            title: "Deep Condition",
            description:
                porosity === "Low Porosity"
                    ? "Apply deep conditioner and sit under a hooded dryer or use a heat cap for 20–30 mins to help moisture penetrate."
                    : "Apply deep conditioner generously, cover with a shower cap, and leave for 20–30 minutes.",
        });
    } else {
        steps.push({
            id: "condition",
            title: "Condition",
            description: "Apply conditioner from mid-shaft to ends. Detangle with a wide-tooth comb and rinse with cool water.",
        });
    }

    // Step 6 — Scalp treatment
    if (scalp === "Dry" || allNeeds.includes("Hair Growth")) {
        steps.push({
            id: "scalptreat",
            title: "Scalp Treatment",
            description: "Massage a nourishing scalp oil into your scalp to stimulate circulation and add moisture.",
        });
    }

    // Step 7 — Leave-in
    steps.push({
        id: "leavein",
        title: "Apply Leave-In Conditioner",
        description: "On soaking wet hair, apply your leave-in conditioner and rake through evenly from roots to ends.",
    });

    // Step 8 — Style
    steps.push({
        id: "style",
        title: "Style",
        description: "Apply your curl cream or gel while hair is still wet. Scrunch upward to encourage curl definition.",
    });

    // Step 9 — Dry
    steps.push({
        id: "dry",
        title: "Dry Your Curls",
        description: "Air dry or diffuse on low heat. Avoid touching curls until fully dry to prevent frizz.",
    });

    return steps;
}