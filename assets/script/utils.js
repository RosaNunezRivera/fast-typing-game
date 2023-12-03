'use strict';

// Utility functions

//Create a event listener 
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

//Select a element by class name
function select(selector, parent = document) {
    return parent.querySelector(selector);
}

//Select a element by id name
function selectById(selector, parent = document) {
    return parent.getElementById(selector);
}

//Select all elements
function selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}

//Create a new element 
function create(element, parent = document) {
    return parent.createElement(element);
}

// Generate random number between - and including - 'min' and 'max'
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to print  
function print(...args) {
    console.log(args.join(', '));
}

//Export functions
export {
    onEvent,
    select,
    selectById,
    selectAll,
    print,
    randomNumber,
    create
};
