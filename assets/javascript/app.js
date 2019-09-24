$(document).ready(function() {

    // Make array of questions
    var questionArray = [
        {
            question: "Which field of study is the basis of the Tomb Raider series?",
            answer: "Archaeology",
            choices: ["Archaeology", "Criminology", "Assassination", "Chemistry"],
        },
        {
            question: "Which game on the PS4 had more players than Xbox One and Windows PCs combined?",
            answer: "Star Wars: Battlefront",
            choices: ["Star Wars: Battlefront", "Metal Gear Solid", "Grand Theft Auto", "God of War"],
        },
        {
            question: "What does Mario jumps on after completing a level?",
            answer: "Flag Pole",
            choices: ["Flag Pole", "Moving Block", "Turtle Shell", "Puffy Cloud"],
        },
        {
            question: "The Character 'Master Hands' is in which game?",
            answer: "Smash brothers",
            choices: ["Smash brothers", "The Order", "Assassin’s Creed", "Tomb Raider"],
        },
        {
            question: "What does NES stand for?",
            answer: "Nintendo Entertainment System",
            choices: ["Nintendo Entertainment System", "Nintendo Evaluation Screen", "Nintendo Enter Screen", "Nintendo Electric Systems"],
        },
    ];

    // Setup variables for different functions and timers
    var correct = 0;
    var wrong = 0;
    var time = 10;
    var questionCounter = 0;

    //   debugger;
      
    // Start the game
    $("#start").click(nextQuestion);

    // debugger;

    // Onclick for answer response
    $("#gameScreen").on("click", ".choices", (function() {
        // alert("clicked!");
        var userGuess = $(this).text();
        if (userGuess === questionArray[questionCounter].answer) {
            clearInterval(clock);
            userWin();
        }
        else {
            clearInterval(clock);
            userLoss();
        }
    }));

    // Clear values for reset
	function gameReset() {
		questionCounter = 0;
		correct = 0;
        wrong = 0;
        // clearInterval(clock);
    }
    
    // Game timer function
	function timer() {
		clock = setInterval(countDown, 1000);
		function countDown() {
			if (time < 1) {
				clearInterval(clock);
				timeout();
			}
			if (time > 0) {
				time--;
			}
			$("#timer").html("<strong>" + time + "</strong>");
		}
	}
	  
	// Posts questions and answers to page
	function questionContent() {
    	$("#gameScreen").append("<strong><p>" + questionArray[questionCounter].question + 
    	"<div><button class='choices btn btn-info'>" + 	questionArray[questionCounter].choices[0] + 
    	"</div><div> <button class='choices btn btn-info'>" + questionArray[questionCounter].choices[1] + 
    	"</div><div> <button class='choices btn btn-info'>" + questionArray[questionCounter].choices[2] + 
    	"</div><div> <button class='choices btn btn-info'>" + questionArray[questionCounter].choices[3] + 
    	"</div></p></strong>");
	}

	// Right guess
	function userWin() {
		$("#gameScreen").html("<p>You got it right!</p>");
		correct++;
		var answer = questionArray[questionCounter].answer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + answer + "</span></p>");
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	// Wrong guess
	function userLoss() {
		$("#gameScreen").html("<p>Nope, that's not it!</p>");
		wrong++;
		var answer = questionArray[questionCounter].answer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + answer + "</span></p>");
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	// Out of time
	function timeout() {
		if (time === 0) {
			$("#gameScreen").html("<p>You ran out of time!</p>");
			wrong++;
			var answer = questionArray[questionCounter].answer;
			$("#gameScreen").append("<p>The answer was <span class='answer'>" + answer + "</span></p>");
			setTimeout(nextQuestion, 4000);
			questionCounter++;
        }
        // console.log(time)
    }

    // debugger;
    
    // Calls the next question
	function nextQuestion() {
		if (questionCounter < questionArray.length) {
            $("button").hide();
			// time = 10;
			$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
			questionContent();
			timer();
			timeout();
		}
		else {
			resultsScreen();
		}
    // console.log(questionArray[questionCounter].answer);
    // console.log(questionCounter);
	}

	// End results screen
	function resultsScreen() {
		if (correct === questionArray.length) {
			var endMessage = "You got a perfect score! You are HARDCORE!!";
		}
		else if (correct > wrong) {
			var endMessage = "You got some right NEWB!!";
		}
		else {
			var endMessage = "Have you ever played a video Game??";
		}
		$("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" + correct + "</strong> right.</p>" + "<p>You got <strong>" + wrong + "</strong> wrong.</p>");
		$("button").show();
		gameReset();
		$("#start").click(nextQuestion);
	}
// Todo
    // Randomize questions and answers
    // Add images to questions array
    // Add more questions
});