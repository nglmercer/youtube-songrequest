const express = require('express')
const fs = require('fs')
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
app.get('/ytmusic', async (req, res) => {
  const { action, query, url, outputPath = 'output.mp3' || 'output.mp4' } = req.query;

  handleYtmusicRequest(action, query, url, outputPath, req, res);
});

// Función para manejar las solicitudes de YouTube
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
        const ytStream = await ytDownloader.stream(url, { type: mediaType });

        if (res) {
          res.setHeader('Content-Type', mediaType === 'video' ? 'video/mp4' : 'audio/mpeg');
          ytStream.pipe(res); // Transmitir vía HTTP
        }
        socketManager.emitEventToAll('stream', { url, mediaType });
        if (socket) {
          // Si estás usando socket, podrías emitir información relevante
          socket.emit('stream', { url, mediaType });

          // Nota: Aquí no estamos transmitiendo el archivo multimedia en sí, solo el metadata.
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
  const mediaType = req.query.mediatype
  const mediaPath = req.query.path ? req.query.path : getDefaultMediaPath(mediaType)
  if (!mediaType) {
    return res.status(400).send('Media type not specified')
  }
  if (!fs.existsSync(mediaPath)) {
    return res
      .status(404)
      .send(`${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} not found`)
  }

  const stat = fs.statSync(mediaPath)
  const fileSize = stat.size
  const range = req.headers.range
  const contentType = getContentType(mediaType)

  if (range && mediaType === 'video') {
    const parts = range.replace(/bytes=/, '').split('-')
    const start = parseInt(parts[0], 10)
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1

    if (start >= fileSize) {
      res.status(416).send('Requested range not satisfiable')
      return
    }

    const chunkSize = end - start + 1
    const file = fs.createReadStream(mediaPath, { start, end })
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': contentType
    }

    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': contentType
    }
    res.writeHead(200, head)
    fs.createReadStream(mediaPath).pipe(res)
  }
})
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

