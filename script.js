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
            categoryEl.innerHTML = `<img src="assets/images/${category}.png" alt="${category}">`;
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
            appEl.innerHTML = `<img src="https://assets.codepen.io/209984/app-icon.png" alt="${app.title}">
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
    const nav = document.querySelector('nav');

    menuIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    });

    nav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            nav.classList.remove('active');
            const targetScreen = e.target.getAttribute('href');
            if (targetScreen.startsWith('#')) {
                document.querySelectorAll('section').forEach(screen => {
                    screen.style.display = 'none';
                });
                document.querySelector(targetScreen).style.display = 'block';
            }
        }
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
