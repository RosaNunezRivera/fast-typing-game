'use strict';

import {
    onEvent,
    select,
    selectById,
    selectAll,
} from "./utils.js";


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

//Other Global variables
let arrayWords;
let userWon;
let countdownInterval;
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

//Loading the game the first time
showModalStart();
setValues();

/*--------------------------------------------------------------------------------*/
/* Function: Event listener to avoid reload the page                              */
/*--------------------------------------------------------------------------------*/
onEvent('beforeunload', window, function (e) {
    e.returnValue = undefined;
    e.preventDefault();
    wordInput.focus();
});

onEvent('load', window, function (ev) {
    ev.returnValue = undefined;
    ev.preventDefault();
    wordInput.focus();
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
feedback.textContent = "";
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
const buttonNewPlay = select(".button-new-game");
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

/*--------------------------------------------------------------------------------*/
/* Function: Win Game                                                             */
/*--------------------------------------------------------------------------------*/
function winGame() {
    clearInterval(countdownInterval);
    stopPlaySound();
    playWin();
    showModalWin();
    /*Saving a new object*/
    saveScore();
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
    saveScore();
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
        minute: '2-digit'
    };

    return fecha.toLocaleString('en-US', options);
}


/*--------------------------------------------------------------------------------*/
/* Function: Dialog                                                               */
/*--------------------------------------------------------------------------------*/
const btnDialogs = document.querySelectorAll('.btn-dialog');
const dialog = select('dialog');
const closeModalButtons = document.querySelectorAll('.close-modal-dialog');

btnDialogs.forEach(btnDialog => {
    btnDialog.addEventListener('click', () => {
        const modalId = btnDialog.getAttribute('data-modal-target');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.showModal();
            printScore();
        }
    });
});


closeModalButtons.forEach(closeModalButton => {
    closeModalButton.addEventListener('click', () => {
        const modals = document.querySelectorAll('dialog');
        modals.forEach(modal => modal.close());
    });
});

dialog.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    if (e.clientY < rect.top || e.clientY > rect.bottom ||
        e.clientX < rect.left || e.clientX > rect.right) {
        dialog.close();
    }
})

/*--------------------------------------------------------------------------------*/
/* Function: Create normal object Scores                                          */
/*--------------------------------------------------------------------------------*/
function saveScore() {
    //Get the actual score in localStorage 
    let boardScore = [];
    boardScore = JSON.parse(localStorage.getItem('boardScore')) || [];
    //Add the user's score that is playing 
    const score = {
        date: formatdate(new Date()),
        hits: hitsCounter,
        percentage: ave
    };
    //Add the new use's score to the array 
    boardScore.push(score);
    const arraySorted = getSortArray(boardScore);
    //Set new Score in Local Storage
    localStorage.setItem('boardScore', JSON.stringify(arraySorted));
}

function getSortArray(arr) {
    arr.sort((a, b) => {
        // Comparing by hits 
        if (b.hits !== a.hits) {
            return b.hits - a.hits;
        }
        // Comparing by dates if the hits are the same 
        return new Date(a.date) - new Date(b.date);
    });

    //Deleting the elements from the 10 forward 
    arr.splice(9);
    return arr;
}
/*-------------------------------------------------------*/
/*  Function: Get List of Scores                        */
/*-------------------------------------------------------*/
const gridContainer = select('.list');
function printScore() {
    gridContainer.innerHTML = '';
    let rows = 1;
    const storedBoardScore = localStorage.getItem('boardScore');

    if (storedBoardScore !== null && storedBoardScore !== undefined) {
        const scoreArray = JSON.parse(storedBoardScore);
        rows = scoreArray.length;

        // Setting rows
        gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        // Adding the scores 
        if (scoreArray.length > 0) {
            for (let i = 0; i < scoreArray.length; i++) {
                const scoreItem = document.createElement("p");
                scoreItem.classList.add('score-info');
                scoreItem.innerHTML = `${(i + 1).toString().padStart(2, '0')} | ${scoreArray[i].date} | ${scoreArray[i].hits}`;
                gridContainer.appendChild(scoreItem);
            }
        } else {
            const scoreItem = document.createElement("p");
            scoreItem.classList.add('score-info');
            scoreItem.innerHTML = `The game has not been played`;
            gridContainer.appendChild(scoreItem);
        }
    }
    else {
        const scoreItem = document.createElement("p");
        scoreItem.classList.add('score-info');
        scoreItem.innerHTML = `The game has not been played`;
        gridContainer.appendChild(scoreItem);
    }
}
