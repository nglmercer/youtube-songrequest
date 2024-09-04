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
document.querySelector(".search-container").addEventListener("submit", async function(event) {
  event.preventDefault();
  const query = searchinput.value;
  const searchData = await searchYTMusic(query);
  console.log(searchData);
  handleResults(searchData);
})
const queue = new Queue();
const audioPlayer = new AudioPlayer('audiotrack',
  () => controlmedia.playPreviousAudio(),
  () => controlmedia.nextaudio()
);
const controlmedia = new Controlmedia(audioPlayer);

const videoPlayer123 = document.getElementById('videoPlayer2');
const audioPlayer123 = document.getElementById('audioPlayer');


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
    handleResults(searchData);
});
function handleResults(results) {
  results.forEach(data => {
    console.log("results data",data)
    let resultsoptions = {}
    let callback = null;
    switch (data.type) {
      case 'VIDEO':
        resultsoptions = {
          imageUrl: data.thumbnails[0].url,
          title: data.name,
          subtitles: [data.artist.name, 'Nombre del autor'],
          duration: data.duration,
          videoId: data.videoId
        }
        callback = () => getandplay(data);
        break;
      case 'ALBUM':
        resultsoptions = {
          imageUrl: data.thumbnails[0].url,
          title: data.name,
          subtitles: [data.artist.name, 'Nombre del autor'],
          year: data.year,
          playlistId: data.playlistId,
          artist: data.artist.artistId,
          artistName: data.artist.name,
        }
      break;
      case 'PLAYLIST':
        resultsoptions = {
          imageUrl: data.thumbnails[0].url,
          title: data.name,
          subtitles: [data.artist.name, 'Nombre del autor'],
          year: data.year,
          playlistId: data.playlistId,
          artist: data.artist.artistId,
          artistName: data.artist.name,
        }
        fetchPlaylistInfo(data.playlistId);
      break;
      case 'ARTIST':
        resultsoptions = {
          imageUrl: data.thumbnails[0].url,
          title: data.name,
          subtitles: [data.artistId, 'Nombre del autor'],
        }
        break;
      default:
        console.error('Invalid result type:', data.type);
        break;
    }
    if (resultsoptions && resultsoptions.videoId) {
      AddItemstoPlaylist(resultsoptions, callback);
    }
  })
}
function AddItemstoPlaylist(options, onClickCallback = null) {
  resultList.addItem(options, onClickCallback);
}
async function getandplay(data) {
  const videoUrl = `http://localhost:9002/ytmusic?action=stream&url=https://www.youtube.com/watch?v=${data.videoId}&mediatype=video`;
  const audioUrl = `http://localhost:9002/ytmusic?action=stream&url=https://www.youtube.com/watch?v=${data.videoId}&mediatype=audio`;
  // Stream Video
  streamMedia(videoUrl, videoPlayer123);

  // Stream Audio
  streamMedia(audioUrl, audioPlayer123);

  // console.log('Clicked on:', data,"data.videoId",data.videoId);
  // try {

  //   const result = await downloadByVideoId(data.videoId)
  //   console.log("result",result)

  // } catch(e) {
  //   console.log(e)
  // }
}
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
  // const videoPathOnServer = 'videoexample.mp4'; // Assuming the video is in the same directory as index.js
  // playVideoFromServer(videoPathOnServer);
// Añadir varios elementos
//await resultList.addVideoByPath(null, 'Título del Resultado 1', ['Subtítulo del resultado 1', 'Otro subtítulo relevante'], '5:30');
//resultList.addVideoBySrc('/videoexample.mp4', 'Título del Resultado 2', ['Subtítulo del resultado 2', 'Nombre del autor'], '3:45');

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
          console.log('Download successful:', data);
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
async function streamMedia(url, mediaElement) {
  const response = await fetch(url);
  console.log("streamMedia",response)
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  mediaElement.src = response.url;
}

async function fetchPlaylistInfo(playlistId) {
  try {
      // Define la URL con los parámetros necesarios
      const url = new URL('http://localhost:9002/ytmusic');
      url.searchParams.append('action', 'getplaylist');
      url.searchParams.append('query', playlistId);

      // Realiza la petición al servidor usando fetch
      const response = await fetch(url);

      // Verifica si la respuesta fue exitosa
      if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      // Procesa la respuesta como JSON
      const playlistInfo = await response.json();
      let resultsoptions = {}
      // Maneja la información de la playlist obtenida
      console.log('Playlist Info:', playlistInfo);
      playlistInfo.video.forEach(data => {
        resultsoptions = {
          imageUrl: data.thumbnails[0].url,
          title: data.tittle,
          subtitles: [data.channel.author, 'Nombre del autor'],
          duration: data.length / 1000,
          videoId: data.video_id,
          artist: data.channel.id,
          artistName: data.channel.author,
        }
        callback = () => getandplay(data);
        if (data && data.videoId || data.video_id) {
          AddItemstoPlaylist(resultsoptions, callback);
        }
      })
      // Aquí puedes actualizar la interfaz de usuario con la información obtenida
  } catch (error) {
      console.error('Error fetching playlist info:', error);
  }
}
