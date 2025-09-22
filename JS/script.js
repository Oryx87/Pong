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
ctx.lineTo(raquetteX + raquetteWidth, raquetteY);
ctx.strokeStyle = 'white';
ctx.lineWidth = 10;
ctx.stroke();
ctx.closePath();