import views from './view';
import previewView from './previewView';
import icons from '../../img/icons.svg';
import { result } from 'lodash';

// this is for the search result view

class bookmarkView extends views {
  // the error message for recipe
  _parentElement = document.querySelector('.bookmarks__list');

  _errorMsg = ` No bookmarks yet. Find a nice recipe and bookmark it 😇`;

  addHandelerRender(hander) {
    window.addEventListener(`load`, function (e) {
      // hander()
    });
  }

  _generateHtml() {
    return this._data.map(result => previewView.render(result, false)).join(``);
  }
}

export default new bookmarkView();
