var gamePattern = [];
var userClickedPattern = [];
const buttonColours = ["red", "yellow", "green", "blue"];
var level = 0; 
var isKeyPressed = false;


// start the game 
$(document).on("keypress", function(e) {
    if(isKeyPressed == false) {
        // display the level
        $("h1").text("Level " + level);
        nextSequence();
        isKeyPressed = true;
    }
})



$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    // console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);  
    checkAnswer(userClickedPattern.length - 1);
    // console.log(userClickedPattern);

})


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}



function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userClickedPattern = [];
    level = level + 1;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // console.log("ai castigat");
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        $("h1").text("Ai pierdut");
        // console.log("Ai pierdut");
        setTimeout(function() {
            $("h1").text("Press A Key to Start");
        }, 1000);
        isKeyPressed = false;
        level = 0;
        gamePattern = [];
    }
}







