import icons from '../../img/icons.svg';

//this is the parent class every other class in this has access to this views class

export default class views {
  _data;
  /**
   * render the received object to the dom
   * @param {object | arrray{}} data the data to be rendered(e.g recipe)
   * @param {boolean} [render=true] if false create mmarkup string instead of rendering to the DOM
   * @returns {undefined | string} a markup string is returned if render is false
   * @this {object} view instance
   * @author {nathaniel}
   */

  // renderanything that wants to be executed on the UI will have to call the render method ....🤟
  render(data, render = true) {
    // this is for if the user put in a search that does not exist  ... then it will show the error message
    // if (!data || (Array.isArray(data) && data.length === 0)) {
    //   return this.errorMsg();
    // }
    this._data = data;
    const markup = this._generateHtml();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, this._generateHtml());
  }

  update(data) {
    this._data = data;
    const newMartUp = this._generateHtml();

    // 🚨🚨 i do not understand ......... convert the newMartUp to a dom object living in the memory  ///  we  cam also convert a node list to an array using array.from(with the item written inside here)
    // this is a method written in the dom of the system
    const newDOM = document.createRange().createContextualFragment(newMartUp);
    //  we  cam also convert a node list to an array using array.from(with the item written inside here)
    const newElement = Array.from(newDOM.querySelectorAll('*'));
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));

    newElement.forEach((newel, i) => {
      const curEl = curElement[i];
      // update changed text
      if (
        !newel.isEqualNode(curEl) &&
        newel.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newel.textContent;
      }

      if (!newel.isEqualNode(curEl)) {
        Array.from(newel.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  // clear a particular parent field
  _clear() {
    this._parentElement.innerHTML = ``;
  }

  renderSpinner() {
    return ` 
    <div class="spinner">
    <svg>
    <use href="${icons}#icon-loader"></use>
    </svg>
    </div>`;
  }

  // error message format
  errorMsg(message = this._errorMsg) {
    const html = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}!</p>
            </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML(`afterbegin`, html);
  }

  // success message
  // successMsg(message = this._successmsg) {
  //   const html = `
  //           <div class="message">
  //           <div>
  //           <svg>
  //           <use href="${icons}#icon-alert-smile"></use>
  //             </svg>
  //           </div>
  //           <p>${message}!</p>
  //         </div>`;
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML(`afterbegin`, html);
  // }
}
