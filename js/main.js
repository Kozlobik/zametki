document.addEventListener('DOMContentLoaded', function(){

    // Variables
const colorModeBtn = document.querySelector('#color-mode');
const colorModeMenu = document.querySelector('#color-mode-menu');

    // Function
const openColorModeMenu = () => {
    colorModeMenu.classList.toggle('open');
}

    // Events

colorModeBtn.addEventListener('click', openColorModeMenu());











});
