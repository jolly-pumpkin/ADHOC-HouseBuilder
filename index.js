// your code goes here ...
'use strict';

var htmlElements = {
    addButton : document.querySelector('.add'),
    submitButton: document.querySelector('button[type="submit"]'),
    age: document.querySelector('input[name="age"]'),
    rel: document.querySelector('select[name="rel"]'),
    smoker: document.querySelector('input[name="smoker"]'),
    householdList: document.querySelector('.household'),
    debug: document.querySelector('.debug')
};

//Moding the dom
htmlElements.addButton.type = 'button';
var ageSpan = document.createElement('span');
htmlElements.age.parentNode.appendChild(ageSpan);
var relSPan = document.createElement('span');
htmlElements.rel.parentNode.appendChild(relSPan);

var errorMessageing = {
    age: document.querySelector('input[name="age"] + span'),
    rel: document.querySelector('select[name="rel"] + span'),
}

htmlElements.addButton.onclick = function(){
    var age = document.getElementsByName("age")[0].value;
    var relationship = document.getElementsByName('rel')[0].value;
    var smoker = document.getElementsByName('smoker')[0].checked;

    //do both checks so we can display both error messages if needed
    var isAgeValid = ValidateAge(age);
    var isRelValid = ValidateRelationship(relationship)

    if( isAgeValid && isRelValid ){
        var person  = new Person(HouseHold.length, age, relationship, smoker);
        household.AddMember(person);
        AddToDisplay(person);
        Cleanup();
    }
};

htmlElements.submitButton.onclick = function(event){
    event.preventDefault();
    ServerPost(household);
    DisplayJson(household);
};

//Data
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


//validation methods
function ValidateAge(age){
    if(isNaN(age) || age < 1){
        errorMessageing.age.innerHTML = 'Age is invalid, please enter an age greater than 0';
        return false;
    }else {
        errorMessageing.age.innerHTML = '';
        return true;
    }
}

function ValidateRelationship(relationship){
    const validRelationships = ['self','spouse','child','parent','grandparent','other'];
    if(!validRelationships.includes(relationship)){
        errorMessageing.rel.innerHTML = ' Relationship is invalid, please select a relationship';
        return false;
    }else {
        errorMessageing.rel.innerHTML = '';
        return true;
    }
}

//Display HouseHold
function AddToDisplay(person){
    var newLI = document.createElement("li");
    newLI.setAttribute("id", person.id);
    var text = document.createTextNode("Age: " + person.age + ", Relation: " + person.relationship + ", Smoker: " + person.smoker);

    var removeButton = document.createElement("button");
    removeButton.innerHTML = "remove";

    removeButton.onclick = function(){
        htmlElements.householdList.removeChild(newLI);
        household.RemoveMember(person.id);
    };

    newLI.appendChild(text);
    newLI.appendChild(removeButton);
    htmlElements.householdList.appendChild(newLI);
}

function Cleanup(){
    htmlElements.age.value = '';
    htmlElements.rel.value = '';
    htmlElements.smoker.checked= false;
}

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