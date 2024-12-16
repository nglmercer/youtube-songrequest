const fs = require('fs');
const path = require('path');
const YTMusic = require('ytmusic-api');
const ytstream = require('yt-stream');

class YTMusicManager {
  constructor() {
    this.ytmusic = new YTMusic();
    this.ytmusic.initialize(); // Inicialización opcional con cookies
  }

  async searchSong(query) {
    try {
      const songs = await this.ytmusic.search(query);
      return songs;
    } catch (err) {
      console.error('Error in searchSong:', err);
      throw err;
    }
  }

  async getplaylistinfo(playlistId) {
    if (!playlistId) return;
    try {
/*       if (!this.ytmusic.validatePlaylistURL(playlistId)) {
        throw new Error('Invalid playlistId');
      }
      console.log("playlistId", playlistId); */
      const playlist = await this.ytmusic.getPlaylist(playlistId);
      return playlist;
    } catch (err) {
      console.error('Error in getPlaylistInfo:', err, playlistId);
      throw err;
    }
  }
}

class YTStreamDownloader {
  constructor() {
    this.downloadPath = path.join(__dirname, 'downloads');
    this.maxFiles = 10; // Número máximo de archivos permitidos
    this.defaultOptions = {
      quality: 'high', // Opciones: low o high
      type: 'audio',
      highWaterMark: 1048576 * 32,
      download: true,
    };

    if (!fs.existsSync(this.downloadPath)) {
      fs.mkdirSync(this.downloadPath);
    }
  }

  generateUniqueFileName(baseName) {
    const timestamp = Date.now();
    return `${timestamp}_${baseName}`;
  }

  async download(url, outputName, options) {
    const finalOutputPath = path.join(this.downloadPath, this.generateUniqueFileName(outputName));
    const effectiveOptions = options || this.defaultOptions;
    try {
      const stream = await ytstream.stream(url, effectiveOptions);
      const fileStream = fs.createWriteStream(finalOutputPath);

      stream.stream.pipe(fileStream);
      return { success: true, outputPath: finalOutputPath, videoUrl: stream.video_url };
    } catch (error) {
      console.error('Error in download:', error);
      return { success: false, error };
    }
  }

  async stream(url, options) {
    const effectiveOptions = { ...this.defaultOptions, ...options };
    try {
      const stream = await ytstream.stream(url, effectiveOptions);
      return stream.stream; // Retorna el stream directamente
    } catch (error) {
      console.error('Error in stream:', error);
      throw error;
    }
  }

  async searchSong(query) {
    try {
      const results = await ytstream.search(query);
      return results;
    } catch (error) {
      console.error('Error in searchSong:', error);
      throw error;
    }
  }

  async getplaylistinfo(playlistId) {
    if (!playlistId) return;
    const link = `https://www.youtube.com/playlist?list=${playlistId}`;
    try {
      if (!ytstream.validatePlaylistURL(link)) {
        throw new Error('Invalid playlistId', playlistId, link);
      }
      console.log("playlistId", playlistId);
      const results = await ytstream.getPlaylist(link);
      return results;
    } catch (err) {
      console.error('Error in getPlaylistInfo:', err, playlistId);
      throw err;
    }
  }

  validateUrl(url) {
    return ytstream.validateURL(url);
  }

  listDownloadedFiles() {
    return fs.readdirSync(this.downloadPath);
  }

  deleteFile(fileName) {
    const filePath = path.join(this.downloadPath, fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return { success: true, message: `File ${fileName} deleted.` };
    } else {
      return { success: false, message: `File ${fileName} not found.` };
    }
  }
}

module.exports = { YTMusicManager, YTStreamDownloader };
