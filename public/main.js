import { ResultItem, getMediaServer, getDivItem } from './components/ResulItems.js';
import { Queue, Controlmedia } from './components/Queueaudio.js';
import AudioPlayer from './components/AudioPlayer.js';
import MediaQueue, { ScrollableContainer } from './components/MediaQueue.js';
import UserData, { DivManager } from './components/Userdata.js';
import socketManager from './components/socket.js';
// import SocketManager from '../server/socketmanager.js';

const videoPlayer = document.getElementById('videoPlayer');
const playlist = document.getElementById('playlist');
let videos = [];
let currentVideoIndex = 0;
let isPlaying = false;
let playlistInterval;
const currentUrl = window.location.href;
console.log(currentUrl);

const resultList = new ResultItem('results-container');
const searchinput = document.getElementById('search-input');
const userData = new UserData("userData");
const manager = new DivManager('Sugerencias', 'Sugerencias-div', userData.getLastItems('text', 10), (item, div) => {
  console.log('Div clicked:', item, div);
  searchYTMusic(item);
});


const mediaQueue = new MediaQueue();
let playlistconfig = {
  visibleRange: 10,
  itemClass: 'scrollable-item',
}
const playlistItems =  new ScrollableContainer("playlist",playlistconfig);
const videoPlayer123 = document.getElementById('videoPlayer2');
const audioPlayer123 = document.getElementById('audioPlayer');
document.querySelector(".search-container").addEventListener("submit", async function (event) {
  event.preventDefault();
  const query = searchinput.value;
  const searchData = await searchYTMusic(query);
  console.log(searchData);
  // handleResults(searchData);
});
socketManager.on('search', (data) => handleResults(data));

console.log("userData",userData.getLastItems('text', 10))
async function searchYTMusic(query) {
  userData.addItem('text', query);
  manager.addDiv(query);
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
function handleResults(results) {
  const items = results.map(data => {
      console.log("results data", data);
      let resultsOptions = mapResultOptions(data);
      let callback = null;

      switch (data.type) {
          case 'SONG':
          case 'VIDEO':
              callback = () => getAndPlay(data, resultsOptions);
              break;
          case 'ALBUM':
          case 'PLAYLIST':
              fetchPlaylistInfo(data.playlistId, data);
              return; // No sigue en este caso, ya se maneja en fetchPlaylistInfo
          case 'ARTIST':
              return; // No hace nada por ahora
          default:
              console.error('Invalid result type:', data.type);
              return;
      }

      if (resultsOptions?.videoId) {
          return { data: resultsOptions, onClickCallback: callback };
      }
  }).filter(item => item !== undefined); // Filtra los casos que no devuelven un item

  // Crear un nuevo bloque de items en la parte superior
  resultList.addBlock(items, false); // Inserta el bloque en la parte superior
}
function mapResultOptions(data) {
  const commonOptions = {
    imageUrl: data.thumbnails[0].url,
    title: data.name,
    subtitles: [data.artist?.name || data.artistId, data.name]
  };

  switch (data.type) {
    case 'SONG':
    case 'VIDEO':
      return { ...commonOptions, duration: data.duration, videoId: data.videoId };
    case 'ALBUM':
    case 'PLAYLIST':
      return {
        ...commonOptions,
        year: data.year,
        playlistId: data.playlistId,
        artist: data.artist.artistId,
        artistName: data.artist.name
      };
    case 'ARTIST':
      return commonOptions;
    default:
      return {};
  }
}
socketManager.on('getPlaylist', (data) => handlePlaylistInfo(data));
async function fetchPlaylistInfo(playlistId, data) {
  try {
    const url = new URL(window.location + 'ytmusic');
    url.searchParams.append('action', 'getplaylist');
    url.searchParams.append('query', playlistId);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const playlistInfo = await response.json();
    // handlePlaylistInfo(playlistInfo);
  } catch (error) {
    console.error('Error fetching playlist info:', error);
  }
}
function handlePlaylistInfo(playlistInfo) {
  if (!playlistInfo.videos) {
    console.log("playlistInfo return", playlistInfo);
    return;
  }
  localStorage.setItem('lastPlaylistInfo', JSON.stringify(playlistInfo));

  console.log('Playlist Info:', playlistInfo);

  // Agrupamos los elementos en un array de items
  const items = playlistInfo.videos.map(videoData => {
      const videoOptions = {
          imageUrl: videoData.thumbnails[0].url,
          title: videoData.title,
          subtitles: [videoData.channel.author, videoData.title],
          duration: videoData.length / 1000,
          videoId: videoData.video_id,
          artist: videoData.channel.id,
          artistName: videoData.channel.author,
      };

      const customCallback = () => getAndPlay(videoData, videoOptions);
      return { data: videoOptions, onClickCallback: customCallback };
  });

  // Crear un nuevo bloque de items en la parte superior
  resultList.addBlock(items, false); // Inserta el bloque en la parte superior
}
if (localStorage.getItem('lastPlaylistInfo')) {
  const lastResultItems = JSON.parse(localStorage.getItem('lastPlaylistInfo'));
  handlePlaylistInfo(lastResultItems);
}
// Ejemplo de uso
async function getAndPlay(data, resultsoptions) {
  console.log("getAndPlay", data, resultsoptions);
  socketManager.emitMessage('getAndPlay', { data, resultsoptions });
}
socketManager.on('getAndPlayResponse', (responsedata) => {
  const { data: { data, resultsoptions } } = responsedata;
  const videoId = data.videoId || data.video_id;
  if (!videoId) {
    console.error('Video ID is undefined',responsedata);
    return;
  }

  const videoUrl = `${window.location}ytmusic?action=stream&url=https://www.youtube.com/watch?v=${videoId}&mediatype=video`;
  const audioUrl = `${window.location}ytmusic?action=stream&url=https://www.youtube.com/watch?v=${videoId}&mediatype=audio`;

  const customCallback = () => {
    // mediaQueue.addMediaItem({ url: videoUrl, type: 'video' });
    // mediaQueue.addMediaItem({ url: audioUrl, type: 'audio' });
    mediaQueue.next(videoPlayer123, audioPlayer123);
  };

  playlistItems.addDivItem(getDivItem(resultsoptions, customCallback));
  console.log("playlistItems", playlistItems, videoUrl, audioUrl);

  // mediaQueue.addMediaItem({ url: videoUrl, type: 'video' });
  // mediaQueue.addMediaItem({ url: audioUrl, type: 'audio' });
  mediaQueue.addMediaUrls(audioUrl, videoUrl, audioPlayer123, videoPlayer123);
  mediaQueue.playCurrentMedia(videoPlayer123, audioPlayer123);
});
socketManager.on('streamMedia', async ({ videoUrl, audioUrl, mediaType, url }) => {
  console.log("streamMedia", videoUrl, audioUrl, mediaType, url);
});


async function streamMedia(url, mediaElement) {
  const response = await fetch(url);
  console.log("streamMedia",response)
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  mediaElement.src = response.url;
}

const playVideoFromServer = (videoPath) => {
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
            // await controlmedia.addSong(mediaUrl);
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
