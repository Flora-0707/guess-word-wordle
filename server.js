const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

const loginWeb = require('./login-web');
const gameWeb = require('./game-web');
const gameData = require('./game-data');
const words = require('./words');

const PORT = 3000;
const app = express();
app.use(cookieParser());
app.use(express.static('./public'));

const sessions = {};
let error_msg = "";

app.get('/', (req, res) => {
    const sid = req.cookies["session-id"];
    const username = sessions[sid];
    if (username === undefined) {
        res.send(loginWeb.loginPage());
    } else {
        res.send(gameWeb.gamePage(username, error_msg));
    }
});

app.post('/login', express.urlencoded({ extended: false }), (req, res) => {
    error_msg = "";
    const { username } = req.body;
    let success = true;
    let lettersCount = 0;
    let numbersCount = 0;
    for (let i = 0; i < username.length; i++) {
        if (username[i].match(/[a-z]/i)) {
            lettersCount += 1;
        } else if (username[i].match(/[0-9]/)) {
            numbersCount += 1;
        } else {
            success = false;
            break;
        }
    }
    if (lettersCount === 0 || numbersCount === 0) {
        success = false;
    }
    if (success) {
        const sid = uuidv4();
        sessions[sid] = username;
        res.cookie("session-id", sid, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
        res.redirect('/');
    } else {
        error_msg = "Invalid Username. Username must be combination of letters and numbers";
        res.send(loginWeb.loginPage(error_msg));
    }
});

app.post('/logout', express.urlencoded({ extended: false }), (req, res) => {
    const sid = req.cookies["session-id"];
    delete sessions[sid];
    res.clearCookie("session-id");
    res.redirect('/');
});

app.post('/new-game', express.urlencoded({ extended: false }), (req, res) => {
    error_msg = "";
    const sid = req.cookies["session-id"];
    const username = sessions[sid];
    if (username === undefined) {
        error_msg = "Invalid Session. Please login.";
        res.send(loginWeb.loginPage(error_msg));
        return;
    }
    gameData.createGame(username);
    res.redirect('/');
});

app.post('/guess', express.urlencoded({ extended: false }), (req, res) => {
    let { guess } = req.body;
    guess = guess.toLowerCase();
    const sid = req.cookies["session-id"];
    const username = sessions[sid];
    const game = gameData.getGame(username);
    error_msg = "";
    if (game === undefined) {
        error_msg = "Invalid Session. Please login.";
        res.send(loginWeb.loginPage(error_msg));
        return;
    }
    if (game.isEnded) {
        res.sendStatus(403);
        return;
    }
    if (words.indexOf(guess) === -1) {
        error_msg = `Invalid guess: ${guess}. Try again.`;
        res.redirect('/');
        return;
    }
    game.attempts += 1;
    const matches = gameData.compare(game.answer, guess);
    game.guesses.push(gameData.createGuess(guess, matches));
    if (matches === 5) {
        game.isEnded = true;
    }
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));