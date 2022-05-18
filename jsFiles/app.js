var context;
var board;
var number_of_cols = 26;
var number_of_rows = 18;
var cell_width = document.getElementById("canvas").width/number_of_cols;
var cell_height =document.getElementById("canvas").height/number_of_rows;

var score;
var start_time;
var time_elapsed;
var interval;
var life = 5;

var num_of_basic_food;
var num_of_special_food; 
var num_of_gourmet_food ;

var BOARD_NUMBER_BASIC = 1;
var BOARD_NUMBER_SPECIAL = 5;
var BOARD_NUMBER_GOURMET = 6;

var positionX;
var positionY;

var slowMotionTimmer = 0;
var activateSlowMotion = false

var shape = new Object();
var candyShape = new Object();
var extraTimeShape = new Object();
var slowMotionShape = new Object();
var extraLifeShape = new Object();
// goust params
var ghostShape1 = new Object();
var ghostShape2 = new Object();
var ghostShape3 = new Object();
var ghostShape4 = new Object();
//----------------------------

var pac_img = new Image(10,10);
var g1_img = new Image(10,10);
var g2_img = new Image(10,10);
var g3_img = new Image(10,10);
var g4_img = new Image(10,10);
var candy_img = new Image(10,10);
var extraTime_img = new Image(10,10);
var slowMotion_img = new Image(10,10);
var extraLife_img = new Image(10,10);
var wall_img = new Image(10,10);

var gameAudio;
var gameOverAudio;
				

$(document).ready(function() {
	context = canvas.getContext("2d");
	gameAudio = new Audio('songs/Pacman_theme_song.mp3');
	gameOverAudio = new Audio('songs/Game_over.mp4');
});

function Start() {
	pac_img.src = "./images/pacR.png";
	wall_img.src = "./images/blue_wall.png";
	candy_img.src = "./images/candy.png";
	extraTime_img.src = "./images/extra_time.png";
	slowMotion_img.src = "./images/slow_motion.jpg"
	extraLife_img.src = "./images/extraLife.png"
	g1_img.src = "./images/g1.png";
	g2_img.src = "./images/g2.jpg";
	g3_img.src = "./images/g3.jpg";
	g4_img.src = "./images/g4.png";
	
	// board = [
	// 	[4,4,4,4,4,4,0,0,0,4,4,4,4,4,4,4,4,4,0,4,4,4,4,4,4,4,0,4],
	// 	[0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,4],
	// 	[0,0,4,0,4,4,0,4,4,4,4,4,0,4,4,0,4,4,4,4,4,0,4,4,4,4,0,4],
	// 	[0,0,4,0,0,4,0,0,0,4,0,0,0,4,4,0,4,4,4,4,4,0,4,4,4,4,0,4],
	// 	[4,0,4,4,4,4,0,4,4,4,4,4,0,4,4,0,4,4,4,4,4,0,4,4,4,4,0,4],
	// 	[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4],
	// 	[4,0,4,4,4,4,0,4,4,0,4,4,4,4,4,4,4,4,0,4,4,0,4,4,4,4,0,4],
	// 	[4,0,4,4,4,4,0,4,4,0,4,4,4,4,4,4,4,4,0,4,4,0,4,4,4,4,0,4],
	// 	[0,0,0,0,0,0,0,4,4,0,0,0,0,4,4,0,0,0,0,4,4,0,0,0,0,0,0,4],
	// 	[4,0,4,0,0,4,0,4,4,4,4,4,0,4,4,0,4,4,4,4,4,0,4,4,4,4,4,4],
	// 	[4,0,4,0,0,4,0,4,4,4,4,4,0,4,4,0,4,4,4,4,4,0,0,0,0,0,0,4],
	// 	[0,0,4,4,0,4,0,4,4,0,0,0,0,0,0,0,0,0,0,4,4,0,4,0,4,4,0,4],
	// 	[4,0,0,0,0,4,0,4,4,0,4,4,4,0,0,4,4,4,0,4,4,0,4,0,0,4,0,0],
	// 	[4,4,4,4,4,4,0,4,4,0,4,0,0,0,0,0,0,4,0,4,4,0,4,4,4,4,4,0],
	// 	[0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,4,0,4,0,0,0,0,0,0,0,0,0,4],
	// 	[0,0,4,0,4,4,0,4,4,0,4,0,0,0,0,4,0,4,0,4,4,0,4,4,4,4,0,4],
	// 	[4,4,4,4,4,4,0,4,4,0,4,4,4,4,4,4,4,4,0,4,4,0,4,4,4,4,0,4]	
	// 	]
	board = [
		[0,0,0,0,4,4,4,4,0,4,4,0,4,4,0,0,0,0],
		[4,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,4,0],
		[4,0,4,4,4,0,4,4,0,4,4,4,0,4,0,4,4,0],
		[4,0,0,0,4,0,4,4,0,0,0,4,0,4,0,0,4,0],
		[4,0,4,0,4,0,4,4,0,4,4,4,4,4,0,4,4,0],
		[4,0,4,4,4,0,4,4,0,4,4,4,4,4,0,4,4,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,4,0,4,0,4,4,4,4,4,4,4,4,0,4,4,4],
		[0,0,4,0,4,0,4,4,4,4,4,4,4,4,0,4,4,4],
		[4,0,4,4,4,0,0,0,0,4,4,0,0,0,0,0,0,0],
		[4,0,4,0,4,0,4,4,0,4,4,0,4,4,4,4,4,0],
		[4,0,4,0,4,0,4,4,0,4,4,0,4,0,4,0,4,0],
		[4,0,0,0,0,0,4,4,0,0,0,0,4,0,4,0,4,0],
		[4,4,4,4,4,0,4,4,4,4,4,0,0,0,4,0,4,0],
		[4,4,4,4,4,0,4,4,4,4,4,0,0,0,0,0,0,0],
		[4,0,0,0,0,0,4,4,0,0,0,0,4,0,4,4,4,0],
		[4,0,4,4,4,0,4,4,0,4,4,0,4,0,0,0,4,0],
		[4,0,4,4,4,0,4,4,0,4,4,0,4,4,4,4,4,4],
		[0,0,4,4,4,0,0,0,0,4,4,0,0,0,0,0,0,4],
		[4,0,4,4,4,0,4,4,4,4,4,4,4,4,0,4,0,4],
		[4,0,4,4,4,0,4,4,4,4,4,4,4,4,0,4,4,4],
		[4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[4,0,4,4,4,0,4,4,0,4,0,4,4,4,0,4,4,0],
		[4,0,4,4,4,0,4,4,0,4,0,0,0,4,0,4,0,0],
		[4,0,4,4,4,0,4,4,0,4,0,4,0,4,0,4,4,0],
		[0,0,4,4,0,0,4,4,0,4,0,4,4,4,0,0,0,0]
		// [4,0,4,4,0,0,4,4,0,4,0,4,4,4,4,4,4,4]
	];
	
	score = 0;
	var cnt = 200;
	var food_remain = number_of_food;
	// var pacman_remain = 1;
	start_time = new Date();
	num_of_basic_food = Math.floor(0.6*number_of_food);
	num_of_special_food = Math.floor(0.3*number_of_food);
	num_of_gourmet_food = number_of_food - num_of_basic_food - num_of_special_food;
	var basic_remain = num_of_basic_food;
	var special_remain = num_of_special_food;
	var gourmet_remain = num_of_gourmet_food;
	var b = false;
	while (food_remain > 0) {
		b = false;
		var emptyCell = findRandomEmptyCell(board);
		var x = emptyCell[0];
		var y = emptyCell[1];
		while(!b && (basic_remain >0 || special_remain >0 || gourmet_remain >0)){
			switch (Math.floor(Math.random() * 3) + 1) {
				case 1:
					if(basic_remain<=0)continue;
					basic_remain--;
					board[x][y] = BOARD_NUMBER_BASIC;
					b = true;
					break;
				
				case 2:
					if(special_remain<=0)continue;
					special_remain--;
					board[x][y] = BOARD_NUMBER_SPECIAL;
					b = true;
					break;
				case 3:
					if(gourmet_remain<=0)continue;
					gourmet_remain--;
					board[x][y] = BOARD_NUMBER_GOURMET;
					b = true;
					break;
			}
		}
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	var pac_place = findRandomEmptyCell(board);
	shape.i = pac_place[0];
	shape.j = pac_place[1];
	board[shape.i][shape.j] = 2;
	var candy_place = findRandomEmptyCell(board);
	candyShape.i = candy_place[0];
	candyShape.j = candy_place[1];
	var extraTime_place = findRandomEmptyCell(board);
	extraTimeShape.i = extraTime_place[0];
	extraTimeShape.j = extraTime_place[1];
	var slowMotion_place = findRandomEmptyCell(board);
	slowMotionShape.i = slowMotion_place[0];
	slowMotionShape.j = slowMotion_place[1];
	var extraLife_place = findRandomEmptyCell(board);
	extraLifeShape.i = extraLife_place[0];
	extraLifeShape.j = extraLife_place[1];
	intervalCandy = setInterval(candyUpdatePoisition,1000);
	intervalExtraTime = setInterval(extraTimeUpdatePosition,5000);
	intervalSlowMotion = setInterval(slowMotionUpdatePosition, 5000);
	intervalExtraLife = setInterval(extraLifeUpdatePosition,5000);
	interval = setInterval(UpdatePosition, 120);
	//---------------------------------------------------------------gousts code
	startGhostPositions()
	intervalGhosts = setInterval(ghostUpdatePosition,500);
	//----------------------------------------------------------------------------
	gameAudio.play();
	gameAudio.loop=true;
}

function startGhostPositions(){
	ghostShape1.i = 0;
	ghostShape1.j = 0;
	ghostShape2.i = - 1;
	ghostShape2.j = -1;
	ghostShape3.i = -1;
	ghostShape3.j = - 1;
	ghostShape4.i = - 1;
	ghostShape4.j = - 1;
	for(i=0;i<num_of_ghosts;i++){
		if (i == 0){
			board[0][0] = 0;
			ghostShape1.i = 0;
			ghostShape1.j = 0;
		}
		if (i == 1){
			board[number_of_rows - 1][0] = 0;
			ghostShape2.i = number_of_cols - 1;
			ghostShape2.j = 0;
		}
		if (i == 2){
			board[0][number_of_cols - 1] = 0;
			ghostShape3.i = 0;
			ghostShape3.j = number_of_rows - 1;
		}
		if (i == 3){
			board[number_of_rows - 1][number_of_cols - 1] = 0;
			ghostShape4.i = number_of_cols - 1;
			ghostShape4.j = number_of_rows - 1;
		}
	}
}

function collision(){
	life--;
	if (life == 1){
		document.getElementById("heart2").style.visibility="hidden";
	}
	if (life == 2){
		document.getElementById("heart3").style.visibility="hidden";
	}
	if (life == 3){
		document.getElementById("heart4").style.visibility="hidden";
	}
	if (life == 4){
		document.getElementById("heart5").style.visibility="hidden";
	}
	if (life == 5){
		document.getElementById("heart6").style.visibility="hidden";
	}
	score -= 10;
	window.clearInterval(intervalGhosts);
	window.clearInterval(interval);
	board[shape.i][shape.j] = 0;
	board[ghostShape1.i][ghostShape1.j] = 0;
	if (num_of_ghosts > 1){
		board[ghostShape2.i][ghostShape2.j] = 0;
	}
	if (num_of_ghosts > 2){
		board[ghostShape3.i][ghostShape3.j] = 0;
	}
	if (num_of_ghosts > 3){
		board[ghostShape4.i][ghostShape4.j] = 0;
	}
	startGhostPositions()
	var pac_place = findRandomEmptyCell(board);
	shape.i = pac_place[0];
	shape.j = pac_place[1];
	intervalGhosts = setInterval(ghostUpdatePosition,999);
	interval = setInterval(UpdatePosition,120);
	Draw();	
}

function ghostUpdatePosition(){
	ghostMove(ghostShape1);
	if (ghostShape1.i == shape.i && ghostShape1.j == shape.j){
		collision();
	}
	if (num_of_ghosts > 1){
		ghostMove(ghostShape2);
		if (ghostShape2.i == shape.i && ghostShape2.j == shape.j){
			collision();
	}
}
	if (num_of_ghosts > 2){
		ghostMove(ghostShape3);
		if (ghostShape3.i == shape.i && ghostShape3.j == shape.j){
			collision();
	}
}
	if (num_of_ghosts > 3){
		ghostMove(ghostShape4);
		if (ghostShape4.i == shape.i && ghostShape4.j == shape.j){
			collision();
	}
}
	if(life == 0){
		gameAudio.pause();
		gameOverAudio.play();
		window.alert("You are better than ".concat(score.toString(), " points!"));
		window.clearInterval(interval);
		window.clearInterval(intervalCandy);
		window.clearInterval(intervalGhosts);
		window.clearInterval(intervalExtraTime);
		window.clearInterval(intervalSlowMotion);
		switchScreen("settings");
	}
}

function checkDirection(board,i,j){
	posibileMoves = new Array();
	index = 0;
	if (i < number_of_cols - 1  && board[i + 1][j] != 4){//right
		posibileMoves[index++] = 'right';
	}
	if (i > 0 && board[i - 1][j] != 4){//left
		posibileMoves[index++] = 'left';
	}
	if (j > 0 && board[i][j-1] != 4){//up
		posibileMoves[index++] = 'up';
	}
	if (j < number_of_rows - 1 && board[i][j+1] != 4){//down
		posibileMoves[index++] = 'down';
	}
	// console.log(posibileMoves)
	return posibileMoves;

}

function ghostMove(ghostShape){
	if (ghostShape.i > shape.i && ghostShape.j > shape.j)// pacman left and up to ghost
	{
		var direction = Math.floor(Math.random() * 2 + 1);
		if (direction == 1)// left
		{
			if (ghostShape.i > 0 && board[ghostShape.i - 1][ghostShape.j] != 4) {
				ghostShape.i--;
				return;
			}
		}
		if (direction == 2) { // up
			if (ghostShape.j > 0 && board[ghostShape.i][ghostShape.j - 1] != 4) {
				ghostShape.j--;
				return;
			}
		}
		movePossible(ghostShape);
	}
	if (ghostShape.i <= shape.i && ghostShape.j > shape.j)// pacman right and up to ghost
	{
		var direction = Math.floor(Math.random() * 2 + 1);
		if (direction == 1) { // right
			if (ghostShape.i < number_of_cols - 1 && board[ghostShape.i + 1][ghostShape.j] != 4) {
				ghostShape.i++;
				return;
			}
		}
		if (direction == 2) { // up
			if (ghostShape.j > 0 && board[ghostShape.i][ghostShape.j - 1] != 4) {
				ghostShape.j--;
				return;
			}
		}
		movePossible(ghostShape);
	}
	if (ghostShape.i > shape.i && ghostShape.j <= shape.j)// pacman left and down to ghost
	{
		var direction = Math.floor(Math.random() * 2 + 1);
		if (direction == 1) { // left
			if (ghostShape.i > 0 && board[ghostShape.i - 1][ghostShape.j] != 4) {
				ghostShape.i--;
				return;
			}
		}
		if (direction == 2) { // down
			if (ghostShape.j < number_of_rows - 1 && board[ghostShape.i][ghostShape.j + 1] != 4) {
				ghostShape.j++;
				return;
			}
		}
		movePossible(ghostShape);
	}
	if (ghostShape.i <= shape.i && ghostShape.j <= shape.j)// pacman right and down to ghost
	{
		var direction = Math.floor(Math.random() * 2 + 1);
		if (direction == 1) { // right
			if (ghostShape.i < number_of_cols - 1 && board[ghostShape.i + 1][ghostShape.j] != 4) {
				ghostShape.i++;
				return;
			}
		}	
		if (direction == 2) { // down
			if (ghostShape.j <  number_of_rows - 1 && board[ghostShape.i][ghostShape.j + 1] != 4) {
				ghostShape.j++;
				return;
			}
		}
		movePossible(ghostShape);
	}
}

function movePossible(ghostShape){
	posibileMoves = checkDirection(board,ghostShape.i,ghostShape.j);
	var direction = Math.floor(Math.random() * posibileMoves.length);
	if (posibileMoves[direction] == 'up') { // up
		ghostShape.j--;		
		}
	if (posibileMoves[direction] == 'down') { // down
			ghostShape.j++;	
		}
	if (posibileMoves[direction] == 'left') { // left
			ghostShape.i--;
		}
	if (posibileMoves[direction] == 'right') { // right
			ghostShape.i++;	
		}
}

//------------------------------------------------------------------goust func
//-----------------------------------------------------------------


function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() *(number_of_cols-1) + 1);
	var j = Math.floor(Math.random() * (number_of_rows-1) + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * (number_of_cols-1) + 1);
		j = Math.floor(Math.random() * (number_of_rows-1) + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[chosen_key_code_up]) {
		return 1;
	}
	if (keysDown[chosen_key_code_down]) {
		return 2;
	}
	if (keysDown[chosen_key_code_left]) {
		return 3;
	}
	if (keysDown[chosen_key_code_right]) {
		return 4;
	}
}

function checkIfPositionHasGhost(i,j){
	if(i == ghostShape1.i && j == ghostShape1.j){
		return true;
	}
	if(num_of_ghosts>1){
		if(i == ghostShape2.i && j == ghostShape2.j){return true;}
	}
	if(num_of_ghosts>2){
		if(i == ghostShape3.i && j == ghostShape3.j){return true;}
	}
	if(num_of_ghosts>3){
		if(i == ghostShape4.i && j == ghostShape4.j){return true;}
	}
	return false;
}

function UpdatePosition() {
	positionX = shape.i;
	positionY = shape.j;
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) { // Up
			shape.j--;
			pac_img.src = "./images/pacU.png";
		}
	}
	if (x == 2) {
		if (shape.j < number_of_rows-1 && board[shape.i][shape.j + 1] != 4) { // Down
			shape.j++;
			pac_img.src = "./images/pacD.png";
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) { // Left
			shape.i--;
			pac_img.src = "./images/pacL.png";
		}
	}
	if (x == 4) {
		if (shape.i < number_of_cols-1 && board[shape.i + 1][shape.j] != 4) { // Right
			shape.i++;
			pac_img.src = "./images/pacR.png";
		}
	}
	else if (board[shape.i][shape.j] == BOARD_NUMBER_BASIC) {
		score+=5;
	}
	if (board[shape.i][shape.j] == BOARD_NUMBER_SPECIAL) {
		score+=15;
	}
	if (board[shape.i][shape.j] == BOARD_NUMBER_GOURMET) {
		score+=25;
	}
	if (candyShape.i == shape.i && candyShape.j == shape.j){
		score += 100;
		candyShape.i = -1;
		candyShape.j = -1;
		window.clearInterval(intervalCandy);
	}
	if (extraTimeShape.i == shape.i && extraTimeShape.j == shape.j){
		game_long += 30
		extraTimeShape.i = -1;
		extraTimeShape.j = -1;
		window.clearInterval(intervalExtraTime);
	}
	if (slowMotionShape.i == shape.i && slowMotionShape.j == shape.j){
		window.clearInterval(intervalGhosts);
		intervalGhosts = setInterval(ghostUpdatePosition,3000);
		slowMotionTimmer = time_elapsed + 15;
		slowMotionShape.i = -1;
		slowMotionShape.j = -1;
		window.clearInterval(intervalSlowMotion);
		activateSlowMotion = true;
	}
	if (extraLifeShape.i == shape.i && extraLifeShape.j == shape.j){
		extraLifeShape.i = -1;
		extraLifeShape.j = -1;
		if(life == 1){
			document.getElementById("heart2").style.visibility="visible";
		}
		if(life == 2){
			document.getElementById("heart3").style.visibility="visible";
		}
		if(life == 3){
			document.getElementById("heart4").style.visibility="visible";
		}
		if(life == 4){
			document.getElementById("heart5").style.visibility="visible";
		}
		if(life == 5){
			document.getElementById("heart6").style.visibility="visible";
		}
		life++;
		window.clearInterval(intervalExtraLife);
	}
	if (ghostShape1.i == shape.i && ghostShape1.j == shape.j){
		collision()
	}
	if (ghostShape2.i == shape.i && ghostShape2.j == shape.j){
		collision()
	}
	if (ghostShape3.i == shape.i && ghostShape3.j == shape.j){
		collision()	
	}
	if (ghostShape4.i == shape.i && ghostShape4.j == shape.j){
		collision()
	}
	if(life == 0){
		gameAudio.pause();
		gameOverAudio.play();
		window.alert("You are better than ".concat(score.toString(), " points!"));
		window.clearInterval(interval);
		window.clearInterval(intervalCandy);
		window.clearInterval(intervalGhosts);
		window.clearInterval(intervalExtraTime);
		window.clearInterval(intervalSlowMotion);
		window.clearInterval(intervalExtraLife);
		switchScreen("settings");
		return 
	}
	if(slowMotionTimmer - time_elapsed <= 0.05 && activateSlowMotion){
		window.clearInterval(intervalGhosts);
		intervalGhosts = setInterval(ghostUpdatePosition,500);
		activateSlowMotion = false;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if(game_long - time_elapsed <= 0.05){
		if(score<100){
			gameAudio.pause();
			gameOverAudio.play();
			window.alert("You are better than ".concat(score.toString(), " points!"));
		}
		else{
			gameAudio.pause();
			window.alert("Winner!");
		}
		window.clearInterval(interval);
		window.clearInterval(intervalCandy);
		window.clearInterval(intervalGhosts);
		window.clearInterval(intervalExtraTime);
		window.clearInterval(intervalSlowMotion);
		window.clearInterval(intervalExtraLife);
		switchScreen("settings");
		return 
	}

	// if (score >=100) {
	// 	// wall_img.src = "./images/wall.png"; // 
	// }
	else {
		Draw();
	}
}

function candyUpdatePoisition(){
	while (true){
		var direction = Math.floor(Math.random() * 4 + 1);
		if (direction == 1) { // up
			if (candyShape.j > 0 && board[candyShape.i][candyShape.j - 1] != 4) {
				candyShape.j--;
				break;
			}
		}
		if (direction == 2) { // down
			if (candyShape.j < board[0].length - 1 && board[candyShape.i][candyShape.j + 1] != 4) {
				candyShape.j++;
				break;
			}
		}
		if (direction == 3) { // left
			if (candyShape.i > 0 && board[candyShape.i - 1][candyShape.j] != 4) {
				candyShape.i--;
				break;
			}
		}
		if (direction == 4) { // right
			if (candyShape.i < board.length - 1 && board[candyShape.i + 1][candyShape.j] != 4) {
				candyShape.i++;
				break;
			}
		}	
	}
	Draw();
}

function extraTimeUpdatePosition(){
	var extraTime_place = findRandomEmptyCell(board)
	extraTimeShape.i = extraTime_place[0];
	extraTimeShape.j = extraTime_place[1];
}

function slowMotionUpdatePosition(){
	var slowMotion_place = findRandomEmptyCell(board);
	slowMotionShape.i = slowMotion_place[0];
	slowMotionShape.j = slowMotion_place[1];
}

function extraLifeUpdatePosition(){
	var extraTime_place = findRandomEmptyCell(board);
	extraLifeShape.i = extraTime_place[0];
	extraLifeShape.j = extraTime_place[1];
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < number_of_cols; i++) {
		for (var j = 0; j < number_of_rows; j++) {
			var center = new Object();
			center.x = i * 30 + 30;
			center.y = j * 30 + 30;
			if (i == ghostShape1.i && j == ghostShape1.j){
				context.drawImage(g1_img,center.x-15, center.y-15, 0.7*cell_width, 0.7*cell_height);
			}
			if (i == ghostShape2.i && j == ghostShape2.j){
				context.drawImage(g2_img,center.x-15, center.y-15, 0.7*cell_width, 0.7*cell_height);
			}
			if (i == ghostShape3.i && j == ghostShape3.j){
				context.drawImage(g3_img,center.x-15, center.y-15, 0.7*cell_width, 0.7*cell_height);
			}
			if (i == ghostShape4.i && j == ghostShape4.j){
				context.drawImage(g4_img,center.x-15, center.y-15, 0.7*cell_width, 0.7*cell_height);
			}
			//----------------------------------------------------------------------------- 
			if (board[i][j] == 2) {
				context.drawImage(pac_img,center.x-10, center.y-10, 0.7*cell_width, 0.7*cell_height);
				
			}
			 else if (board[i][j] == 4) {
				context.drawImage(wall_img,center.x-15, center.y-15, cell_width, cell_height);
			}
			else if (board[i][j] == BOARD_NUMBER_BASIC && !checkIfPositionHasGhost(i,j)) {
				context.beginPath();
				context.arc(center.x, center.y, 4, 0, 2 * Math.PI); // circle
				context.fillStyle = basic_food_color; //color
				context.fill();
			}
			else if (board[i][j] == BOARD_NUMBER_SPECIAL && !checkIfPositionHasGhost(i,j)) {
				context.beginPath();
				context.arc(center.x, center.y, 6, 0, 2 * Math.PI); // circle
				context.fillStyle = special_food_color; //color
				context.fill();
			}
			else if (board[i][j] == BOARD_NUMBER_GOURMET && !checkIfPositionHasGhost(i,j)) {
				context.beginPath();
				context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
				context.fillStyle = gourmet_food_color; //color
				context.fill();
			}
			else if (candyShape.i == i && candyShape.j == j  && !checkIfPositionHasGhost(i,j)){
				context.drawImage(candy_img,center.x-15, center.y-15, cell_width, cell_height);
			}
			else if (extraTimeShape.i == i && extraTimeShape.j == j  && !checkIfPositionHasGhost(i,j)){
				context.drawImage(extraTime_img,center.x-15, center.y-15, cell_width, cell_height);
			}
			else if (slowMotionShape.i == i && slowMotionShape.j == j  && !checkIfPositionHasGhost(i,j)){
				context.drawImage(slowMotion_img,center.x-15, center.y-15, cell_width, cell_height);
			}
			else if (extraLifeShape.i == i && extraLifeShape.j == j  && !checkIfPositionHasGhost(i,j)){
				context.drawImage(extraLife_img,center.x-15, center.y-15, cell_width, cell_height);
			}
		}
	}
}