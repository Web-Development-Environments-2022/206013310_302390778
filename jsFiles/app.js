var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var num_of_basic_food;
var num_of_special_food; 
var num_of_gourmet_food ;
var BOARD_NUMBER_BASIC = 1;
var BOARD_NUMBER_SPECIAL = 5;
var BOARD_NUMBER_GOURMET = 6;
var positionX;
var positionY;
var lastDirectionStart = 0.15 * Math.PI;
var lastDirectionEnd = 1.85 * Math.PI;
var lastEyePositionX = 0;
var lastEyePositionY = 0;
var candyShape = new Object();
// goust params
var ghostShape1 = new Object()
var ghostShape2 = new Object()
var ghostShape3 = new Object()
var ghostShape4 = new Object()
//----------------------------


$(document).ready(function() {
	context = canvas.getContext("2d");
});

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 250;
	var food_remain = number_of_food;
	var pacman_remain = 1;
	start_time = new Date();
	num_of_basic_food = Math.floor(0.6*number_of_food);
	num_of_special_food = Math.floor(0.3*number_of_food);
	num_of_gourmet_food = Math.floor(0.1*number_of_food);
	var basic_remain = num_of_basic_food;
	var special_remain = num_of_special_food;
	var gourmet_remain = num_of_gourmet_food;
	for (var i = 0; i < 20; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 20; j++) {
			if (
				(i == 1 && (j != 1 && j != 3 && j !=4 && j != 6 && j !=7 && j !=9 && j != 10 && j !=12 && j !=14 && j !=15 && j !=17 && j != 18 )) ||
				(i == 2 && (j != 1 && j != 2 && j !=4 && j != 5 && j !=7 && j !=9 && j != 11 && j !=12 && j !=15 && j !=17 && j != 19 )) ||
				(i == 5 && (j != 0 && j != 2 && j !=4 && j != 6 && j !=8 && j !=9 && j != 10 && j !=12 && j !=13 && j !=14 && j !=16 && j != 19 )) ||
				(i == 7 && (j != 0 && j != 2 && j !=4 && j != 6 && j !=8 && j !=9 && j != 10 && j !=12 && j !=13 && j !=14 && j !=16 && j != 19 )) ||
				(i == 8 && (j != 1 && j != 2 && j !=4 && j != 5 && j !=7 && j !=9 && j != 11 && j !=12 && j !=15 && j !=17 && j != 19 )) ||
				(i == 10 && (j != 1 && j != 3 && j !=4 && j != 6 && j !=7 && j !=9 && j != 10 && j !=12 && j !=14 && j !=15 && j !=17 && j != 18 )) ||
				(i == 11 && (j != 0 && j != 2 && j !=3 && j != 4 && j !=6 && j !=8 && j != 11 && j !=14 && j !=15 && j !=18 && j != 19 )) ||
				(i == 13 && (j != 0 && j != 2 && j !=3 && j != 4 && j !=6 && j !=8 && j != 11 && j !=14 && j !=15 && j !=18 && j != 19 )) ||
				(i == 14 && (j != 0 && j != 1 && j !=3 && j != 4 && j !=7 && j !=8 && j != 13 && j !=14 && j !=15 && j !=16 && j != 18 )) ||
				(i == 16 && (j != 1 && j != 2 && j !=3 && j != 5 && j !=6 && j !=10 && j != 11 && j !=12 && j !=15 && j !=16 && j != 19 ))||
				(i == 18 && (j != 0 && j != 2 && j !=3 && j != 4 && j !=6 && j !=8 && j != 11 && j !=14 && j !=15 && j !=18 && j != 19 )) ||
				(i == 19 && (j != 1 && j != 2 && j !=4 && j != 5 && j !=7 && j !=9 && j != 11 && j !=12 && j !=15 && j !=17 && j != 19 )) 
			)
			 {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (2.0 * food_remain) / cnt) {
					var b = false;
					while(!b && (basic_remain >0 || special_remain >0 || gourmet_remain >0) ){
						switch (Math.floor(Math.random() * 3) + 1) {
							case 1:
								basic_remain--;
								board[i][j] = BOARD_NUMBER_BASIC;
								b = true;
								break;
							
							case 2:
								special_remain--;
								board[i][j] = BOARD_NUMBER_SPECIAL;
								b = true;
								break;
							case 3:
								gourmet_remain--;
								board[i][j] = BOARD_NUMBER_GOURMET;
								b = true;
								break;
						}
					}
					food_remain--;
				} else if (randomNum < (2.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var b = false;
		var emptyCell = findRandomEmptyCell(board);
		var x = emptyCell[0];
		var y = emptyCell[1];
		while(!b && (basic_remain >0 || special_remain >0 || gourmet_remain >0)){
			switch (Math.floor(Math.random() * 3) + 1) {
				case 1:
					basic_remain--;
					board[x][y] = BOARD_NUMBER_BASIC;
					b = true;
					break;
				
				case 2:
					special_remain--;
					board[x][y] = BOARD_NUMBER_SPECIAL;
					b = true;
					break;
				case 3:
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
	lastEyePositionX = shape.i * 30 + 20;
	lastEyePositionY = shape.j * 30 + 7.5;
	var place = findRandomEmptyCell(board)
	candyShape.i = place[0];
	candyShape.j = place[1];
	intervalCandy = setInterval(candyUpdatePoisition,5000);
	interval = setInterval(UpdatePosition, 150);
	//---------------------------------------------------------------gousts code
	for(i=0;i<num_of_ghosts;i++){
		if (i == 0){
			ghostShape1.i = 0
			ghostShape1.j = 0
			intervalGhosts1 = setInterval(ghostUpdatePosition,1000,ghostShape1)
		}
		if (i == 1){
			ghostShape2.i = board.length - 1
			ghostShape2.j = 0
			intervalGhosts2 = setInterval(ghostUpdatePosition,1000,ghostShape2)
		}
		if (i == 2){
			ghostShape3.i = 0
			ghostShape3.j = board.length - 1
			intervalGhosts3 = setInterval(ghostUpdatePosition,1000,ghostShape3)
		}
		if (i == 3){
			ghostShape4.i = board.length - 1
			ghostShape4.j = board.length - 1
			intervalGhosts4 = setInterval(ghostUpdatePosition,1000,ghostShape4)
		}
	}
	//----------------------------------------------------------------------------
}


//------------------------------------------------------------------goust func
function ghostUpdatePosition(ghostShape){
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
			if (ghostShape.i < 19 && board[ghostShape.i + 1][ghostShape.j] != 4) {
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
			if (ghostShape.j < 19 && board[ghostShape.i][ghostShape.j + 1] != 4) {
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
			if (ghostShape.i < 19 && board[ghostShape.i + 1][ghostShape.j] != 4) {
				ghostShape.i++;
				return;
			}
		}	
		if (direction == 2) { // down
			if (ghostShape.j < 19 && board[ghostShape.i][ghostShape.j + 1] != 4) {
				ghostShape.j++;
				return;
			}
		}
		movePossible(ghostShape);
	}
	Draw();
}
//-----------------------------------------------------------------

function movePossible(ghostShape){
	while (true){
		var direction = Math.floor(Math.random() * 4 + 1);
		if (direction == 1) { // up
			if (ghostShape.j > 0 && board[ghostShape.i][ghostShape.j - 1] != 4) {
				ghostShape.j--;
				break;
			}
		}
		if (direction == 2) { // down
			if (ghostShape.j < 19 && board[ghostShape.i][ghostShape.j + 1] != 4) {
				ghostShape.j++;
				break;
			}
		}
		if (direction == 3) { // left
			if (ghostShape.i > 0 && board[ghostShape.i - 1][ghostShape.j] != 4) {
				ghostShape.i--;
				break;
			}
		}
		if (direction == 4) { // right
			if (ghostShape.i < 19 && board[ghostShape.i + 1][ghostShape.j] != 4) {
				ghostShape.i++;
				break;
			}
		}	
	}
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 19 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 19 + 1);
		j = Math.floor(Math.random() * 19 + 1);
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

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			var center = new Object();
			center.x = i * 30 + 15;
			center.y = j * 30 + 15;
			// if (board[i][j] == 2) {
			// 	context.beginPath();
			// 	context.arc(center.x, center.y, 15, (0.15/2) * Math.PI, 1.80 * Math.PI); // half circle
			// 	context.lineTo(center.x, center.y);
			// 	context.fillStyle = pac_color; //color
			// 	context.fill();
			// 	context.beginPath();
			// 	context.arc(center.x + 2.5, center.y - 7.5, 2.5, 0, 2*Math.PI); // circle
			// 	context.fillStyle = "black"; //color
			// 	context.fill();
			// }
			//---------------------------------------------------------------- gousts draw code
			if (i == ghostShape1.i && j == ghostShape1.j){
				context.beginPath();
				context.arc(center.x, center.y, 5, 0, 1 * Math.PI); // circle
				context.fillStyle = "yellow"; //color
				context.fill();
			}
			
			if (i == ghostShape2.i && j == ghostShape2.j){
					context.beginPath();
					context.arc(center.x, center.y, 5, 0, 1 * Math.PI); // circle
					context.fillStyle = "yellow"; //color
					context.fill();
			}
			if (i == ghostShape3.i && j == ghostShape3.j){
				context.beginPath();
				context.arc(center.x, center.y, 5, 0, 1 * Math.PI); // circle
				context.fillStyle = "yellow"; //color
				context.fill();
			}
			if (i == ghostShape4.i && j == ghostShape4.j){
				context.beginPath();
				context.arc(center.x, center.y, 5, 0, 1 * Math.PI); // circle
				context.fillStyle = "yellow"; //color
				context.fill();
			}
			//----------------------------------------------------------------------------- 
			if (board[i][j] == 2) {
				if (positionX - shape.i < 0){// right
					context.beginPath();
					context.arc(center.x, center.y, 12.5, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					positionX = shape.i;
					positionY = shape.j;
					lastDirectionStart =  0.15 * Math.PI;
					lastDirectionEnd = 1.85 * Math.PI;
					context.beginPath();
					context.arc(center.x + 5, center.y - 7.5, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
					lastEyePositionX = center.x + 5;
					lastEyePositionY = center.y - 7.5;
				}
				else if (positionX - shape.i > 0){// left
					context.beginPath();
					context.arc(center.x, center.y, 12.5, 1.15 * Math.PI, 0.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					positionX = shape.i;
					positionY = shape.j;
					lastDirectionStart =  1.15 * Math.PI
					lastDirectionEnd = 0.85 * Math.PI
					context.beginPath();
					context.arc(center.x - 5, center.y - 7.5, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
					lastEyePositionX = center.x - 5;
					lastEyePositionY = center.y - 7.5;
				}
				else if(positionY - shape.j > 0){// up
					context.beginPath();
					context.arc(center.x, center.y, 12.5, 1.65 * Math.PI, 1.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					positionX = shape.i;
					positionY = shape.j;
					lastDirectionStart =  1.65 * Math.PI;
					lastDirectionEnd = 1.35 * Math.PI;
					context.beginPath();
					context.arc(center.x - 7.5, center.y - 5, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
					lastEyePositionX = center.x - 7.5;
					lastEyePositionY = center.y - 5;
				}
				else if(positionY - shape.j < 0){// down
					context.beginPath();
					context.arc(center.x, center.y, 12.5, 0.65 * Math.PI, 0.35 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					positionX = shape.i;
					positionY = shape.j;
					lastDirectionStart =  0.65 * Math.PI;
					lastDirectionEnd = 0.35 * Math.PI;
					context.beginPath();
					context.arc(center.x + 7.5, center.y + 5, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
					lastEyePositionX = center.x + 7.5;
					lastEyePositionY = center.y + 5;
				}
				else{
					context.beginPath();
					context.arc(center.x, center.y, 12.5, lastDirectionStart, lastDirectionEnd); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(lastEyePositionX, lastEyePositionY, 2.5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
			}
			else if (board[i][j] == BOARD_NUMBER_BASIC) {
				context.beginPath();
				context.arc(center.x, center.y, 7.5, 0,  2*Math.PI); // circle
				context.fillStyle = basic_food_color; //color
				context.fill();
			}
			 else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 10, center.y - 15, 25, 25);
				context.fillStyle = "blue"; //color
				context.fill();
			}
			else if (board[i][j] == BOARD_NUMBER_SPECIAL) {
				context.beginPath();
				context.arc(center.x, center.y, 7.5, 0,  2*Math.PI); // circle
				context.fillStyle = special_food_color; //color
				context.fill();
			}
			else if (board[i][j] == BOARD_NUMBER_GOURMET) {
				context.beginPath();
				context.arc(center.x, center.y, 7.5, 0,  2*Math.PI); // circle
				context.fillStyle = gourmet_food_color; //color
				context.fill();
			}
			else if (candyShape.i == i && candyShape.j == j){
				context.beginPath();
				context.arc(center.x, center.y, 5, 0, 1 * Math.PI); // circle
				context.fillStyle = "orange"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	positionX = shape.i;
	positionY = shape.j;
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 19 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 19 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
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
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if(game_long - time_elapsed <= 0.05){
		if(score<100){
			window.alert("You are better than ".concat(score.toString(), " points!"));
		}
		else{
			window.alert("Winner!");
		}
		window.clearInterval(interval);
		window.clearInterval(intervalCandy);
		window.clearInterval(intervalGhosts1);
		window.clearInterval(intervalGhosts2);
		window.clearInterval(intervalGhosts3);
		window.clearInterval(intervalGhosts4);
		switchScreen("settings");
	}
	if (score >=100) {
		pac_color = "green"; // 
	}
	if (score == 50) {
		window.alert("Game completed");
		window.clearInterval(intervalCandy);
		window.clearInterval(interval);
		window.clearInterval(intervalGhosts1);
		window.clearInterval(intervalGhosts2);
		window.clearInterval(intervalGhosts3);
		window.clearInterval(intervalGhosts4);
		switchScreen("settings");
	} else {
		Draw();
	}
}

function candyUpdatePoisition(){
	var place = findRandomEmptyCell(board)
	candyShape.i = place[0];
	candyShape.j = place[1];
	Draw();
}
