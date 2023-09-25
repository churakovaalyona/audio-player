const player = document.querySelector('.player');
const playBtn = document.querySelector('.btn_play');
const nextSongBtn = document.querySelector('.btn_next');
const previousSongBtn = document.querySelector('.btn_prev');
const audio = document.querySelector('.audio');
const progressBar = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress_container');
const songTitle = document.querySelector('.song_title');
const songCover = document.querySelector('.cover');
const imgSrc = document.querySelector('.img_src');
const currentMoment = document.querySelector('.current_moment');
const durationElement = document.querySelector('.duration');

const songs = ['Sade - Smooth Operator', 'Sade - Kiss of Life', 'Sade - The Sweetest Taboo', 'Sade - Flow'];
let songIndex = 0;

function loadSong(song) {
    songTitle.innerHTML = song;
    audio.src = `audio/${song}.mp3`;
    songCover.src = `images/cover${songIndex + 1}.jpeg`;
}
loadSong(songs[songIndex]);

function playSong() {
    player.classList.add('play');
    audio.play();
    imgSrc.src = 'svg/pause.svg';
}

function pauseSong() {
    player.classList.remove('play');
    imgSrc.src = 'svg/play.svg';
    audio.pause();
}

playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

nextSongBtn.addEventListener('click', nextSong);

function previousSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

previousSongBtn.addEventListener('click', previousSong);

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

audio.addEventListener('timeupdate', updateProgress);

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener('click', setProgress);

// Duration and current time display
function timeProgress() {
    let { currentTime } = audio;
    currentMoment.textContent = formatTime(currentTime);

    audio.addEventListener('loadedmetadata', function () {
        durationElement.textContent = formatTime(audio.duration);
        loadingElement.style.display = 'none'; // Hide the loading indicator
    }, { once: true });

    // Show the loading indicator until metadata is loaded
    loadingElement.style.display = 'block';
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formattedTime;
}

audio.addEventListener('timeupdate', timeProgress);