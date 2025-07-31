document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const mainScreen = document.getElementById('main-screen');

    // Hide splash screen and show main screen after a delay
    setTimeout(() => {
        splashScreen.style.display = 'none';
        mainScreen.style.display = 'block';
    }, 3000);

    // Hamburger Menu Toggle
    const menuIcons = document.querySelectorAll('.menu-icon');
    // You would typically have a navigation menu to toggle
    // For this mockup, we'll just log to the console
    menuIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            console.log('Menu icon clicked');
        });
    });


    // Simple Carousel
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.classList.add('active');
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.classList.remove('active');
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.classList.remove('active');
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            carousel.scrollLeft = scrollLeft - walk;
        });
    });
});
