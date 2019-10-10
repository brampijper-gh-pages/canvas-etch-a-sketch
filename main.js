let canvas = document.getElementById('canvas-grid');
let ctx = canvas.getContext('2d');
let cursorStyle = document.body.style.cursor;
// square dimensions
let squareSize = 100;
let squares = [];

let painting = true;

window.addEventListener("resize", setupCanvasGrid)

function setupCanvasGrid() {
    squares = [];

    // set canvas to browser size
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    canvas.width = width;
    canvas.height = height;

    // const amountOfPixels = width * height;
    // const amountOfSquares = amountOfPixels / (squareSize * squareSize);

    const squaresInRow = Math.floor(height / squareSize);
    const squaresInColumn = Math.floor(width / squareSize);

    buildGrid(squaresInRow, squaresInColumn)
}

function buildGrid(squaresInrows, squaresIncolumns) {
    for (let i = squaresInrows; i >= 0; i--) {
        for (let x = squaresIncolumns; x >= 0; x--) {
            squares.push({
                xPos: squareSize * i,
                yPos: squareSize * x,
                xSize: squareSize,
                ySize: squareSize,
                color: 'rgb(0,0,0,0)',
                opacity: 0
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
    const column = Math.floor(mousePos.x / squareSize) * squareSize;
    const row = Math.floor(mousePos.y / squareSize) * squareSize;

    // compares mouse position with the coordinates of stored squares and changes opacity if there's a match.
    squares.filter(function (square) {
        if (square.xPos == row && square.yPos == column) {
            square.color = `rgb(0,0,0, ${opacity(square)})`;
            updateCanvas(square)
        } 
    })
})

// redraws the canvas with the updated values.
function updateCanvas(square) {
    ctx.clearRect(square.yPos, square.xPos, square.xSize, square.ySize);
    ctx.fillStyle = square.color;
    ctx.fillRect(square.yPos, square.xPos, square.xSize, square.ySize)
}

function opacity(square) {
    if (painting && square.opacity <= 1) {
        square.opacity += 0.01;
    } 
    else if (square.opacity >= 0) {
        square.opacity -= 0.01
    }
    return square.opacity;

}

document.addEventListener('keydown', (event) => {
    if (event.key == 'e') {
        painting = false;
        cursorStyle = "url('http://wiki-devel.sugarlabs.org/images/e/e2/Arrow.cur'), auto"
        console.log('switch to eraser')
    }
    if (event.key == 'p') {
        painting = true
        console.log('switch to paintbrush')
    }
})