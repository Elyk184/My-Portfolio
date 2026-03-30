class PortfolioApp {
    constructor() {
        this.name = "Zean Kyle C. Tapac";
        this.roles = [
            "A 4th Year IT Student"
        ];
        this.nameIndex = 0;
        this.roleIndex = 0;
        this.initTheme();

        this.initScrollReveal();

        this.typeName();
        this.rotateRole();
        this.bindEvents();
    }

    initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe skills elements
        const skillsElements = document.querySelectorAll('#skills .skills-chip-group, #skills .tech-icon-card, #skills .tech-quote');
        skillsElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
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

        // Smooth scroll for nav links
        this.bindSmoothScroll();
    }

    bindSmoothScroll() {
        document.querySelectorAll('#navbar a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    const navbarHeight = document.querySelector('#navbar')?.offsetHeight || 80;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('#navbar a[href^="#"]');

        const updateActiveLink = () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink(); // Initial call
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

        if (this.nameIndex === 0) {
            nameElement.textContent = '';
        }

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

    const fallbackComponents = {
        navbar: `
<nav class="navbar" id="navbar">
    <div class="nav-container">
        <h2 class="logo">ZKT</h2>
        <div class="nav-actions">
            <ul class="nav-menu" id="nav-menu">
                <li><a href="#home"><i class="fas fa-house"></i> Home</a></li>
                <li><a href="#about"><i class="fas fa-user"></i> About</a></li>
                <li><a href="#projects"><i class="fas fa-folder"></i> Projects</a></li>
                <li><a href="#skills"><i class="fas fa-cogs"></i> Skills</a></li>
                <li><a href="#certificates"><i class="fas fa-award"></i> Certificates</a></li>
                <li><a href="#contact"><i class="fas fa-envelope"></i> Contact</a></li>
                <li><a href="#resume"><i class="fas fa-file-pdf"></i> Resume</a></li>
            </ul>
            <button class="dark-btn" id="themeBtn">🌙</button>
        </div>
        <button class="hamburger" id="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
</nav>`,
        footer: `
<footer>
    <p>© 2026 Zean Kyle C. Tapac</p>
</footer>`
    };

    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentName} component`);
        }

        placeholder.innerHTML = await response.text();
    } catch (error) {
        console.error(error);
        if (fallbackComponents[componentName]) {
            placeholder.innerHTML = fallbackComponents[componentName];
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        loadComponent('navbar-placeholder', 'components/navbar.html', 'navbar'),
        loadComponent('footer-placeholder', 'components/footer.html', 'footer')
    ]);
    const app = new PortfolioApp();
    app.initScrollSpy();

    // Handle browser hash changes
    window.addEventListener('hashchange', () => {
        setTimeout(() => {
            const hash = window.location.hash.substring(1);
            if (hash) {
                const target = document.getElementById(hash);
                if (target) {
                    const navbarHeight = document.querySelector('#navbar')?.offsetHeight || 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        }, 100);
    });
});

