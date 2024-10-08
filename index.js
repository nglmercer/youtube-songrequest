const express = require('express')
const fs = require('fs')
const { pipeline } = require('stream');
const path = require('path')
const cors = require('cors')
const http = require('http');
const { YTMusicManager, YTStreamDownloader } = require('./server/youtubeDownloader')
const SocketManager = require('./server/socketmanager');
const { getPlaylist } = require('yt-stream');
const app = express()
const port = parseInt(process.env.PORT) || process.argv[3] || 9002
// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.static('public'));
const server = http.createServer(app);
const socketManager = new SocketManager(server); // Crear instancia de SocketManager
const ytmusicmanager = new YTMusicManager()
const ytDownloader = new YTStreamDownloader()

server.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
// socketManager.on('ytstream', ({ url, mediaType, outputPath }) => {

// })
app.get('/ytmusic', async (req, res) => {
  const { action, query, url, outputPath = 'output.mp3' || 'output.mp4' } = req.query;

  handleYtmusicRequest(action, query, url, outputPath, req, res);
});
let lastStreamedUrl = null; // Guardar el último URL emitido
const streamCache = new Map(); // Caché de streams
async function handleYtmusicRequest(action, query, url, outputPath,req = null, res = null, socket = null) {
  if (!action) {
    if (res) {
      return res.status(400).send('Action not specified');
    } else if (socket) {
      return socket.emit('error', 'Action not specified');
    }
  }

  try {
    switch (action) {
      case 'getplaylist':
        if (!query) {
          if (res) return res.status(400).send('PlaylistId not specified');
          if (socket) return socket.emit('error', 'PlaylistId not specified');
        }
        const playlistInfo = await ytDownloader.getplaylistinfo(query);
        socketManager.emitEventToAll('getPlaylist', playlistInfo);
        if (res) return res.json(playlistInfo);
        if (socket) return socket.emit('getPlaylist', playlistInfo);
        break;

      case 'search':
        if (!query) {
          if (res) return res.status(400).send('Query not specified');
          if (socket) return socket.emit('error', 'Query not specified');
        }
        const searchResults = await ytmusicmanager.searchSong(query);
        socketManager.emitEventToAll('search', searchResults);
        if (res) return res.json(searchResults);
        if (socket) return socket.emit('search', searchResults);
        break;

      case 'download':
        if (!url) {
          if (res) return res.status(400).send('URL not specified');
          if (socket) return socket.emit('error', 'URL not specified');
        }
        const downloadResult = await ytDownloader.download(url, outputPath);
        if (downloadResult.success) {
          const response = {
            message: 'Download successful',
            filePath: downloadResult.outputPath,
            stream: downloadResult,
          };

          if (res) return res.json(response);
          if (socket) return socket.emit('download', response);
        } else {
          if (res) return res.status(500).send('Download failed');
          if (socket) return socket.emit('error', 'Download failed');
        }
        break;

        case 'stream':
        if (!url) {
          if (res) return res.status(400).send('URL not specified');
          if (socket) return socket.emit('error', 'URL not specified');
        }

        const mediaType = res ? req.query.mediatype : socket.query.mediatype || 'audio';

        // Generar una URL única para el stream
        const streamId = Math.random().toString(36).substring(7);
        if (streamCache.has(streamId)) {
          const cachedStream = streamCache.get(streamId);
          res.setHeader('Content-Type', mediaType === 'video' ? 'video/mp4' : 'audio/mpeg');
          cachedStream.pipe(res); // Transmitir vía HTTP
        } else {
          const ytStream = await ytDownloader.stream(url, { type: mediaType });

          // Almacenar el stream en caché
          streamCache.set(streamId, ytStream);

          if (res) {
            res.setHeader('Content-Type', mediaType === 'video' ? 'video/mp4' : 'audio/mpeg');
            ytStream.pipe(res); // Transmitir vía HTTP
          }
        }
          if (lastStreamedUrl !== url) {
            lastStreamedUrl = url; // Actualizar la última URL emitida
            console.log("url", url, mediaType);
            socketManager.emitEventToAll('streamMedia', {
              url,
              mediaType,
              videoUrl: `ytmusic?action=stream&url=${url}&mediatype=video=${streamId}`,
              audioUrl: `ytmusic?action=stream&url=${url}&mediatype=audio=${streamId}`
            });
          }
          break;

      default:
        if (res) return res.status(400).send('Invalid action');
        if (socket) return socket.emit('error', 'Invalid action');
    }
  } catch (error) {
    console.error('Error handling YTMusic request:', error);

    if (res) {
      res.status(500).send('Internal server error');
    } else if (socket) {
      socket.emit('error', 'Internal server error');
    }
  }
}


app.get('/media', (req, res) => {
  const mediaType = req.query.mediatype;
  const mediaPath = req.query.path ? req.query.path : getDefaultMediaPath(mediaType);
  if (!mediaType) {
    return res.status(400).send('Media type not specified');
  }
  if (!fs.existsSync(mediaPath)) {
    return res.status(404).send(`${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} not found`);
  }

  const stat = fs.statSync(mediaPath);
  const fileSize = stat.size;
  const range = req.headers.range;
  const contentType = getContentType(mediaType);

  // Aumentar el tamaño del chunk a 10MB (ajusta según tus necesidades)
  const CHUNK_SIZE = 10 * 1024 * 1024;

  if (range && mediaType === 'video') {
    const parts = range.replace(/bytes=/, '').split('-');
    let start = parseInt(parts[0], 10);
    let end = parts[1] ? parseInt(parts[1], 10) : Math.min(start + CHUNK_SIZE, fileSize - 1);

    if (start >= fileSize) {
      res.status(416).send('Requested range not satisfiable');
      return;
    }

    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': end - start + 1,
      'Content-Type': contentType
    };

    res.writeHead(206, head);

    const fileStream = fs.createReadStream(mediaPath, {
      start,
      end,
      highWaterMark: 64 * 1024 // Aumentar el tamaño del buffer interno
    });

    pipeline(
      fileStream,
      res,
      (err) => {
        if (err) {
          console.error('Pipeline failed', err);
        }
      }
    );
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': contentType
    };
    res.writeHead(200, head);

    const fileStream = fs.createReadStream(mediaPath, {
      highWaterMark: 64 * 1024 // Aumentar el tamaño del buffer interno
    });

    pipeline(
      fileStream,
      res,
      (err) => {
        if (err) {
          console.error('Pipeline failed', err);
        }
      }
    );
  }
});


function getContentType(mediaType) {
  switch (mediaType) {
    case 'video':
      return 'video/mp4'
    case 'audio':
      return 'audio/mpeg'
    case 'image':
      return 'image/jpeg'
    default:
      return 'application/octet-stream'
  }
}

function getDefaultMediaPath(mediaType) {
  switch (mediaType) {
    case 'video':
      return path.join(__dirname, 'videoexample.mp4')
    // case 'audio':
    //     return path.join(__dirname, 'audioexample.mp3');
    // case 'image':
    //     return path.join(__dirname, 'imageexample.jpg');
    default:
      console.error(`Media type ${mediaType} not supported`)
      return null
  }
}

