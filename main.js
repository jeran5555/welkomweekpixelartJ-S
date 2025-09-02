
// setting up canvas and constants
const rows = 60;
const columns = 25;
const cell_size = 20; // 20x20 grid

const c = document.querySelector('canvas');
const c_i = document.querySelector('#cell-index');
const ctx = c.getContext('2d');

var mouse = {x: undefined, y: undefined, isClicked: false};
var grid, swatch;

// const def_color_array = ["#35D461", "#F9E104", "#F99D07", "#882FF6", "#37B6F6"];
const def_color_array = [
    "#000000", // zwart
    "#FF0000", // rood
    "#FFC0CB", // roze
    "#35D461", // groen
    "#F9E104", // geel
    "#F99D07", // oranje
    "#882FF6", // paars
    "#37B6F6", // blauw
    "#8B4513", // bruin
    "#00FFFF", // cyaan
    "#FF00FF", // magenta
    "#808080"  // grijs
];

function getPointerPosition(event) {
    let rect = c.getBoundingClientRect();
    let x, y;

    if (event.touches && event.touches.length > 0) {
        // Touchscreen
        x = event.touches[0].clientX - rect.left - 20;
        y = event.touches[0].clientY - rect.top - 20;
    } else {
        // Muis
        x = event.clientX - rect.left - 20;
        y = event.clientY - rect.top - 20;
    }

    return { x, y };
}

// Mouse events
c.addEventListener("mousemove", (e) => {
    const pos = getPointerPosition(e);
    mouse.x = pos.x;
    mouse.y = pos.y;
});
c.addEventListener("mousedown", () => mouse.isClicked = true);
c.addEventListener("mouseup", () => mouse.isClicked = false);

// Touch events
c.addEventListener("touchstart", (e) => {
    e.preventDefault(); // voorkom scrollen tijdens tekenen
    mouse.isClicked = true;
    const pos = getPointerPosition(e);
    mouse.x = pos.x;
    mouse.y = pos.y;
});
c.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const pos = getPointerPosition(e);
    mouse.x = pos.x;
    mouse.y = pos.y;
});
c.addEventListener("touchend", () => {
    mouse.isClicked = false;
});
/// EINDE INPUT SECTION

// Initialization
function init() {
	grid = new Grid(rows, columns, cell_size);
	swatch = new Swatch(def_color_array);
	swatch.setSwatchView();

	// setup code here
    animate();
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
	ctx.clearRect(0, 0, rows*cell_size, columns*cell_size);
	grid.update(mouse, ctx)
}
init();


function displayCellIndex(x, y) {
	c_i.innerHTML = x + ", " + y;
}
const resetButton = document.getElementById("reset-button");

resetButton.addEventListener("click", () => {
    for (let x = 0; x < grid.row_count; x++) {
        for (let y = 0; y < grid.column_count; y++) {
            grid.cells[x][y].color = "#ffffff"; // reset kleur naar wit
        }
    }
});

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, rows*cell_size, columns*cell_size);
    grid.update(mouse, ctx)
}
window.addEventListener("load", () => {
    const resetButton = document.getElementById("reset-button");

    resetButton.addEventListener("click", () => {
        if (!grid) return;

        for (let x = 0; x < grid.row_count; x++) {
            for (let y = 0; y < grid.column_count; y++) {
                grid.cells[x][y].color = "#ffffff"; // zet alle cellen terug naar wit
            }
        }
    });
});
for (let i = 0; i < swatches.length; i++) {
    if (i === 0) {
        swatches[i].style.background = this.eraserColor; // gum
        swatches[i].addEventListener("click", () => {
            this.color = this.eraserColor;
        });
    } else if (this.colors[i - 1]) {
        swatches[i].style.background = this.colors[i - 1];
        swatches[i].addEventListener("click", () => {
            this.color = this.colors[i - 1];
        });
    }
}