// Welcome to my Spotify clone 🎵
// Initial setup
let currentSong = 0;
let audio = new Audio('songs/1.mp3');
let playButton = document.getElementById('masterPlay');
let progressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songTitle = document.getElementById('masterSongName');
let allSongs = Array.from(document.getElementsByClassName('songItem'));

// Song list
let playlist = [
  { name: "Warriyo - Mortals", file: "songs/1.mp3", cover: "covers/1.jpg" },
  { name: "Cielo - Huma-Huma", file: "songs/2.mp3", cover: "covers/2.jpg" },
  { name: "DEAF KEV - Invincible", file: "songs/3.mp3", cover: "covers/3.jpg" },
  { name: "Different Heaven & EH!DE", file: "songs/4.mp3", cover: "covers/4.jpg" },
  { name: "Janji - Heroes Tonight", file: "songs/5.mp3", cover: "covers/5.jpg" },
  { name: "Rabba - Salam-e-Ishq", file: "songs/6.mp3", cover: "covers/6.jpg" },
  { name: "Sakhiyaan - Salam-e-Ishq", file: "songs/7.mp3", cover: "covers/7.jpg" },
  { name: "Bhula Dena - Salam-e-Ishq", file: "songs/8.mp3", cover: "covers/8.jpg" },
  { name: "Tumhari Kasam - Salam-e-Ishq", file: "songs/9.mp3", cover: "covers/9.jpg" }
];

// Updating each song card
allSongs.forEach((item, i) => {
  item.getElementsByTagName("img")[0].src = playlist[i].cover;
  item.getElementsByClassName("songName")[0].innerText = playlist[i].name;
});

// Play/pause main button
playButton.addEventListener('click', () => {
  if (audio.paused || audio.currentTime <= 0) {
    audio.play();
    playButton.classList.remove('fa-play-circle');
    playButton.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
  } else {
    audio.pause();
    playButton.classList.remove('fa-pause-circle');
    playButton.classList.add('fa-play-circle');
    gif.style.opacity = 0;
  }
});

// Update progress bar
audio.addEventListener('timeupdate', () => {
  let progress = parseInt((audio.currentTime / audio.duration) * 100);
  progressBar.value = progress;
});

// Seek audio position
progressBar.addEventListener('change', () => {
  audio.currentTime = (progressBar.value * audio.duration) / 100;
});

// Reset all small play buttons
function resetPlays() {
  let allButtons = document.getElementsByClassName('songItemPlay');
  Array.from(allButtons).forEach((btn) => {
    btn.classList.remove('fa-pause-circle');
    btn.classList.add('fa-play-circle');
  });
}

// Handle individual song play buttons
let playIcons = document.getElementsByClassName('songItemPlay');
Array.from(playIcons).forEach((icon) => {
  icon.addEventListener('click', (e) => {
    resetPlays();
    currentSong = parseInt(e.target.id);
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    audio.src = playlist[currentSong].file;
    songTitle.innerText = playlist[currentSong].name;
    audio.currentTime = 0;
    audio.play();
    gif.style.opacity = 1;
    playButton.classList.remove('fa-play-circle');
    playButton.classList.add('fa-pause-circle');
  });
});

// Next song button
document.getElementById('next').addEventListener('click', () => {
  currentSong = (currentSong + 1) % playlist.length;
  audio.src = playlist[currentSong].file;
  songTitle.innerText = playlist[currentSong].name;
  audio.currentTime = 0;
  audio.play();
  playButton.classList.remove('fa-play-circle');
  playButton.classList.add('fa-pause-circle');
});

// Previous song button
document.getElementById('previous').addEventListener('click', () => {
  currentSong = (currentSong - 1 + playlist.length) % playlist.length;
  audio.src = playlist[currentSong].file;
  songTitle.innerText = playlist[currentSong].name;
  audio.currentTime = 0;
  audio.play();
  playButton.classList.remove('fa-play-circle');
  playButton.classList.add('fa-pause-circle');
});
