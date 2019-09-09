let canvas = document.getElementById('canvas-grid');
let ctx = canvas.getContext('2d');

// square dimensions
let squareSize = 100;
let squares = [];

window.addEventListener("resize", setupCanvasGrid)

function setupCanvasGrid() {
    squares = [];

    // set canvas to browser size
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    canvas.width = width;
    canvas.height = height;

    let amountOfPixels = width * height;
    let amountOfSquares = amountOfPixels / (squareSize * squareSize);

    console.log(amountOfSquares)

    // Squares in row and columns
    let rows = height / squareSize;
    let columns = width / squareSize;

    let longestRowOrColumn = columns > rows ? columns : rows; 

    buildGrid(Math.floor(longestRowOrColumn));

}


/* 
    This function places squares on the correct position in the canvas element, using the previous calculated values.
    It then pushes all squares (with their properties) in the squares array, so I can use them later on for the mousemove function.
*/
function buildGrid(longest) {
    console.log('longest ', longest)
    for (let i = longest; i >= 0; i--) {
        for (let x = longest; x >= 0; x--) {
            squares.push({
                xPos: squareSize * i,
                yPos: squareSize * x,
                xSize: squareSize,
                ySize: squareSize,
                color: 'rgb(0,0,0,0)'
            })
        }
    }
}

canvas.addEventListener('mousemove', (e) => {
    // stores the current coordinates of the pointer 
    const mousePos = {
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop
    };

    // to calculate on which corresponding row and column the pointer is hovering.
    let column = Math.floor(mousePos.x / squareSize) * squareSize;
    let row = Math.floor(mousePos.y / squareSize) * squareSize;

    // compares mouse position with the coordinates of stored squares and changes opacity if there's a match.
    squares.filter(function (square) {
        if (square.xPos == row && square.yPos == column) {
            square.color = `rgb(0,0,0, ${opacity(0)})`;
            updateCanvas(square)
        } 
    })
})

// redraws the canvas with the updated values.
function updateCanvas(square) {
    ctx.fillRect(square.yPos, square.xPos, square.xSize, square.ySize)
    ctx.fillStyle = square.color;
}

// this returns an increased opacity value on mousehover.
function opacity(opacity) {
    return opacity ? (parseFloat(opacity) + 0.01) : 0.02;
}

document.addEventListener('keydown', (event) => {
    if (event.key == 'e') {
        console.log('switch to eraser')
    }
    if (event.key == 'p') {
        console.log('switch to paintbrush')
    }
})

/*
    - switch to eraser
        - Opacity should decrease instead of increase on mouseover.
        - the cursor should change to a `gum`.
        - The user can switch back to `painting` mode again.
        - The opacity should not be lower than 0. 
*/
  