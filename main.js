let canvas = document.getElementById('canvas-grid');
let ctx = canvas.getContext('2d');

// dimensions for one square: 100x100
let squareSize = 100;

let x = 0;

// holds all the squares
let squares = [];

window.addEventListener("resize", setupCanvasGrid)

function setupCanvasGrid() {
    //reset squareholder on resize
    squares = [];

    // retreive browser space and apply to the canvas
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    canvas.width = width;
    canvas.height = height;

    // total pixels available
    let amountOfPixels = width * height;

    // calculating the amount of squares for the available space.
    let amountOfSquares = amountOfPixels / (squareSize * squareSize);
    console.log('amountOfSquares ', amountOfSquares)

    // How many squares fit in 1 row and 1 column, since width and height are often not the same value.
    let amountOfRows = height / squareSize;
    console.log('amountOfRows ', amountOfRows)

    let amountOfColumns = width / squareSize;
    console.log('amountOfColumns ', amountOfColumns)

    let longest = amountOfColumns > amountOfRows ? amountOfColumns : amountOfRows;

    let difference = (longest - amountOfRows > 1) ? longest - amountOfRows : 0; 

    let squaresPerRow = Math.floor(amountOfSquares / (longest - difference));

    buildGrid(Math.floor(longest + difference), squaresPerRow, amountOfRows)

}

/* 
    This function places squares on the correct position in the canvas element, using the previous calculated values.
    It then pushes all squares (with their properties) in the squares array, so I can use them later on for the mousemove function.
*/
function buildGrid(longest, squaresPerRow, amountOfRows) {
    console.log(longest)
    for (let i = longest; i >= 0; i--) {
        for (let x = squaresPerRow; x >= 0; x--) {
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

    // console.log('row: ', row + ' column: ', column)

    // compares mouse position with the coordinates of stored squares and changes opacity if there's a match.
    squares.filter(function (square) {
        // console.log(square.xPos)
        if (square.xPos == row && square.yPos == column) {
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
    - adjust square size. (it resets the drawing)
    - screenshot -> save current drawing.
    - switch to eraser.
    - switch to different colours (on hover).
    - decrease or increase opacity strength.
    - it should also work on touch events. 
    - Should there be a prompt when the browser wants to reset?
    - Why is the first square black?
*/
  