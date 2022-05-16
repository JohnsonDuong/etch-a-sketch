//Constants

//Variables

//Elements selected from the DOM
const grid = document.getElementById('grid-container');

function changeColor(e) {
    e.target.style.backgroundColor = 'green';
}


function createGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridPixel = document.createElement('div');
        gridPixel.classList.add("grid-pixel");
        gridPixel.addEventListener('mouseover', changeColor);
        gridPixel.addEventListener('mousedown', changeColor);
        grid.appendChild(gridPixel);
      }
}

createGrid(20);