//Constants

//Variables

//Elements selected from the DOM
const DEFAULT_MODE = 'color';
const DEFAULT_COLOR = 'white';
const DEFAULT_SIZE = '16';

const grid = document.getElementById('grid-container');
let currentMode = DEFAULT_COLOR;
let mouseDown = false;

document.getElementById('grid-container').onmousedown = () => mouseDown = true;
document.getElementById('grid-container').onmouseup = () => mouseDown = false;

 
function changeColor(e) {

    console.log(e.type);
    console.log(mouseDown);
    if (e.type === 'mouseover' && !mouseDown) return;

    // if () {

    // }
    e.target.style.backgroundColor = 'green';
}


function createGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridPixel = document.createElement('div');
        gridPixel.classList.add("grid-pixel");
        gridPixel.addEventListener('mousedown', changeColor);
        gridPixel.addEventListener('mouseover', changeColor);
        grid.appendChild(gridPixel);
      }
}   

createGrid(20);