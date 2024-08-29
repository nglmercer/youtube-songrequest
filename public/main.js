import { ResultItem, getMediaServer } from './components/ResulItems.js';
import { Queue, Controlmedia } from './components/Queueaudio.js';
import AudioPlayer from './components/AudioPlayer.js';
const videoPlayer = document.getElementById('videoPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const playlist = document.getElementById('playlist');
let videos = [];
let currentVideoIndex = 0;
let isPlaying = false;
let playlistInterval;
const currentUrl = window.location.href;
console.log(currentUrl)
const resultList = new ResultItem('results-container');
const searchinput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const queue = new Queue();
const audioPlayer = new AudioPlayer('audiotrack',
  () => controlmedia.playPreviousAudio(),
  () => controlmedia.nextaudio()
);
const controlmedia = new Controlmedia(audioPlayer);
audioPlayer.setAudioInfo('Youtube Music');
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        videoPlayer.pause();
        playPauseBtn.textContent = 'Play';
    } else {
        videoPlayer.play();
        playPauseBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
});

searchButton.addEventListener('click', async () => {
    const query = searchinput.value;
    const searchData = await searchYTMusic(query);
    console.log(searchData);
    searchData.forEach(data => {
      resultList.addItem({
          imageUrl: data.thumbnails[0].url,
          title: data.name,
          subtitles: ['Subtítulo del resultado 2', 'Información adicional'],
          duration: data.duration,
          videoId: data.videoId
      }, async (data) => {
          console.log('Clicked on:', data);
          try {

            const result = await downloadByVideoId(data.data.videoId)
            console.log(result.filePath)
            playMediaFromServer(result.filePath, 'audio')
          } catch(e) {
            console.log(e)
          }
        });
  });
});

async function searchYTMusic(query) {
    try {
        const response = await fetch(`/ytmusic?action=search&query=${encodeURIComponent(query)}`);

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
const playVideoFromServer = (videoPath) => {
    // Construct the full URL to the video on your server
    const videoUrl = `/media?mediatype=video&path=${encodeURIComponent(videoPath)}`;
    videoPlayer.src = videoUrl;
    // videoPlayer.play();
    // Set the video source and play
    return videoUrl
  };
  async function playMediaFromServer(mediaPath, mediaType = 'audio') {
    if (typeof mediaPath !== 'string') {
        console.error('mediaPath debe ser una cadena de texto.',mediaPath);
        console.log(mediaPath)
        return;
    }

    const mediaUrl = `/media?mediatype=${mediaType}&path=${encodeURIComponent(mediaPath)}`;

    try {
        if (mediaType === 'video') {
            videoPlayer.src = mediaUrl;
            await videoPlayer.play();
        } else if (mediaType === 'audio') {
            await controlmedia.addSong(mediaUrl);
        } else {
            console.warn('Tipo de media no soportado:', mediaType);
        }
    } catch (error) {
        console.error('Error al reproducir el media:', error);
    }

    return mediaUrl;
}

  // Example usage:
  const videoPathOnServer = 'videoexample.mp4'; // Assuming the video is in the same directory as index.js
  playVideoFromServer(videoPathOnServer);
// Añadir varios elementos
//await resultList.addVideoByPath(null, 'Título del Resultado 1', ['Subtítulo del resultado 1', 'Otro subtítulo relevante'], '5:30');
//resultList.addVideoBySrc('/videoexample.mp4', 'Título del Resultado 2', ['Subtítulo del resultado 2', 'Información adicional'], '3:45');

const downloadMusic = (url) => {
    fetch(`/ytmusic?action=download&url=${encodeURIComponent(url)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Handle successful download, e.g., display a download link
        if (data.message === 'Download successful') {
          console.log('Download successful:', data.filePath);
          // You could create a download link here
          // const downloadLink = document.createElement('a');
          // downloadLink.href = data.filePath;
          // downloadLink.download = 'downloaded_music.mp3';
          // downloadLink.textContent = 'Download Music';
          // document.body.appendChild(downloadLink);
        } else {
          console.error('Download failed:', data);
        }
      })
      .catch(error => {
        console.error('Error during download:', error);
      });
  };

const streamMusic = (url) => {
  const audio = new Audio(`/ytmusic?action=stream&url=${encodeURIComponent(url)}`);
  audio.play();
};

// Example usage:
// const urlToDownload = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Replace with actual YouTube URL
// downloadMusic(urlToDownload);

// const urlToStream = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Replace with actual YouTube URL
// streamMusic(urlToStream);
async function downloadByVideoId(videoId) {
  const url = `/ytmusic?action=download&url=https://www.youtube.com/watch?v=${videoId}`;

  try {
      const response = await fetch(url);

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      if (result.message === 'Download successful') {
          console.log('Download successful', result);
          return result;
      } else {
          console.error('Download failed:', result);
          return null;
      }
  } catch (error) {
      console.error('Error during download:', error);
      return null;
  }
}
