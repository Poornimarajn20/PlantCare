const diseases = [
    {
        name: "Early Blight",
        plant: "Tomato",
        symptoms: ["spots", "yellow"],
        icon: "🍅",
        description: "A common disease that causes dark spots and yellowing on leaves.",
        prevention: "Remove affected leaves, avoid wetting foliage, and maintain good airflow."
    },
    {
        name: "Late Blight",
        plant: "Potato",
        symptoms: ["spots", "wilting"],
        icon: "🥔",
        description: "A disease that may cause dark, water-soaked patches on leaves and stems.",
        prevention: "Use healthy planting material, improve airflow, and remove infected plant debris."
    },
    {
        name: "Bacterial Leaf Spot",
        plant: "Chilli",
        symptoms: ["spots", "yellow"],
        icon: "🌶️",
        description: "Can cause small dark spots on leaves, sometimes surrounded by yellow areas.",
        prevention: "Use healthy seeds, avoid overhead watering, and remove badly affected leaves."
    },
    {
        name: "Leaf Curl",
        plant: "Tomato",
        symptoms: ["curling", "yellow"],
        icon: "🍃",
        description: "Leaves may curl or turn yellow. Pests, viruses, heat, and watering problems can cause similar symptoms.",
        prevention: "Check for pests, keep watering consistent, and remove severely affected plants when advised by an expert."
    },
    {
        name: "Potato Leaf Yellowing",
        plant: "Potato",
        symptoms: ["yellow", "wilting"],
        icon: "🥔",
        description: "Yellowing and wilting can result from disease, pests, water stress, or nutrient problems.",
        prevention: "Check soil moisture, inspect plants regularly, and use healthy seed potatoes."
    },
    {
        name: "Chilli Leaf Curl",
        plant: "Chilli",
        symptoms: ["curling"],
        icon: "🌶️",
        description: "Curled chilli leaves may be linked to pests, viral diseases, or environmental stress.",
        prevention: "Inspect the undersides of leaves for pests and remove weeds around the plants."
    }
];

const plantSelect = document.getElementById("plant");
const symptomSelect = document.getElementById("symptom");
const checkButton = document.getElementById("checkButton");
const result = document.getElementById("result");
const diseaseList = document.getElementById("diseaseList");
const searchInput = document.getElementById("search");

// Display the disease information cards
function displayDiseases(items) {
    diseaseList.innerHTML = "";

    if (items.length === 0) {
        diseaseList.innerHTML =
            "<p>No matching information found. Try another search.</p>";
        return;
    }

    items.forEach(function(disease) {
        const card = document.createElement("article");
        card.className = "disease-card";

        const icon = document.createElement("div");
        icon.className = "disease-icon";
        icon.textContent = disease.icon;

        const plantName = document.createElement("span");
        plantName.className = "plant-name";
        plantName.textContent = disease.plant;

        const title = document.createElement("h3");
        title.textContent = disease.name;

        const description = document.createElement("p");
        description.textContent = disease.description;

        const preventionTitle = document.createElement("strong");
        preventionTitle.textContent = "Prevention";

        const prevention = document.createElement("p");
        prevention.textContent = disease.prevention;

        card.append(
            icon,
            plantName,
            title,
            description,
            preventionTitle,
            prevention
        );

        diseaseList.appendChild(card);
    });
}

// Check the selected plant and symptom
checkButton.addEventListener("click", function() {
    const plant = plantSelect.value;
    const symptom = symptomSelect.value;

    if (!plant || !symptom) {
        result.innerHTML =
            "<p>Please select both a plant and a symptom.</p>";
        return;
    }

    if (symptom === "healthy") {
        result.innerHTML = `
            <h3>🌱 Keep up the good care!</h3>
            <p>No visible symptoms were selected. Continue checking your plant regularly.</p>
            <p><strong>Tip:</strong> Provide suitable sunlight, water, and soil drainage.</p>
        `;
        return;
    }

    const matches = diseases.filter(function(disease) {
        return disease.plant === plant &&
               disease.symptoms.includes(symptom);
    });

    if (matches.length === 0) {
        result.innerHTML = `
            <h3>Plant Care Information</h3>
            <p>No matching example is available for this combination.</p>
            <p>Similar symptoms may have different causes. Check the plant carefully.</p>
        `;
        return;
    }

    result.innerHTML = `
        <h3>Possible Matches</h3>
        <p>These examples have symptoms that may match your selection:</p>
    `;

    matches.forEach(function(disease) {
        const item = document.createElement("div");
        item.style.marginTop = "15px";

        const title = document.createElement("h4");
        title.textContent = disease.icon + " " + disease.name;

        const description = document.createElement("p");
        description.textContent = disease.description;

        const prevention = document.createElement("p");
        prevention.textContent = "Care tip: " + disease.prevention;

        item.append(title, description, prevention);
        result.appendChild(item);
    });

    const note = document.createElement("p");
    note.style.marginTop = "15px";
    note.textContent =
        "Note: This is an educational symptom-matching demo, not a confirmed diagnosis.";
    result.appendChild(note);
});

// Search the disease information library
searchInput.addEventListener("input", function() {
    const query = searchInput.value.toLowerCase().trim();

    const filtered = diseases.filter(function(disease) {
        return disease.name.toLowerCase().includes(query) ||
               disease.plant.toLowerCase().includes(query) ||
               disease.description.toLowerCase().includes(query);
    });

    displayDiseases(filtered);
});

// Show all disease cards when the page opens
displayDiseases(diseases);