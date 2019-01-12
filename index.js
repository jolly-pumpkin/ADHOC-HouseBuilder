// your code goes here ...
"use strict";

//Elements in HTML
const buttons = document.getElementsByTagName('button');
const addButton = document.getElementsByTagName('button')[0];//document.getElementsByClassName('add');
const submitButton = document.getElementsByTagName('button')[1];
const myForm = document.getElementsByTagName('form');
const ageInput = document.getElementsByTagName('age');
const relationShipSelector = document.getElementsByTagName('section');
const smokerCheckbox = document.getElementsByName('smoker');


//Additional Elements add via DOM
var removeButton = document.createElement("BUTTON");
var removeLabel = document.createTextNode("remove");
removeButton.appendChild(removeLabel);
document.body.appendChild(removeButton);





//Button click events

removeButton.onclick = function(event){
    alert("remove");
};

addButton.onclick = function(event){
    alert("add");   
};

submitButton.onclick = function(event){
    alert("submit");
};

    