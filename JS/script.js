const game = document.getElementById("game");
const ctx = game.getContext('2d');

//Plateau de jeu
// ctx.fillStyle = 'black';
// ctx.fillRect(0,0,game.width,game.height);
// ctx.strokeStyle = 'white';
// ctx.lineWidth = 5;
// ctx.strokeRect(0,0,game.width,game.height);

//Coordonnées Balle
const balleX = game.width / 2;
const balleY = game.height - 50;
const balleRadius = 10;

//Coordonnées Raquette
const raquetteWidth = 100;
const raquetteHeight = 10;
const raquetteY = game.height - 20;
let raquetteX = game.width/2 - 50;
let speed = 10;
// ctx.beginPath();
// ctx.moveTo(raquetteX, raquetteY);
// ctx.lineTo(raquetteX + raquetteWidth, raquetteY);
// ctx.strokeStyle = 'white';
// ctx.lineWidth = 10;
// ctx.stroke();
// ctx.closePath();

// Pour gérer les déplacements dans le canvas
// request animation frame
// cancel animation frame
const leftButton = document.getElementById('leftArrow');
const rightButton = document.getElementById('rightArrow');

function afficher(){
    ctx.clearRect(0,0,game.width,game.height);

    //Raquette
    ctx.fillStyle = "white";
    ctx.fillRect(raquetteX,raquetteY, raquetteWidth,raquetteHeight);

    //Plateau de jeu
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.strokeRect(0,0,game.width,game.height);

    //Balle
    ctx.beginPath();
    ctx.arc(balleX, balleY, balleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

afficher();

document.addEventListener("keydown", (e) => {
    switch (e.key){
        case "ArrowLeft":
            if (raquetteX > 0){
                raquetteX -= speed;
            }
            break;

        case "ArrowRight":
            if (raquetteX + raquetteWidth < game.width){
                 raquetteX += speed;
            }
            break;

        default:
            break;
    }
    afficher();
});


//Mouvement de la balle




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



