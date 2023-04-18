const container = document.querySelector('.container');

// !!!! INCOMPLETE !!!!
// obtain the grid size
// const gridRange = document.getElementById('gridSize');
// let gridChange = false;
let gridSize = 16;

// function changeGridSize() {
    
// }

// gridRange.addEventListener('input', (e) => {
//     gridChange = true;
// });


// create the grid
function createGrid(gridSize){
    for (let i = 0; container.childElementCount < gridSize * gridSize; i++){
        // create the div for grid
        let grid = document.createElement('div');
        grid.classList.add('grid');

        // set the height and width
        grid.style.width = `${container.clientWidth / gridSize}px`;  // clientWidth = size of content, offsetWidth = size of content + border
        grid.style.height = `${container.clientHeight / gridSize}px`;

        // insert to the div container
        container.appendChild(grid);
    }
}

createGrid(gridSize);

// when the grid is click, add color to it
const grids = document.querySelectorAll('.grid');
let isDrawing = false;

grids.forEach(grid => {
    // when mousedown, start to color the grid
    grid.addEventListener('mousedown', (e) => {
        isDrawing = true;
        e.target.classList.add('colored');
    });

    // stop to color when mouse up
    grid.addEventListener('mouseup', () => isDrawing = false);

    // change the color of grid when mouse hover to the div and mousedown
    grid.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            e.target.classList.add('colored');
        }
    });
});
