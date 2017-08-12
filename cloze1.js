//Cloze card constructor
var fs = require('fs');

function Cloze(cloze, phrase) {
    this.cloze = cloze;
    this.phrase = phrase;
}

Cloze.prototype.printClozeInfo = function() {
    console.log("Cloze: " + this.cloze + "\nPhrase: " + this.phrase + "\nThis card has been added to the database!");
};

module.exports = Cloze;