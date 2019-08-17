var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on("keypress", function(){
if(started != true){
  nextSequence();
  started = true;
}



});


//------------User Click-----------//

$(".btn").on("click", function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animate("#" + userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});


//------------Checks the Answer-----------//

function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
  console.log("Success");
  if(userClickedPattern.length == gamePattern.length){
    setTimeout(function(){
      nextSequence();
    }, 1000);
  }
}
else{
  gameOver();
}
}

//-----------Game Over------------------//

function gameOver(){
  console.log("Fail");
  var wrongSound = new Audio("sounds/wrong.mp3");
  wrongSound.play();
  $("body").addClass("game-over");
  $("body").removeClass("bg");
  setTimeout(function(){
    $("body").removeClass("game-over");
    $("body").addClass("bg");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  level = 0;
  gamePattern = [];
  started = false;
}


//-----------Button Sequences-----------//
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColours = buttonColours[randomNumber];

  $("#" + randomChosenColours).fadeOut(150).fadeIn(150);
  playSound(randomChosenColours);

  gamePattern.push(randomChosenColours);
}

//-------------Sound Function------------------//
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//---------------Animation Function------------//
function animate(currentColour){
  $(currentColour).addClass("pressed");
  setTimeout(function(){
  $(currentColour).removeClass("pressed");
  },100);
}
