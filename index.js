// your code goes here ...
"use strict";

//Elements in HTML
const buttons = document.getElementsByTagName('button');
const addButton = document.getElementsByTagName('button')[0];//document.getElementsByClassName('add');
const submitButton = document.getElementsByTagName('button')[1];
const myForm = document.getElementsByTagName('form')[0];



//Additional Elements add via DOM
addButton.type = 'button';//making add button a button and not the defualt form submit


var removeButton = document.createElement("BUTTON");
var removeLabel = document.createTextNode("remove");
removeButton.appendChild(removeLabel);
document.body.appendChild(removeButton);







//validation

//Data POCO
function Person(age, relationship, smoker){
    this.age = age;
    this.relationship = relationship;
    this.smoker = smoker;
};

var HouseHold = [];


//Display HouseHold
function AddToDisplay(person)
{
    var ol = document.getElementsByClassName("household")[0];
    var newLI = document.createElement("li");
    var text = document.createTextNode("Age: " + person.age + " Relation: " + person.relationship + " Smoker: " + person.smoker);
    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    newLI.appendChild(text);
    newLI.appendChild(checkBox);
    ol.appendChild(newLI);
}

//Cleanup
function Cleanup(){
    document.getElementsByName("age")[0].value = '';
    document.getElementsByName('rel')[0].value = '';
    document.getElementsByName('smoker')[0].checked= false;
}


//Button click events
removeButton.onclick = function(event){
    alert("remove");
};

addButton.onclick = function(event){
    var age = document.getElementsByName("age")[0].value;

    if(isNaN(age) || age < 1){
        alert("enter real age");
    }

    var relationship = document.getElementsByName('rel')[0].value;

    /*
    if(isNaN(relationship)){
        alert('relationship is required');
    }
    */

    var smoker = document.getElementsByName('smoker')[0].checked;


    var person  = new Person(age, relationship, smoker);

    console.log(person);

    HouseHold.push(person);

    console.log(HouseHold);


    AddToDisplay(person);

    Cleanup();
};

submitButton.onclick = function(event){
    alert("submit");
};

    