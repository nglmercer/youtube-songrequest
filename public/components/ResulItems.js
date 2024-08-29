class ResultItem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    addItem(imageUrl, title, subtitles = [], duration) {
        if (!this.container) {
            console.error(`Container with ID "${this.container.id}" not found.`);
            return;
        }

        // Crear el div result-item
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('result-item');

        // Crear la imagen
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Imagen de resultado`;
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
        durationElement.textContent = `Duración: ${duration}`;
        contentDiv.appendChild(durationElement);

        // Añadir el contenido al item
        itemDiv.appendChild(contentDiv);

        // Añadir el item al contenedor principal
        this.container.appendChild(itemDiv);
    }

    async addVideoByPath(videoPath, title, subtitles = [], duration) {
        const videoUrl = await getMediaServer('video',videoPath);
        this.addVideoItem(videoUrl, title, subtitles, duration);
    }

    addVideoBySrc(videoSrc, title, subtitles = [], duration) {
        this.addVideoItem(videoSrc, title, subtitles, duration);
    }

    addVideoItem(videoSrc, title, subtitles = [], duration) {
        if (!this.container) {
            console.error(`Container with ID "${this.container.id}" not found.`);
            return;
        }

        // Crear el div result-item
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('result-item');

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
}
async function getMediaServer(mediaType = 'video', mediaPath = '') {
    try {
        // Realiza la solicitud al servidor
        const response = await fetch(`http://localhost:3002/media?mediatype=${encodeURIComponent(mediaType)}${mediaPath ? '&path=' + encodeURIComponent(mediaPath) : ''}`);

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
export { ResultItem, getMediaServer };