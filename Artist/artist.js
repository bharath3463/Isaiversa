// sample data - replace with real data / images
const releases = [
    { title: "Super Police (OST)", year: 2025, img: "img/rel1.jpg" },
    { title: "Yenge Enathu Kavithai", year: 2025, img: "img/rel2.jpg" },
    { title: "September Madham", year: 2025, img: "img/rel3.jpg" },
    { title: "Chikiri Chikiri - Single", year: 2025, img: "img/rel4.jpg" }
];

const topSongs = [
    { title: "Chikiri Chikiri", album: "Peddi", time: "04:32", img: "img/s1.jpg" },
    { title: "Patakha Guddi", album: "Sultana", time: "05:12", img: "img/s2.jpg" },
    { title: "Yun Hi Chala Chal", album: "Highway", time: "04:10", img: "img/s3.jpg" },
    { title: "Mahhi Ve", album: "Arz Kiya", time: "05:07", img: "img/s4.jpg" },
    { title: "Kabhi Kabhi Aditi", album: "Various", time: "03:55", img: "img/s5.jpg" },
    { title: "Tere Ishq Mein", album: "Tere Ishq", time: "05:00", img: "img/s6.jpg" }
];

const stories = [
    { title: "Behind the Scenes", img: "img/story1.jpg" },
    { title: "Live at Chennai", img: "img/story2.jpg" },
    { title: "Interview 2024", img: "img/story3.jpg" }
];

function loadReleases() {
    const container = document.getElementById('releasesList');
    releases.forEach(r => {
        const div = document.createElement('div');
        div.className = 'release-card text-white';
        div.innerHTML = <
            img src = "${r.img}"
        alt = "${r.title}" >
            <
            div class = "mt-2 fw-bold" > $ { r.title } < /div> <
            div class = "small opacity-75" > $ { r.year } < /div>;
        container.appendChild(div);
    });
}

function loadTopSongs() {
    const container = document.getElementById('topSongs');
    topSongs.forEach((s, i) => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6';
        col.innerHTML = <
            div class = "song-item" >
            <
            div > < img src = "${s.img}"
        alt = "${s.title}" > < /div> <
            div class = "flex-grow-1 song-meta" >
            <
            strong > $ { i + 1 }.$ { s.title } < /strong> <
            small > $ { s.album } < /small> <
            /div> <
            div class = "text-end" >
            <
            div class = "small opacity-75" > $ { s.time } < /div> <
            div class = "mt-2" > < button class = "btn btn-sm btn-outline-light me-1"
        onclick = "likeSong(${i})" > < i class = "fa fa-heart" > < /i></button >
            <
            button class = "btn btn-sm btn-light"
        onclick = "playSong(${i})" > < i class = "fa fa-play" > < /i></button > < /div> <
            /div> <
            /div>;
        container.appendChild(col);
    });
}

function loadStories() {
    const c = document.getElementById('storiesRow');
    stories.forEach(s => {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-3 mb-3';
        col.innerHTML = <
            div class = "story-card text-white" >
            <
            img src = "${s.img}"
        alt = "${s.title}"
        style = "width:100%;height:130px;object-fit:cover;border-radius:6px" >
            <
            div class = "mt-2" > $ { s.title } < /div> <
            /div>;
        c.appendChild(col);
    });
}

// small interactions
function likeSong(i) {
    alert(Liked: $ { topSongs[i].title });
}

function playSong(i) {
    alert(Playing: $ { topSongs[i].title });
}

// follow toggle
document.addEventListener('DOMContentLoaded', () => {
    loadReleases();
    loadTopSongs();
    loadStories();

    const followBtn = document.getElementById('followBtn');
    followBtn.addEventListener('click', () => {
        const following = followBtn.classList.toggle('following');
        followBtn.classList.toggle('btn-outline-light', !following);
        followBtn.classList.toggle('btn-light', following);
        followBtn.innerHTML = following ? '<i class="fa fa-check me-2"></i>Following' : '<i class="fa fa-heart me-2"></i>Follow';
    });

    // sample play similar button
    document.getElementById('playSimilar').addEventListener('click', () => {
        alert('Shuffle & play similar tracks');
    });
});