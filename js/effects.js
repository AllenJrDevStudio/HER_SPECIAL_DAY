
document.addEventListener("DOMContentLoaded", () => {
    initParticles();
    initSurpriseEffect();
    initBirthdayPopups();
});

function initParticles() {
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrame;

    const getParticleCount = () => window.innerWidth <= 767 ? 22 : 50;

    const colors = [
        "rgba(167, 139, 250, ",
        "rgba(143, 168, 255, ",
        "rgba(245, 169, 200, ",
        "rgba(255, 255, 255, "
    ];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < getParticleCount(); i++) {
            particles.push(new Particle());
        }
    }

    window.addEventListener("resize", () => {
        resizeCanvas();
        createParticles();
    });

    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.8;
            this.baseAlpha = Math.random() * 0.4 + 0.15;
            this.alpha = this.baseAlpha;
            this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
            this.speedY = -(Math.random() * 0.3 + 0.1);
            this.speedX = (Math.random() - 0.5) * 0.2;
            this.pulseSpeed = Math.random() * 0.02 + 0.005;
            this.pulseAngle = Math.random() * Math.PI * 2;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.pulseAngle += this.pulseSpeed;
            this.alpha = this.baseAlpha + Math.sin(this.pulseAngle) * 0.15;

            if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
                this.reset();
                this.y = canvas.height + 10;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.colorPrefix + Math.max(0, this.alpha) + ")";
            ctx.shadowBlur = 10;
            ctx.shadowColor = "rgba(167, 139, 250, 0.5)";
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    createParticles();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle) => {
            particle.update();
            particle.draw();
        });
        animationFrame = requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("beforeunload", () => {
        cancelAnimationFrame(animationFrame);
    });
}

/* Surprise reveal */
function initSurpriseEffect() {
    const revealBtn = document.getElementById("reveal-btn");
    const surpriseIntro = document.getElementById("surprise-intro");
    const surpriseStage = document.getElementById("surprise-stage");
    const burstLayer = document.getElementById("burst-layer");
    const glow1 = document.getElementById("surprise-glow-1");
    const glow2 = document.getElementById("surprise-glow-2");

    if (!revealBtn || !surpriseIntro || !surpriseStage) return;

    revealBtn.addEventListener("click", () => {
        revealBtn.disabled = true;

        surpriseIntro.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        surpriseIntro.style.opacity = "0";
        surpriseIntro.style.transform = "scale(0.95)";

        setTimeout(() => {
            surpriseIntro.classList.add("hidden");

            if (glow1) {
                glow1.style.transition = "all 2s ease";
                glow1.style.background = "radial-gradient(circle, rgba(167, 139, 250, 0.45) 0%, rgba(143, 168, 255, 0.25) 50%, transparent 100%)";
                glow1.style.transform = "scale(1.3)";
            }

            if (glow2) {
                glow2.style.transition = "all 2s ease";
                glow2.style.background = "radial-gradient(circle, rgba(245, 169, 200, 0.4) 0%, rgba(255, 208, 226, 0.2) 50%, transparent 100%)";
                glow2.style.transform = "scale(1.3)";
            }

            if (burstLayer) {
                burstLayer.classList.add("active");
            }

            surpriseStage.classList.remove("hidden");
            surpriseStage.setAttribute("aria-hidden", "false");

            // Add a second, stronger birthday burst when the final button is pressed.
            createBirthdayPopups(24, 8, true);
        }, 600);
    });
}

/* Birthday elements appear as soon as surprise.html opens. */
function initBirthdayPopups() {
    if (document.body?.dataset.page !== "surprise") return;

    const layer = document.createElement("div");
    layer.className = "birthday-popups";
    layer.id = "birthday-popups";
    layer.setAttribute("aria-hidden", "true");
    document.body.appendChild(layer);

    const message = document.createElement("div");
    message.className = "birthday-message-pop";
    message.textContent = "🎂 Happy 19th Birthday! 🎉";
    layer.appendChild(message);

    createBirthdayPopups(30, 10, false);
}

function createBirthdayPopups(confettiCount, balloonCount, strongerBurst) {
    const layer = document.getElementById("birthday-popups");
    if (!layer) return;

    const confetti = ["🎉", "✨", "🎊", "⭐", "💖", "🎈", "🥳"];
    const balloons = ["🎈", "🎈", "💜", "💗", "🎈"];

    for (let i = 0; i < confettiCount; i++) {
        const item = document.createElement("span");
        item.className = "birthday-pop";
        item.textContent = confetti[Math.floor(Math.random() * confetti.length)];
        item.style.left = `${Math.random() * 100}%`;
        item.style.setProperty("--fall-time", `${(4.5 + Math.random() * 3) / (strongerBurst ? 1.15 : 1)}s`);
        item.style.setProperty("--drift", `${(Math.random() - 0.5) * 160}px`);
        item.style.animationDelay = `${Math.random() * 1.8}s`;
        layer.appendChild(item);

        item.addEventListener("animationend", () => item.remove(), { once: true });
    }

    for (let i = 0; i < balloonCount; i++) {
        const item = document.createElement("span");
        item.className = "birthday-balloon";
        item.textContent = balloons[Math.floor(Math.random() * balloons.length)];
        item.style.left = `${Math.random() * 100}%`;
        item.style.setProperty("--rise-time", `${6 + Math.random() * 4}s`);
        item.style.setProperty("--drift", `${(Math.random() - 0.5) * 220}px`);
        item.style.animationDelay = `${Math.random() * 2}s`;
        layer.appendChild(item);

        item.addEventListener("animationend", () => item.remove(), { once: true });
    }
}
