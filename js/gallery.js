
document.addEventListener("DOMContentLoaded", () => {
    initGalleryInteractions();
});

function initGalleryInteractions() {
    const galleryItems = document.querySelectorAll(".gallery-item");
    if (!galleryItems.length) return;

    galleryItems.forEach((item) => {
        item.addEventListener("touchstart", () => {
            galleryItems.forEach((galleryItem) => {
                galleryItem.classList.remove("active-touch");
            });
            item.classList.add("active-touch");
        }, { passive: true });
    });

    document.addEventListener("touchstart", (event) => {
        if (!event.target.closest(".gallery-item")) {
            galleryItems.forEach((item) => {
                item.classList.remove("active-touch");
            });
        }
    }, { passive: true });
}
