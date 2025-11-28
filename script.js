// ------------------------------
// Search Input Active Effect
// ------------------------------
const searchInput = document.querySelector(".form-control");

if (searchInput) {
    searchInput.addEventListener("focus", () => {
        searchInput.style.border = "2px solid #1db954";
    });

    searchInput.addEventListener("blur", () => {
        searchInput.style.border = "1px solid #ccc";
    });
}


// ------------------------------
// Horizontal Scroll for sliders
// ------------------------------
const scrollContainers = document.querySelectorAll(".h-scroll");

scrollContainers.forEach((container) => {
    container.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        container.scrollLeft += evt.deltaY;
    });
});


// ------------------------------
// Click "View All" → redirect page
// ------------------------------
const viewAllBtns = document.querySelectorAll(".section-sub");

viewAllBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        window.location.href = "./browse.html";
    });
});


// ------------------------------
// Playlist Click → open playlist
// ------------------------------
const cards = document.querySelectorAll(".pod-card");

cards.forEach((card) => {
    card.addEventListener("click", () => {
        window.location.href = "./playlist.html";
    });
});


// ------------------------------
// Offcanvas Close on Link Click
// ------------------------------
const sidebarLinks = document.querySelectorAll(".sidebar-link");
const offcanvas = document.querySelector("#offcanvasScrolling");

sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
        const canvas = bootstrap.Offcanvas.getInstance(offcanvas);
        canvas.hide();
    });
});


// ------------------------------
// New Playlist Button
// ------------------------------
const newPlaylistBtn = document.querySelector(".btn-new-playlist");

if (newPlaylistBtn) {
    newPlaylistBtn.addEventListener("click", () => {
        alert("🎵 Create your new playlist feature coming soon!");
    });
}