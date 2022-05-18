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
}

function hideScreens(){
    stopGame();
    $(".screen").hide();
}