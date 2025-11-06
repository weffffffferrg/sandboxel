// Volcano element for Sandboxels
elements.volcano = {
    color: "#7b3f00",
    behavior: [
        "XX|CR:ash,smoke,fire%1|XX",
        "CR:lava%7|XX|CR:lava%7",
        "M2|M1|M2",
    ],
    reactions: {
        "water": { "elem1": "steam", "chance": 0.25 },
        "snow": { "elem1": "water", "chance": 0.50 }
    },
    category: "land",
    state: "solid",
    hardness: 1,
    temp: 1200,
    density: 2500,
    conduct: 0.6,
    desc: "A volcano—occasionally erupts, ejecting lava, ash, smoke, and fire.",
    tick: function(pixel) {
        if (Math.random() < 0.01) { // 1% chance every tick to erupt
            erupt(pixel);
        }
    }
}

function erupt(pixel) {
    // Eject lava upwards
    for (let dy = -1; dy >= -5; dy--) {
        let px = pixel.x, py = pixel.y + dy;
        if (isEmpty(px, py)) {
            createPixel("lava", px, py);
        }
    }
    // Eject ash and smoke sideways
    for (let dx = -2; dx <= 2; dx++) {
        let px = pixel.x + dx, py = pixel.y - 2;
        if (isEmpty(px, py)) {
            createPixel("ash", px, py);
            if (Math.random() < 0.6) createPixel("smoke", px, py-1);
        }
    }
    // Produce fire at the top
    if (Math.random() < 0.3 && isEmpty(pixel.x, pixel.y-2)) {
        createPixel("fire", pixel.x, pixel.y-2);
    }
}
