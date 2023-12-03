'use strict';

import { Score } from "./Score.js";

import {
    onEvent,
    select,
    selectById,
} from "./utils.js";


/*--------------------------------------------------------------------------------*/
/* Function: Initialize the game                                                  */
/*--------------------------------------------------------------------------------*/
//Global variables
const WORDS = [
    'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
    'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
    'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow',
    'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer',
    'philosophy', 'database', 'periodic', 'capitalism', 'abominable',
    'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada',
    'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology', 'promise',
    'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake',
    'baseball', 'beyond', 'evolution', 'banana', 'perfume', 'computer',
    'management', 'discovery', 'ambition', 'music', 'eagle', 'crown', 'chess',
    'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'superman', 'library',
    'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy',
    'interview', 'awesome', 'challenge', 'science', 'mystery', 'famous',
    'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
    'keyboard', 'window', 'beans', 'truck', 'sheep', 'band', 'level', 'hope',
    'download', 'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil', 'mask',
    'audio', 'school', 'detective', 'hero', 'progress', 'winter', 'passion',
    'rebel', 'amber', 'jacket', 'article', 'paradox', 'social', 'resort', 'escape'
];

const arrayWords = WORDS;
let TOTALWORDS = WORDS.length;
let secondsCounter;
let hitsCounter;
let randomWord;

//Creating HTML
let wordInput = selectById("user-word");
let userHits = selectById("hits");
//Creating HTML Modal elements 
const modalStart = select(".modal-start");
const modalWin = select(".modal-win");
const modalGameOver = select(".modal-over");

const modal = selectById("modal");
const startBtn = select(".start-button");
const winBtn = select(".restart-win");
const gameOverBtn = select(".restart-game-over");

//Showing Start Modal 
showModalStart();
/*--------------------------------------------------------------------------------*/
/* Function: Event listener to avoid reload the page                              */
/*--------------------------------------------------------------------------------*/
onEvent('beforeunload', window, function (e) {
    e.returnValue = undefined;
    e.preventDefault();
});

onEvent('unload', window, function (ev) {
    ev.returnValue = undefined;
    ev.preventDefault();
});
/*--------------------------------------------------------------------------------*/
/* Function: Event listener Enter letters in input text                           */
/*--------------------------------------------------------------------------------*/
wordInput.addEventListener('input', function (e) {
    e.preventDefault();
    wordInput.focus();
    checkMathWord();
});

/*--------------------------------------------------------------------------------*/
/* Function: Avoid accion when the user press enter key                           */
/*--------------------------------------------------------------------------------*/
wordInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        wordInput.focus();
    }
});

/*--------------------------------------------------------------------------------*/
/* Function: Set Initial Values                                                   */
/*--------------------------------------------------------------------------------*/
function setValues() {
    secondsCounter = 99;
    hitsCounter = 0;
    userWon = false;
    userHits.textContent = hitsCounter;
}
/*--------------------------------------------------------------------------------*/
/* Function: Audio Elements                                                       */
/*--------------------------------------------------------------------------------*/
let audioplaying = selectById('my-audio-playing');
let audioWin = selectById('my-audio-correct');
let audioLost = selectById('my-audio-lost');
let audioFeedBack = selectById('audio-feedback');

function playSound() {
    audioplaying.volume = 0.5;
    audioplaying.play();
}

function playSoundWin() {
    audioWin.play();
}

function playSoundLost() {
    audioLost.volume = 0.5;
    audioLost.play();
}

function playSoundFeedBack() {
    audioFeedBack.volume = 0.5;
    audioFeedBack.play();
}

function stopSound() {
    audioplaying.pause();
    audioplaying.currentTime = 0; // Reset the audio to the beginning
}

/*--------------------------------------------------------------------------------*/
/* Function: Event listener Enter letters in input text                           */
/*--------------------------------------------------------------------------------*/
function getRandomWord() {
    //Getting a randow word
    randomWord = arrayWords[Math.floor(Math.random() * arrayWords.length)];
    wordToWrite.textContent = randomWord;
}

/*--------------------------------------------------------------------------------*/
/* Function: Printing feedback                                                    */
/*--------------------------------------------------------------------------------*/
let feedback = select('.feedback');
//Getting nullish coalescing operators !Amazing
const ratings = {
    5: 'Great, keep typing!',
    10: 'ohh, so fast!',
    40: 'Great',
    60: 'Excelent!',
    80: 'Amazing!',
    100: 'Wonderfull!'
};
function printfeedback() {
    feedback.textContent = (ratings[hitsCounter] ?? "");
}

/*--------------------------------------------------------------------------------*/
/* Function: Checking if userWord is the same                                     */
/*--------------------------------------------------------------------------------*/
function checkMathWord() {
    let cleanWord = wordInput.value.trim().toLowerCase();
    if (cleanWord.length >= 3 && cleanWord === randomWord) {
        playSoundFeedBack();
        hitsCounter++;
        printfeedback()
        nextWord();
        userHits.textContent = hitsCounter;
        wordInput.value = '';
    }
}
/*--------------------------------------------------------------------------------*/
/* Function: Delete the word of the array and get other random word               */
/*--------------------------------------------------------------------------------*/
function nextWord() {
    //Getting the index of the randomWord to splice of the array
    let deleteWordIndex = arrayWords.indexOf(randomWord);
    arrayWords.splice(deleteWordIndex, 1)
    if (arrayWords.length > 0) {
        getRandomWord();
    }
    else {
        userWon = true;
        winGame();
    }
}
/*--------------------------------------------------------------------------------*/
/* Function: Display the count down timer                                         */
/*--------------------------------------------------------------------------------*/
let userWon = false;
const secondsDisplay = selectById('sec');
function timer() {
    playSound();
    function updateCountdown() {
        // Stop the down count if us 0
        if (secondsCounter <= 0 && !userWon) {
            clearInterval(countdownInterval);
            gameOver();
        } else {
            secondsCounter--;
            secondsDisplay.textContent = secondsCounter;
        }
    }
    const countdownInterval = setInterval(updateCountdown, 1000);
}

/*--------------------------------------------------------------------------------*/
/* Function: Event Listener Buton Restar Game                                     */
/*--------------------------------------------------------------------------------*/
let buttonNewPlay = select(".button-new-game");
onEvent('click', buttonNewPlay, function (e) {
    stopSound();
    e.preventDefault();
    startGame();
});

/*--------------------------------------------------------------------------------*/
/* Function: Start a Game  (set values and timer)                                                        */
/*--------------------------------------------------------------------------------*/
function startGame() {
    //reStarButton.display = "block";
    setValues();
    wordInput.value = '';
    timer();
    getRandomWord();
}

/*--------------------------------------------------------------------------------*/
/* Create a new Object                                                            */
/*--------------------------------------------------------------------------------*/
const now = new Date();
let ave = 0;
if (hitsCounter >= 1) {
    ave = hitsCounter / TOTALWORDS * 100
}
const score1 = new Score();

/*--------------------------------------------------------------------------------*/
/* Function: Win Game                                                             */
/*--------------------------------------------------------------------------------*/
function winGame() {
    stopSound();
    playSoundWin();
    showModalWin();
    /*Saving a new object*/
    score1.date = formatdate(now);
    score1.hits = hitsCounter;
    score1.percentage = ave;

    printingScore();
    setValues();
}

/*--------------------------------------------------------------------------------*/
/* Function: Game Over                                                            */
/*--------------------------------------------------------------------------------*/
function gameOver() {
    stopSound();
    playSoundLost();
    showModalGameOver();
    /*Saving a new object*/
    score1.date = formatdate(now);
    score1.hits = hitsCounter;
    score1.percentage = ave;

    printingScore();
    setValues();
}

/*--------------------------------------------------------------------------------*/
/* Function: Show Modal                                                          */
/*--------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------*/
/* Function: Start-Button even listener                                            */
/*--------------------------------------------------------------------------------*/
onEvent('click', startBtn, function (e) {
    e.preventDefault();
    closeModal();
    startGame();
});

onEvent('click', winBtn, function (e) {
    e.preventDefault();
    closeModal();
    startGame();
});

onEvent('click', gameOverBtn, function (e) {
    e.preventDefault();
    closeModal();
    startGame();
});

function closeModal() {
    modal.style.display = 'none';
    modalStart.style.display = 'none';
    modalWin.style.display = 'none';
    modalGameOver.style.display = 'none';
}

function showModalStart() {
    modalWin.style.display = 'none';
    modalGameOver.style.display = 'none';
    modalStart.style.display = 'block';
}

function showModalWin() {
    modalWin.style.display = 'block';
    modalGameOver.style.display = 'none';
    modalStart.style.display = 'none';
}

function showModalGameOver() {
    modalGameOver.style.display = 'block';
    modalStart.style.display = 'none';
    modalWin.style.display = 'none';
}


/*--------------------------------------------------------------------------------*/
/* Function: Printing Performance                                                 */
/*--------------------------------------------------------------------------------*/
const performance2 = select(".performance2");
function printingScore() {
    performance2.textContent = score1.getInfo();
}

/*--------------------------------------------------------------------------------*/
/* Function: Printing SCORE                                                       */
/*--------------------------------------------------------------------------------*/
function formatdate(fecha) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZoneName: 'short'
    };

    return fecha.toLocaleString('en-US', options);
}