//PACKAGES
var fs = require('fs'); // File system 
var inquirer = require('inquirer'); 
var jsonfile = require('jsonfile'); 
var Basic = require("./basic1.js"); 
var Cloze = require('./cloze1.js');

// More
var app = process.argv[2];
var questions = []; 
var clozeQuestions = []; 

// Begin App
if (app === undefined) {

    console.log('Enter "Basic" or "Cloze" to choose a flash card type.');
} else if (app.toLowerCase() === "basic") {

    // Basic chooses to save basic Flash Cards
    console.log('Make a flashcard yo.');

    // Questions for front and back
    var prompts = [{
        type: "input",
        name: "question",
        message: "What's on the front?"
    }, {
        type: "input",
        name: "answer",
        message: "What's on the back?"
    }];

    // First Response Handler
    var questionResponse = function(answers) {
        var newQuestion = new Basic(answers.question, answers.answer);
        newQuestion.printInfo();
        var newQuestionJSON = JSON.stringify(newQuestion);
        questions.push(newQuestionJSON);

        // Touches then pushes to the txt file
        fs.appendFileSync('basicflashcard.txt', newQuestionJSON + "\n");

        // Checks to see if multiple cards are needed
        return inquirer.prompt([{
            name: "anotha one",
            message: "anotha one?",
            type: "confirm",
            default: true
        }]);
    };

    // Multiple repsonses 
    var anothaOne = function(one) {
        if (one.another) {
            prompt();
        } else {
            console.log("Number of cards: " + questions.length + ".");
        }
    };

    // Err check
    var error = function(err) {
        console.log("SO WRONG!!!");
    };

    // puts all user input together
    var prompt = function() {
        inquirer.prompt(prompts)
            .then(questionResponse, handleError)
            .then(anothaOne, handleError);
    };

    prompt();
}

//Moves user into cloze cards
else if (app.toLowerCase() === "cloze") {
    // Tests the cloze statement
    console.log('Cloze-ing Time!');
    // Creating user prompts to create front and rear of cloze flash cards
    var clozePrompt = [{
        type: "input",
        name: "cloze",
        message: "What would you like hidden (Cloze)?"
    }, {
        type: "input",
        name: "phrase",
        message: "What is the text of the card to finish the question?"
    }];

    // handle the first repsonse input from the user
    var clozePrompt = function(clozeAnswers) {
        var newClozeQuestion = new Cloze(clozeAnswers.cloze, clozeAnswers.phrase);
        newClozeQuestion.printClozeInfo();
        var newClozeQuestionJSON = JSON.stringify(newClozeQuestion);
        clozeQuestions.push(newClozeQuestionJSON);

        // creates and pushes to the txt file
        fs.appendFileSync('clozeflashcard.txt', newClozeQuestionJSON + "\n");

        // Checks to see if user wanted to input more than one flash card at a time
        return inquirer.prompt([{
            name: "anotherCloze",
            message: "Add another Cloze Card?",
            type: "confirm",
            default: true
        }]);
    };

    // handler for multiple repsonses from user
    var anothaClozeResponse = function(two) {
        if (two.anotherCloze) {
            clozePrompt();
        } else {
            console.log("Number of Flashcards added to database: " + questions.length + ".");
        }
    };

    // Checks for errors and responsis given
    var handleClozeError = function() {
        console.log("ERROR ERROR!");
    };

    // compiles all of the users input
    var promptForClozeQuestion = function() {
        inquirer.prompt(clozePrompt)
            .then(clozePrompt, handleClozeError)
            .then(anothaClozeResponse, handleClozeError);
    };

    promptForClozeQuestion();

} else {
    console.log('Enter "Basic" or "Cloze" to choose a flash card type.');
}