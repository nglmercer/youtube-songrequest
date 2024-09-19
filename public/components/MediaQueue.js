export default class MediaQueue {
  constructor() {
    this.playlist = [];
    this.currentIndex = 0;
    this.cache = new Map(); // Caché para almacenar los videos y audios
  }

  // Añadir elemento a la playlist
  addMediaItem(mediaItem) {
    this.playlist.push(mediaItem);
    console.log("addMediaItem", mediaItem);
  }

  // Quitar elemento de la playlist por índice
  removeMediaItem(index) {
    if (index >= 0 && index < this.playlist.length) {
      this.playlist.splice(index, 1);
    } else {
      console.error('Índice fuera de rango');
    }
  }

  // Reproducir el elemento actual
  async playCurrentMedia(videoPlayer, audioPlayer) {
    let existvideoid = null;
    const currentItem = this.playlist[this.currentIndex];
    if (!currentItem) {
      console.error('No hay más elementos en la playlist.');
      return;
    }

    const { videoId } = currentItem;
    if (!videoId) {
      existvideoid = currentItem.video_id;
    } else {
      existvideoid = videoId;
    }

    // Chequear si ya está en el caché
    let cachedMedia = this.cache.get(existvideoid); // Asegúrate de usar el id correcto
    if (!cachedMedia) {
      // Si no está en caché, obtener los enlaces de video y audio
      const videoUrl = `http://localhost:9002/ytmusic?action=stream&url=https://www.youtube.com/watch?v=${existvideoid}&mediatype=video`;
      const audioUrl = `http://localhost:9002/ytmusic?action=stream&url=https://www.youtube.com/watch?v=${existvideoid}&mediatype=audio`;

      cachedMedia = { videoUrl, audioUrl };
      this.cache.set(existvideoid, cachedMedia);
    }

    // Reproducir video y audio
    await this.streamMedia(cachedMedia.videoUrl, videoPlayer);
    await this.streamMedia(cachedMedia.audioUrl, audioPlayer);
  }

  // Método para retroceder en la playlist
  previous(videoPlayer, audioPlayer) {
    if (this.playlist.length === 1) {
      // Caso especial: solo hay un elemento en la playlist
      console.log('Solo hay un elemento en la playlist, reproduciendo el mismo.');
      this.playCurrentMedia(videoPlayer, audioPlayer);
    } else if (this.currentIndex > 0) {
      this.currentIndex--;
      this.playCurrentMedia(videoPlayer, audioPlayer);
    } else {
      console.log('Ya estás en el primer elemento de la playlist.');
    }
  }

  // Método para avanzar en la playlist
  next(videoPlayer, audioPlayer) {
    if (this.playlist.length === 1) {
      // Caso especial: solo hay un elemento en la playlist
      console.log('Solo hay un elemento en la playlist, reproduciendo el mismo.');
      this.playCurrentMedia(videoPlayer, audioPlayer);
    } else if (this.currentIndex < this.playlist.length - 1) {
      this.currentIndex++;
      this.playCurrentMedia(videoPlayer, audioPlayer);
    } else {
      console.log('Ya estás en el último elemento de la playlist.');
    }
  }

  // Método para hacer streaming de video/audio
  async streamMedia(url, mediaElement) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    mediaElement.src = response.url;
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
