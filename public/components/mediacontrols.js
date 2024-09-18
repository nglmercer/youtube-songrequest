class SynchronizedStreamPlayer {
  constructor() {
    this.audioPlayer = document.getElementById('audioPlayer');
    this.videoPlayer = document.getElementById('videoPlayer2');
    this.playBtn = document.getElementById('playBtn');
    this.progressBar = document.getElementById('progressBar');
    this.volumeSlider = document.getElementById('volumeSlider');

    this.isPlaying = false;
    this.isSeeking = false;

    this.initEventListeners();
  }

  initEventListeners() {
    this.playBtn.addEventListener('click', () => this.togglePlayPause());
    this.audioPlayer.addEventListener('timeupdate', () => this.updateProgressAndSync());
    this.progressBar.addEventListener('input', () => this.seek());
    this.volumeSlider.addEventListener('input', () => this.adjustVolume());

    // Manejar el buffering
    this.audioPlayer.addEventListener('waiting', () => this.onBuffering());
    this.videoPlayer.addEventListener('waiting', () => this.onBuffering());
    this.audioPlayer.addEventListener('canplay', () => this.onCanPlay());
    this.videoPlayer.addEventListener('canplay', () => this.onCanPlay());
  }

  async togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  async play() {
    try {
      await Promise.all([this.audioPlayer.play(), this.videoPlayer.play()]);
      this.isPlaying = true;
      this.playBtn.textContent = '❚❚';
    } catch (error) {
      console.error('Error al reproducir:', error);
    }
  }

  pause() {
    this.audioPlayer.pause();
    this.videoPlayer.pause();
    this.isPlaying = false;
    this.playBtn.textContent = '▶';
  }

  updateProgressAndSync() {
    if (!this.isSeeking && !isNaN(this.audioPlayer.duration)) {
      const progress = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100;
      this.progressBar.value = progress;

      // Sincronizar solo si la diferencia es significativa
      if (Math.abs(this.audioPlayer.currentTime - this.videoPlayer.currentTime) > 0.5) {
        this.videoPlayer.currentTime = this.audioPlayer.currentTime;
      }
    }
  }

  seek() {
    this.isSeeking = true;
    if (!isNaN(this.audioPlayer.duration)) {
      const newTime = (this.progressBar.value / 100) * this.audioPlayer.duration;
      this.audioPlayer.currentTime = newTime;
      this.videoPlayer.currentTime = newTime;
    }
    this.isSeeking = false;
  }

  adjustVolume() {
    this.audioPlayer.volume = this.volumeSlider.value / 100;
  }

  onBuffering() {
    // Puedes agregar aquí lógica para mostrar un indicador de buffering si lo deseas
    console.log('Buffering...');
  }

  onCanPlay() {
    // El media puede comenzar a reproducirse, pero podría detenerse para hacer más buffering
    if (this.isPlaying) {
      this.play();
    }
  }

  setStreamSources(audioStream, videoStream) {
    if (audioStream) {
      this.audioPlayer.srcObject = audioStream;
    }
    if (videoStream) {
      this.videoPlayer.srcObject = videoStream;
    }
  }
}

// Uso de la clase
const player = new SynchronizedStreamPlayer();

// Exportar la función setStreamSources si es necesario
export function setStreamSources(audioStream, videoStream) {
  player.setStreamSources(audioStream, videoStream);
}
