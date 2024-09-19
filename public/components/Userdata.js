export default class UserData {
  constructor(storageName = 'userData') {
    this.storageName = storageName;
    this.userData = JSON.parse(localStorage.getItem(this.storageName)) || {
      text: [],
      links: [],
      data: []
    };
  }

  // Añadir elemento sin duplicarlo, solo moviéndolo al final si ya existe
  addItem(type, item) {
    if (!this.userData[type]) {
      throw new Error(`Tipo inválido: ${type}`);
    }

    // Buscar si el elemento ya existe
    const index = this.userData[type].findIndex(existingItem => JSON.stringify(existingItem) === JSON.stringify(item));

    if (index !== -1) {
      // Si existe, eliminar el elemento actual
      this.userData[type].splice(index, 1);
    }

    // Añadir el nuevo item al final del array
    this.userData[type].push(item);

    this.saveUserData();
  }

  getLastItems(type, count = 5) {
    if (!this.userData[type]) {
      throw new Error(`Tipo inválido: ${type}`);
    }
    return this.userData[type].slice(-count); // Obtener los últimos `count` elementos
  }

  getAllItems(type) {
    if (!this.userData[type]) {
      throw new Error(`Tipo inválido: ${type}`);
    }
    return this.userData[type];
  }

  clearItems(type) {
    if (!this.userData[type]) {
      throw new Error(`Tipo inválido: ${type}`);
    }
    this.userData[type] = [];
    this.saveUserData();
  }

  saveUserData() {
    localStorage.setItem(this.storageName, JSON.stringify(this.userData));
  }
}

export class DivManager {
  constructor(containerId, divClass, initialData = []) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      throw new Error(`Container with id '${containerId}' not found`);
    }
    this.divClass = divClass;
    this.divs = new Map(); // Usamos un Map para almacenar los divs con sus IDs
    this.init(initialData);
  }

  init(initialData) {
    initialData.forEach(item => this.addDiv(item));
  }

  createDiv(item) {
    const div = document.createElement('div');
    div.className = this.divClass;
    div.textContent = typeof item === 'object' ? JSON.stringify(item) : item;
    return div;
  }

  addDiv(item) {
    const div = this.createDiv(item);
    const id = Date.now().toString(); // Usamos timestamp como ID único
    div.dataset.id = id;
    this.divs.set(id, div);
    this.container.appendChild(div);
    return id;
  }

  removeDiv(id) {
    const div = this.divs.get(id);
    if (div) {
      this.container.removeChild(div);
      this.divs.delete(id);
      return true;
    }
    return false;
  }

  updateDiv(id, newContent) {
    const div = this.divs.get(id);
    if (div) {
      div.textContent = typeof newContent === 'object' ? JSON.stringify(newContent) : newContent;
      return true;
    }
    return false;
  }

  clearAll() {
    this.divs.forEach((div, id) => {
      this.container.removeChild(div);
    });
    this.divs.clear();
  }

  getAllDivs() {
    return Array.from(this.divs.values());
  }

  getDivById(id) {
    return this.divs.get(id);
  }

  getDivsCount() {
    return this.divs.size;
  }
}
// const manager = new DynamicDivManager('myContainer', 'dynamic-div', ['Initial Item 1', 'Initial Item 2']);

// // Añadir un nuevo div
// const newId = manager.addDiv('New Item');

// // Actualizar un div
// manager.updateDiv(newId, 'Updated Item');

// // Eliminar un div
// manager.removeDiv(newId);

// // Obtener todos los divs
// const allDivs = manager.getAllDivs();

// // Limpiar todos los divs
// manager.clearAll();
