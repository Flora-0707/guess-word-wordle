const loginWeb = {
    loginPage: function (login_error) {
        return `
            <!doctype html>
            <html>
                <head>
                    <title>Express Login</title>
                    <link rel="stylesheet" href="styles.css">
                </head>
                <body class="login">
                    <h3>Homepage</h3>
                    <div class="login-error">
                        ${loginWeb.renderLoginError(login_error)}
                    </div>
                    <form action="/login" method="post">
                        Please enter your username:
                        <input type="text" id="username" name="username">
                        <input type="submit" id="submit" value="Login">
                    </form>

                    <script src="login.js"></script>
                </body>
            </html>
        `;
    },

    renderLoginError: function (login_error) {
        if (login_error) {
            return login_error;
        }
        return "";
    }
};

module.exports = loginWeb;