'use strict';

//npm init -y
//npm i lite-server -D  Only for development
//npm run start

import { PlayerBase, Player } from "./Player/Player.js";

import {
    onEvent,
    select,
    selectById,
    selectAll,
    print,
    randomNumber,
    create
} from "./utils/utility-functions.js";

//Global variables
let msg = '';
let correctWord = '';
const words = [
    {
        word: "addition",
        hint: "The process of adding numbers"
    },
    {
        word: "meeting",
        hint: "Event in which people come together"
    },
    {
        word: "number",
        hint: "Math symbol used for counting"
    },
    {
        word: "exchange",
        hint: "The act of trading"
    },
    {
        word: "html",
        hint: "Language to make a web page"
    }
];

//Creating HTML elements 
let scrambleWord = selectById("scramble-word");
let hintText = selectById("hint");
let wordInput = selectById("word");

let buttonNextWords = select(".button-play");
let buttonRestart = select(".button-restart");


//Creating HTML audio elements 
let audioWin = selectById('my-audio-win');
let audioLost = selectById('my-audio-lost');

//Creating HTML elements feebback message to user
let message = selectById('feed-back');



/*--------------------------------------------------------------------------------*/
/* Function: Star Play Button                                                      */
/*--------------------------------------------------------------------------------*/
onEvent('click', buttonNextWords, function () {
    init();
    showMessage('Enter a Valid word');
});

init();
/*--------------------------------------------------------------------------------*/
/* Function: Initialize the game                                                  */
/*--------------------------------------------------------------------------------*/
function init() {
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    scrambleWord.textContent = wordArray.join(" ");
    hintText.textContent = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();;
    wordInput.value = "";
}

/*--------------------------------------------------------------------------------*/
/* Function: Playing, validating if the word is equeal to the correct word        */
/*--------------------------------------------------------------------------------*/
function checkWord() {
    let wrd = wordInput.value.toLowerCase();
    if (wrd === correctWord) {
        audioWin.play();
        return `Congrats! ${correctWord.toUpperCase()} is the correct word`;
    } else {
        audioLost.play();
        return `Oops! ${wrd} is not the correct word`;
    }
}

/*--------------------------------------------------------------------------------*/
/* Function: Event listener Enter a word  & validate                                               */
/*--------------------------------------------------------------------------------*/
wordInput.addEventListener("keydown", function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        let isValid = validate();

        if (isValid) {
            msg = checkWord();
            showMessage(msg);
        }
    }
});

/*--------------------------------------------------------------------------------*/
/* Function: Validation if is a validad word (Not special characters, numbers)    */
/* or whitespaces                                                                 */
/*--------------------------------------------------------------------------------*/
function validate() {
    let wrd = wordInput.value.toLowerCase();

    const letterPattern = /^[A-Za-z\s]+$/;

    if (wrd.length === 0 || !letterPattern.test(wrd)) {
        wordInput.value = '';
        showMessage('Try! Enter a word!')
        audioLost.play();
        return false;
    } else {
        return true;
    }
}

/*--------------------------------------------------------------------------------*/
/* Function: Print message                                                        */
/*--------------------------------------------------------------------------------*/
function showMessage(msg) {
    message.textContent = msg;
    message.style.display = 'block';
}


// Function to play the audio - word is correct 
function playSoundWin() {
    audioWin.play();
}

// Function to play the audio - word is not correct 
function playSoundLost() {
    audioLost.play();
}




