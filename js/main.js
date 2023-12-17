document.addEventListener('DOMContentLoaded', function() {

    const colorModeBtn = document.querySelector('#color-mode');
    const colorModeMenu = document.querySelector('#color-mode-menu');
    const colorModeItem = document.querySelectorAll('.color-mode__choose-btn');

    colorModeItem.forEach((btn) => {
        btn.addEventListener('click', () => {
            colorModeMenu.classList.remove('open')
            
            if (btn.dataset.color) {
                document.body.className = '';
                document.body.classList.add(`${btn.dataset.color}`);

            }
        })
    })



    colorModeBtn.addEventListener('click', () => {
        colorModeMenu.classList.toggle('open')
    })

}, false);
    