const burgerIcon = document.getElementById('burger-icon')
const burgerMenu = document.getElementById('burger-menu')
const burgerLine1 = document.getElementById('line1')
const burgerLine2 = document.getElementById('line2')
const burgerLine3 = document.getElementById('line3')

burgerIcon.addEventListener('click', () => {
    console.log('icon')
    burgerMenu.classList.toggle('hidden');

    const isMenuHidden = burgerMenu.classList.contains('hidden')

    if (!isMenuHidden) {
        burgerLine2.style.opacity = 0
        burgerLine1.style.transform = 'rotate(45deg) translate(10px, 3px)'
        burgerLine3.style.transform = 'rotate(-45deg) translate(10px, -3px)'
    }
    else {
        burgerLine2.style.opacity = '100%'
        burgerLine1.style.transform = 'initial'
        burgerLine3.style.transform = 'initial'
    }
})