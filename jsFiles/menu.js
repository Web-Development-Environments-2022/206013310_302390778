var objPeople =
	{ // Object @ 0 index
		"k": "k"
	}

let menuBar = $('#menu')
$(document).ready(function() {
    hideScreens();
    $("#Welcome").show()
});


function switchScreen(id){
    hideScreens()
    $("#"+id).show()
    if(id == "settings"){
        let canvas = document.getElementById("canvas")
        canvas.width = canvas.width;
        $("#game").show();
    }
}

function hideScreens(){
    stopGame();
    if(gameAudio != null && gameOverAudio != null){
        gameAudio.pause();
        gameAudio.currentTime = 0;
        gameOverAudio.pause();
        gameOverAudio.currentTime = 0;
    }
    $(".screen").hide();
}