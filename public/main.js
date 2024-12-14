// frontend no usan modulos si existen modules estan mal solo importamos los modulos que hemos creado
import UserData, { DivManager } from './components/Userdata.js';
//import socketManager from './components/socket.js';
const ws = new WebSocket('ws://localhost:3000');
// Evento de conexión establecida
ws.onopen = () => {
  console.log('WebSocket connected');
};
const actionsevents = {
  searchSong: {
    action: 'searchSong',
    callback: (data) => handleResults(data),
  },
  getplaylistinfo: {
    action: 'getplaylistinfo',
    callback: (data) => handlePlaylistInfo(data),
  },
  api: {
    action: 'api',
    callback: (data) => handleApi(data),
  },
};
function handleApi(data) {
  console.log("handleApi", data);
  if (data && data.action === 'searchSong') {
    searchYTMusic(data.query);
  }
}
// Evento de mensaje recibido
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (!message.action) {
    console.log("message", message);
    return;
  }
  if (!message.data || !message.data) {
    console.log("message", message);
    return;
  }
//  console.log('Message received:', message);
  if (actionsevents[message.action]) {
    actionsevents[message.action].callback(message.data);
  } else {
    console.log("message", message);
  }
};

// Evento de error
ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

// Evento de desconexión
ws.onclose = () => {
  console.log('WebSocket disconnected');
};
//const resultList = new ResultItem('results-container');
const carousel = document.querySelector('suggestion-carousel');
const searchInput = document.querySelector('search-input');
const userData = new UserData("userData");
const allsugestions = userData.getLastItems('text', 10);
const gridcontainer = document.getElementById('results-grid');
const gridlist = document.getElementById('gridlist');
//console.log("userData",userData.getLastItems('text', 10))

allsugestions.forEach(item => carousel.createButton(`${item}`, 'buttonClicked', { message: item }));
carousel.addEventListener('buttonClicked', (e) => {
  const elementtext = e.detail.message;
  if (elementtext && elementtext.length > 0) {
    console.log(e.detail.message);
    searchYTMusic(e.detail.message);
  }
});
const mediaPlayer = document.getElementById('mediaPlayer');

searchInput.addEventListener('search-submitted', (e) => {
  const query = e.detail.query;
  if (query.length > 0) {
    console.log('Búsqueda enviada:', e.detail.query);
    searchYTMusic(query);
  }
});
async function searchYTMusic(query) {
  userData.addItem('text', query);
  const message = {
    action: 'searchSong',
    data: { query },
  };

  ws.send(JSON.stringify(message));
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
  console.log("items", items);
  // Crear un nuevo bloque de items en la parte superior
  //resultList.addBlock(items, false); // Inserta el bloque en la parte superior
  gridcontainer.addVideoItems(items);
  gridlist.addVideoItems(items);
}
gridcontainer.addEventListener('video-click', (event) => {
  const data = event.detail;
  //console.log("data", data);
  getAndPlay(data);
  //console.log("video-click", event);
});
function mapResultOptions(data) {
  // Find the thumbnail with the largest dimensions
  const getLargestThumbnail = (thumbnails) => {
    if (!thumbnails || thumbnails.length === 0) return null;
    
    return thumbnails.reduce((largest, current) => {
      // If no largest yet, or current has larger width/height
      if (!largest || 
          (current.width && (!largest.width || current.width > largest.width)) ||
          (current.height && (!largest.height || current.height > largest.height))) {
        return current;
      }
      return largest;
    });
  };

  // Get the largest thumbnail or the first available
  const thumbnailImage = getLargestThumbnail(data.thumbnails);
  
  const commonOptions = {
    imageUrl: thumbnailImage ? thumbnailImage.url : null,
    title: data.name,
    subtitles: [data.artist?.name || data.artistId, data.name]
  };

  switch (data.type) {
    case 'SONG':
    case 'VIDEO':
      return { 
        ...commonOptions, 
        duration: data.duration, 
        videoId: data.videoId 
      };
    
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
async function fetchPlaylistInfo(playlistId, data) {
/*   try {
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
  } */
  const message = {
    action: 'getplaylistinfo',
    data: { playlistId },
  };

  ws.send(JSON.stringify(message));
}
function handlePlaylistInfo(playlistInfo) {
  // Helper function to get the largest thumbnail
  const getLargestThumbnail = (thumbnails) => {
    if (!thumbnails || thumbnails.length === 0) return null;
    
    return thumbnails.reduce((largest, current) => {
      // If no largest yet, or current has larger width/height
      if (!largest || 
          (current.width && (!largest.width || current.width > largest.width)) ||
          (current.height && (!largest.height || current.height > largest.height))) {
        return current;
      }
      return largest;
    });
  };

  if (!playlistInfo || !playlistInfo.videos) {
    console.log("playlistInfo return", playlistInfo);
    return;
  }

  localStorage.setItem('lastPlaylistInfo', JSON.stringify(playlistInfo));
  console.log('Playlist Info:', playlistInfo);

  // Agrupamos los elementos en un array de items
  const items = playlistInfo.videos.map(videoData => {
    // Get the largest thumbnail
    const largestThumbnail = getLargestThumbnail(videoData.thumbnails);

    const videoOptions = {
      imageUrl: largestThumbnail ? largestThumbnail.url : null,
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
  gridcontainer.addVideoItems(items);
  gridlist.addVideoItems(items);
}
if (localStorage.getItem('lastPlaylistInfo')) {
  const lastResultItems = JSON.parse(localStorage.getItem('lastPlaylistInfo'));
  handlePlaylistInfo(lastResultItems);
}
async function getAndPlay(data, resultsoptions) {
  try {
    console.log("getAndPlay", data);

    // Extraer el videoId con manejo de errores
    const videoId = typeof data.videoId === 'string' ? data.videoId 
                   : typeof data.video_id === 'string' ? data.video_id 
                   : null;

    if (!videoId) {
      console.error('Video ID is invalid or undefined');
      return;
    }

    // Verificar que window.location sea un string válido
    const baseLocation = typeof window.location === 'string' ? window.location : window.location.toString();
    
    // Construir URLs de video y audio
    const videoUrl = `${baseLocation}stream?url=https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}&type=video`;
    const audioUrl = `${baseLocation}stream?url=https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}&type=audio`;

    // Verificar que mediaPlayer esté definido
    if (typeof mediaPlayer !== 'undefined' && mediaPlayer.setAttribute) {
      mediaPlayer.setAttribute('video-src', videoUrl);
      mediaPlayer.setAttribute('audio-src', audioUrl);
      console.log("Media player attributes set successfully");
    } else {
      console.error('mediaPlayer is not defined or does not support setAttribute');
    }
  } catch (error) {
    console.error('An error occurred in getAndPlay:', error);
  }
}


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
document.getElementById('btntest').addEventListener('click', async () => {
  //sendWebhookData("http://localhost:3000/api", "api", { action: "searchSong", query: "test" });
  // params 1 api_url 2 api_event 3 api_data { action, query }
  // data_action = text, data_query = text
});

const sendWebhookData = async (url,action, data) => {
  const payload = { event: action, payload: data };

  try {
      const response = await fetch(url || '', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
      });

      if (!response.ok) {
          throw new Error(`Error en la respuesta: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Resultado:', result);
  } catch (error) {
      console.error('Error:', error);
  }
};