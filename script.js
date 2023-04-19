const container = document.querySelector('.container');

// obtain the grid size
const gridRange = document.getElementById('gridSize');

// update the browser to show which grid size they choose
function updateLabel(e) {
    const gridLabel = document.querySelector('label[for="grid-size"]');
    gridLabel.innerHTML = `${e.value} x ${e.value}`;
}

// set the initial grid size to 16 x 16
createGrid(gridRange);
updateLabel(gridRange);

gridRange.addEventListener('mousemove', (e) => {
    updateLabel(e.target);
});

gridRange.addEventListener('change', (e) => {
    updateLabel(e.target);
    createGrid(e.target);
});

// create the grid
function createGrid(e){
    container.innerHTML = '';
    for (let i = 0; container.childElementCount < e.value * e.value; i++){
        // create the div for grid
        let grid = document.createElement('div');
        grid.classList.add('grid');

        // set the height and width
        grid.style.width = `${container.clientWidth / e.value}px`;  // clientWidth = size of content, offsetWidth = size of content + border
        grid.style.height = `${container.clientHeight / e.value}px`;

        // insert to the div container
        container.appendChild(grid);
    }

    // call the draw function
    draw();
}


// when the grid is click, add color to it
function draw() {
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
}


// obtain the color (incomplete)
// const colorChosen = document.querySelector('#color');
// const coloredGrids = document.querySelectorAll('.colored');

// colorChosen.addEventListener('change', (e) => {
//     coloredGrids.forEach(colored => {
//         colored.style.backgroundColor = e.target.value;
//     });
// });