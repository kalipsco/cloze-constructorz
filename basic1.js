//Basic card constructor
var fs = require('fs');

function Basic(question, answer) {
    this.question = question;
    this.answer = answer;
}

Basic.prototype.printInfo = function() {
    console.log("Question: " + this.question + "\nAnswer: " + this.answer + "\nThis card has been added to the database!");
};

module.exports = Basic;