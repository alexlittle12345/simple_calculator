'use strict';

// Sidebar
let sidebarCardHolder = document.getElementById('sidebar-card-holder');
let btnClearSidebar = document.getElementById('clear-sidebar')

let cardItems;
let cardDeleteButtons;
let cardText = [];
let results = [];

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

let operators = ['-', 'x', '+', '/'];
let validChar = [')', '(', '.', '-', 'x', '+', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

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

btnEquals.addEventListener("click", () => Equals());

btnClearSidebar.addEventListener("click", () => ClearSidebar())





// Functions

function Equals(){
    let array = [];
    array = ParseInput(input.value);

    let ans = Calc(array);

    AddSidebarCard(' = '+ans);

    console.log(array);
    
    console.log(ans);

    input.value = ans;
}

function Calc(array){
    let newArray = array;
    let checkArray;

    // Divide
    checkArray = newArray.filter(el => el === '/');
    while (checkArray.length > 0){
        for (let i=0; i<newArray.length; i++){
            if (newArray[i] == '/'){
                let newArray1 = newArray.slice(0, i-1);
                let newArray2 = newArray.slice(i+2, newArray.length);
                let a = [newArray[i-1] / newArray[i+1]];
                newArray = newArray1.concat(a, newArray2);
                console.log(newArray);
                checkArray = newArray.filter(el => el === '/');
                break;
            }
        }
    }

    // multiply
    checkArray = newArray.filter(el => el === 'x');
    while (checkArray.length > 0){
        for (let i=0; i<newArray.length; i++){
            if (newArray[i] == 'x'){
                let newArray1 = newArray.slice(0, i-1);
                let newArray2 = newArray.slice(i+2, newArray.length);
                let a = [newArray[i-1] * newArray[i+1]];
                newArray = newArray1.concat(a, newArray2);
                console.log(newArray);
                checkArray = newArray.filter(el => el === 'x');
                break;
            }
        }
    }

    // Addition
    checkArray = newArray.filter(el => el === '+');
    while (checkArray.length > 0){
        for (let i=0; i<newArray.length; i++){
            if (newArray[i] == '+'){
                let newArray1 = newArray.slice(0, i-1);
                let newArray2 = newArray.slice(i+2, newArray.length);
                let a = [newArray[i-1] + newArray[i+1]];
                newArray = newArray1.concat(a, newArray2);
                console.log(newArray);
                checkArray = newArray.filter(el => el === '+');
                break;
            }
        }
    }

    // Subtraction
    checkArray = newArray.filter(el => el === '-');
    while (checkArray.length > 0){
        for (let i=0; i<newArray.length; i++){
            if (newArray[i] == '-'){
                let newArray1 = newArray.slice(0, i-1);
                let newArray2 = newArray.slice(i+2, newArray.length);
                let a = [newArray[i-1] - newArray[i+1]];
                newArray = newArray1.concat(a, newArray2);
                console.log(newArray);
                checkArray = newArray.filter(el => el === '-');
                break;
            }
        }
    }

    return newArray[0];
}


function ClearSidebar(){
    sidebarCardHolder.innerHTML = "";
}


function AddSidebarCard(result){
    if (input.value != ""){
        sidebarCardHolder.innerHTML = `<div class="sidebar-item">
                                        <button class="sidebar-item-delete"><b>X</b></button>
                                        <p id="cardText">`+input.value+`</p>
                                        <b>`+result+`</b>
                                        </div>`
                                        + sidebarCardHolder.innerHTML;

        cardText.unshift(input.value)
        results.unshift(result);

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
                                <button class="sidebar-item-delete"><b>X</b></button>
                                <p id="cardText">`+cardText[i]+`</p>
                                <b>`+results[i]+`</b>
                                </div>`
        }
    }

    cardText.splice(deleteIndex, 1);
    results.splice(deleteIndex, 1);

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
    
}


function InputAddText(text){
    let oldString = input.value;
    
    input.value = [input.value.slice(0, inputPos), text, input.value.slice(inputPos)].join('');
    inputPos = inputPos + 1;
    
    
}


function CheckInputString(){
    
}


function ParseInput(input){
    let inputArray = input.split('');
    
    let returnArray = [];
    let num = [];
    let isNeg = false;

    for (let i=0; i<inputArray.length; i++){
        let char = inputArray[i];

        // check valid character
        if (!validChar.includes(char)){
            return undefined;
        }


        if (numbers.includes(char)){
            num.push(char);
            
        }


        if (operators.includes(char)){
            if (char == '-' && (operators.includes(inputArray[i-1]) || i==0)){
                isNeg = true;
            }
            else{
                num = num.join('');
                num = parseFloat(num);
                if (isNeg == true){
                    num = -num;
                }
                isNeg = false;
                returnArray.push(num);
                returnArray.push(char);

                num = [];
            }
        }


        if (i == inputArray.length-1){
            num = num.join('');
            num = parseFloat(num);
            if (isNeg == true){
                num = -num;
            }
            isNeg = false;
            returnArray.push(num);

            num = [];
        }        
    }

    return returnArray;
}


function ClearInput(){
    input.value = "";
}


function InsertOperation(op){
    
}

