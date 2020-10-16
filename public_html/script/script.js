window.onload = () => {
    const textArea = document.querySelector('#village-input');
    textArea.oninput = (e) => {
        parseVillageInput(e.target.value);
    };
};

function parseVillageInput(input) {
    let village = {
        name: null,
        warehouse: {
            capacity: null,
            wood: null,
            clay: null,
            iron: null,
        },
        silo: {
            capacity: null,
            grain: null,
        },
        production: {
            wood: null,
            clay: null,
            iron: null,
            grain: null,
        },
    };

    const lines = input.split('\n');

    for (let i = 5; i < lines.length; i++) {
        const line = lines[i].replace('.', '');
        console.log(line.length + "  " + line);
    }

    console.log(village);
}