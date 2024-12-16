const svgs = {
  burger: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit;"><path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path></svg>`,
  chat: `<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>
`,
  image: `<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
`,
  config: `<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
`,
  login: `<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>`,
  profile: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
  <path clip-rule="evenodd" d="M12 20.5c1.894 0 3.643-.62 5.055-1.666a5.5 5.5 0 00-10.064-.105.755.755 0 01-.054.099A8.462 8.462 0 0012 20.5Zm4.079-5.189a7 7 0 012.142 2.48 8.5 8.5 0 10-12.443 0 7 7 0 0110.3-2.48ZM12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm2-12.5a2 2 0 11-4 0 2 2 0 014 0Zm1.5 0a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0Z" fill-rule="evenodd">
  </path></svg>`,
  house: `<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
</svg>`,
  home: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; ">
  <path clip-rule="evenodd" d="M22.146 11.146a.5.5 0 01-.353.854H20v7.5a1.5 1.5 0 01-1.5 1.5H14v-8h-4v8H5.5A1.5 1.5 0 014 19.5V12H2.207a.5.5 0 01-.353-.854L12 1l10.146 10.146Z" fill-rule="evenodd">
  </path></svg>`,
  settings: `<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
  </svg>`,
  window: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
</svg>
`,
  messages: `<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
</svg>`,
clipboard: `<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
</svg>`,
 shorts: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; ">
 <path clip-rule="evenodd" d="m7.61 15.719.392-.22v-2.24l-.534-.228-.942-.404c-.869-.372-1.4-1.15-1.446-1.974-.047-.823.39-1.642 1.203-2.097h.001L15.13 3.59c1.231-.689 2.785-.27 3.466.833.652 1.058.313 2.452-.879 3.118l-1.327.743-.388.217v2.243l.53.227.942.404c.869.372 1.4 1.15 1.446 1.974.047.823-.39 1.642-1.203 2.097l-.002.001-8.845 4.964-.001.001c-1.231.688-2.784.269-3.465-.834-.652-1.058-.313-2.451.879-3.118l1.327-.742Zm1.993 6.002c-1.905 1.066-4.356.46-5.475-1.355-1.057-1.713-.548-3.89 1.117-5.025a4.14 4.14 0 01.305-.189l1.327-.742-.942-.404a4.055 4.055 0 01-.709-.391c-.963-.666-1.578-1.718-1.644-2.877-.08-1.422.679-2.77 1.968-3.49l8.847-4.966c1.905-1.066 4.356-.46 5.475 1.355 1.057 1.713.548 3.89-1.117 5.025a4.074 4.074 0 01-.305.19l-1.327.742.942.403c.253.109.49.24.709.392.963.666 1.578 1.717 1.644 2.876.08 1.423-.679 2.77-1.968 3.491l-8.847 4.965ZM10 14.567a.25.25 0 00.374.217l4.45-2.567a.25.25 0 000-.433l-4.45-2.567a.25.25 0 00-.374.216v5.134Z" fill-rule="evenodd">
 </path></svg>`,
  suscription: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; ">
  <path clip-rule="evenodd" d="M4 4.5A1.5 1.5 0 015.5 3h13A1.5 1.5 0 0120 4.5H4Zm16.5 3h-17v11h17v-11ZM3.5 6A1.5 1.5 0 002 7.5v11A1.5 1.5 0 003.5 20h17a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0020.5 6h-17Zm7.257 4.454a.5.5 0 00-.757.43v4.233a.5.5 0 00.757.429L15 13l-4.243-2.546Z" fill-rule="evenodd">
  </path></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
  <path clip-rule="evenodd" d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z" fill-rule="evenodd">
  </path></svg>
  `,
  searchSvg: `
  <svg viewBox="0 0 24 24">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
`
}

const STYLES = `
:host {
    all: initial; /* Reset all inherited styles */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    z-index: 10; /* Adjust number as needed */
}
:host * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

  .hidden { display: none; }
  .inline { display: inline; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .h-5 { height: 1.25rem; }
  .h-6 { height: 1.5rem; }
  .h-12 { height: 3rem; }
  .h-14 { height: 3.5rem; }
  .h-16 { height: 4rem; }
  .w-5 { width: 1.25rem; }
  .w-32 { width: 8rem; }
  .w-48 { width: 12rem; }
  .w-64 { width: 16rem; }
  .w-full { width: 100%; }
  .h-full { height: 100%; }
  .p-6 { padding: 1.5rem; }
  .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .pt-16 { padding-top: 4rem; }
  .mt-5 { margin-top: 1.25rem; }
  .mb-4 { margin-bottom: 1rem; }
  .ml-6 { margin-left: 1.5rem; }
  .rounded { border-radius: 0.25rem; }
  .rounded-lg { border-radius: 0.5rem; }
  .fixed { position: fixed; }
  .top-16 { top: 4rem; }
  .left-0 { left: 0; }
  .z-50 { z-index: 50; }
  .space-x-2 { margin-left: 0.5rem; margin-right: 0.5rem; }
  .mx-auto { margin-left: auto; margin-right: auto; }
  .justify-between { justify-content: space-between; }
  .text-white { color: #ffffff; }
  .text-gray-300 { color: #d1d5db; }
  .text-gray-900 { color: #111827; }
  .bg-gray-100 { background-color: #f7fafc; }
  .bg-gray-700 { background-color: #374151; }
  .bg-gray-800 { background-color: #1f2937; }
  .bg-gray-900 { background-color: #111827; }
  .bg-gray-950 { background-color: #131313; }
  .font-bold { font-weight: 700; }
  .font-semibold { font-weight: 600; }
  .hover\\:text-white:hover { color: #ffffff; }
  .hover\\:bg-gray-700:hover { background-color: #374151; }
  .hover\\:text-white:hover { color: #ffffff; }
  .rounded-lg { border-radius: 0.5rem; }
  .border-0 { border-width: 0; }
  .border-gray-100 { border-color: #f7fafc; }
  .border-transparent { border-color: transparent; }
  .transparent { background-color: transparent; }
  .transition-transform { transition-property: transform; }
  .duration-300 { transition-duration: 300ms; }
  .ease-in-out { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
  .transform { transform: translateX(0); }
  .-translate-x-full { transform: translateX(-100%); }
  .active { font-weight: bold; border-left: 1px solid #646cff; }
  .nav-link { text-decoration: none; display: flex; align-items: center; padding: 0.5rem 1.5rem; color: #d1d5db; }

@media (min-width: 640px) {
  .sm\:hidden {
    display: none !important;
  }
  .sm\:inline {
    display: inline !important;
  }
  .sm\:block {
    display: block !important;S
  }
  .sm\:flex {
    display: flex !important;
  }
  .sm\:grid {
    display: grid !important;
  }
  .sm\:items-center {
    align-items: center !important;
  }
  .sm\:px-6 {
    padding-left: 1.5rem !important; /* 24px */
    padding-right: 1.5rem !important;
  }
  .sm\:py-2 {
    padding-top: 0.5rem !important; /* 8px */
    padding-bottom: 0.5rem !important;
  }
  .sm\:hover\:bg-gray-700:hover {
    background-color: #4a5568 !important; /* Gray 700 */
  }
}
.nav-button {
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: transparent;
  border: none;
  border-radius: 0.25rem;
  color: #d1d5db;
  transition: color 0.2s;
}

/* Text span styles */
.nav-button-text {
    display: none; /* Hidden by default */
}

/* Icon styles */
.nav-button-icon {
    height: 1.25rem;
    width: 1.25rem;
    stroke: currentColor;
}

/* Media query for larger screens (sm and up) */
@media (min-width: 992px) {
    .nav-button {
        padding: 0.5rem 0.75rem;
    }

    .nav-button-text {
        display: inline;
        margin-left: 0.5rem;
    }

    .nav-button-icon {
        display: none; /* Hide icon on larger screens */
    }
}

.nav-button::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 80%;
  height: 2px;
  background-color: #646cff;
  transition: transform 0.3s ease;
}

.nav-button.active {
  color: white;
  background-color: rgba(55, 65, 81, 0.4);
}

.nav-button.active::after {
  transform: translateX(-50%) scaleX(1);
}

.nav-link {
  position: relative;
  transition: all 0.3s ease;
}

.nav-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background-color: #646cff;
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.nav-link.active {
  color: white;
  background-color: rgba(55, 65, 81, 0.4);
}

.nav-link.active::before {
  transform: scaleY(1);
}
`;

class AppConfig {
  static PAGES = {
    tab1: '1',
    tab2: '2',
    tab3: '3',
    tab5: '5'
  };
  static PAGE_CONFIG = {
    [this.PAGES.tab1]: {
        label: 'Inicio', 
        icon: svgs.home
    },
    [this.PAGES.tab2]: {
        label: 'Shorts',
        icon: svgs.shorts
    },
    [this.PAGES.tab3]: {
        label: 'suscripciones',
        icon: svgs.suscription
    },
    [this.PAGES.tab4]: {
        label: 'Settings',
        icon: svgs.config
    },
    [this.PAGES.tab5]: {
        label: 'Login',
        icon: svgs.login
    },
    
  }
  static slots = {
    1: '<slot name="1-content">No content available for Dashboard</slot>',
    2: '<slot name="2-content">No content available for Projects</slot>',
    3: '<slot name="3-content">No content available for Messages</slot>',
    4: '<slot name="4-content">No content available for Settings</slot>',
    5: '<slot name="5-content">No content available for Login</slot>'
  };
  static getSvgIcon(page) {
    return this.PAGE_CONFIG[page]?.icon || '';
  }
  static getButtonContent(page, index) {
    const pageConfig = this.PAGE_CONFIG[page];
    return `
      <span class="nav-button-text">${pageConfig.label}</span>
      <span class="sm:hidden">
        ${pageConfig.icon || `<span class="font-bold">${index + 1}</span>`}
      </span>
    `;
  }

  static getSidebarContent(page, index, activePage) {
    const pageConfig = this.PAGE_CONFIG[page];
    return `
      <a href="#" class="rounded nav-link flex items-center px-6 py-2 hover:bg-gray-700 ${activePage === page ? 'active' : ''}" 
         data-page="${page}">
        ${pageConfig.icon}
        ${pageConfig.label}
      </a>
    `;
  }
  static setActivePage(page) {
    localStorage.setItem('activePage', page);
    document.dispatchEvent(new CustomEvent('page-changed', { detail: page }));
  } 

  static getActivePage() {
    return localStorage.getItem('activePage') || Object.values(this.PAGES)[0];
  }
}
const pages = Object.values(AppConfig.PAGES);

class SideBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isOpen = false;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Toggle sidebar event
    document.addEventListener('toggle-sidebar', () => {
      console.log('toggle-sidebar');
      this.isOpen = !this.isOpen;
      this.updateVisibility();
    });

    // Navigation link click events
    this.shadowRoot.addEventListener('click', (e) => {
      const navLink = e.target.closest('.nav-link');
      if (navLink) {
        e.preventDefault();
        const page = navLink.dataset.page;
        AppConfig.setActivePage(page);
        this.updateActiveLink(page);
      }
    });

    // Page change event
    document.addEventListener('page-changed', (e) => {
      this.updateActiveLink(e.detail);
    });
  }

  updateActiveLink(activePage) {
    const links = this.shadowRoot.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.classList.toggle('active', link.dataset.page === activePage);
    });
  }

  updateVisibility() {
    const sidebar = this.shadowRoot.querySelector('.sidebar');
    document.dispatchEvent(new CustomEvent('sidebar-toggle', { detail: this.isOpen }));
    if (this.isOpen) {
      sidebar.classList.remove('-translate-x-full');
      sidebar.classList.add('sidebar-open');
    } else {
      sidebar.classList.add('-translate-x-full');
      sidebar.classList.remove('sidebar-open');
    }
  }

  render() {
    const activePage = AppConfig.getActivePage();
    
    //this element is neighbors content-shifted
    const sidebarStyles = /*css*/`
      .sidebar {
        position: fixed;
        top: 4rem;
        left: 0;
        height: calc(100% - 4rem);
        width: 13.5rem; 
        background-color: #131313;
        color: white;
        transition: transform 0.3s ease-in-out;
        z-index: 40;
        transform: translateX(-100%);
      }
      .sidebar.sidebar-open {
        transform: translateX(0);
      }
      .sidebar-content {
        width: 100%;
        height: 100%;
      }
    `;

    this.shadowRoot.innerHTML = `
      <style>
        ${STYLES}
        ${sidebarStyles}
      </style>
      <div class="sidebar ${this.isOpen ? 'sidebar-open' : ''}">
        <nav class="mt-5">
          ${pages.map((page, index) => 
            AppConfig.getSidebarContent(page, index, activePage)
          ).join('')}
        </nav>
        <slot name="sidebar-content" ></slot>
      </div>
    `;
  }
}

customElements.define('side-bar', SideBar);
class NavBar extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
      this.setupEventListeners();
    }
  
    setupEventListeners() {
      this.shadowRoot.querySelector('#menuButton').addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('toggle-sidebar'));
      });
  
      const navButtons = this.shadowRoot.querySelectorAll('.nav-button');
      navButtons.forEach(button => {
        button.addEventListener('click', () => {
          AppConfig.setActivePage(button.dataset.page);
          this.updateActiveButton(button.dataset.page);
        });
      });
  
      document.addEventListener('page-changed', (e) => {
        this.updateActiveButton(e.detail);
      });
    }
  
    updateActiveButton(activePage) {
      const buttons = this.shadowRoot.querySelectorAll('.nav-button');
      buttons.forEach(button => {
        if (button.dataset.page === activePage) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    }
  
    render() {
        const activePage = AppConfig.getActivePage();
    
        this.shadowRoot.innerHTML = `
          <style>
          
          ${STYLES}
          </style>
          <nav class="bg-gray-950 fixed w-full z-50">
            <div class="mx-auto px-4">
              <div class="flex items-center h-14">
                <div class="flex items-center">
                  <button id="menuButton" class="text-gray-300 hover:text-white transparent border-0">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                  </button>
                  <div class="ml-6 flex space-x-2">
                    ${pages.map((page, index) => `
                      <button class="nav-button px-3 py-2 transparent border-0 rounded text-gray-300 hover:text-white ${activePage === page ? 'active' : ''}" 
                        data-page="${page}">
                        ${AppConfig.getButtonContent(page, index)}
                      </button>
                    `).join('')}
                  </div>
                </div>
                <div class="flex items-center justify-between w-full">
                  <slot name="navbar-content"></slot> <!-- Aquí va el slot -->
                </div>
              </div>
            </div>
          </nav>
        `;
      }
  }
  
customElements.define('nav-bar', NavBar);
class MainContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.addEventListener('page-changed', (e) => {
      this.updateSlotContent(e.detail);
    });

    document.addEventListener('sidebar-toggle', (e) => {
      this.handleSidebarToggle(e.detail);
      console.log('sidebar-toggle');
    });
  }

  updateSlotContent(activePage) {
    const slotElement = this.shadowRoot.querySelector('slot');
    if (slotElement) {
      slotElement.setAttribute('name', `${activePage}-content`);
    }
  }

  handleSidebarToggle(isOpen) {
    const mainElement = this.shadowRoot.querySelector('main');
    if (mainElement) {
      if (isOpen) {
        mainElement.classList.add('content-shifted');
      } else {
        mainElement.classList.remove('content-shifted');
      }
    }
  }

  render() {
    const activePage = AppConfig.getActivePage();
    this.shadowRoot.innerHTML = `
      <style>
        main {
          padding-top: 3.5rem;
          min-height: 100vh;
          background-color: #131313;
          color: white;
          transition: padding-left 0.3s ease-in-out;
          padding-left: 0;
        }
        .container {
          padding-inline: 0.5rem; /* p-6 */
        }
        .title {
          font-size: 1.875rem; /* text-3xl */
          font-weight: 700; /* font-bold */
          margin-bottom: 1rem; /* mb-4 */
        }
        .content-shifted {
          padding-left: 10.5rem;
        }
        @media (max-width: 768px) {
          .content-shifted {
            padding-left: 0;
          }
        }
      </style>
      <main>
        <div class="container">
          <slot name="${activePage}-content">
            ${AppConfig.slots[activePage] || '<p>No content available</p>'}
          </slot>
        </div>
      </main>
    `;
  }
}

customElements.define('main-content', MainContent);

document.addEventListener('page-changed', (e) => {
  localStorage.setItem('activePage', e.detail);
});

const icons = {
  home: `<svg viewBox="0 0 24 24" width="24" height="24">
    <path fill="currentColor" d="M12 3L4 9v12h16V9l-8-6zm0 2.25L18 10v9H6v-9l6-4.75z"/>
  </svg>`,
  
  playlist: `<svg viewBox="0 0 24 24" width="24" height="24">
    <path fill="currentColor" d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/>
  </svg>`,
  
  album: `<svg viewBox="0 0 24 24" width="24" height="24">
    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
  </svg>`,
  
  liked: `<svg viewBox="0 0 24 24" width="24" height="24">
    <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>`
};
const listitems = [
  {
    title: 'Inicio',
    icon: svgs.home
  },
  {
    title: 'Shorts',
    icon: svgs.shorts
  },
  {
    title: 'Suscripciones',
    icon: svgs.suscription
  },
  {
    title: 'Tu',
    icon: svgs.profile
  }
];
class YTMusicGuideSectionRenderer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  createMenuItem(icon, text) {
    return `
      <div class="guide-section-item" data-section="${text}">
        <div class="icon-wrapper">${icon}</div>
        <span>${text}</span>
      </div>
    `;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
  :host {
    display: flex;
    flex-direction: column;
    width: 4.5rem;
    height: 100vh;
    position: fixed;
    padding-block: 0.5rem;
    left: 0;
    color: #fff;
    font-family: Roboto, Arial, sans-serif;
    overflow-y: auto;
  }

  .guide-section {
    padding: 0;
  }

  .guide-section-header {
    padding: 4px 0.5rem;
    font-size: 10px;
    font-weight: 500;
    color: #aaa;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .guide-section-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 4.5rem;
    height: 4.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
    margin: 0 4px;
  }

  .guide-section-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  .guide-section-items {
    display: flex;
    flex-wrap: wrap;
    gap: 1px;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 2rem;
    margin-bottom: 0.2rem;
    color: #fff;
  }

  .guide-section-item span {
    font-size: 0.65rem;
    font-weight: 400;
    text-align: center;
    color: #f1f1f1;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    :host {
      display: none;
    }
  }
      </style>

      <div class="guide-section">
        <div class="guide-section-items">
          ${listitems.map(item => this.createMenuItem(item.icon, item.title)).join('')}
        </div>
      </div>

      <div class="guide-section">
        <div class="guide-section-header">Playlists</div>
        <div class="guide-section-items">
          ${this.createMenuItem(icons.playlist, 'My Mix')}
          ${this.createMenuItem(icons.playlist, 'Favorites')}
          ${this.createMenuItem(icons.playlist, 'Discover')}
        </div>
      </div>
    `;
    const buttons = this.shadowRoot.querySelectorAll('.guide-section-item');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const section = button.getAttribute('data-section');
        this.handleSectionClick(section);
      });
    });
  }
  handleSectionClick(section) {
    document.dispatchEvent(new CustomEvent('guide-section-click', { detail: section }));
  }
}

customElements.define('ytmusic-guide-section-renderer', YTMusicGuideSectionRenderer);
class CustomDropdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.position = this.getAttribute('position') || 'right';
    this.mode = this.getAttribute('mode') || 'light';
    this.navigationStack = [];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.updateMode();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          position: relative;
        }

        .dropdown-trigger {
          cursor: pointer;
          padding: 8px 16px;
          background: none;
          border: none;
          color: var(--text-color, #333);
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: color 0.2s ease;
        }

        .dropdown-trigger:hover {
          color: var(--hover-color, #646cff);
        }

        .dropdown-content {
          display: none;
          position: absolute;
          background: var(--bg-color, white);
          min-width: 200px;
          max-height: 300px;
          overflow-y: auto;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          border-radius: 8px;
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 0.2s ease, transform 0.2s ease;
          border: 1px solid var(--border-color, rgba(0, 0, 0, 0.1));
        }

        .dropdown-content.active {
          display: block;
          opacity: 1;
          transform: translateY(0);
        }

        .dropdown-content.position-right {
          left: 0;
        }

        .dropdown-content.position-left {
          right: 0;
        }

        .navigation-header {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          border-bottom: 1px solid var(--border-color, rgba(0, 0, 0, 0.1));
        }

        .back-button {
          background: none;
          border: none;
          cursor: pointer;
          margin-right: 8px;
          display: flex;
          align-items: center;
        }

        .category-title {
          flex-grow: 1;
          font-weight: bold;
        }

        ::slotted(*) {
          padding: 12px 16px;
          display: block;
          color: var(--text-color, #333);
          text-decoration: none;
          transition: background-color 0.2s ease;
          cursor: pointer;
        }

        ::slotted(a:hover),
        ::slotted([data-category]:hover) {
          background-color: var(--hover-bg, #f5f5f5);
        }

        .category-icon {
          margin-right: 8px;
        }
      </style>
      <button class="dropdown-trigger">
        <slot name="trigger">Dropdown</slot>
      </button>
      <div class="dropdown-content">
        <slot></slot>
      </div>
    `;
  }

  setupEventListeners() {
    const trigger = this.shadowRoot.querySelector('.dropdown-trigger');
    const content = this.shadowRoot.querySelector('.dropdown-content');

    // Initial setup to prepare categories
    this.prepareCategories();

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = content.classList.contains('active');
      
      // Close all other dropdowns
      document.querySelectorAll('custom-dropdown').forEach(dropdown => {
        if (dropdown !== this) {
          dropdown.shadowRoot.querySelector('.dropdown-content').classList.remove('active');
        }
      });

      content.classList.toggle('active');
      
      if (!isActive) {
        this.updatePosition();
        this.resetToMainLevel();
      }
    });

    // Setup click events for categories and items
    this.setupCategoryNavigation();

    // Existing event listeners from previous implementation
    window.addEventListener('resize', () => {
      if (content.classList.contains('active')) {
        this.updatePosition();
      }
    });

    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) {
        content.classList.remove('active');
        this.resetToMainLevel();
      }
    });

    document.addEventListener('scroll', () => {
      if (content.classList.contains('active')) {
        this.updatePosition();
      }
    }, true);
  }

  prepareCategories() {
    const content = this.shadowRoot.querySelector('.dropdown-content');
    const items = Array.from(this.children);

    items.forEach(item => {
      // Check if item is a category
      if (item.hasAttribute('data-category')) {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          this.navigateToCategory(item);
        });
      }
    });
  }

  setupCategoryNavigation() {
    const content = this.shadowRoot.querySelector('.dropdown-content');

    content.addEventListener('click', (e) => {
      const categoryItem = e.target.closest('[data-category]');
      if (categoryItem) {
        e.stopPropagation();
        this.navigateToCategory(categoryItem);
      }
    });
  }

  navigateToCategory(categoryItem) {
    const content = this.shadowRoot.querySelector('.dropdown-content');
    const originalContent = Array.from(content.children);

    // Create navigation header
    const navHeader = document.createElement('div');
    navHeader.classList.add('navigation-header');

    // Back button
    const backButton = document.createElement('button');
    backButton.classList.add('back-button');
    backButton.innerHTML = '&#8592;'; // Left arrow
    backButton.addEventListener('click', () => this.resetToMainLevel());

    // Category title
    const categoryTitle = document.createElement('div');
    categoryTitle.classList.add('category-title');
    categoryTitle.textContent = categoryItem.getAttribute('data-category');

    navHeader.appendChild(backButton);
    navHeader.appendChild(categoryTitle);

    // Clear current content
    content.innerHTML = '';
    content.appendChild(navHeader);

    // Add category-specific content
    const categoryContent = categoryItem.querySelector('[slot="category-items"]');
    if (categoryContent) {
      // Store original content in navigation stack
      this.navigationStack.push(originalContent);

      // Clone and append category-specific content
      const clonedContent = categoryContent.cloneNode(true);
      content.appendChild(clonedContent);
    }
  }

  resetToMainLevel() {
    const content = this.shadowRoot.querySelector('.dropdown-content');
    
    // Restore original content if navigation stack is not empty
    if (this.navigationStack.length > 0) {
      content.innerHTML = '';
      const originalContent = this.navigationStack.pop();
      originalContent.forEach(item => content.appendChild(item));
      this.prepareCategories();
    }
  }

  updateMode() {
    const trigger = this.shadowRoot.querySelector('.dropdown-trigger');
    const content = this.shadowRoot.querySelector('.dropdown-content');

    if (trigger && content) {
      if (this.mode === 'dark') {
        trigger.style.setProperty('--text-color', '#ffffff');
        trigger.style.setProperty('--hover-color', '#8b92ff');

        content.style.setProperty('--bg-color', '#1a1a1a');
        content.style.setProperty('--text-color', '#ffffff');
        content.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.1)');
        content.style.setProperty('--hover-bg', '#2a2a2a');
      } else {
        trigger.style.setProperty('--text-color', '#333');
        trigger.style.setProperty('--hover-color', '#646cff');

        content.style.setProperty('--bg-color', 'white');
        content.style.setProperty('--text-color', '#333');
        content.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.1)');
        content.style.setProperty('--hover-bg', '#f5f5f5');
      }
    }
  }

  // Existing methods like updatePosition remain the same...
  updatePosition() {
    const trigger = this.shadowRoot.querySelector('.dropdown-trigger');
    const content = this.shadowRoot.querySelector('.dropdown-content');
    const rect = trigger.getBoundingClientRect();
    
    // Reset classes
    content.classList.remove('position-left', 'position-right');

    // Calculate available space on both sides
    const spaceRight = window.innerWidth - rect.right;
    const spaceLeft = rect.left;

    // Determine optimal position
    if (this.position === 'left' || spaceRight < 200) {
      content.classList.add('position-left');
    } else {
      content.classList.add('position-right');
    }

    // Adjust vertical position if needed
    const contentRect = content.getBoundingClientRect();
    if (contentRect.bottom > window.innerHeight) {
      content.style.maxHeight = `${window.innerHeight - rect.bottom - 20}px`;
      content.style.overflowY = 'auto';
    }
  }

  static get observedAttributes() {
    return ['mode'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'mode') {
      this.mode = newValue;
      this.updateMode();
    }
  }
}

customElements.define('custom-dropdown', CustomDropdown);
class NestedMenu extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.navStack = [];
      this.currentMenu = 'main';
      this.menuItems = new Map();
  }

  connectedCallback() {
      this.render();
      this.setupEventListeners();
      this.updateTheme();
  }

  setupEventListeners() {
      this.shadowRoot.addEventListener('click', (e) => {
          if (e.target.classList.contains('menu-item')) {
              const submenuId = e.target.dataset.submenu;
              if (submenuId) {
                  this.navigateTo(submenuId);
              }
          } else if (e.target.classList.contains('back-button')) {
              this.navigateBack();
          }
      });
  }

  // New method to toggle theme
  updateTheme() {
      const theme = this.getAttribute('theme');
      const container = this.shadowRoot.querySelector('.menu-container');
      if (!container) return;
      if (theme === 'dark') {
          container.classList.add('dark-theme');
      } else {
          container.classList.remove('dark-theme');
      }
  }

  // Observe theme attribute changes
  static get observedAttributes() {
      return ['theme'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'theme') {
          this.updateTheme();
      }
  }

  navigateTo(submenuId) {
      this.navStack.push(this.currentMenu);
      this.currentMenu = submenuId;
      this.updateVisibility();
  }

  navigateBack() {
      if (this.navStack.length > 0) {
          this.currentMenu = this.navStack.pop();
          this.updateVisibility();
      }
  }

  updateVisibility() {
      this.shadowRoot.querySelectorAll('.submenu').forEach(submenu => {
          submenu.style.display = submenu.id === this.currentMenu ? 'block' : 'none';
      });
      this.shadowRoot.querySelector('.back-button').style.display = 
          this.navStack.length > 0 ? 'block' : 'none';
  }

  addMenuItem(content, submenuId = null, parentId = 'main', id = null) {
      const menuItem = document.createElement('div');
      menuItem.classList.add('menu-item');
      if (id) menuItem.id = id;
      
      if (typeof content === 'string') {
          menuItem.innerHTML = content;
      } else if (content instanceof HTMLElement) {
          menuItem.appendChild(content);
      } else {
          menuItem.innerHTML = content;
      }
      
      if (submenuId) {
          menuItem.dataset.submenu = submenuId;
      }

      if (!this.menuItems.has(parentId)) {
          this.menuItems.set(parentId, []);
      }
      this.menuItems.get(parentId).push(menuItem);

      const parentElement = this.shadowRoot.getElementById(parentId) || 
                            this.shadowRoot.querySelector('.menu-container');
      parentElement.appendChild(menuItem);

      return menuItem;
  }

  addSubmenu(id) {
      const submenu = document.createElement('div');
      submenu.id = id;
      submenu.classList.add('submenu');
      submenu.style.display = 'none';
      this.shadowRoot.querySelector('.menu-container').appendChild(submenu);

      if (!this.menuItems.has(id)) {
          this.menuItems.set(id, []);
      }

      return {
          addItem: (content, submenuId = null, itemId = null) => 
              this.addMenuItem(content, submenuId, id, itemId)
      };
  }

  updateMenuItem(itemId, newContent) {
      const item = this.shadowRoot.getElementById(itemId);
      if (item) {
          if (typeof newContent === 'string') {
              item.innerHTML = newContent;
          } else if (newContent instanceof HTMLElement) {
              item.innerHTML = '';
              item.appendChild(newContent);
          }
      }
  }

  appendToMenuItem(itemId, content) {
      const item = this.shadowRoot.getElementById(itemId);
      if (item) {
          if (typeof content === 'string') {
              item.innerHTML += content;
          } else if (content instanceof HTMLElement) {
              item.appendChild(content);
          }
      }
  }

  render() {
      this.shadowRoot.innerHTML = `
          <style>
              :host {
                  display: block;
                  font-family: Arial, sans-serif;
              }
              .menu-container {
                  background-color: var(--menu-bg-color, #ffffff);
                  color: var(--menu-text-color, #333333);
                  border: 1px solid var(--menu-border-color, #e0e0e0);
                  border-radius: 4px;
                  padding: 10px;
                  transition: background-color 0.3s, color 0.3s;
              }
              .menu-container.dark-theme {
                  background-color: var(--menu-dark-bg-color, #222222);
                  color: var(--menu-dark-text-color, #f0f0f0);
                  border-color: var(--menu-dark-border-color, #444444);
              }
              .menu-item {
                  padding: 10px;
                  cursor: pointer;
                  transition: background-color 0.3s;
              }
              .menu-container .menu-item:hover {
                  background-color: var(--menu-hover-bg-color, #f0f0f0);
              }
              .menu-container.dark-theme .menu-item:hover {
                  background-color: var(--menu-dark-hover-bg-color, #444444);
              }
              .back-button {
                  background-color: var(--menu-hover-bg-color, #f0f0f0);
                  border: none;
                  color: var(--menu-text-color, #333333);
                  padding: 10px;
                  cursor: pointer;
                  margin-bottom: 10px;
                  width: 100%;
                  text-align: left;
                  display: none;
              }
              .menu-container.dark-theme .back-button {
                  background-color: var(--menu-dark-hover-bg-color, #444444);
                  color: var(--menu-dark-text-color, #f0f0f0);
              }
              .submenu {
                  display: none;
              }
          </style>
          <div class="menu-container">
              <button class="back-button">← Volver</button>
              <div id="main" class="submenu" style="display: block;"></div>
          </div>
      `;
  }
}

customElements.define('nested-menu', NestedMenu);

class SearchInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.applyTheme();
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/`
      <style>
        :host {
          display: inline-block;
          font-family: Arial, sans-serif;
        }

        .search-container {
          display: flex;
          align-items: center;
          border: 1px solid #ccc;
          border-radius: 20px;
          min-height: 2rem;
          padding: 5px 10px;
          background-color: var(--background-color, #fff);
          color: var(--text-color, #000);
          position: relative;
          transition: border-color 0.3s;
          box-sizing: border-box;
        }

        .search-container:focus-within {
          border-color: #007bff;
        }

        input {
          border: none;
          outline: none;
          flex-grow: 1;
          background-color: var(--input-background, #fff);
          color: var(--text-color, #000);
          padding-left: 30px;
          transition: padding-left 0.3s, opacity 0.3s;
          opacity: 1;
        }

        button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
          color: var(--icon-color, #999);
          display: flex;
          align-items: center;
        }

        svg {
          width: 2rem;
          height: 2rem;
          object-fit: contain;
          box-sizing: border-box;
          fill: currentColor;
        }
        .search-icon { 
          position: absolute;
          right: 0px;
        }
        .search-icon-left { 
          position: absolute;
          padding-top: 0.5rem;
          left: 0px;
          color: #bbb;
          opacity: 1;
          transition: opacity 0.3s;
        }

        input:focus ~ .search-icon-left {
          opacity: 1;
        }

        .toggle-icon {
          display: none;
        }

        /* Responsive: oculta el input si el contenedor es menor a 500px */
        @media (max-width: 600px) {
          input {
            width: 50%;
          }
        }

        :host([theme="dark"]) {
          --background-color: #333;
          --text-color: #fff;
          --input-background: #333;
          --icon-color: #ccc;
        }

        :host([theme="dark"]) .search-container {
          border-color: #555;
        }
      </style>

      <div class="search-container">
        <button class="toggle-icon">
          ${svgs.searchSvg}
        </button>
                <div class="search-icon-left">
          ${svgs.searchSvg}
        </div>
        <input type="text" placeholder="Buscar...">
        <button class="search-icon">
          ${svgs.search}
        </button>

      </div>
    `;
  }

  setupEventListeners() {
    const input = this.shadowRoot.querySelector('input');
    const searchButton = this.shadowRoot.querySelector('.search-icon');
    const toggleButton = this.shadowRoot.querySelector('.toggle-icon');
    const container = this.shadowRoot.querySelector('.search-container');

    toggleButton.addEventListener('click', () => {
      container.classList.add('responsive');
      input.focus();
    });

    input.addEventListener('blur', () => {
      setTimeout(() => {
        container.classList.remove('responsive');
      }, 200);
    });

    searchButton.addEventListener('click', () => this.submitSearch());

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.submitSearch();
      }
    });
  }

  submitSearch() {
    const input = this.shadowRoot.querySelector('input');
    const searchEvent = new CustomEvent('search-submitted', {
      detail: { query: input.value }
    });
    this.dispatchEvent(searchEvent);
  }

  applyTheme() {
    const theme = this.getAttribute('theme');
    if (theme === 'dark') {
      this.setAttribute('theme', 'dark');
    }
  }
}

customElements.define('search-input', SearchInput);
const svgnav = {
  next: `<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="currentcolor" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="m9.4 18.4-.7-.7 5.6-5.6-5.7-5.7.7-.7 6.4 6.4-6.3 6.3z"></path></svg>`,
  back: `<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="currentcolor" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M14.96 18.96 8 12l6.96-6.96.71.71L9.41 12l6.25 6.25-.7.71z"></path></svg>`
}
class SuggestionCarousel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = /*html*/`
<style>
  :root {
    --text-prymary: #f1f1f1;
    --text-prymary-inverse: #f0f0f0;
  }
  :host {
    display: flex;
    align-items: center;
    padding: 5px;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .carousel {
    display: flex;
    overflow-x: scroll;
    scroll-behavior: smooth;
    margin-inline: 1.2rem;
    gap: 1rem;
    width: 100%;
    padding: 5px 0;
    position: relative;
    scrollbar-width: none; /* Ocultar barra de desplazamiento en Firefox */
    transition:
  all 200ms,
  opacity 400ms;

  }

  .carousel::-webkit-scrollbar {
    display: none; /* Ocultar la barra de desplazamiento en Chrome y Safari */
  }

  .item {
    font-family: "Roboto","Arial",sans-serif;
    line-height: 2rem;
    font-weight: 500;
    background: rgba(255,255,255,0.1);
    color: #fff;

    max-height: 2.5rem;
    box-sizing: border-box;
    padding-inline: 0.5rem;
    border-radius: 0.6rem;

    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    span {
      font-size: 0.9rem;
    }
  }
  .item:hover {
    background-color: rgba(255,255,255,0.2) !important;
  }

.gradient-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4rem; /* Increased width for more pronounced gradient */
  pointer-events: none;
  z-index: 1; /* Ensure it's above the carousel but below the buttons */
}

.gradient-overlay.left {
  margin-left: 1rem;
  left: 0;
  background: linear-gradient(to right, #131313, transparent);
  display: none;
}

.gradient-overlay.right {
  margin-right: 1rem;
  right: 0;
  background: linear-gradient(to left, #131313, transparent);
  display: none;
}

.arrow {
  background: transparent;
    color: #fff;
    border: none;
    padding: 0.4rem;  
    font-size: 18px;
    cursor: pointer;
    z-index: 2;
    display: none; /* Ocultar las flechas por defecto */
    position: absolute;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
  }
  .arrow:hover {
    background: rgba(255,255,255,0.4);
  }

.arrow.left {
  left: 0;
}

.arrow.right {
  right: 0;
}
</style>

    <div class="gradient-overlay left"></div>
    <button class="arrow left">${svgnav.back}</button>
    <div class="carousel">
      <slot></slot>
    </div>
    <button class="arrow right">${svgnav.next}</button>
    <div class="gradient-overlay right"></div>
    `;


    this.carousel = this.shadowRoot.querySelector('.carousel');
    this.leftArrow = this.shadowRoot.querySelector('.arrow.left');
    this.rightArrow = this.shadowRoot.querySelector('.arrow.right');
    this.leftOverlay = this.shadowRoot.querySelector('.gradient-overlay.left');
    this.rightOverlay = this.shadowRoot.querySelector('.gradient-overlay.right');

    this.leftArrow.addEventListener('click', () => this.scrollLeft());
    this.rightArrow.addEventListener('click', () => this.scrollRight());
    this.carousel.addEventListener('scroll', () => this.updateVisibility());
    window.addEventListener('resize', () => this.updateVisibility());
  }

  connectedCallback() {
    // Check initial content and update visibility
    this.checkInitialContent();
    this.addDragScroll();

    // Use a MutationObserver to track changes in child elements
    const observer = new MutationObserver(() => {
      this.checkInitialContent();
    });

    // Configure the observer to watch for changes in child nodes
    observer.observe(this.carousel, {
      childList: true,
      subtree: true
    });
  }
  checkInitialContent() {
    // Wait a brief moment to ensure all children are rendered
    setTimeout(() => {
      const { scrollWidth, clientWidth } = this.carousel;
      
      // Check if content overflows the carousel
      if (scrollWidth > clientWidth) {
        this.rightArrow.style.display = 'block';
        this.rightOverlay.style.display = 'block';
      } else {
        this.rightArrow.style.display = 'none';
        this.rightOverlay.style.display = 'none';
      }

      // Update visibility based on current scroll position
      this.updateVisibility();
    }, 0);
  }
  addDragScroll() {
    let isDown = false;
    let startX;
    let scrollLeft;
  
    this.carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      this.carousel.classList.add('active');
      startX = e.pageX - this.carousel.offsetLeft;
      scrollLeft = this.carousel.scrollLeft;
    });
  
    this.carousel.addEventListener('mouseleave', () => {
      isDown = false;
      this.carousel.classList.remove('active');
    });
  
    this.carousel.addEventListener('mouseup', () => {
      isDown = false;
      this.carousel.classList.remove('active');
    });
  
    this.carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - this.carousel.offsetLeft;
      const walk = (x - startX) * 2; // Velocidad de desplazamiento
      this.carousel.scrollLeft = scrollLeft - walk;
    });
  }
  
  createButton(label, eventName, detail = {}) {
    const button = document.createElement('div');
    button.className = 'item';
    const span = document.createElement('span');
    span.textContent = label;
    button.appendChild(span);
    button.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent(eventName, { detail }));
    });
    this.carousel.appendChild(button);
  }
  
  scrollLeft() {
    this.carousel.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    this.carousel.scrollBy({ left: 200, behavior: 'smooth' });
  }

  updateVisibility() {
    const { scrollLeft, scrollWidth, clientWidth } = this.carousel;

    if (scrollLeft > 0) {
      this.leftArrow.style.display = 'block';
      this.leftOverlay.style.display = 'block';
    } else {
      this.leftArrow.style.display = 'none';
      this.leftOverlay.style.display = 'none';
    }

    if (scrollLeft + clientWidth < scrollWidth) {
      this.rightArrow.style.display = 'block';
      this.rightOverlay.style.display = 'block';
    } else {
      this.rightArrow.style.display = 'none';
      this.rightOverlay.style.display = 'none';
    }
  }
}

customElements.define('suggestion-carousel', SuggestionCarousel); 
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
          padding-block: 0.5rem;
          padding-inline: 1.5rem;
          border-radius: 8px;
          background-color: var(--bg-color, #fff);
          color: var(--text-color, #000);
          overflow: hidden;
        }

        :host([dark-mode]) {
          --bg-color: #131313;
          --text-color: #fff;
        }

        :host([scroll]) {
          overflow-y: auto;
          max-height: 40dvh;
        }

        :host([grid-template]) {
          grid-template-columns: var(--grid-template);
        }

        :host([list-mode]) {
                          gap: 1rem;

          display: block;
          font-size: 0.8rem;
          .subtitles {
            font-size: 0.65rem;
          }
            .subtitles {
            -webkit-line-clamp: 2; 
            text-overflow: ellipsis;
          }
        }

        .video-item {
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: background 0.3s;
          display: flex;
          flex-direction: column;
        }
        .video-item:hover {
            background: var(--item-bg, #f9f9f9);
        }
        :host([dark-mode]) .video-item {
          --item-bg: #282828;
        }

        :host([list-mode]) .video-item {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .image-container {
          width: 100%;
          aspect-ratio: 16 / 9; /* Proporción 16:9 */
          overflow: hidden;
          flex-shrink: 0;
        }

        :host([list-mode]) .image-container {
          width: 150px;
        }

        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .details {
          padding: 0.5rem;
        }

        :host([list-mode]) .details {
          flex: 1;
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

  static get observedAttributes() {
    return ["grid-template", "scroll", "dark-mode", "maxwidth", "list-mode", "width"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "grid-template") {
      this.style.setProperty("--grid-template", newValue || "repeat(auto-fill, minmax(250px, 1fr))");
    }
    if (name === "scroll") {
      this.style.overflowY = newValue !== null ? "auto" : "hidden";
    }
    if (name === "maxwidth") {
      this.style.setProperty("max-width", newValue || "100%");
    }
    if (name === "width") {
      this.style.setProperty("width", newValue || "100%");
    }
  }

  addVideoItem(data, prepend = false) {
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
    this.isSyncing = false;
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
        aspect-ratio: 16 / 9; /* Proporción 16:9 */
      }
    `;

    // Agregar elementos al shadow DOM
    this.shadowRoot.append(style, this.videoElement, this.audioElement);

    // Sincronizar eventos
    this.syncEvents();
    this.setupEndEvent();
  }

  static get observedAttributes() {
    return ['audio-src', 'video-src', 'autoplay', 'muted', 'volume'];
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
    if (name === 'muted') {
      this.audioElement.muted = newValue !== null;
      this.videoElement.muted = newValue !== null;
    }
    if (name === 'volume') {
      this.audioElement.volume = newValue;
      this.videoElement.volume = newValue;
    }
  }

  syncEvents() {
    const sync = (source, target) => {
      source.addEventListener('play', () => {
        if (!this.isSyncing) target.play();
        this.emitCustomEvent('play', { source, target });
      });
      source.addEventListener('pause', () => {
        if (!this.isSyncing) target.pause();
        this.emitCustomEvent('pause', { source, target });
      });
      source.addEventListener('seeked', () => this.syncCurrentTime(source, target));
      source.addEventListener('ratechange', () => {
        if (!this.isSyncing) target.playbackRate = source.playbackRate;
      });
      source.addEventListener('volumechange', () => {
        if (!this.isSyncing) target.volume = source.volume;
        this.emitCustomEvent('volumechange', { source });
      });

    };

    sync(this.videoElement, this.audioElement);
    sync(this.audioElement, this.videoElement);
  }

  setupEndEvent() {
    let videoEnded = false;
    let audioEnded = false;

    const checkEnd = () => {
      if (videoEnded && audioEnded) {
        videoEnded = false;
        audioEnded = false;
      }
    };

    this.videoElement.addEventListener('ended', () => {
      videoEnded = true;
      this.emitCustomEvent('endmedia', { type: 'video', videoEnded });
      checkEnd();
    });

    this.audioElement.addEventListener('ended', () => {
      audioEnded = true;
      this.emitCustomEvent('endmedia', { type: 'audio', audioEnded });
      checkEnd();
    });
  }
  emitCustomEvent(name, data) {
    this.dispatchEvent(new CustomEvent(name, { detail: data }));
  }
  syncCurrentTime(source, target, throttled = false) {
    if (this.isSyncing) return;

    const difference = Math.abs(source.currentTime - target.currentTime);

    // Sincronizar solo si la diferencia es significativa o no está limitada por "timeupdate"
    if (!throttled || difference > 0.3) {
      this.isSyncing = true;
      target.currentTime = source.currentTime;

      // Asegurarse de que el estado vuelva a la normalidad
      setTimeout(() => {
        this.isSyncing = false;
      }, 50);
    }
  }

  setupEndEvent() {
    let videoEnded = false;
    let audioEnded = false;

    const checkEnd = () => {
      if (videoEnded && audioEnded) {
        this.emitCustomEvent('endmedia', { type: 'both' });
        videoEnded = false;
        audioEnded = false;
      }
    };

    this.videoElement.addEventListener('ended', () => {
      videoEnded = true;
      this.emitCustomEvent('endmedia', { type: 'video' });
      checkEnd();
    });

    this.audioElement.addEventListener('ended', () => {
      audioEnded = true;
      this.emitCustomEvent('endmedia', { type: 'audio' });
      checkEnd();
    });
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
            width: 95dvw;
            height: 95dvh;
            top: 3rem;
            bottom: 1rem;
            left: 1rem;
            right: 1rem;
            overflow: auto;
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
            padding-inline: 1rem;
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
const dsStyles = `
  :host {
    display: block;
    font-family: 'Roboto', Arial, sans-serif;
    color: var(--text-color, #0f0f0f);
    background: var(--bg-color, #fff);
    padding: 12px;
    border-radius: 12px;
  }

  .description-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .stats {
    display: flex;
    gap: 12px;
    color: var(--secondary-text, #606060);
    font-size: 14px;
  }

  .title {
    font-size: 16px;
    font-weight: 500;
    margin: 0;
  }

  .content {
    font-size: 14px;
    line-height: 1.5;
    white-space: pre-wrap;
  }

  .expand-btn {
    background: none;
    border: none;
    color: var(--secondary-text, #606060);
    font-size: 14px;
    font-weight: 500;
    padding: 0;
    cursor: pointer;
    margin-top: 8px;
  }

  .expanded .content {
    display: block;
  }

  .collapsed .content {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --text-color: #fff;
      --bg-color: #0f0f0f;
      --secondary-text: #aaa;
    }
  }
`;
function createTemplate(props) {
    return `
      <div class="description-container collapsed">
        <div class="stats">
          <span class="views">${props.views || '0'} views</span>
          <span class="date">${props.date || 'No date'}</span>
          <span class="likes">${props.likes || '0'} likes</span>
        </div>
        <h2 class="title">${props.title || ''}</h2>
        <div class="content">${props.content || ''}</div>
        <button class="expand-btn">Show more</button>
      </div>
    `;
  }
class Description extends HTMLElement {
  #container;
  #expandBtn;
  #initialized = false;
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['title', 'content', 'views', 'date', 'likes'];
  }

  get title() {
    return this.getAttribute('title');
  }

  set title(value) {
    this.setAttribute('title', value);
  }

  get content() {
    return this.getAttribute('content');
  }

  set content(value) {
    this.setAttribute('content', value);
  }

  connectedCallback() {
    if (!this.#initialized) {
      this.render();
      this.#setupEventListeners();
      this.#initialized = true;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    if (this.#initialized) {
      switch (name) {
        case 'title':
          this.#updateTitle(newValue);
          break;
        case 'content':
          this.#updateContent(newValue);
          break;
        case 'views':
          this.#updateElement('.views', `${newValue} views`);
          break;
        case 'date':
          this.#updateElement('.date', newValue);
          break;
        case 'likes':
          this.#updateElement('.likes', `${newValue} likes`);
          break;
      }
    }
  }

  #updateElement(selector, value) {
    const element = this.shadowRoot?.querySelector(selector);
    if (element) {
      element.textContent = value;
    }
  }

  #updateTitle(value) {
    this.#updateElement('.title', value);
  }

  #updateContent(value) {
    this.#updateElement('.content', value);
  }

  #setupEventListeners() {
    this.#container = this.shadowRoot.querySelector('.description-container');
    this.#expandBtn = this.shadowRoot.querySelector('.expand-btn');

    this.#expandBtn.addEventListener('click', () => {
      if (this.#container.classList.contains('collapsed')) {
        this.#container.classList.remove('collapsed');
        this.#container.classList.add('expanded');
        this.#expandBtn.textContent = 'Show less';
      } else {
        this.#container.classList.remove('expanded');
        this.#container.classList.add('collapsed');
        this.#expandBtn.textContent = 'Show more';
      }
    });
  }

  render() {
    const props = {
      title: this.getAttribute('title'),
      content: this.getAttribute('content'),
      views: this.getAttribute('views'),
      date: this.getAttribute('date'),
      likes: this.getAttribute('likes')
    };

    this.shadowRoot.innerHTML = `
      <style>${dsStyles}</style>
      ${createTemplate(props)}
    `;
  }
}

customElements.define('youtube-description', Description);