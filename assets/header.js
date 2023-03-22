const headerTrigger = document.querySelector('.header__trigger');
const headerOverlay = document.querySelector('.overlay');
const mobileMenu = document.querySelector('.header__mobile-menu');

// Show mobile menu when trigger is clicked
headerTrigger.addEventListener('click', () => {
    mobileMenu.classList.remove('header__mobile-menu--hidden');
    headerOverlay.style.display = 'block';
});

// Close mobile menu when overlay is clicked
headerOverlay.addEventListener('click', () => {
    mobileMenu.classList.add('header__mobile-menu--hidden');
    headerOverlay.style.display = 'none';
});

// Close mobile menu when screen is greater than 1440px;
window.addEventListener('resize', () => {
    if (window.innerWidth > 1440) {
        mobileMenu.classList.add('header__mobile-menu--hidden');
        headerOverlay.style.display = 'none';
    }
});