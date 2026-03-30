class PortfolioApp {
    constructor() {
        this.name = "Zean Kyle C. Tapac";
        this.roles = [
            "A 4th Year IT Student"
        ];
        this.nameIndex = 0;
        this.roleIndex = 0;
        this.initTheme();

        this.typeName();
        this.rotateRole();
        this.bindEvents();
    }

    initTheme() {
        const themeButton = document.getElementById('themeBtn');
        if (!themeButton) return;

        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.body.classList.add('dark');
            themeButton.textContent = '☀️';
        } else {
            themeButton.textContent = '🌙';
        }
    }

    bindEvents() {
        const themeButton = document.getElementById('themeBtn');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        // Theme toggle
        if (themeButton) {
            themeButton.addEventListener('click', () => this.toggleDark());
        }

        // Mobile menu
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu on link click
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    toggleDark() {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        const themeButton = document.getElementById('themeBtn');
        if (themeButton) {
            themeButton.textContent = isDark ? '☀️' : '🌙';
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    typeName() {
        const nameElement = document.getElementById("typing-name");
        if (!nameElement) return;

        if (this.nameIndex < this.name.length) {
            nameElement.textContent += this.name.charAt(this.nameIndex);
            this.nameIndex++;
            setTimeout(() => this.typeName(), 120);
        }
    }

    rotateRole() {
        const roleElement = document.getElementById("role");
        if (!roleElement || this.roles.length === 0) return;

        roleElement.textContent = this.roles[this.roleIndex];
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
        setTimeout(() => this.rotateRole(), 2500);
    }
}

async function loadComponent(placeholderId, componentPath, componentName) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentName} component`);
        }

        placeholder.innerHTML = await response.text();
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        loadComponent('navbar-placeholder', 'components/navbar.html', 'navbar'),
        loadComponent('footer-placeholder', 'components/footer.html', 'footer')
    ]);
    new PortfolioApp();
});

