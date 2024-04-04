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

//Picks the adjective and noun using a random number between 0 and the length of the array which contain the Nouns and Adjectives
let pickedAdjectives = adjectives[randomNumber(adjectives.length)]
let pickedNoun = nouns[randomNumber(nouns.length)]


//Checks both the Noun and Adjective length to ensure niether is longer thant 7
while (pickedAdjectives.length > 7){
    pickedAdjectives = adjectives[randomNumber(adjectives.length)]
}
while(pickedNoun.length > 7){
    pickedNoun = nouns[randomNumber(nouns.length)]
}

const username = pickedAdjectives + pickedNoun + randomNumber(99)
return username
}


async function uniqUsername() {
    
    let username = newUsername()
    
    //Creates a new username and then tests to see if its in the database. If it is itll create a new one and re test it.
    while ((await db.query("isUsername", [username]))[0].count != 0) {
      username = newUsername()
    }
    console.log(username)
    return username;
  }


module.exports = {
    uniqUsername,
    newUsername
}