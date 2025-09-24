const game = document.getElementById("game");
const ctx = game.getContext('2d');

// ctx.beginPath();
// ctx.moveTo(raquetteX, raquetteY);
// ctx.lineTo(raquetteX + raquetteWidth, raquetteY);
// ctx.strokeStyle = 'white';
// ctx.lineWidth = 10;
// ctx.stroke();
// ctx.closePath();

function dessinePlateau(){
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.strokeRect(0,0,game.width,game.height);
}

//Coordonnées Raquette
const raquetteWidth = 100;
const raquetteHeight = 10;
const raquetteY = game.height - 25;
let raquetteX = game.width/2 - 50;
let raquetteSpeed = 10;

function dessineRaquette(){
    ctx.fillStyle = "white";
    ctx.fillRect(raquetteX,raquetteY, raquetteWidth,raquetteHeight);
}

//Coordonnées Balle
const balleX = game.width / 2;
const balleY = game.height - 50;
const balleRadius = 10;

function dessineBalle(){
    ctx.beginPath();
    ctx.arc(balleX, balleY, balleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}


function afficherJeu(){
    ctx.clearRect(0,0,game.width,game.height);
    dessineRaquette();
    dessinePlateau();
    dessineBalle()
}

afficherJeu();

document.addEventListener("keydown", (e) => {
    switch (e.key){
        case "ArrowLeft":
            if (raquetteX > 0){
                raquetteX -= raquetteSpeed;
            }
            break;

        case "ArrowRight":
            if (raquetteX + raquetteWidth < game.width){
                 raquetteX += raquetteSpeed;
            }
            break;

        default:
            break;
    }
    afficherJeu();
});


//Mouvement de la balle
// Pour gérer les déplacements dans le canvas
// request animation frame
// cancel animation frame
function moveBall(){

}

moveBall();




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



// Trucs a rajouter :
// - Bordure arrondis plateau + raquette
// - lissage déplacement ( + fluide )
// - fonctionnalités à faire 