const gridContainer = document.querySelector('.grid-container');
const gridRange = document.getElementById('gridSize');
const colorMode = document.querySelector('#color');
const defaultMode = document.querySelector('button.default');
const rainbowMode = document.querySelector('button.rainbow');
const border = document.querySelector('.grid-border');
const clear = document.querySelector('.clear');
const eraserMode = document.querySelector('button.eraser');
const modeBtn = document.querySelectorAll('[data-mode]');
const resourcesModal = document.querySelector("#resourcesModal");
const triggerBtn = document.querySelector(".trigger");
const closeBtn = document.querySelector("#close");

const MODES = {
    DEFAULT: defaultMode.dataset.mode,
    COLOR: colorMode.dataset.mode,
    RAINBOW: rainbowMode.dataset.mode,
    ERASER: eraserMode.dataset.mode
};

let currentMode = MODES.DEFAULT;
let currentColor = colorMode.value;
let isDrawing = false;
let isBorder = false;
let hue= 0;

// create the grid
function createGrid(e){
    gridContainer.innerHTML = '';

    const gridSize = e.value;
    const gridWidth = `${gridContainer.clientWidth / gridSize}px`;   // clientWidth = size of content, offsetWidth = size of content + border
    const gridHeight = `${gridContainer.clientHeight / gridSize}px`;

    for (let i = 0; gridContainer.childElementCount < gridSize * gridSize; i++){
        // create the div for grid
        const grid = document.createElement('div');
        grid.classList.add('grid');

        // set the height and width
        grid.style.width = gridWidth; 
        grid.style.height = gridHeight;

        // insert to the div gridContainer
        gridContainer.appendChild(grid);
    }

    // drawing when mousedown and mousemove using event delegation
    gridContainer.addEventListener('mousedown', handleMouseDown);
    gridContainer.addEventListener('mouseup', handleMouseUp);
    gridContainer.addEventListener('mousemove', handleMouseMove);
}

function handleMouseDown(e) {
    if (!e.target.matches('.grid')) return;

    // always be true when the mousedown
    isDrawing = true;
    draw(e.target);
}

function handleMouseUp() {
    isDrawing = false;
}

function handleMouseMove(e) {
    if (!e.target.matches('.grid')) return;
    
    // only draw when the mousedown
    if (isDrawing) {
        draw(e.target);
    }
}

// get the hue for rainbowMode to create different color
function getRainbowColor(hue) {
    return `hsl(${hue}, 100%, 50%)`;
}

// when the grid is click, add color to it based on the mode
function draw(grid) {
    if (currentMode === MODES.DEFAULT) {
        grid.style.backgroundColor = defaultMode.value;
    } 
    else if (currentMode === MODES.RAINBOW) {
        grid.style.backgroundColor = getRainbowColor(hue);
        // keep update the hue so that it will create a rainbow color effect
        hue = (hue + 5) % 360;
    }
    else if (currentMode === MODES.COLOR) {
        grid.style.backgroundColor = currentColor;
    }
    
    // remove the color when eraser mode is on
    if (currentMode === MODES.ERASER) {
        grid.style.backgroundColor = '';
    }
}

// update the browser to show which grid size they choose
function updateLabel(e) {
    const gridLabel = document.querySelector('label[for="grid-size"]');
    gridLabel.innerHTML = `${e.value} x ${e.value}`;
}

// show the button where the mode is triggered
function handleClick(e) {
    const clickedBtn = e.target.closest('[data-mode]');
    if (!clickedBtn) return;

    modeBtn.forEach(button => {
        if (button !== clickedBtn) {
            button.classList.remove('active');
        }
    });

    // add to the clicked button
    clickedBtn.classList.add('active');
}

// for resources modal
function toggleModal() {
    resourcesModal.classList.toggle("showModal");
}

function windowOnClick(event) {
    if (event.target === resourcesModal) {
        toggleModal();
    }
}

// reload the browser
function refresh() {
    window.location.reload();
}

// set the initial grid size to 16 x 16
createGrid(gridRange);
updateLabel(gridRange);

gridRange.addEventListener('mousemove', (e) => {
    updateLabel(e.target);
});

// if the grid size is changing to value other than 16 x 16
gridRange.addEventListener('change', (e) => {
    updateLabel(e.target);
    createGrid(e.target);
});

// when other color is choosen
colorMode.addEventListener('change', (e) => {
    currentMode = MODES.COLOR;
    currentColor = e.target.value;
});

// the default color 
defaultMode.addEventListener('click', (e) => {
    currentMode = MODES.DEFAULT;
    currentColor = defaultMode.value;
});

// rainbow mode
rainbowMode.addEventListener('click', (e) => {
    currentMode = MODES.RAINBOW;
});

// when border are toggled
border.addEventListener('click', (e) => {
    isBorder = !isBorder;
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => {
        // add 'border' to the grid when isBorder is true
        grid.classList.toggle('border', isBorder);
    });
    border.classList.toggle('active', isBorder);
});

// remove color for all the grid
clear.addEventListener('click', () => {
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => {
        grid.style.backgroundColor = '';
    });
});

// when eraser button is clicked, eraser mode triggered
eraserMode.addEventListener('click', (e) => {
    currentMode = MODES.ERASER;
});

modeBtn.forEach(button => {
    button.addEventListener('click', handleClick);
});

// for resources modal
triggerBtn.addEventListener("click", toggleModal);
closeBtn.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
