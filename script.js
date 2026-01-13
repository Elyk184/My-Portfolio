class PortfolioApp {
    constructor() {
        this.name = "Zean Kyle C. Tapac";
        this.roles = [
            "Future Software Developer",
            "Web Developer",
            "Hardware Enthusiast",
            "IoT System Builder"
        ];
        this.nameIndex = 0;
        this.roleIndex = 0;

        this.typeName();
        this.rotateRole();
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

    toggleDark() {
        document.body.classList.toggle("dark");
        const btn = document.getElementById("themeBtn");

        if (document.body.classList.contains("dark")) {
            btn.textContent = "☀️";
        } else {
            btn.textContent = "🌙";
        }
    }
}

const app = new PortfolioApp();
