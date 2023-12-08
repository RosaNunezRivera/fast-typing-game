'use strict';

import { Score } from "./Score.js";

import {
    onEvent,
    select,
    selectById,
} from "./utils.js";

/* To do list
Local storage 
Score board 
npm init -y
npm i lite-server -D (aka --save-dev)
        + Add a script to your package.json
        + npm run start
*/

/*--------------------------------------------------------------------------------*/
/* Function: Initialize the game                                                  */
/*--------------------------------------------------------------------------------*/
//Const Global variables
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

const TOTALWORDS = WORDS.length;
const now = new Date();

//Other Global variables
let arrayWords = WORDS;
let secondsCounter;
let hitsCounter;
let randomWord;
let ave;

//Creating HTML
const wordInput = selectById("user-word");
const userHits = selectById("hits");

//Creating HTML Modal elements 
const modalStart = select(".modal-start");
//Creating HTML bottons
const startBtn = select(".start-button");

const modalWin = select(".modal-win");
const modalGameOver = select(".modal-over");
const modal = selectById("modal");

//Creating audio elements
const soundBgMusic = new Audio('./assets/audio/background.mp3');
const soundStartGame = new Audio('./assets/audio/startgame.wav');
const audioFeedBack = new Audio('./assets/audio/getsound.mp3');
const soundWin = new Audio('./assets/audio/startgame.wav');
const soundGameOver = new Audio('./assets/audio/gameOver.wav');

//Showing Start Modal && Play StartGame Sound
showModalStart();
/*--------------------------------------------------------------------------------*/
/* Function: Set Initial Values                                                   */
/*--------------------------------------------------------------------------------*/
function setValues() {
    secondsCounter = 99;
    hitsCounter = 0;
    ave = 0;
    userWon = false;
    arrayWords = [...WORDS];
    userHits.textContent = hitsCounter;
    wordInput.value = '';
}

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

wordInput.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (wordInput.validity.valid) {
        errorMessage.innerHTML = '';
    } else {
        showtyping();
    }
});

/*--------------------------------------------------------------------------------*/
/* Function: Show word typing                                                     */
/*--------------------------------------------------------------------------------*/
function showtyping() {
    if (wordInput.validity.patternmismatch) {
        wordToWrite.textContent = wordInput.value;
    }
}

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
/* Function: Audio Elements                                                       */
/*--------------------------------------------------------------------------------*/
function playSound() {
    soundBgMusic.volume = 0.5;
    soundBgMusic.play();
}

function stopPlaySound() {
    if (!soundBgMusic.paused) {
        soundBgMusic.pause();
        soundBgMusic.currentTime = 0;
    }
}

function playStartGame() {
    soundStartGame.volume = 0.5;
    soundStartGame.play();
}

function playWin() {
    soundWin.volume = 0.5;
    soundWin.play();
}

function playGameOver() {
    soundGameOver.volume = 0.5;
    soundGameOver.play();
}

function playSoundFeedBack() {
    audioFeedBack.volume = 0.5;
    audioFeedBack.play();
}

function stopSoundFeedBack() {
    if (!audioFeedBack.paused) {
        audioFeedBack.pause();
        audioFeedBack.currentTime = 0;
    }
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
const feedback = select('.feedback');
//Getting nullish coalescing operators !Amazin
const ratings = {
    3: 'Rapid reflexes! You are a typing wizard!',
    5: 'Lightning speed! You are unstoppable!',
    10: 'Blitzing through! You are on fire!',
    35: 'Hyperspeed accuracy! You are unbeatable!',
    45: 'Turbo-typist! Incredibly fast!',
    60: 'Warp speed! You are a typing maestro!',
    80: 'Sonic typing! Unbelievably quick!',
    100: 'Flash typing! You are breaking records!',
    110: 'Swift as the wind! Youa are a keyboard ninja!',
    120: 'Rocket fingers! You are typing at Word Rush Game!'
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
        stopSoundFeedBack();
        playSoundFeedBack();
        hitsCounter++;
        userHits.textContent = hitsCounter;
        printfeedback()
        nextWord();
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
let countdownInterval;
let userWon = false;
const secondsDisplay = selectById('sec');
function timer() {
    function updateCountdown() {
        // Stop the countdown if us 0
        if (secondsCounter > 0 && !userWon) {
            secondsDisplay.textContent = secondsCounter;
            secondsCounter--;
        } else {
            clearInterval(countdownInterval);
            gameOver();
        }
    }
    countdownInterval = setInterval(updateCountdown, 1000);
}

/*--------------------------------------------------------------------------------*/
/* Function: Start-Button even listener in Start Modal                                           */
/*--------------------------------------------------------------------------------*/
onEvent('click', startBtn, function (e) {
    e.preventDefault();
    clearInterval(countdownInterval);
    closeModal();
    startGame();
});

/*--------------------------------------------------------------------------------*/
/* Function: Start a Game  (set values and timer)                                                        */
/*--------------------------------------------------------------------------------*/
function startGame() {
    setValues();
    wordInput.value = '';
    clearInterval(countdownInterval);
    playSound();
    timer();
    getRandomWord();
}

/*--------------------------------------------------------------------------------*/
/* Function: Event Listener Buton Restar Game in any moment                       */
/*--------------------------------------------------------------------------------*/
let buttonNewPlay = select(".button-new-game");
onEvent('click', buttonNewPlay, function (e) {
    stopPlaySound();
    e.preventDefault();
    playStartGame();
    startGame();
});

/*--------------------------------------------------------------------------------*/
/* Function: Average                                                              */
/*--------------------------------------------------------------------------------*/
function average() {
    ave = hitsCounter / TOTALWORDS * 100;
    return ave;
}
const score1 = new Score();
/*--------------------------------------------------------------------------------*/
/* Function: Win Game                                                             */
/*--------------------------------------------------------------------------------*/
function winGame() {
    clearInterval(countdownInterval);
    stopPlaySound();
    playWin();
    showModalWin();
    /*Saving a new object*/
    console.log('hits' + hitsCounter);
    console.log('average' + ave);
    score1.date = formatdate(now);
    score1.hits = hitsCounter;
    score1.percentage = average();
    /*Printing performance*/
    printingScoreWin();
}

/*--------------------------------------------------------------------------------*/
/* Function: Game Over                                                            */
/*--------------------------------------------------------------------------------*/
function gameOver() {
    clearInterval(countdownInterval);
    stopPlaySound();
    playGameOver();
    showModalGameOver();
    /*Saving a new object*/
    score1.date = formatdate(now);
    score1.hits = hitsCounter;
    score1.percentage = average();
    /*Printing performance*/
    printScoreOver();
}

/*--------------------------------------------------------------------------------*/
/* Function: Printing Performance                                                 */
/*--------------------------------------------------------------------------------*/
const performanceWin = selectById("perfor-win");
const performanceOver = selectById("perfor-gover");

function printingScoreWin() {
    performanceWin.textContent = score1.getInfo();
}

function printScoreOver() {
    performanceOver.textContent = score1.getInfo();
}
/*--------------------------------------------------------------------------------*/
/* Function: Show Modal                                                          */
/*--------------------------------------------------------------------------------*/
const winBtn = select(".restart-win");
const gameOverBtn = select(".restart-game-over");

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