let canvas = document.getElementById('canvas-grid');
let ctx = canvas.getContext('2d');

const width = document.body.clientWidth;
const height = document.body.clientHeight;

canvas.width = width;
canvas.height = height;

let squareSize = 100;
let squares = [];


// Need to know the total amount of pixels available
let amountOfPixels = width * height;

// So I can calculate what the width and height of 1 square is
let amountOfSquares = amountOfPixels / (squareSize * squareSize);
console.log('amountOfSquares ', amountOfSquares)


// Need to calculate the amount of rows
let amountOfRows = height / squareSize;
console.log('amountOfRows ', amountOfRows)

function buildGrid() {
    for (let i = 0; i < amountOfSquares; i++) {
        squarePos = squareSize * i;

        for (let x = 0; x < amountOfRows; x++) {
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
    console.log(e)
    const mousePos = {
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop
    };

    let gridX = Math.floor(mousePos.x / squareSize);
    let gridY = Math.floor(mousePos.y / squareSize);

    console.log('gridX, ', gridX)
    console.log('gridY, ', gridY)

    let testX = gridY * squareSize; 
    let testY = gridX * squareSize;

    squares.filter(function (entry) {
        if (entry.xPos == testX && entry.yPos == testY) {
            // entry.color = `rgb(${random(255)}, ${random(255)}, ${random(255)}, ${opacity(0)})`;
            entry.color = `rgb(0,0,0, ${opacity(0)})`;

            updateCanvas(entry)
        } 
    })
})

function updateCanvas(square) {
    ctx.fillRect(square.yPos, square.xPos, square.xSize, square.ySize)
    ctx.fillStyle = square.color;
    // this is where you redraw the canvas with different color? 
}

function random(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

function opacity(opacity) {
    return opacity ? (parseFloat(opacity) + 0.01) : 0.02;
}
  