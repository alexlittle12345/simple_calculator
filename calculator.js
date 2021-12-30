'use strict';

// Sidebar
let sidebarCardHolder = document.getElementById('sidebar-card-holder');
let btnClearSidebar = document.getElementById('clear-sidebar')

let cardItems;
let cardDeleteButtons;
let cardText = [];

// Input
let input = document.getElementById('input-box');

// Calculator buttons
let btnZero = document.getElementById('zero');
let btnOne = document.getElementById('one');
let btnTwo = document.getElementById('two');
let btnThree = document.getElementById('three');
let btnFour = document.getElementById('four');
let btnFive = document.getElementById('five');
let btnSix = document.getElementById('six');
let btnSeven = document.getElementById('seven');
let btnEight = document.getElementById('eight');
let btnNine = document.getElementById('nine');

let btnClear = document.getElementById('clear');

let btnDot = document.getElementById('dot');

let btnEquals = document.getElementById('equals')

let btnMinus = document.getElementById('minus');
let btnDivide = document.getElementById('divide');
let btnPlus = document.getElementById('plus');
let btnMultiply = document.getElementById('multiply');

let inputPos = 0;

let operators = ['-', 'x', '*', 'X', '+', '/']

// input event listeners
input.addEventListener("keypress", event => InputKeyPress(event))
input.addEventListener('keyup', e => {
                            //console.log('Caret at: ', e.target.selectionStart)
                            inputPos = e.target.selectionStart;
                        })
input.addEventListener('click', e => {
                            //console.log('Caret at: ', e.target.selectionStart)
                            inputPos = e.target.selectionStart;
                        })





// button event listeners
btnZero.addEventListener("click", () => InputAddText(0));
btnOne.addEventListener("click", () => InputAddText(1));
btnTwo.addEventListener("click", () => InputAddText(2));
btnThree.addEventListener("click", () => InputAddText(3));
btnFour.addEventListener("click", () => InputAddText(4));
btnFive.addEventListener("click", () => InputAddText(5));
btnSix.addEventListener("click", () => InputAddText(6));
btnSeven.addEventListener("click", () => InputAddText(7));
btnEight.addEventListener("click", () => InputAddText(8));
btnNine.addEventListener("click", () => InputAddText(9));

btnClear.addEventListener("click", () => ClearInput());

btnDot.addEventListener("click", () => InputAddText('.'));

btnMinus.addEventListener("click", () => InsertOperation('-'));
btnDivide.addEventListener("click", () => InsertOperation('/'));
btnPlus.addEventListener("click", () => InsertOperation('+'));
btnMultiply.addEventListener("click", () => InsertOperation('x'));

btnEquals.addEventListener("click", () => AddSidebarCard());

btnClearSidebar.addEventListener("click", () => ClearSidebar())





// Functions

function ClearSidebar(){
    sidebarCardHolder.innerHTML = "";
}


function AddSidebarCard(){
    if (input.value != ""){
        sidebarCardHolder.innerHTML = `<div class="sidebar-item">
                                    <button class="sidebar-item-delete">X</button>`
                                    + input.value +
                                    `</div>`
                                + sidebarCardHolder.innerHTML;

        cardText.unshift(input.value)

        //console.log(cardText);
        
        cardDeleteButtons = document.getElementsByClassName("sidebar-item-delete");
        cardItems = document.getElementsByClassName('sidebar-item');
        for (let i = 0; i < cardDeleteButtons.length; i++) {
            cardDeleteButtons[i].addEventListener('click', () => DeleteCard(i));
            cardItems[i].addEventListener('click', () => CardItemClicked(i));
        }
    }
}


function CardItemClicked(clickedItemIndex){
    if (cardText.length > 0){
        input.value = cardText[clickedItemIndex];
    }
    else{
        input.value = "";
    }
}


function DeleteCard(deleteIndex){
    let newArrayString = "";
    for (let i = 0; i < cardDeleteButtons.length; i++) {
        if (i != deleteIndex){
            newArrayString += `<div class="sidebar-item">
                                <button class="sidebar-item-delete">X</button>`
                                + cardText[i] +
                                `</div>`
        }
    }

    cardText.splice(deleteIndex, 1);

    sidebarCardHolder.innerHTML = newArrayString;

    cardDeleteButtons = document.getElementsByClassName("sidebar-item-delete");
    cardItems = document.getElementsByClassName('sidebar-item');
    for (let i = 0; i < cardDeleteButtons.length; i++) {
        cardDeleteButtons[i].addEventListener('click', () => DeleteCard(i));
        cardItems[i].addEventListener('click', () => CardItemClicked(i));
    }

    // console.log(cardText);
}

function InputKeyPress(event){
    event.preventDefault();
    let oldString = input.value;

    input.value = [input.value.slice(0, inputPos), event.key, input.value.slice(inputPos)].join('');
    inputPos = inputPos + 1;

    if (CheckInputString() == false){
        input.value = oldString;
    }
}


function InputAddText(text){
    let oldString = input.value;
    
    input.value = [input.value.slice(0, inputPos), text, input.value.slice(inputPos)].join('');
    inputPos = inputPos + 1;
    
    if (CheckInputString() == false){
        input.value = oldString;
    }
}


function CheckInputString(){
    let inputArray = input.value.split('');
    inputArray = JoinNumbers_ArrayFunc(inputArray)

    if (inputArray.at(0) == ''){
        return true;
    }

    for (let i=0; i<inputArray.length; i++){
        if (!operators.includes(inputArray[i])){
            let num = inputArray[i];
            
            // check if num
            if (isNaN(num) == true){
                return false;
            }
            
            if (num.length > 1){
                if (num.charAt(0) == 0 && num.charAt(1) != '.'){
                    return false;
                }
            }
            
        }
    }
}


function JoinNumbers_ArrayFunc(array){
    
    let returnArray = [];
    let num = [];

    for (let i=0; i<array.length; i++){
        if (!operators.includes(array[i])){
            num.push(array[i]);
        }
        else{
            num = num.join('');
            returnArray.push(num);
            returnArray.push(array[i]);

            num = [];
        }

        if (i == array.length-1){
            num = num.join('');
            returnArray.push(num);

            num = [];
        }
        
    }

    returnArray = returnArray.filter(elem => elem !== '');

    return returnArray;
}


function ClearInput(){
    input.value = "";
}


function InsertOperation(op){
    if (input.value == ""){
        if (op == "-"){
            input.value = op;
            return;
        }
        else{
            return;
        }
    }

    if (input.value.slice(-1) != " " && input.value.slice(-1) != "-"){
        input.value += op;
    }
}

