class ResultItem {
  constructor(containerId) {
      this.container = document.getElementById(containerId);
  }

  addItem(data, onClickCallback = null, insertAtTop = false) {
    const { imageUrl, title, subtitles = [], duration, videoId } = data;

    if (!this.container) {
        console.error(`Container with ID "${this.container.id}" not found.`);
        return;
    }

    // Crear el div result-item
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('result-item');

    // Asignar el callback de clic si se proporciona
    if (onClickCallback) {
        itemDiv.onclick = () => onClickCallback({ html: itemDiv, data: data });
    }

    // Crear la imagen
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Imagen de resultado';
    img.classList.add('result-image');
    itemDiv.appendChild(img);

    // Crear el div result-content
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('result-content');

    // Añadir el título
    const titleElement = document.createElement('h2');
    titleElement.classList.add('result-title');
    titleElement.textContent = title;
    contentDiv.appendChild(titleElement);

    // Añadir los subtítulos
    subtitles.forEach(subtitleText => {
        const subtitleElement = document.createElement('p');
        subtitleElement.classList.add('result-subtitle');
        subtitleElement.textContent = subtitleText;
        contentDiv.appendChild(subtitleElement);
    });

    // Añadir la duración
    const durationElement = document.createElement('span');
    durationElement.classList.add('result-duration');
    const durationText = duration / 60 > 1 ? `${Math.floor(duration / 60)} minutos` : `${duration} segundos`;
    durationElement.textContent = `Duración: ${durationText}`;
    contentDiv.appendChild(durationElement);

    // Añadir el contenido al item
    itemDiv.appendChild(contentDiv);

    // Si insertAtTop es verdadero, inserta el nuevo item al principio
    if (insertAtTop) {
        this.container.insertBefore(itemDiv, this.container.firstChild);
    } else {
        // Si no, lo agrega al final
        this.container.appendChild(itemDiv);
    }

    return itemDiv;
}

  async addVideoByPath(videoPath, title, subtitles = [], duration, onClickCallback = null) {
      const videoUrl = await getMediaServer('video', videoPath);
      this.addVideoItem(videoUrl, title, subtitles, duration, onClickCallback);
  }

  addVideoBySrc(videoSrc, title, subtitles = [], duration, onClickCallback = null) {
      this.addVideoItem(videoSrc, title, subtitles, duration, onClickCallback);
  }

  addVideoItem(videoSrc, title, subtitles = [], duration, onClickCallback = null) {
      if (!this.container) {
          console.error(`Container with ID "${this.container.id}" not found.`);
          return;
      }

      // Crear el div result-item
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('result-item');

      // Asignar el callback de clic si se proporciona
      if (onClickCallback) {
          itemDiv.onclick = () => onClickCallback({Html: itemDiv });
      }

      // Crear el elemento de video
      const video = document.createElement('video');
      video.src = videoSrc;
      video.controls = true;
      video.classList.add('result-video');
      itemDiv.appendChild(video);

      // Crear el div result-content
      const contentDiv = document.createElement('div');
      contentDiv.classList.add('result-content');

      // Añadir el título
      const titleElement = document.createElement('h2');
      titleElement.classList.add('result-title');
      titleElement.textContent = title;
      contentDiv.appendChild(titleElement);

      // Añadir los subtítulos
      subtitles.forEach(subtitleText => {
          const subtitleElement = document.createElement('p');
          subtitleElement.classList.add('result-subtitle');
          subtitleElement.textContent = subtitleText;
          contentDiv.appendChild(subtitleElement);
      });

      // Añadir la duración
      const durationElement = document.createElement('span');
      durationElement.classList.add('result-duration');
      durationElement.textContent = `Duración: ${duration}`;
      contentDiv.appendChild(durationElement);

      // Añadir el contenido al item
      itemDiv.appendChild(contentDiv);

      // Añadir el item al contenedor principal
      this.container.appendChild(itemDiv);
  }
  addBlock(items, insertAtTop = false) {
    const blockDiv = document.createElement('div');
    blockDiv.classList.add('result-block');

    // Añadir cada item al bloque
    items.forEach(item => {
        this.addItem(item.data, item.onClickCallback, false); // Agrega cada item al bloque, no al contenedor directamente
    });

    // Si insertAtTop es verdadero, inserta el bloque al principio
    if (insertAtTop) {
        this.container.insertBefore(blockDiv, this.container.firstChild);
    } else {
        // Si no, lo agrega al final
        this.container.appendChild(blockDiv);
    }
}
}
function getDivItem(data, onClickCallback = null) {
  const { imageUrl, title, subtitles = [], duration, videoId } = data;
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('result-divitem');
  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = `Imagen de resultado`;
  img.classList.add('result-divimage');
  itemDiv.appendChild(img);
  if (onClickCallback) {
    itemDiv.onclick = () => onClickCallback({ html: itemDiv, data: data });
}
  // Crear el div result-content
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('result-divcontent');

  // Añadir el título
  const titleElement = document.createElement('h2');
  titleElement.classList.add('result-title');
  titleElement.textContent = title;
  contentDiv.appendChild(titleElement);

  // Añadir los subtítulos
  subtitles.forEach(subtitleText => {
      const subtitleElement = document.createElement('p');
      subtitleElement.classList.add('result-subtitle');
      subtitleElement.textContent = subtitleText;
      contentDiv.appendChild(subtitleElement);
  });

  // Añadir la duración
  const durationElement = document.createElement('span');
  durationElement.classList.add('result-duration');
  durationElement.textContent = `Duración: ${duration}`;
  contentDiv.appendChild(durationElement);

  // Añadir el contenido al item
  itemDiv.appendChild(contentDiv);
  return itemDiv;
}
const currentUrl = window.location.href;

async function getMediaServer(mediaType = 'video', mediaPath = '') {
  try {
      // Realiza la solicitud al servidor
      const response = await fetch(currentUrl + `/media?mediatype=${encodeURIComponent(mediaType)}${mediaPath ? '&path=' + encodeURIComponent(mediaPath) : ''}`);

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      // Crear una URL para el media y asignarla al elemento correspondiente
      const mediaUrl = URL.createObjectURL(await response.blob());
      return mediaUrl;
  } catch (error) {
      console.error(`Failed to load ${mediaType}:`, error);
  }
}

export { ResultItem, getMediaServer,getDivItem };
