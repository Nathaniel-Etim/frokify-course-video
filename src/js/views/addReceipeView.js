import views from './view';
import icons from '../../img/icons.svg';
import previewView from './previewView';

// this is for the search result view

class addReceipeView extends views {
  _parentElement = document.querySelector('.upload');

  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _formSummit = document.querySelector('.btn upload__btn');

  // the error message for recipe
  _errorMsg = `recipe not found, try another search`;

  _successmsg = 'recipe was successfully uploaded';

  constructor() {
    super();
    this._addHandelerHideWindow();
    this._addHandelerShowWindow();
    this._addHandelerUpload();
  }

  _addHandelerUpload(handeler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      //   this will convert all values into a string(new formData(this(we use this because the info is inside the parent elememnt )))
      const dataArr = [...new FormData(this)];

      //   the fromentries takes an array of item and convert it to an object
      const data = Object.fromEntries(dataArr);
      handeler(data);
    });
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandelerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandelerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
}

export default new addReceipeView();
