document.addEventListener('DOMContentLoaded', function() {

    const colorModeBtn = document.querySelector('#color-mode');
    const colorModeMenu = document.querySelector('#color-mode-menu');
    const colorModeItem = document.querySelectorAll('.color-mode__choose-btn');

    colorModeItem.forEach((btn) => {
        btn.addEventListener('click', () => {
            colorModeMenu.classList.remove('open')
            
            if (btn.dataset.color) {
                console.log(btn.dataset.color);
                console.log(document.body);
            }
        })
    })



    colorModeBtn.addEventListener('click', () => {
        colorModeMenu.classList.toggle('open')
    })

}, false);
    