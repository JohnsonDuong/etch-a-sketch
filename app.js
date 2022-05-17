//Constants

//Variables

//Elements selected from the DOM
const DEFAULT_MODE = 'color';
const DEFAULT_COLOR = 'black';
const DEFAULT_SIZE = '10';

//Variables
let currentMode = DEFAULT_MODE;
let currentColor = DEFAULT_COLOR;
let currentSize = DEFAULT_SIZE;

const grid = document.getElementById('grid-container');
const rainbowButton = document.getElementById('rainbow');
const eraserButton = document.getElementById('eraser');
const toggleGridButton = document.getElementById('grid-lines');
const clearButton = document.getElementById('clear');

eraserButton.onclick = () => setCurrentMode('eraser');
rainbowButton.onclick = () => setCurrentMode('rainbow');

let mouseDown = false;
document.getElementById('grid-container').onmousedown = () => mouseDown = true;
document.getElementById('grid-container').onmouseup = () => mouseDown = false;

function setCurrentMode (newMode) {
    currentMode = newMode;
}

//Draw on the canvas depending on the mode
function draw(e) {

    // console.log(e.type);
    // console.log(mouseDown);

    //Does not allow drawing unless mouse is down when over a pixel
    if (e.type === 'mouseover' && !mouseDown) return;

    //Set the brush to color mode
    if (currentMode == 'color') {
        e.target.style.backgroundColor = currentColor;
    }

    //Set the pen to the rainbow mode
    else if (currentMode == 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);

        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    }

    //Toggle the eraser
    else if (currentMode == 'eraser') {
        e.target.style.backgroundColor = 'white';
    }
}

//Create the grid
function createGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridPixel = document.createElement('div');
        gridPixel.classList.add("grid-pixel");
        gridPixel.addEventListener('mousedown', draw);
        gridPixel.addEventListener('mouseover', draw);
        grid.appendChild(gridPixel);
      }
}   

createGrid(currentSize);