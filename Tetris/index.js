const gridSpace = 30;

let fallingPiece;
let gridPieces = [];
let lineFades = [];
let gridWorkers = [];

let currentScore = 0;
let currentLevel = 1;
let linesCleared = 0;

let ticks = 0;
let updateEvery = 15;
let updateEveryCurrent = 15;
let fallSpeed = gridSpace * 0.5;
let pauseGame = false;
let gameOver = false;

const gameEdgeLeft = 150;
const gameEdgeRight = 450;

const colors = [
    '#dca3ff', '#ff90a0', '#80ffb4', '#ff7666', '#70b3f5', '#b2e77d', '#ffd700'
];

function setup() {
    createCanvas(600, 540);
    fallingPiece = new PlayPiece();
    fallingPiece.resetPiece();
    textFont('Ubuntu');
}

function draw() {
    const colorDark = '#0d0d0d';
    const colorLight = '#304550';
    const colorBackground = '#e1eeb0';

    background(colorBackground);
    fill(25);
    noStroke();
    rect(gameEdgeRight, 0, 150, height);
    rect(0, 0, gameEdgeLeft, height);

    fill(colorBackground);
    rect(450, 80, 150, 70);
    rect(460, 405, 130, 130, 5, 5);
    rect(460, 210, 130, 60, 5, 5);
    rect(460, 280, 130, 60, 5, 5);

    fill(colorLight);
    rect(450, 85, 150, 20);
    rect(450, 110, 150, 4);
    rect(450, 140, 150, 4);

    fill(colorBackground);
    rect(460, 60, 130, 35, 5, 5);
    strokeWeight(3);
    noFill();
    stroke(colorLight);
    rect(465, 65, 120, 25, 5, 5);
    rect(465, 410, 120, 120, 5, 5);
    rect(465, 215, 120, 50, 5, 5);
    rect(465, 285, 120, 50, 5, 5);

    fill(25);
    noStroke();
    textSize(24);
    textAlign(CENTER);
    text("Score", 525, 85);
    text("Level", 525, 238);
    text("Lines", 525, 308);

    textSize(24);
    textAlign(RIGHT);
    text(currentScore, 560, 135);
    text(currentLevel, 560, 260);
    text(linesCleared, 560, 330);

    stroke(colorDark);
    line(gameEdgeRight, 0, gameEdgeRight, height);
    fallingPiece.show();

    if (keyIsDown(DOWN_ARROW)) {
        updateEvery = 2;
    } else {
        updateEvery = updateEveryCurrent;
    }

    if (!pauseGame) {
        ticks++;
        if (ticks >= updateEvery) {
            ticks = 0;
            fallingPiece.fall(fallSpeed);
        }
    }

    for (let i = 0; i < gridPieces.length; i++) {
        gridPieces[i].show();
    }
    for (let i = 0; i < lineFades.length; i++) {
        lineFades[i].show();
    }
    if (gridWorkers.length > 0) {
        gridWorkers[0].work();
    }

    textAlign(CENTER);
    fill(255);
    noStroke();
    textSize(14);
    text("Controls:\n↑\n← ↓ →\n", 75, 155);
    text("Left and Right:\nmove side to side", 75, 230);
    text("Up:\nrotate", 75, 280);
    text("Down:\nfall faster", 75, 330);
    text("R:\nreset game", 75, 380);

    if (gameOver) {
        fill(colorDark);
        textSize(54);
        textAlign(CENTER);
        text("Game Over!", 300, 270);
    }

    strokeWeight(3);
    stroke('#304550');
    noFill();
    rect(0, 0, width, height);
}

function keyPressed() {
    if (keyCode === 82) {
        resetGame();
    }
    if (!pauseGame) {
        if (keyCode === LEFT_ARROW) {
            fallingPiece.input(LEFT_ARROW);
        } else if (keyCode === RIGHT_ARROW) {
            fallingPiece.input(RIGHT_ARROW);
        }
        if (keyCode === UP_ARROW) {
            fallingPiece.input(UP_ARROW);
        }
    }
}
