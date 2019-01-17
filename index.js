// your code goes here ...
"use strict";

//Elements in HTML
const buttons = document.getElementsByTagName('button');
const addButton = document.getElementsByTagName('button')[0];//document.getElementsByClassName('add');
const submitButton = document.getElementsByTagName('button')[1];
const myForm = document.getElementsByTagName('form')[0];

//Additional Elements add via DOM
addButton.type = 'button';//making add button a button and not the defualt form submit

//validation
function ValidateAge(age){
    if(isNaN(age) || age < 1){
        console.log('age validation failed');
        document.getElementsByName("age")[0].style.color = 'red'; //TODO: not showing up all the time
        return false;
    }else {
        document.getElementsByName("age")[0].style.color = 'black';
        return true;
    }
}

function ValidateRelationship(relationship){
    var validRelationships = ['self','spouse','child','parent','grandparent','other'];

    if(!validRelationships.includes(relationship)){
        console.log('relationship validation failed');
        return false;
    }else {
        return true;
    }
}

//Data POCO
function Person(id, age, relationship, smoker){
    this.id = id;
    this.age = age;
    this.relationship = relationship;
    this.smoker = smoker;
};

function HouseHold(){
    this.members = [];

    this.AddMember = function(person){
        this.members.push(person);
    }

    this.RemoveMember = function(id){
        this.members.splice(id, 1);
    }
}
var household = new HouseHold();


//Display HouseHold
function AddToDisplay(person){
    var ol = document.getElementsByClassName("household")[0];
    var newLI = document.createElement("li");
    newLI.setAttribute("id", person.id);
    var text = document.createTextNode("Age: " + person.age + ", Relation: " + person.relationship + ", Smoker: " + person.smoker + "   ");

    var removeButton = document.createElement("button");
    removeButton.innerHTML = "remove";
    removeButton.style.right = 50; //TODO: fix left align

    removeButton.onclick = function(){
        ol.removeChild(newLI);
        household.RemoveMember(person.id);
    };

    newLI.appendChild(text);
    newLI.appendChild(removeButton);
    ol.appendChild(newLI);
}

function Cleanup(){
    document.getElementsByName("age")[0].value = '';
    document.getElementsByName('rel')[0].value = '';
    document.getElementsByName('smoker')[0].checked= false;
}

addButton.onclick = function(){
    var age = document.getElementsByName("age")[0].value;
    var relationship = document.getElementsByName('rel')[0].value;
    var smoker = document.getElementsByName('smoker')[0].checked;
    if(ValidateAge(age) && ValidateRelationship(relationship)){
        var person  = new Person(HouseHold.length, age, relationship, smoker);
        household.AddMember(person);
        AddToDisplay(person);
        Cleanup();
    }
};

submitButton.onclick = function(event){
    event.preventDefault();
    ServerPost(household);
    DisplayJson(household);
};

function ServerPost(household){
    var request = new XMLHttpRequest();
    var data = JSON.stringify(household.members);
    request.open('Post', '', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send(data);
}

function DisplayJson(household){
    var debug = document.getElementsByClassName("debug")[0];
    debug.style.display = "block";
    debug.innerHTML = JSON.stringify(household.members, null, 2);
}

    