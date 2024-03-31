const { log } = require('console');
const fs = require('fs');
const path = require('path');
const db = require('../database/index.js');

// Define the file paths relative to the current script file
const adjectFilePath = path.join(__dirname, 'adjectivelist.txt');
const nounFilePath = path.join(__dirname, 'nounlist.txt');

function textimporter(filename){
    try{
        const data = fs.readFileSync(filename, 'utf8');

        const words = data.split('\n').map(word => word.trim());

        return words;

    } catch (err) {
        console.error('Error reading file:', err);
        return [];
    }
}

function randomNumber(length){
    return Math.floor(Math.random() * (length - 0 + 1)) + 0;
}


function newUsername(){
const adjectives = textimporter(adjectFilePath)
const nouns = textimporter(nounFilePath)
let pickedAdjectives = adjectives[randomNumber(adjectives.length)]
let pickedNoun = nouns[randomNumber(nouns.length)]

while (pickedAdjectives.length > 7){
    pickedAdjectives = adjectives[randomNumber(adjectives.length)]
}
while(pickedNoun > 7){
    pickedNoun = nouns[randomNumber(nouns.length)]
}

const username = pickedAdjectives + pickedNoun + randomNumber(99)
return username
}


async function uniqUsername() {
    
    let username = newUsername()
    
    while ((await db.query("isUsername", [username]))[0].count != 0) {
        console.log("retry");
      username = newUsername()
    }
    return username;
  }


module.exports = {
    uniqUsername
}