document.addEventListener('DOMContentLoaded', function() {

    const colorModeBtn = document.querySelector('#color-mode');
    const colorModeMenu = document.querySelector('#color-mode-menu');
    const colorModeItem = document.querySelectorAll('.color-mode__choose-btn');
    const nightModeBtn = document.querySelector('.night-mode')
    const body = document.querySelector('body')
    const nightModeImg = nightModeBtn.querySelector('img')

    colorModeItem.forEach((btn) => {
        btn.addEventListener('click', () => {
            colorModeMenu.classList.remove('open')
            
            if (btn.dataset.color) {
                document.body.className = '';
                nightModeImg.src = './img/night-mode_moon.svg';
                document.body.classList.add(`${btn.dataset.color}`);

            }
        })
    })



    colorModeBtn.addEventListener('click', () => {
        colorModeMenu.classList.toggle('open')
    })


// DARK MODE


nightModeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode')
    
    if (document.body.classList.contains('dark-mode')) {
        nightModeImg.src = './img/night-mode_sun.svg'
    }
    else {
        nightModeImg.src = './img/night-mode_moon.svg'
    }

})


})