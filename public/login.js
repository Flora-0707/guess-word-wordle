"use strict";
(function () {
    console.log('a');
    const inputEl = document.querySelector('#username');
    const buttonEl = document.querySelector('#submit');

    buttonEl.disabled = !inputEl.value;

    disableButtonIfNoInput();

    function disableButtonIfNoInput() {
        inputEl.addEventListener('input', () => {
            buttonEl.disabled = !inputEl.value;
        });
    }
})();