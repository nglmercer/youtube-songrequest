const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const { YTMusicManager, YTStreamDownloader } = require('./youtubeDownloader')
const app = express()
const port = parseInt(process.env.PORT) || process.argv[3] || 9002
// Middleware
app.use(express.json())
app.use(cors({ origin: '*' }))
app.use(express.static('public'))
const ytmusicmanager = new YTMusicManager()
const ytDownloader = new YTStreamDownloader()

// Ruta para servir media (video, imagen, audio)we
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
app.get('/ytmusic', async (req, res) => {
  const action = req.query.action
  const query = req.query.query
  const url = req.query.url
  const outputPath = req.query.outputPath || 'output.mp3' || 'output.mp4'

  if (!action) {
    return res.status(400).send('Action not specified')
  }

  try {
    switch (action) {
      case 'getplaylist':
        if (!query) {
          return res.status(400).send('PlaylistId not specified')
        }
        const playlistInfo = await ytmusicmanager.getplaylisinfo(query)
        return res.json(playlistInfo)
        break
      case 'search':
        if (!query) {
          return res.status(400).send('Query not specified')
        }
        const searchResults = await ytmusicmanager.searchSong(query)
        return res.json(searchResults)
        break
      case 'download':
        if (!url) {
          return res.status(400).send('URL not specified')
        }
        const downloadResult = await ytDownloader.download(url, outputPath)
        if (downloadResult.success) {
          return res.json({
            message: 'Download successful',
            filePath: downloadResult.outputPath,
            stream: downloadResult
          })
        } else {
          return res.status(500).send('Download failed')
        }
        break
        case 'stream':
          if (!url) {
              return res.status(400).send('URL not specified');
          }

          const mediaType = req.query.mediatype || 'audio';
          const ytStream = await ytDownloader.stream(url, { type: mediaType });

          res.setHeader('Content-Type', mediaType === 'video' ? 'video/mp4' : 'audio/mpeg');

          // Transmitir el stream directamente
          ytStream.pipe(res);
          break;
      default:
        res.status(400).send('Invalid action')
    }
  } catch (error) {
    console.error('Error handling YTMusic request:', error)
    res.status(500).send('Internal server error')
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

app.listen(port, () => console.log(`Server running on port ${port}!`))
