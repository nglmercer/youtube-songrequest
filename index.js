const express = require('express');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const http = require('http');
const ytstream = require('yt-stream');
const { YTMusicManager, YTStreamDownloader } = require('./server/youtubeDownloader');
const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.static('public'));

const PORT = 3000;
const downloadsPath = path.join(__dirname, 'downloads');
const tempPath = path.join(__dirname, 'temp');

// Crear carpetas si no existen
if (!fs.existsSync(downloadsPath)) {
  fs.mkdirSync(downloadsPath);
}
if (!fs.existsSync(tempPath)) {
  fs.mkdirSync(tempPath);
}

// Configuración de Express para servir los archivos descargados
app.use('/downloads', express.static(downloadsPath));

// Endpoint para hacer streaming de video/audio
app.get('/stream', async (req, res) => {
  const { url, type } = req.query;

  if (!url) {
    return res.status(400).send('Missing URL parameter');
  }

  try {
    const options = {
      quality: 'high',
      type: type || 'video', // video o audio
      highWaterMark: 1048576 * 32,
    };

    const streamData = await ytstream.stream(url, options);
    res.setHeader('Content-Type', type === 'audio' ? 'audio/mpeg' : 'video/mp4');

    streamData.stream.pipe(res).on('error', (err) => {
      console.error('Streaming error:', err);
      res.status(500).send('Streaming error');
    });
  } catch (error) {
    console.error('Error during streaming:', error);
    res.status(500).send('Failed to stream content');
  }
});


const server = http.createServer(app);
// Configuración de WebSocket
const wss = new WebSocket.Server({ server });

const ytMusicManager = new YTMusicManager();
const ytStreamDownloader = new YTStreamDownloader();

// Manejo de clientes WebSocket
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', async (message) => {
    const { action, data } = JSON.parse(message);
    let response;
    let playlist;
    try {
      switch (action) {
        case 'searchSong':
          response = await ytMusicManager.searchSong(data.query);
          ws.send(JSON.stringify({ action, success: true, data: response }));
          break;

        case 'download':
          if (!data.url || !data.outputName) {
            throw new Error('Missing URL or outputName');
          }
          response = await ytStreamDownloader.download(data.url, data.outputName);
          ws.send(JSON.stringify({ action, success: response.success, data: response }));
          break;

        case 'listFiles':
          response = ytStreamDownloader.listDownloadedFiles();
          ws.send(JSON.stringify({ action, success: true, data: response }));
          break;

        case 'deleteFile':
          if (!data.fileName) {
            throw new Error('Missing fileName');
          }
          response = ytStreamDownloader.deleteFile(data.fileName);
          ws.send(JSON.stringify({ action, success: response.success, data: response }));
          break;

        case 'downloadPlaylist':
          if (!data.playlistId) {
            throw new Error('Missing playlistId');
          }
          playlist = await ytStreamDownloader.getplaylistinfo(data.playlistId);
          const downloadPromises = playlist.map((item) => 
            ytStreamDownloader.download(item.url, item.title)
          );
          const results = await Promise.all(downloadPromises);
          ws.send(JSON.stringify({ action, success: true, data: results }));
          break;

        case 'stream':
          let url;
          if (!data || !data.url) {
            throw new Error('Missing URL');
          } else if (data.videoId && !data.type) {
            url = `https://www.youtube.com/watch?v=${data.videoId}`;
          } else {
            url = data.url;
          }
          let type = data.type || 'video';
          // Envía un mensaje de confirmación con la URL de streaming
          ws.send(JSON.stringify({ 
            action, 
            success: true, 
            data: { streamUrl: `http://localhost:${PORT}/stream?url=${encodeURIComponent(url)}&type=${type}` },
          }));
          break;
        case 'getplaylistinfo':
          if (!data.playlistId) {
            throw new Error('Missing playlistId');
          }
          playlist = await ytStreamDownloader.getplaylistinfo(data.playlistId);
          ws.send(JSON.stringify({ action, success: true, data: playlist }));
          break;
        default:
          ws.send(JSON.stringify({ action, success: false, error: 'Unknown action' }));
      }
    } catch (error) {
      ws.send(JSON.stringify({ action, success: false, error: error.message }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
app.post('/api', (req, res) => {
  const { event, payload } = req.body;
  console.log('Evento recibido:', event);
  console.log('Datos recibidos:', payload);
  wss.clients.forEach(client => {
    client.send(JSON.stringify({ action: event, success: true, data: payload }));
  });
});
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
