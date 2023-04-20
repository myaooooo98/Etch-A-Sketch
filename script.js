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


// obtain the color 
const colorChosen = document.querySelector('#color');
let currentColor = colorChosen.value;

colorChosen.addEventListener('change', (e) => {
    currentColor = e.target.value;
});


// if rainbow mood is chosen
const rainbow = document.querySelector('.rainbow');
let isRainbow = false;
let hue= 0;

rainbow.addEventListener('click', () => {
    isRainbow = !isRainbow;
    if (isRainbow) {
        rainbow.classList.add('active');
    } else {
        rainbow.classList.remove('active');
    }
});

function getRainbowColor(hue) {
    return `hsl(${hue}, 100%, 50%)`;
}

// when the grid is click, add color to it
function draw() {
    const grids = document.querySelectorAll('.grid');
    let isDrawing = false;

    grids.forEach(grid => {
        // when mousedown, start to color the grid
        grid.addEventListener('mousedown', (e) => {
            isDrawing = true;
            if (isRainbow) {
                e.target.style.backgroundColor = getRainbowColor(hue);
            } else {
                e.target.style.backgroundColor = currentColor;
            }
        });
    
        // stop to color when mouse up
        grid.addEventListener('mouseup', () => isDrawing = false);
    
        // change the color of grid when mouse hover to the div and mousedown
        grid.addEventListener('mousemove', (e) => {
            if (isDrawing) {
                if (isRainbow) {
                    e.target.style.backgroundColor = getRainbowColor(hue);
                    hue = (hue + 10) % 360;
                } else {
                    e.target.style.backgroundColor = currentColor;
                }
            }
        });
    });
}

// active border of the grid
const border = document.querySelector('.grid-border');
let isBorder = false;

border.addEventListener('click', () => {
    isBorder = !isBorder;
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => {
        if (isBorder) {
            grid.classList.add('border');
        } else {
            grid.classList.remove('border');
        }
    })
});
