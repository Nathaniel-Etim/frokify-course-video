import views from './view';
import icons from '../../img/icons.svg';
import previewView from './previewView';

// this is for the search result view

class resultView extends views {
  // the error message for recipe
  _errorMsg = `recipe not found, try another search`;
  _successmsg = ``;

  _parentElement = document.querySelector('.results');

  _generateHtml() {
    return this._data.map(result => previewView.render(result, false)).join(``);
  }
}

export default new resultView();
