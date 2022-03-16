"use strict";
(function () {
    console.log('a');
    const inputEl = document.querySelector('#new-guess-input');
    const buttonEl = document.querySelector('#new-guess-submit');

    buttonEl.disabled = inputEl.value.length !== 5;

    disableButtonIfNoInput();

    function disableButtonIfNoInput() {
        inputEl.addEventListener('input', () => {
            buttonEl.disabled = inputEl.value.length !== 5;
        });
    }
})();