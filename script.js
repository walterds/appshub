document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const mainScreen = document.getElementById('main-screen');

    // Hide splash screen and show main screen after a delay
    setTimeout(() => {
        splashScreen.style.display = 'none';
        mainScreen.style.display = 'block';
        populateCategories();
    }, 3000);

    function populateCategories() {
        const categoryGrid = document.querySelector('#main-screen .category-grid');
        categoryGrid.innerHTML = '';
        for (const category in appsByCategory) {
            const categoryEl = document.createElement('div');
            categoryEl.className = 'category-item';
            categoryEl.innerHTML = `<img src="https://via.placeholder.com/120x120" alt="${category}">
                                    <p>${category}</p>`;
            categoryEl.addEventListener('click', () => showCategoryScreen(category));
            categoryGrid.appendChild(categoryEl);
        }
    }

    function showCategoryScreen(category) {
        mainScreen.style.display = 'none';
        const categoryScreen = document.getElementById('category-screen');
        categoryScreen.style.display = 'block';
        const categoryTitle = categoryScreen.querySelector('h2');
        categoryTitle.textContent = category;
        const appList = categoryScreen.querySelector('.app-list');
        appList.innerHTML = '';
        appsByCategory[category].forEach(app => {
            const appEl = document.createElement('div');
            appEl.className = 'app-item';
            appEl.innerHTML = `<img src="https://via.placeholder.com/60x60" alt="${app.title}">
                                <div>
                                    <h3>${app.title}</h3>
                                    <p>12 MB</p>
                                </div>
                                <button class="download-btn">Download</button>`;
            appEl.addEventListener('click', () => showAppDetailScreen(app));
            appList.appendChild(appEl);
        });
    }

    function showAppDetailScreen(app) {
        const categoryScreen = document.getElementById('category-screen');
        categoryScreen.style.display = 'none';
        const appDetailScreen = document.getElementById('app-detail-screen');
        appDetailScreen.style.display = 'block';
        const appTitle = appDetailScreen.querySelector('h2');
        appTitle.textContent = app.title;
        // You would typically fetch more app details here
    }

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
