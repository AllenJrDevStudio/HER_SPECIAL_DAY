
const CONFIG = {
    herName: "Nereen Rayne Chan",
    birthdayAge: 19,
    transitionSpeed: 600
};

document.addEventListener("DOMContentLoaded", () => {
    initLoader();
    initPageTransitions();
});

function initLoader() {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 1200);
    }
}

function initPageTransitions() {
    const triggers = document.querySelectorAll(".transition-trigger");

    triggers.forEach((trigger) => {
        trigger.addEventListener("click", (event) => {
            const targetUrl = trigger.getAttribute("href");
            if (!targetUrl || targetUrl.startsWith("#")) return;

            event.preventDefault();

            document.body.style.transition =
                `opacity ${CONFIG.transitionSpeed}ms cubic-bezier(0.16, 1, 0.3, 1), ` +
                `transform ${CONFIG.transitionSpeed}ms cubic-bezier(0.16, 1, 0.3, 1)`;
            document.body.style.opacity = "0";
            document.body.style.transform = "scale(0.98)";

            setTimeout(() => {
                window.location.href = targetUrl;
            }, CONFIG.transitionSpeed);
        });
    });
}

