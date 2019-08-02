let canvas = document.getElementById('canvas-grid');
let ctx = canvas.getContext('2d');

// retreive browser space and apply to the canvas
const width = document.body.clientWidth;
const height = document.body.clientHeight;
canvas.width = width;
canvas.height = height;

// dimensions for one square: 100x100
let squareSize = 100;

// holds all the squares
let squares = [];

// total pixels available
let amountOfPixels = width * height;

// calculating the amount of squares for the available space.
let amountOfSquares = amountOfPixels / (squareSize * squareSize);
// console.log('amountOfSquares ', amountOfSquares)

// How many squares fit in 1 row and 1 column, since width and height are often not the same value.
let amountOfRows = height / squareSize;
console.log('amountOfRows ', amountOfRows)

let amountOfColumns = width / squareSize;
console.log('amountOfColumns ', amountOfColumns)

// since there is a difference between rows and height it's important to know the longest one to fill the whole screen. 
function columnsLongerThanRows() {
    amountOfColumns > amountOfRows ? buildGrid(amountOfColumns) : buildGrid(amountOfRows);
}


/* 
    This function places squares on the correct position in the canvas element, using the previous calculated values.
    It then pushes all squares (with their properties) in the squares array, so I can use them later on for the mousemove function.
*/
function buildGrid(longest) {
    for (let i = 0; i < amountOfSquares; i++) {
        squarePos = squareSize * i;

        for (let x = 0; x < longest; x++) {
            ctx.fillRect(squareSize * i , x * squareSize, squareSize, squareSize)
            ctx.fillStyle = 'rgba(0,0,0,0)'
            squares.push({
                xPos: squareSize * i,
                yPos: x * squareSize,
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
    let row = Math.floor(mousePos.x / squareSize) * squareSize;
    let column = Math.floor(mousePos.y / squareSize) * squareSize;

    // compares mouse position with the coordinates of stored squares and changes opacity if there's a match.
    squares.filter(function (square) {
        if (square.xPos == column && square.yPos == row) {
            // entry.color = `rgb(${random(255)}, ${random(255)}, ${random(255)}, ${opacity(0)})`;
            square.color = `rgb(0,0,0, ${opacity(0)})`;
            updateCanvas(square)
        } 
    })
})

// redraws the canvas with the update values.
function updateCanvas(square) {
    ctx.fillRect(square.yPos, square.xPos, square.xSize, square.ySize)
    ctx.fillStyle = square.color;
}

// this returns an increased opacity value on mousehover.
function opacity(opacity) {
    return opacity ? (parseFloat(opacity) + 0.01) : 0.02;
}

// function random(max) {
//     return Math.floor(Math.random() * Math.floor(max))
// }



/*
    - implement toolbar.
    - adjust square size (without losing current drawing).
    - screenshot -> save current drawing.
    - switch to eraser.
    - switch to different colours (on hover).
    - decrease or increase opacity strength.
    - it should also work on touch events. 
    - redraw canvas on browser resize.
*/
  