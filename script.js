class PortfolioApp {
    constructor() {
        this.name = "Zean Kyle C. Tapac";
        this.roles = [
            "Future Software Developer",
            "Web Developer", 
            "Hardware Enthusiast",
            "IoT System Builder"
        ];
        this.initTheme();

        this.typeName();
        this.rotateRole();
        this.bindEvents();
    }

    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.body.classList.add('dark');
            document.getElementById('themeBtn').textContent = '☀️';
        } else {
            document.getElementById('themeBtn').textContent = '🌙';
        }
    }

    bindEvents() {
        // Theme toggle
        document.getElementById('themeBtn').addEventListener('click', () => this.toggleDark());

        // Mobile menu
        document.getElementById('hamburger').addEventListener('click', () => {
            const navMenu = document.getElementById('nav-menu');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('nav-menu').classList.remove('active');
            });
        });
    }

    toggleDark() {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        document.getElementById('themeBtn').textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    typeName() {
        if (this.nameIndex < this.name.length) {
            document.getElementById("typing-name").textContent +=
                this.name.charAt(this.nameIndex);
            this.nameIndex++;
            setTimeout(() => this.typeName(), 120);
        }
    }

    rotateRole() {
        document.getElementById("role").textContent =
            this.roles[this.roleIndex];
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
        setTimeout(() => this.rotateRole(), 2500);
    }
}

const app = new PortfolioApp();

