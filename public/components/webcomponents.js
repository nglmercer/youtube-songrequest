class YouTubeGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
          padding: 1rem;
          background-color: var(--bg-color, #fff);
          color: var(--text-color, #000);
        }
        :host([dark-mode]) {
          --bg-color: #181818;
          --text-color: #fff;
        }

        .video-item {
          background: var(--item-bg, #f9f9f9);
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: background 0.3s;
          display: flex;
          flex-direction: column;
        }

        :host([dark-mode]) .video-item {
          --item-bg: #282828;
        }

        .image-container {
          width: 100%;
          aspect-ratio: 16 / 9; /* Proporción 16:9 */
          overflow: hidden;
          flex-shrink: 0;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .details {
          padding: 0.75rem;
        }

        .title,
        .subtitles {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .title {
          font-weight: bold;
          margin-bottom: 0.5rem;
          -webkit-line-clamp: 2; /* Limita a 2 líneas */
        }

        .subtitles {
          font-size: 0.9rem;
          color: var(--subtext-color, #606060);
          -webkit-line-clamp: 3; /* Limita a 3 líneas */
        }

        :host([dark-mode]) .subtitles {
          --subtext-color: #aaa;
        }
      </style>
      <slot></slot>
    `;
  }

  addVideoItem(data, prepend = false) {
    console.log("Adding video item:", data);
    const item = document.createElement("div");
    item.classList.add("video-item");

    item.innerHTML = `
      <div class="image-container">
        <img src="${data.imageUrl}" alt="${data.title}">
      </div>
      <div class="details">
        <div class="title">${data.title}</div>
        <div class="subtitles">${data.subtitles.join(" - ")}</div>
      </div>
    `;

    item.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("video-click", {
        detail: data,
        bubbles: true,
        composed: true
      }));
    });

    if (prepend) {
      this.shadowRoot.prepend(item);
    } else {
      this.shadowRoot.appendChild(item);
    }
  }
  limitTextLines(element, maxLines) {
    element.style.display = "-webkit-box";
    element.style.webkitBoxOrient = "vertical";
    element.style.overflow = "hidden";
    element.style.textOverflow = "ellipsis";
    element.style.webkitLineClamp = maxLines ;
  }

    addVideoItems(itemsArray, prepend = false) {
      console.log("Adding multiple video items:", itemsArray);
      itemsArray.forEach(item => this.addVideoItem(item.data, prepend));
    }

    addReversedVideoItems(itemsArray, prepend = false) {
      const reversedItems = [...itemsArray].reverse();
      this.addVideoItems(reversedItems, prepend);
    }

  }

customElements.define("youtube-grid", YouTubeGrid);

class YTStreamPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        video, audio {
          width: 100%;
          max-height: 360px;
          background: black;
          display: block;
        }
      </style>
      <div>
        <video id="videoPlayer" controls></video>
        <audio id="audioPlayer" controls></audio>
      </div>
    `;
    this.videoPlayer = this.shadowRoot.querySelector('#videoPlayer');
    this.audioPlayer = this.shadowRoot.querySelector('#audioPlayer');
  }

  playStream(url, type) {
    if (type === 'audio') {
      this.audioPlayer.src = url;
      this.audioPlayer.style.display = 'block';
      this.videoPlayer.style.display = 'none';
      this.audioPlayer.play();
    } else {
      this.videoPlayer.src = url;
      this.videoPlayer.style.display = 'block';
      this.audioPlayer.style.display = 'none';
      this.videoPlayer.play();
    }
  }
}

customElements.define('yt-stream-player', YTStreamPlayer);
class SyncMediaPlayer extends HTMLElement {
  constructor() {
    super();

    // Crear shadow DOM
    this.attachShadow({ mode: 'open' });

    // Crear contenedor para audio y video
    this.audioElement = document.createElement('audio');
    this.videoElement = document.createElement('video');
    this.videoElement.controls = false;
    this.audioElement.controls = true;

    // Estilo básico
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: flex;
        flex-direction: column;
        gap: 0;
      }
      video, audio {
        max-width: 100%;
      }
    `;

    // Agregar elementos al shadow DOM
    this.shadowRoot.append(style, this.videoElement, this.audioElement);

    // Sincronizar eventos
    this.syncEvents();
  }

  static get observedAttributes() {
    return ['audio-src', 'video-src', 'autoplay'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'audio-src') {
      this.audioElement.src = newValue;
    }
    if (name === 'video-src') {
      this.videoElement.src = newValue;
    }
    if (name === 'autoplay') {
      const shouldAutoplay = newValue !== null;
      this.audioElement.autoplay = shouldAutoplay;
      this.videoElement.autoplay = shouldAutoplay;
      if (shouldAutoplay) {
        this.videoElement.play();
        this.audioElement.play();
      }
    }
  }

  syncEvents() {
    let isSyncing = false;

    const sync = (source, target) => {
      source.addEventListener('play', () => {
        if (!isSyncing) target.play();
      });
      source.addEventListener('pause', () => {
        if (!isSyncing) target.pause();
      });
      source.addEventListener('seeked', () => {
        if (!isSyncing) {
          isSyncing = true;
          target.currentTime = source.currentTime;
          target.addEventListener('seeked', () => (isSyncing = false), { once: true });
        }
      });
      source.addEventListener('ratechange', () => {
        if (!isSyncing) target.playbackRate = source.playbackRate;
      });
    };

    sync(this.videoElement, this.audioElement);
    sync(this.audioElement, this.videoElement);
  }

  connectedCallback() {
    if (this.hasAttribute('audio-src')) {
      this.audioElement.src = this.getAttribute('audio-src');
    }
    if (this.hasAttribute('video-src')) {
      this.videoElement.src = this.getAttribute('video-src');
    }
    if (this.hasAttribute('autoplay')) {
      this.audioElement.autoplay = true;
      this.videoElement.autoplay = true;
      this.videoElement.play();
      this.audioElement.play();
    }
  }
}

// Registrar el Web Component
customElements.define('sync-media-player', SyncMediaPlayer);

class MiniPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.fullscreen = false;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: flex;
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.5);;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            width: 400px;
            height: 300px;
          }

          @keyframes maximize {
            from {
              width: 400px;
              height: 300px;
              bottom: 20px;
              right: 20px;
              transform: scale(1);
            }
            to {
              width: 90vw;
              height: 90vh;
              bottom: 5vh;
              right: 5vw;
              transform: scale(1);
            }
          }

          @keyframes minimize {
            from {
              width: 90vw;
              height: 90vh;
              bottom: 5vh;
              right: 5vw;
              transform: scale(1);
            }
            to {
              width: 400px;
              height: 300px;
              bottom: 20px;
              right: 20px;
              transform: scale(1);
            }
          }

          :host(.maximizing) {
            animation: maximize 0.3s ease-out forwards;
          }

          :host(.minimizing) {
            animation: minimize 0.3s ease-out forwards;
          }

          :host(.fullscreen) {
            width: 90vw;
            height: 90vh;
            bottom: 5vh;
            right: 5vw;
          }

          .content {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
          }

          .main-content {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 0;
          }

          .details {
            display: none;
            padding: 16px;
            background: rgba(255, 255, 255, 0.5);
            border-top: 1px solid #eee;
          }

          :host(.fullscreen) .details {
            display: block;
          }

          .controls {
            position: absolute;
            bottom: 10px;
            right: 10px;
            display: flex;
            gap: 10px;
            z-index: 10;
          }

          button {
            background: none;
            border: none;
            color: #000;
            font-size: 16px;
            cursor: pointer;
            padding: 8px;
            border-radius: 4px;
            transition: background-color 0.2s;
          }

          button:hover {
            background-color: rgba(0, 0, 0, 0.1);
          }

          /* Hide scrollbars but keep functionality */
          ::-webkit-scrollbar {
            width: 0px;
            background: transparent;
          }
        </style>
        <div class="content">
          <div class="main-content">
            <slot name="main"></slot>
          </div>
          <div class="details">
            <slot name="details"></slot>
          </div>
          <div class="controls">
            <button class="fullscreen-toggle">🔲</button>
          </div>
        </div>
      `;
    }
  }

  setupEventListeners() {
    const fullscreenToggle = this.shadowRoot.querySelector('.fullscreen-toggle');
    fullscreenToggle.addEventListener('click', () => this.toggleFullscreen());

    this.addEventListener('animationend', () => {
      this.classList.remove('maximizing', 'minimizing');
    });
  }

  toggleFullscreen() {
    if (!this.fullscreen) {
      this.classList.remove('minimizing');
      this.classList.add('maximizing');
      this.classList.add('fullscreen');
    } else {
      this.classList.remove('maximizing');
      this.classList.add('minimizing');
      this.classList.remove('fullscreen');
    }

    this.fullscreen = !this.fullscreen;

    this.dispatchEvent(new CustomEvent('fullscreen-change', {
      detail: { fullscreen: this.fullscreen }
    }));
  }
}

customElements.define('mini-player', MiniPlayer);
