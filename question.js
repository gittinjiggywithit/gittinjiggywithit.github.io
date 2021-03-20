var gameMusic;
var musicStarted = false;
// code by webdevtrick (https://webdevtrick.com)
function Quiz(questions) {
    shuffleArray(questions);
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;

    questions.forEach((element) => {
        shuffleArray(element.choices);
    });
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
};

Quiz.prototype.guess = function (answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
};

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
};

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
};

function restartGame() {
    location.reload();
}

function startMusic() {
    if (!musicStarted) {
        gameMusic = new Audio("sounds/music.wav");
        gameMusic.loop = true;
        gameMusic.play();
        musicStarted = true;
    }
}

function playWinSound() {
    gameMusic.pause();
    var winsound = new Audio("sounds/win.wav");
    winsound.play();
}

function populate() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        // document.getElementById("quiz").innerHTML +=
        //     "<button onclick='startMusic()'></button>";
        showProgress();
    }
}

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        startMusic();
        quiz.guess(guess);
        populate();
    };
}

function getHint() {
    alert("Hehe, det var en snyder, der er slet ikke nogen hints.. ");
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML =
        "Spørgsmål " + currentQuestionNumber + " af " + quiz.questions.length;
}

function showScores() {
    var gameOverMessages = [
        "Dælemer ærgerligt...",
        "Kom igen pomfrit",
        "SÅ tæt på, seriøst!",
        "Game over du!",
        "Kom nu Buller, du har den!",
        "Næste gang!",
        "Hvad er det her for en skod quiz??!??",
        "Kan man overhovedet vinde det her lort?",
    ];
    var gameOverMessageIndex = randomInteger(0, gameOverMessages.length - 1);
    var gameOverHTML =
        "<h1>" + gameOverMessages[gameOverMessageIndex] + "</h1>";
    if (quiz.questions.length == quiz.score) {
        playWinSound();
        gameOverHTML = "<h1>Level Complete!</h1>";
        // Hvis du læser det her er du en fucking hacker, men det ville næsten også gøre mig lidt stolt..
        gameOverHTML += "<h2 id='score'> Kombinationen er: 859</h2>";
        gameOverHTML += "<h2 id='score'> Tillykke med fødselsdagen ❤️";
    } else {
        gameOverHTML +=
            "<h2 id='score'> Din score: " +
            quiz.score +
            " ud af " +
            quiz.questions.length +
            "</h2>";
        gameOverHTML +=
            "<button id='resetBtn' onClick=restartGame()>Prøv igen</button>";
        gameOverHTML +=
            "<button id='hintButton' onClick=getHint()>Ej okay, giv mig lige nogle hints..</button>";
    }
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
}

// create questions here
var questions = [
    new Question(
        "Hvor I Nordjylland kommer jeg fra? 🗺",
        ["Rebild", "Støvring", "Skørping", "Aalborg"],
        "Skørping"
    ),
    new Question(
        "Hvor lang tid tager det at bevæge sig på cykel mellem os? (Faktisk tid, Google Maps lyver) 🚴🏼‍♀️",
        ["MAX 5 min", "10 min", "7 min", "8,5 min"],
        "10 min"
    ),
    new Question(
        "Hvilken type dyr er figuren i det spil jeg spiller på playstation? 🎮",
        ["Ræv", "Tasmansk Djævel", "Bandicoot", "Lombax"],
        "Bandicoot"
    ),
    new Question(
        "Hvad skal man udlede fra den her besked? 🤔 <br> 'Jeg elsker dig ❤️ .. uden at det skal lyder vildt cheesy, bare forestil de to værter fra britians Got talent og så bare prøv at dig det, naturligt. Det nok svært fordi de griner så meget, men det hvis du kan.'",
        ["???", "???", "???", "???"],
        "???"
    ),
    new Question(
        "Hvor mange timers walking dead har vi sammenlagt set? 🧟‍♂️",
        [
            "3 dage og 4 timer",
            "6 dage og 2 timer",
            "5 dage og 8 timer",
            "4 dage og 15 timer",
        ],
        "6 dage og 2 timer"
    ),
    new Question(
        "Hvilken tidskompleksitet har binary search? ⏳",
        ["O(n)", "O(1)", "O(log n)", "O(n log n)"],
        "O(log n)"
    ),
    new Question(
        "Hvad er den faste værdi af en Vejgaard dollar (påvirkes ikke af inflation)? 💵",
        ["500 kr.", "100 kr.", "1000 kr.", "50 kr."],
        "50 kr."
    ),
    new Question(
        "Hvad arbejder jeg egentlig som? 👨‍💻",
        [
            ".Net/Umbraco Udvikler",
            "Software Udvikler",
            "C# Konsulent",
            "Webudvikler",
        ],
        ".Net/Umbraco Udvikler"
    ),
    new Question(
        "Hvad hedder elvernes by i LOTR? 🧝🏻‍♀️",
        ["Rivendell", "Rivenfell", "Moria", "Gondor"],
        "Rivendell"
    ),
    new Question(
        "Walking on water er jo en kæmpe banger! Men hvad betyder Zididada i følge Jimmy og Danny selv? 🎶",
        [
            "Ingen bekymringer",
            "Evig sol",
            "Ingen stress",
            "Ikke noget - det lyder bare fjollet",
        ],
        "Evig sol"
    ),
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();
