import { ResultItem, getMediaServer } from './components/ResulItems.js';
const videoPlayer = document.getElementById('videoPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const playlist = document.getElementById('playlist');
let videos = [];
let currentVideoIndex = 0;
let isPlaying = false;
let playlistInterval;

function loadVideo(index) {
    currentVideoIndex = index;
    const video = videos[index];
    videoPlayer.src = `http://localhost:3002/video/${video.id}`;
    videoPlayer.play();
    isPlaying = true;
    playPauseBtn.textContent = 'Pause';
    highlightCurrentVideo();
}

function highlightCurrentVideo() {
    const items = playlist.getElementsByClassName('playlist-item');
    for (let i = 0; i < items.length; i++) {
        items[i].style.backgroundColor = i === currentVideoIndex ? '#e0e0e0' : '';
    }
}

function playNextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    loadVideo(currentVideoIndex);
}

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        videoPlayer.pause();
        playPauseBtn.textContent = 'Play';
        clearInterval(playlistInterval);
    } else {
        videoPlayer.play();
        playPauseBtn.textContent = 'Pause';
        startPlaylistInterval();
    }
    isPlaying = !isPlaying;
});

function startPlaylistInterval() {
    clearInterval(playlistInterval);
    playlistInterval = setInterval(() => {
        playNextVideo();
    }, 10000); // Change video every 10 seconds
}

videoPlayer.addEventListener('ended', playNextVideo);

const resultList = new ResultItem('results-container');

const searchinput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');


searchButton.addEventListener('click', async () => {
    const query = searchinput.value;
    const searchData = await searchYTMusic(query);
    console.log(searchData);
    searchData.forEach(data => {
        resultList.addItem(data.thumbnails[0].url, data.name,['Subtítulo del resultado 2', 'Información adicional'], data.duration);
    })
});
async function searchYTMusic(query) {
    try {
        const response = await fetch(`http://localhost:3002/ytmusic?action=search&query=${encodeURIComponent(query)}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const searchData = await response.json();
        return searchData;
    } catch (error) {
        console.error('Failed to fetch search data:', error);
        throw error;
    }
}
// Añadir varios elementos
// await resultList.addVideoByPath("C://Users/melser/Videos/GATOmeme_de_gato_mirando_fijamente_extendido720P_HD.mp4", 'Título del Resultado 1', ['Subtítulo del resultado 1', 'Otro subtítulo relevante'], '5:30');
// resultList.addVideoBySrc('/path/to/video2.mp4', 'Título del Resultado 2', ['Subtítulo del resultado 2', 'Información adicional'], '3:45');
