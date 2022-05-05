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
    $(".screen").hide();
}