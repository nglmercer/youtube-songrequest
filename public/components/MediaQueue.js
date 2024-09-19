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
    this.audioPlayer.addEventListener('play', () => this.updateIconPlayPause(true));
    this.audioPlayer.addEventListener('pause', () => this.updateIconPlayPause());
    this.videoPlayer.addEventListener('timeupdate', () => this.updateProgressAndSync());
    this.videoPlayer.addEventListener('play', () => this.updateIconPlayPause(true));
    this.videoPlayer.addEventListener('pause', () => this.updateIconPlayPause());
    this.progressBar.addEventListener('input', () => this.seek());
    this.volumeSlider.addEventListener('input', () => this.adjustVolume());
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

  async updateIconPlayPause(playstatus) {
    if (playstatus) {
      this.isPlaying = true;
    }
    if (this.isPlaying) {
      this.playBtn.textContent = '❚❚';
    } else {
      this.playBtn.textContent = '▶';
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
    this.videoPlayer.volume = this.audioPlayer.volume; // Asegura que el volumen de video esté sincronizado
  }
}


const player = new SynchronizedStreamPlayer();

export default class MediaQueue {
  constructor() {
    this.playlist = [];
    this.currentIndex = 0;
  }

  // Añadir elemento a la playlist si no existe o actualizar si el src es diferente
  addMediaItem(mediaItem) {
    console.log("addMediaItem", mediaItem);
    const existingItem = this.playlist.find(item => item.url === mediaItem.url);
    if (!existingItem) {
      this.playlist.push(mediaItem);
      console.log("Nuevo item añadido a la playlist", mediaItem);
    } else if (existingItem.src !== mediaItem.src) {
      existingItem.src = mediaItem.src;
      console.log("Src actualizado para el item existente", mediaItem);
    } else {
      console.log("Item ya existe en la playlist con el mismo src", mediaItem);
    }
  }

  // Añadir URL directa de video/audio a la playlist
  addMediaUrl(mediaUrl, mediaType, src) {
    const mediaItem = { url: mediaUrl, type: mediaType, src: src };
    this.addMediaItem(mediaItem);
  }

  addMedialUrl2(audioUrl, videoUrl, audioSrc, videoSrc) {
    this.addMediaItem({ url: audioUrl, type: 'audio', src: audioSrc });
    this.addMediaItem({ url: videoUrl, type: 'video', src: videoSrc });
  }

  removeMediaItem(index) {
    if (index >= 0 && index < this.playlist.length) {
      this.playlist.splice(index, 1);
    } else {
      console.error('Índice fuera de rango');
    }
  }
  async playCurrentMedia(videoPlayer, audioPlayer) {
    const currentItem = this.playlist[this.currentIndex];
    if (!currentItem) {
      console.error('No hay más elementos en la playlist.', console.log(this.playlist), this.currentIndex);
      return;
    }

    if (currentItem.url) {
      if (currentItem.type === 'video') {
        videoPlayer.src = currentItem.url;
        videoPlayer.play();
      } else if (currentItem.type === 'audio') {
        audioPlayer.src = currentItem.url;
        audioPlayer.play();
      }
    } else {
      console.error('URL no definida para el elemento actual');
    }

    // Escuchar el evento 'ended' para avanzar al siguiente elemento
    videoPlayer.onended = () => this.handleMediaEnd(videoPlayer, audioPlayer);
    audioPlayer.onended = () => this.handleMediaEnd(videoPlayer, audioPlayer);
  }
  handleMediaEnd(videoPlayer, audioPlayer) {
    if (this.currentIndex < this.playlist.length - 1) {
      this.next(videoPlayer, audioPlayer);
    } else {
      console.log('Fin de la playlist. Reiniciando.');
      videoPlayer.pause();
      audioPlayer.pause();
      this.currentIndex = 0; // Reiniciar la playlist
    }
  }

  next(videoPlayer, audioPlayer) {
    if (this.currentIndex < this.playlist.length - 1) {
      this.currentIndex++;
      this.playCurrentMedia(videoPlayer, audioPlayer);
    } else {
      this.playCurrentMedia(videoPlayer, audioPlayer);
    }
  }
  streamMedia(url, mediaElement) {
    mediaElement.src = url;
    mediaElement.play();
  }
}
export class ScrollableContainer {
  constructor(containerId, config = {}) {
    this.container = document.getElementById(containerId);
    this.items = [];
    this.currentIndex = 0;
    this.visibleRange = config.visibleRange || 10; // Cuántos elementos mostrar
    this.itemClass = config.itemClass || 'scrollable-item'; // Clase CSS para los items

    // Configuración del contenedor
    this.container.style.overflowX = 'auto'; // Desplazamiento horizontal
    this.container.style.display = 'flex';   // Mostrar items en fila
  }

  // Añadir un nuevo item
  addItem(content) {
    const item = document.createElement('div');
    item.classList.add(this.itemClass);
    item.innerHTML = content;
    this.items.push(item);
    this.container.appendChild(item);
    this.updateVisibleItems(); // Actualizar los elementos visibles después de añadir
  }

  addDivItem(div) {
    const item = div;
    item.classList.add(this.itemClass);
    this.items.push(item);
    this.container.appendChild(item);
    this.updateVisibleItems(); // Actualizar los elementos visibles después de añadir
  }

  // Establecer el índice del elemento actual
  setCurrent(index) {
    if (index < 0 || index >= this.items.length) {
      console.error('Índice fuera de rango');
      return;
    }
    this.currentIndex = index;
    this.updateVisibleItems(); // Actualizar los elementos visibles
  }

  // Actualizar los elementos visibles (mostrando el actual y 5 antes y después)
  updateVisibleItems() {
    const start = Math.max(0, this.currentIndex - 5);
    const end = Math.min(this.items.length, this.currentIndex + 6); // 6 para incluir el actual + 5 adelante

    this.items.forEach((item, index) => {
      if (index >= start && index < end) {
        item.style.display = 'block'; // Mostrar
      } else {
        item.style.display = 'none'; // Ocultar
      }
    });

    // Desplazar el contenedor al nuevo elemento actual
    this.container.scrollLeft = this.items[this.currentIndex].offsetLeft;
  }

  // Obtener el contenido del elemento actual
  getCurrentItem() {
    if (this.items.length === 0) {
      return null;
    }
    return this.items[this.currentIndex];
  }

  // Obtener el índice del elemento actual
  getCurrentIndex() {
    return this.currentIndex;
  }

  // Obtener la longitud de los elementos en el contenedor
  getItemsLength() {
    return this.items.length;
  }

  // Método para cargar más elementos (al final)
  loadMoreItems(newItems) {
    newItems.forEach(itemContent => {
      this.addItem(itemContent);
    });
    this.updateVisibleItems(); // Asegurar que los elementos visibles se actualicen
  }

  // Método para eliminar un item por índice
  removeItem(index) {
    if (index < 0 || index >= this.items.length) {
      console.error('Índice fuera de rango');
      return;
    }
    this.items.splice(index, 1);
    this.container.removeChild(this.container.children[index]);
    this.updateVisibleItems();
  }
}
// // Ejemplo de uso:
// const scrollableContainer = new ScrollableContainer('myDivContainer', {
//   visibleRange: 10, // Mostrar máximo 10 items a la vez
//   itemClass: 'my-item-class' // Clase CSS personalizada
// });

// // Añadir algunos items
// scrollableContainer.addItem('Item 1');
// scrollableContainer.addItem('Item 2');
// scrollableContainer.addItem('Item 3');
// scrollableContainer.addItem('Item 4');
// scrollableContainer.addItem('Item 5');
// scrollableContainer.addItem('Item 6');
// scrollableContainer.addItem('Item 7');
// scrollableContainer.addItem('Item 8');
// scrollableContainer.addItem('Item 9');
// scrollableContainer.addItem('Item 10');

// // Establecer el elemento actual (mostrar del 5 al 10)
// scrollableContainer.setCurrent(5);

// // Obtener el elemento actual
// console.log('Elemento actual:', scrollableContainer.getCurrentItem().innerHTML);

// // Añadir más elementos y mostrarlos
// scrollableContainer.loadMoreItems(['Item 11', 'Item 12', 'Item 13']);
// scrollableContainer.setCurrent(12); // Ahora el índice actual es 12
