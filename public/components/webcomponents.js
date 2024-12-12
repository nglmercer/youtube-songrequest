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
          }

          :host([dark-mode]) .video-item {
            --item-bg: #282828;
          }

          .video-item img {
            width: 100%;
            height: 140px;
            object-fit: cover;
          }

          .details {
            padding: 0.75rem;
          }

          .title {
            font-weight: bold;
            margin-bottom: 0.5rem;
          }

          .subtitles {
            font-size: 0.9rem;
            color: var(--subtext-color, #606060);
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
        <img src="${data.imageUrl}" alt="${data.title}">
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