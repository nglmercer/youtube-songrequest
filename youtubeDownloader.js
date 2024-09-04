// import YTMusic from 'ytmusic-api';
// import ytstream from 'yt-stream';
// // import { ytdown } from "nayan-media-downloader"
// import WDwloadDlp from 'w-dwload-dlp';
// import fs from 'fs';
// const WDwloadDlp = require('w-dwload-dlp');

// const { ytdown } = require("nayan-media-downloader")

const YTMusic = require('ytmusic-api');
const ytstream = require('yt-stream');
const fs = require('fs');
const path = require('path');
if (!fs.existsSync(path.join(__dirname, 'downloads'))) {
  fs.mkdirSync(path.join(__dirname, 'downloads'));
}
class YTMusicManager {
  constructor() {
    this.ytmusic = new YTMusic();
    this.ytmusic.initialize(/* Optional: Custom cookies */);
  }

  async searchSong(query) {
    try {
      const songs = await this.ytmusic.search(query);
      return songs;
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  }
}

class YTStreamDownloader {
    constructor() {
      this.downloadPath = path.join(__dirname, 'downloads');
      this.maxFiles = 10;  // número máximo de archivos permitidos
      this.defaultOptions = {
        quality: 'high',
        type: 'audio',
        highWaterMark: 1048576 * 32,
        download: true,
      }
  }
      generateUniqueFileName(baseName) {
        const timestamp = Date.now();
        return `${timestamp}_${baseName}`;
    }
    async download(url, outputname, options) {
      const finalOutputPath = path.join(this.downloadPath, this.generateUniqueFileName(outputname));
      const defaultOptions = options || this.defaultOptions;
      try {
          const stream = await ytstream.stream(url, defaultOptions);
          const fileStream = fs.createWriteStream(finalOutputPath);

          stream.stream.pipe(fileStream);

            return { success: true, outputPath: finalOutputPath, videoUrl: stream.video_url };
          } catch (error) {
            console.error('Error downloading with YTStreamDownloader:', error);
            return { success: false, error };
        }
    }
    async stream(url, options) {
      const finalOptions = { ...this.defaultOptions, ...options };

      try {
          const stream = await ytstream.stream(url, finalOptions);
          return stream.stream; // Retorna el stream directamente
      } catch (error) {
          console.error('Error streaming with YTStreamDownloader:', error);
          throw error;
      }
  }
    async searchSong(query) {
        try {
            const results = await ytstream.search(query);
            return results;
        } catch (error) {
            console.error('Error searching with YTStreamDownloader:', error);
            return { success: false, error };
        }
    }
    async getplaylistinfo(playlistId) {
      try {
          const results = await ytstream.getPlaylist('https://www.youtube.com/playlist?list='+playlistId);
          return results;
      } catch (error) {
          console.error('Error searching with YTStreamDownloader:', error);
          return { success: false, error };
      }
    }
    validateUrl(url) {
      const result = ytstream.validateURL(url);
      return result;
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
// const ytmusicmanager = new YTMusicManager();
// ytmusicmanager.searchSong('jazz');
// (async () => {
//   const ytDownloader = new YTStreamDownloader();
//   const result = await ytDownloader.download('https://www.youtube.com/watch?v=8ZP5eqm4JqM', 'some_song.mp3');
//   console.log(result);
// })();
// class WDwloadDlpDownloader {
//   constructor() {
//       this.url = "https://www.youtube.com/watch?v=8ZP5eqm4JqM";
//       this.outputPath = "./some_song1.mp3";
//   }
//   async download(url, outputPath) {
//     try {
//       await WDwloadDlp(url, outputPath, {
//         clean: true,
//         funProg: (prog, nn, na) => {
//           console.log('Progress:', `${prog.toFixed(2)}%`, nn, na);
//         },
//         postprocessors: [],
//       });
//       console.log(`Download complete: ${outputPath}`);
//       return { success: true, outputPath };
//     } catch (error) {
//       console.error('Error downloading with WDwloadDlpDownloader:', error);
//       return { success: false, error };
//     }
//   }
// }
// const downloader = new WDwloadDlpDownloader();
// (async () => {
//   const result = await downloader.download('https://www.youtube.com/watch?v=8ZP5eqm4JqM', './some_song123.mp3');
//   console.log(result);
// })();
