$( document ).ready(function() {

  // var name = prompt("Enter Your Name");

  $('#name').text("Player Name: " + name);

  // var highScore;
  if (localStorage.getItem('highScore') === undefined || localStorage.getItem('highScore') === null) {
    localStorage.setItem('highScore', 0);
  }

  $('#highScore').text("High Score: " + localStorage.getItem('highScore'))
  console.log(localStorage.getItem('highScore'));

//--------Variables for the Game--------
    var colors = ['red', 'green', 'yellow', 'blue']; //

    function reset() {
      simonSaid = []; //Contains randomly generated pattern for player to match
      playerResponse = []; //player responses to compare to what simon displayed
      round = 0; //How far has the user gotten in the game
      inProgress = false;
      playerTimer = 0;
      seconds = 0;
      roundDone = false;
      score = 0;
      counter = 0;
      multiplier = 0;
      $("#timer").html('Time Left: 0:10');
      $('#round').text("Round: Begin your Game!");
      $('#score').text("Score: " + score);
      $('#start').val("Start Round");
      $('#start').prop('disabled', false);
      $('#start').css('background-color', '');
      $('#highScore').text("High Score: " + localStorage.getItem('highScore'))
      // tick('end');
    }

    reset();

//--------Start Round--------

  $('#start').on('click', function(){ //Creates new round for player

      $('#start').val("Next Round");
      $('#start').prop('disabled', true);
      $('#start').css('background-color', '#5c5c5c');
      $("#timer").html('Time Left: 0:10');
      var displayRound = round + 1;
      $('#round').text("Round: " + displayRound);
      inProgress = true; //sets flag so system knows round is in progress
      $('#userAlert').text("Round in Progress");

      var num = randNum();
      while (num === undefined) {
        num = randNum();
      }
      simonSaid.push(colors[num]);

      console.log("Here' what's in the computer generated array: " + simonSaid)
      for (let i=0;i<simonSaid.length;i++) { //Displays pattern for user to match

          (function (i) {

            var timer = 1000 * (1+i);
            var selection = '#' + simonSaid[i]; // Tell the board what to flash
            setTimeout(function eh(){
              $(selection).fadeOut(500).fadeIn(500)
            }, timer);
          })(i);
      }

  })

//--------Capture Player Selection--------

  $('.board').on('mouseover', function() {

    if (inProgress === false) { //Makes sure a round is being played before a comparison happens
      return;
    }

    if (counter === 0) {
      countdown('begin');
      counter++;
    }
  })

  $('.colorSquares').on('click', function () {

      if (inProgress === false) { //Makes sure a round is being played before a comparison happens
        return;
      }
      else {
        var selection = $(this).attr('id');
        setTimeout(function eh(){
          $(selection).fadeOut(500).delay(500).fadeIn(500)
        }, 500);
        playerResponse.push(selection);
        console.log("Here' a player response: " + playerResponse)
      }
      var nextRound; //declares variable to see if player should advance to the next round
      if (simonSaid.length === playerResponse.length) {
        nextRound = compare();
        endRound(nextRound);
      }
  })

  function endRound (nextRoundTF) {
      if (nextRoundTF === false) {
        $('#userAlert').text("Sorry, your selection does not match");
        for (i=0; i <round+1;i++) {
          simonSaid.pop();
          playerResponse.pop();
        }
          var highScore = localStorage.getItem('highScore');
          if (score > highScore) {
            localStorage.setItem("highScore", score);
          }
          // Retrieve
          $('#highScore').text("High Score: " + highScore);

        reset();

      }
      else if (nextRoundTF === true) {
        inProgress = false
        $('#userAlert').text("Winner!");
        for (i=0; i <round+1;i++) {
          playerResponse.pop();
        }
        round ++;
        score = score + (seconds*round);
        countdown('end');
        $("#score").html('Score: ' + score);
        counter = 0;
        seconds = 10;
        $('#start').prop('disabled', false);
        $('#start').css('background-color', '');
      }
  }
//--------Compare user response to what Simon said--------

  function compare() {
    countdown('end');
    //roundDone = true;
    //tick(roundDone);
    var winner = true;
    for (i=0;i<simonSaid.length;i++) {
      if (simonSaid[i] !== playerResponse[i]) {
        winner = false;
      }
    }
    return winner;
  }

//--------Generate Random Number--------

    function randNum() {
      return parseInt(Math.random() * (4 - 0) + 0);
    }

//--------Timer Function--------

  function countdown(doWhat) {
    var current_minutes = 0
    if (doWhat === 'begin') {
      seconds = 10;
      //var mins = minutes;
      function tick() {
        var current_minutes = 0
        seconds--;
        $("#timer").html('Time Left: ' + current_minutes.toString()+ ":" + (seconds < 10 ? "0" : "") + String(seconds));
        if (seconds > 0) {
          x = setTimeout(tick,1000);
        }
        if (seconds === 0) {
          reset();
          $('#userAlert').text("Sorry, you've run out of time!");
          $('#start').css('background-color', '');
          var highScore = localStorage.getItem('highScore');
          if (score > highScore) {
            localStorage.setItem("highScore", score);
          }
          // Retrieve
          $('#highScore').text("High Score: " + highScore);

          return;
        }
        if (inProgress === false){
          $('#start').css('background-color', '');
          return;
        }
      }
      tick();
      }

    else if (doWhat === 'end') {
      window.clearTimeout(x);
      $("#timer").html('Time Left: ' + current_minutes.toString()+ ":" + (seconds < 10 ? "0" : "") + String(seconds));
      // seconds = 10;
    }
  }

}); //End of Doc Ready function
