const game = document.getElementById("game");
const ctx = game.getContext('2d');

//Plateau de jeu
ctx.fillStyle = 'black';
ctx.fillRect(0,0,game.width,game.height);
ctx.strokeStyle = 'white';
ctx.lineWidth = 5;
ctx.strokeRect(0,0,game.width,game.height);

//Balle
const balleX = game.width / 2;
const balleY = game.height - 50;
const balleRadius = 10;
ctx.beginPath();
ctx.arc(balleX, balleY, balleRadius, 0, 2 * Math.PI);
ctx.fillStyle = 'white';
ctx.fill();
ctx.closePath();

//Raquette
const raquetteWidth = 100;
const raquetteY = balleY + 20;
const raquetteX = balleX - 50;
ctx.beginPath();
ctx.moveTo(raquetteX, raquetteY);
const raquette = ctx.lineTo(raquetteX + raquetteWidth, raquetteY);
ctx.strokeStyle = 'white';
ctx.lineWidth = 10;
ctx.stroke();
ctx.closePath();


const newGameButton = document.getElementById('newGame');
const scoreDisplay = document.getElementById('score');
let temps = 0;
let nbGame = 0;

//Button newGame
function timer(){
    scoreDisplay.innerHTML = `Score : ${temps} s`
    temps++;
}

newGameButton.addEventListener('click', () => {
    if ( nbGame === 0){
        setInterval(timer,1000);
        nbGame++;
    } else {
        temps = 0;
        nbGame++;
    }
})

// Pour gérer les déplacements dans le canvas
// request animation frame
// cancel animation frame
const leftButton = document.getElementById('leftArrow');
const rightButton = document.getElementById('rightArrow');

function raquetteMove(timestamp){
    leftButton.addEventListener('click', () => {
        raquetteX--;
        raquette.style.left = raquetteX + "px";
        requestAnimationFrame(raquetteMove)
    })
    rightButton.addEventListener('click', () => {
        raquetteX++;

        requestAnimationFrame(raquetteMove);
    })
}

