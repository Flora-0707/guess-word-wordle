const gameData = require('./game-data');
const words = require('./words');

const gameWeb = {
    gamePage: function (username, error_msg) {
        let game = gameData.getOrCreateGame(username);
        return `
            <!doctype html>
            <html>
                <head>
                    <title>Home</title>
                    <link rel="stylesheet" href="styles.css">
                </head>
                <body>
                    <div class="current-user">
                        Current user:  ${username}
                    </div>
                    <div class="valid-words-list">
                        ${words.sort().join(", ")}
                    </div>
                    <div class="guessed-words">
                        ${gameWeb.renderGuessedWords(game.guesses)}
                    </div>
                    <div class="game-points">
                        ${gameWeb.renderPoints(game.attempts)}
                    </div>
                    <div class="game-status">
                        ${gameWeb.renderGameStatus(game, error_msg)}
                    </div>
                    <div class="new-guess">
                        <form action="/guess" method="post">
                            <input type="text" id="new-guess-input" name="guess" placeholder="Enter your guess" autofocus>
                            <input type="submit" id="new-guess-submit" value="Submit">
                        </form>
                    </div>
                    <div class="start-new-game">
                        <form action="/new-game" method="post">
                            <input type="submit" value="New Game">
                        </form>
                    </div>
                    <div class="logout">
                        <form action="/logout" method="post">
                            <input type="submit" value="Logout">
                        </form>
                    </div>

                    <script src="game.js"></script>
                </body>
            </html>
        `;
    },

    renderGuessedWords: function (guesses) {
        return `
            Guessed words:</br>
            ${guesses.map(guess => `${guess.word}(${guess.matches})`).join(", ")}
        `;
    },

    renderPoints: function (attempts) {
        return `
            Count of valid guesses: ${attempts}
        `;
    },

    renderGameStatus: function (game, error_msg) {
        if (error_msg) {
            return error_msg;
        }
        if (game.guesses.length === 0) {
            return `Please make your guess!`;
        }
        if (game.isEnded) {
            return `Congradulation! The answer is: ${game.answer}, game ended!`;
        }
        return 'Wrong, please try again.';
    }
}

module.exports = gameWeb;