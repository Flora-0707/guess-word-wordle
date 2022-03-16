const words = require("./words");

const games = {
    "yuwang77": {
        answer: "robot",
        guesses: [
            {
                word: "about",
                matches: 1,
            },
            {
                word: "reign",
                matches: 1,
            },
        ],
        isEnded: false,
    },
};

function randomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function createGame(username) {
    games[username] = {
        answer: randomWord(),
        guesses: [],
        isEnded: false,
        attempts: 0,
    };
    console.log(username);
    console.log(games[username].answer);
}

function getOrCreateGame(username) {
    if (games[username] === undefined) {
        createGame(username);
    }
    return games[username];
}

function getGame(username) {
    return games[username];
}

function createGuess(guess, matches) {
    return {
        word: guess,
        matches: matches,
    };
}

function compare(answer, guess) {
    letterOfAnswer = calLetters(answer);
    lettersOfGuess = calLetters(guess);
    matches = 0;
    for (x in lettersOfGuess) {
        if (letterOfAnswer[x] !== undefined) {
            matches += Math.min(letterOfAnswer[x], lettersOfGuess[x]);
        }
    }
    return matches;
}

function calLetters(word) {
    d = {};
    for (i = 0; i < word.length; i++) {
        if (d[word[i]] === undefined) {
            d[word[i]] = 1;
        } else {
            d[word[i]] += 1;
        }
    }
    return d;
}

const gameData = {
    createGame,
    getGame,
    getOrCreateGame,
    createGuess,
    compare,
    calLetters,
}

module.exports = gameData;