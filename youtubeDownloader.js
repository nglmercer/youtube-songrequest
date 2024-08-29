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
// const ytmusicmanager = new YTMusicManager();
// ytmusicmanager.searchSong('jazz');

class YTStreamDownloader {
    constructor() {
        this.defaultOptions = {
            quality: 'high',
            type: 'audio',
            highWaterMark: 1048576 * 32,
            download: true,
        };
    }

    async download(url, outputPath) {
        try {
            const stream = await ytstream.stream(url, this.defaultOptions);
            stream.stream.pipe(fs.createWriteStream(outputPath));
            console.log(`Download complete: ${outputPath}`);
            return { success: true, outputPath, videoUrl: stream.video_url };
        } catch (error) {
            console.error('Error downloading with YTStreamDownloader:', error);
            return { success: false, error };
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
}
// (async () => {
//   const ytDownloader = new YTStreamDownloader();
//   const result = await ytDownloader.download('https://www.youtube.com/watch?v=8ZP5eqm4JqM', 'some_song.mp3');
//   console.log(result);
// })();

module.exports = { YTMusicManager, YTStreamDownloader };
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