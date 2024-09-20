class ElementModifier {
  constructor(elementId) {
    this.element = document.getElementById(elementId);

    if (!this.element) {
      console.error(`No se encontró el elemento con id: ${elementId}`);
    }
  }

  // Método para cambiar el texto del elemento principal
  setText(newText) {
    if (this.element) {
      this.element.textContent = newText;
    }
  }

  // Método para cambiar el texto de un sub-elemento (por tag, clase o id)
  setInnerText(selector, newText) {
    if (this.element) {
      const subElement = this.element.querySelector(selector);
      if (subElement) {
        subElement.textContent = newText;
      } else {
        console.error(`No se encontró el sub-elemento con selector: ${selector}`);
      }
    }
  }

  // Método para agregar una clase al elemento principal
  addClass(className) {
    if (this.element) {
      this.element.classList.add(className);
    }
  }

  // Método para agregar una clase a un sub-elemento (por tag, clase o id)
  addClassToSubElement(selector, className) {
    if (this.element) {
      const subElement = this.element.querySelector(selector);
      if (subElement) {
        subElement.classList.add(className);
      } else {
        console.error(`No se encontró el sub-elemento con selector: ${selector}`);
      }
    }
  }

  // Método para eliminar una clase del elemento principal
  removeClass(className) {
    if (this.element) {
      this.element.classList.remove(className);
    }
  }

  // Método para eliminar una clase de un sub-elemento
  removeClassFromSubElement(selector, className) {
    if (this.element) {
      const subElement = this.element.querySelector(selector);
      if (subElement) {
        subElement.classList.remove(className);
      } else {
        console.error(`No se encontró el sub-elemento con selector: ${selector}`);
      }
    }
  }

  // Método para reemplazar completamente la clase del elemento principal
  replaceClass(oldClass, newClass) {
    if (this.element) {
      this.element.classList.replace(oldClass, newClass);
    }
  }

  // Método para reemplazar la clase de un sub-elemento
  replaceClassInSubElement(selector, oldClass, newClass) {
    if (this.element) {
      const subElement = this.element.querySelector(selector);
      if (subElement) {
        subElement.classList.replace(oldClass, newClass);
      } else {
        console.error(`No se encontró el sub-elemento con selector: ${selector}`);
      }
    }
  }

  // Método para comprobar si el elemento tiene una clase
  hasClass(className) {
    if (this.element) {
      return this.element.classList.contains(className);
    }
    return false;
  }

  // Método para comprobar si un sub-elemento tiene una clase
  hasClassInSubElement(selector, className) {
    if (this.element) {
      const subElement = this.element.querySelector(selector);
      if (subElement) {
        return subElement.classList.contains(className);
      } else {
        console.error(`No se encontró el sub-elemento con selector: ${selector}`);
      }
    }
    return false;
  }
}
export default ElementModifier;
// // Ejemplo de uso
// const modifier = new ElementModifier('miElemento');

// // Cambiar el texto del elemento
// modifier.setText('Nuevo texto');

// // Añadir una clase
// modifier.addClass('nuevaClase');

// // Eliminar una clase
// modifier.removeClass('claseVieja');

// // Reemplazar una clase existente por otra
// modifier.replaceClass('claseVieja', 'claseNueva');

// // Comprobar si el elemento tiene una clase
// if (modifier.hasClass('nuevaClase')) {
//   console.log('El elemento tiene la clase nuevaClase');
// }
// modifier.setInnerText('h1', 'Nuevo título');

// // Agregar una clase a un párrafo dentro del elemento
// modifier.addClassToSubElement('p', 'nuevaClase');

// // Eliminar una clase de un span dentro del elemento
// modifier.removeClassFromSubElement('span', 'claseVieja');

// // Reemplazar una clase de un h2 dentro del elemento
// modifier.replaceClassInSubElement('h2', 'claseVieja', 'claseNueva');
