const songData = [{
    title: "Adangaatha Asuran",
    artist: "A.R.Rahman",
    album: "Raayan",
    time: "5:30",
    img: "../playlist img/Raayan.jpg",
    audio: "../playlist_audio/Mundhinam Parthene.mp3"
}, {
    title: "Water Packet",
    artist: "A.R.Rahman",
    album: "Raayan",
    time: "4:12",
    img: "../playlist img/Raayan.jpg",
    audio: "../playlist_audio/Munbe Vaa.mp3"
}, {
    title: "Odatha da Odatha da",
    artist: "A.R.Rahman",
    album: "Raayan",
    time: "5:28",
    img: "../playlist img/Raayan.jpg",
    audio: "../playlist_audio/Pookal Pookum.mp3"
}, {
    title: "Oh Raaya",
    artist: "A.R.Rahman",
    album: "Raayan",
    time: "4:31",
    img: "../playlist img/Raayan.jpg",
    audio: "../playlist_audio/Anae Anbae.mp3"
}, {
    title: "Raayan Rumble",
    artist: "A.R.Rahman",
    album: "Raayan",
    time: "4:17",
    img: "../playlist img/Raayan.jpg",
    audio: "../playlist_audio/Maruvaarthai.mp3"
}, {
    title: "Kannukulla (Reprise)",
    artist: "A.R.Rahman",
    album: "Raayan",
    time: "4:17",
    img: "../playlist img/Raayan.jpg",
    audio: "../playlist_audio/Maruvaarthai.mp3"
}, ];

// ---------- generate rows ----------
const list = document.getElementById("songList90s");

function renderList() {
    list.innerHTML = "";
    songData.forEach((s, i) => {
        // if audio missing, keep empty but don't crash
        const audioAttr = s.audio ? s.audio : "";
        list.innerHTML += `
    <div class="track-item row" data-index="${i}" data-audio="${audioAttr}">
        <div class="col-1 play-icon">${s.audio ? "▶" : "-"}</div>

        <div class="col-5 d-flex align-items-center">
            <img src="${s.img}" width="50" height="50" style="border-radius:6px; margin-right:12px;">
            <div>
                <div class="fw-bold">${s.title}</div>
                <div class="small text-muted">${s.artist}</div>
            </div>
        </div>

        <div class="col-4">${s.album}</div>
        <div class="col-2 text-end">${s.time}</div>
    </div>
`;
    });
}

renderList();

// ---------- SEARCH ----------
const searchInput = document.getElementById("searchSong");
searchInput.addEventListener("keyup", function() {
    let filter = searchInput.value.toLowerCase();
    let tracks = document.querySelectorAll(".track-item");

    tracks.forEach(track => {
        let title = track.querySelector(".fw-bold").innerText.toLowerCase();
        let artist = track.querySelector(".small").innerText.toLowerCase();

        if (title.includes(filter) || artist.includes(filter)) {
            track.style.display = "flex";
        } else {
            track.style.display = "none";
        }
    });
});

// ---------- PLAYER LOGIC ----------
let audio = new Audio();
let currentIndex = -1;
let isPlaying = false;
let progress = document.getElementById("progress");
let playPauseBtn = document.getElementById("playPauseBtn");
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
let playerTitle = document.getElementById("playerTitle");
let playerArtist = document.getElementById("playerArtist");
let playerCover = document.getElementById("playerCover");
let currentTimeEl = document.getElementById("currentTime");
let totalTimeEl = document.getElementById("totalTime");
let volumeEl = document.getElementById("volume");

// Set initial volume
audio.volume = parseFloat(volumeEl.value);

// Click on rows (delegation)
list.addEventListener("click", function(e) {
    const row = e.target.closest(".track-item");
    if (!row) return;
    const idx = parseInt(row.dataset.index);
    if (isNaN(idx)) return;
    playTrack(idx);
});

function playTrack(index) {
    const track = songData[index];
    if (!track || !track.audio) {
        // no audio available
        alert("Audio file missing for this track. Add audio path in songData.");
        return;
    }

    // if same track toggles play/pause
    if (currentIndex === index) {
        if (audio.paused) {
            audio.play();
            isPlaying = true;
            updatePlayIcons();
        } else {
            audio.pause();
            isPlaying = false;
            updatePlayIcons();
        }
        return;
    }

    // switch to new track
    currentIndex = index;
    audio.src = track.audio;
    audio.currentTime = 0;
    audio.play().catch(err => {
        console.warn("Play prevented:", err);
    });
    isPlaying = true;

    // update bottom player UI
    playerTitle.innerText = track.title;
    playerArtist.innerText = track.artist;
    playerCover.src = track.img;

    updatePlayIcons();
    highlightRow();
}

function updatePlayIcons() {
    // main button icon
    playPauseBtn.innerHTML = isPlaying ? '<i class="fa fa-pause"></i>' : '<i class="fa fa-play"></i>';

    // row icons
    document.querySelectorAll(".track-item").forEach(row => {
        const idx = parseInt(row.dataset.index);
        const iconNode = row.querySelector(".play-icon");
        if (idx === currentIndex && isPlaying) {
            iconNode.innerText = "❚❚";
            row.classList.add("playing-row");
        } else {
            iconNode.innerText = songData[idx].audio ? "▶" : "-";
            row.classList.remove("playing-row");
        }
    });
}

function highlightRow() {
    document.querySelectorAll(".track-item").forEach(row => row.classList.remove("playing-row"));
    const currentRow = document.querySelector(`.track-item[data-index="${currentIndex}"]`);
    if (currentRow) currentRow.classList.add("playing-row");
}

// Prev / Next
prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) playTrack(currentIndex - 1);
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < songData.length - 1) playTrack(currentIndex + 1);
});

// Play/pause from bottom control
playPauseBtn.addEventListener("click", () => {
    if (currentIndex === -1) {
        // play first available track
        const firstWithAudio = songData.findIndex(s => s.audio);
        if (firstWithAudio !== -1) playTrack(firstWithAudio);
        return;
    }
    if (audio.paused) {
        audio.play();
        isPlaying = true;
    } else {
        audio.pause();
        isPlaying = false;
    }
    updatePlayIcons();
});

// progress update
audio.addEventListener("timeupdate", () => {
    if (!isNaN(audio.duration) && audio.duration > 0) {
        const pct = (audio.currentTime / audio.duration) * 100;
        progress.value = pct;
        currentTimeEl.innerText = formatTime(audio.currentTime);
        totalTimeEl.innerText = formatTime(audio.duration);
    }
});

// when song ends -> auto next
audio.addEventListener("ended", () => {
    if (currentIndex < songData.length - 1) {
        playTrack(currentIndex + 1);
    } else {
        // stop
        isPlaying = false;
        updatePlayIcons();
    }
});

// seek
let seeking = false;
progress.addEventListener("input", (e) => {
    seeking = true;
    if (!isNaN(audio.duration) && audio.duration > 0) {
        const pct = parseFloat(e.target.value);
        const newTime = (pct / 100) * audio.duration;
        currentTimeEl.innerText = formatTime(newTime);
    }
});
progress.addEventListener("change", (e) => {
    if (!isNaN(audio.duration) && audio.duration > 0) {
        const pct = parseFloat(e.target.value);
        audio.currentTime = (pct / 100) * audio.duration;
    }
    seeking = false;
});

// volume control
volumeEl.addEventListener("input", (e) => {
    audio.volume = parseFloat(e.target.value);
});

// helper
function formatTime(t) {
    if (isNaN(t)) return "0:00";
    const minutes = Math.floor(t / 60);
    const seconds = Math.floor(t % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

// ensure icons correct on initial render
updatePlayIcons();
audio.muted = false;
audio.autoplay = false;