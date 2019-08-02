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
    // console.log(e)
    const mousePos = {
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop
    };

    let gridX = Math.floor(mousePos.x / squareSize);
    let gridY = Math.floor(mousePos.y / squareSize);

    // console.log('gridX, ', gridX)
    // console.log('gridY, ', gridY)

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
  