const game = document.getElementById("game");
const ctx = game.getContext('2d');

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
let raquetteSpeed = 20;

function dessineRaquette(){
    ctx.fillStyle = "white";
    ctx.fillRect(raquetteX,raquetteY, raquetteWidth,raquetteHeight);
}

//Coordonnées Balle
let balleX = game.width / 2;
let balleY = game.height - 50;
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

function randomDeplacement(balleSpeed){
    const angle = (Math.random() * (150 - 30) + 30) * Math.PI / 180;
    return {
        x: balleSpeed * Math.cos(angle) * (Math.random() < 0.5 ? -1 : 1),
        y: -balleSpeed * Math.sin(angle)
    }
}

let balleXSpeed;
let balleYSpeed;
let rafID;
const result = document.getElementById('resultat');
let temps = 0;

function moveBalle(timestamp){
    balleX += balleXSpeed;
    balleY += balleYSpeed;

    //Collision Bordure Gauche/Droite
    if ( balleX + balleRadius > game.width || balleX - balleRadius < 0){
        balleXSpeed = -balleXSpeed;
    }

    //Collision Bordure Haute
    if ( balleY - balleRadius < 0 ){
        balleYSpeed = -balleYSpeed;
    }

    //Collision Raquette
    if ( balleX + balleRadius > raquetteX && balleY + balleRadius >= raquetteY && balleX - balleRadius < raquetteX + raquetteWidth && balleY - balleRadius <= raquetteY + raquetteHeight){
        balleYSpeed = -balleYSpeed;
        balleY = raquetteY - balleRadius;
    }

    //Condition partie perdue
    if ( balleY - balleRadius > game.height){
        cancelAnimationFrame(rafID);
        clearInterval(timerID);
        result.innerHTML = `<br>Vous avez perdu au bout de ${temps} secondes !<br>
        Vous pouvez faire mieux`
        return;
    }
    afficherJeu();

    rafID = requestAnimationFrame(moveBalle);
}

const newGameButton = document.getElementById('newGame');
const scoreDisplay = document.getElementById('score');
let timerID;
let nbGame = 0;

//Button newGame

function startTimer() {
    scoreDisplay.textContent = `Score : 0 s`;
    timerID = setInterval(() => {
        temps++;
        scoreDisplay.textContent = `Score : ${temps} s`;
    }, 1000);
}

newGameButton.addEventListener('click', () => {
    if ( nbGame === 0){
        const direction = randomDeplacement(3);
        balleXSpeed = direction.x;
        balleYSpeed = direction.y;
        startTimer();
        nbGame++;
        rafID = requestAnimationFrame(moveBalle);
    } else {
        cancelAnimationFrame(rafID);
        clearInterval(timerID);

        balleX = game.width / 2;
        balleY = game.height - 50;

        const direction = randomDeplacement(3);
        balleXSpeed = direction.x;
        balleYSpeed = direction.y;

        raquetteX = game.width/2 - 50;
        temps = 0;
        result.textContent = '';
        afficherJeu();

        startTimer();
        rafID = requestAnimationFrame(moveBalle);
    }
})



// Trucs a rajouter :
// - Bordure arrondis plateau + raquette
// - lissage déplacement ( + fluide )
//Fonctionnalités à faire :
// - commandes touch
// - vitesse balle augmente progressivement (max x5)
// - déplacement peut pas etre vertical ( 90° raquette)
// - stocker meilleur score
// +Bonus...