//Constants

//Variables

//Elements selected from the DOM
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = '16';

//DOM elements
const grid = document.getElementById('grid-container');
const colorButton = document.getElementById('color-button');
const rainbowButton = document.getElementById('rainbow-button');
const eraserButton = document.getElementById('eraser-button');
const toggleGridButton = document.getElementById('grid-button');
const clearButton = document.getElementById('clear-button');
const bgColorPicker = document.getElementById('background-color-picker');
const slider = document.getElementById('slider');

//Variables
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let gridLineMode = false;

//Event listeners
bgColorPicker.oninput = () => grid.style.backgroundColor = bgColorPicker.value;
colorButton.onclick = () => setCurrentMode('color');
rainbowButton.onclick = () => setCurrentMode('rainbow');
eraserButton.onclick = () => setCurrentMode('eraser');
toggleGridButton.onclick = () => toggleGrid();
slider.oninput = () => createGrid(slider.value);
clearButton.onclick = () => clearCanvas();

let mouseDown = false;
document.getElementById('grid-container').onmousedown = () => mouseDown = true;
document.getElementById('grid-container').onmouseup = () => mouseDown = false;

//Clear the canvas
function clearCanvas() {
    for (const pixel of pixelList) {
        pixel.classList.remove('filled-pixel');
        pixel.style.background = 'none';
    }
}

//Toggle the grid lines
function toggleGrid () {
    
    gridLineMode = !gridLineMode;

    //Show the grid lines
    if (gridLineMode == true){
        pixelList.forEach((pixel) => pixel.classList.add('grid-lines'));
        toggleGridButton.classList.add('active-button');
    }

    //Hide the grid lines
    else if (gridLineMode == false){
        pixelList.forEach((pixel) => pixel.classList.remove('grid-lines'));
        toggleGridButton.classList.remove('active-button');
    }
}

//Set the current mode
function setCurrentMode (newMode) {
    currentMode = newMode;

    if (currentMode == 'color') {
        colorButton.classList.add('active-button');
        rainbowButton.classList.remove('active-button');
        eraserButton.classList.remove('active-button');
    }

    else if (currentMode == 'rainbow') {
        colorButton.classList.remove('active-button');
        rainbowButton.classList.add('active-button');
        eraserButton.classList.remove('active-button');
    }

    else if (currentMode == 'eraser') {
        colorButton.classList.remove('active-button');
        rainbowButton.classList.remove('active-button');
        eraserButton.classList.add('active-button');
    }
}

//Draw on the canvas depending on the mode
function draw(e) {

    const pixel = e.target;

    //Does not allow drawing unless mouse is down when over a pixel
    if (e.type === 'mouseover' && !mouseDown) return;

    //Set the brush to color mode
    if (currentMode == 'color') {
        let currentColor = document.getElementById('pen-color-picker').value;
        pixel.style.backgroundColor = currentColor;
        pixel.classList.add('filled-pixel');
    }

    //Set the pen to the rainbow mode
    else if (currentMode == 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);

        pixel.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
        pixel.classList.add('filled-pixel');
    }

    //Toggle the eraser
    else if (currentMode == 'eraser') {
        pixel.style.background = 'none';
        pixel.classList.remove('filled-pixel');
    }
}

//Create the grid
function createGrid(size) {

    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    document.getElementById('grid-size').textContent = `Grid Size: ${size} x ${size}`;

    //Remove any existing grid pixels
    while (grid.hasChildNodes()) {
        grid.removeChild(grid.firstChild);
    }

    for (let i = 0; i < size * size; i++) {
        const gridPixel = document.createElement('div');
        
        if (gridLineMode) {
            gridPixel.classList.add("grid-lines");
        }
        
        gridPixel.addEventListener('mousedown', draw);
        gridPixel.addEventListener('mouseover', draw);
        grid.appendChild(gridPixel);
    }

}   

createGrid(currentSize);

let pixelList = grid.childNodes;