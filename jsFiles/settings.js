let chosen_key_code_up = 38;
let chosen_key_code_down = 40;
let chosen_key_code_left = 37;
let chosen_key_code_right = 39;
let chosen_keys = {}
let num_of_ghosts = 1
let game_long = 3
let number_of_food = 60
let basic_food_color = "#04fcdb"
let special_food_color = "#04fc57"
let gourmet_food_color = "#e63365"


function updateKeyborads(direction){
    $(document).keydown(function(event){
    key_pressed = event.keyCode;
    switch (direction){
        case "UP":
            chosen_key_up=  DisplaychosenKey(key_pressed);
            chosen_key_code_up = key_pressed;
            document.getElementById("buttonUp").value = chosen_key_up;
            chosen_keys['up'] = chosen_key_code_up;
            break;
        case "DOWN":
            chosen_key_down=  DisplaychosenKey(key_pressed);
            chosen_key_code_down = key_pressed;
            document.getElementById("buttonDown").value = chosen_key_down;
            chosen_keys['down'] = chosen_key_code_down;
            break;
        case "LEFT":
            chosen_key_left=  DisplaychosenKey(key_pressed);
            chosen_key_code_left = key_pressed;
            document.getElementById("buttonLeft").value = chosen_key_left;
            chosen_keys['left'] = chosen_key_code_left;
            break;
        case "RIGHT":
            chosen_key_right=  DisplaychosenKey(key_pressed);
            chosen_key_code_right = key_pressed;
            document.getElementById("buttonRight").value = chosen_key_right;
            chosen_keys['right'] = chosen_key_code_right;
            break;
    }
    $(document).unbind();
});
}

function DisplaychosenKey(key_pressed)
{
	if(key_pressed == 38) return "⇧";
	else if(key_pressed == 40) return "⇩";
	else if(key_pressed == 39) return "➪";
	else if(key_pressed == 37) return "⇦";
	else return String.fromCharCode(event.keyCode);
}

var foodSlider = document.getElementById("foodRange");
var output = document.getElementById("foodValue");
output.innerHTML = foodSlider.value;

foodSlider.oninput = function() {
  output.innerHTML = this.value;
}

var timeSlider = document.getElementById("timeRange");
var output2 = document.getElementById("timeValue");
output2.innerHTML = timeSlider.value;

timeSlider.oninput = function() {
  output2.innerHTML = this.value;
}

function startGame()
{
    if (document.getElementById("oneG").checked == true){
        num_of_ghosts = 1
    }
    else if (document.getElementById("twoG").checked == true){
        num_of_ghosts = 2
    }
    else if (document.getElementById("threeG").checked == true){
        num_of_ghosts = 3
    }
    else{
        num_of_ghosts = 4
    }
    game_long = parseInt(document.getElementById("timeRange").value);
    number_of_food = parseInt(document.getElementById("foodRange").value);
    basic_food_color = document.getElementById("basic").value;
    special_food_color = document.getElementById("special").value;
    gourmet_food_color = document.getElementById("gourmet").value;
    $("#game").show();
    Start();
}
