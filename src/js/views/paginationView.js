import views from './view';
import icons from '../../img/icons.svg';

class padination extends views {
  // the error message for recipe
  _parentElement = document.querySelector(`.pagination`);

  _errorMsg = `recipe not found, try another search`;

  addhandlerClick(handeler) {
    this._parentElement.addEventListener(`click`, function (e) {
      e.preventDefault;

      const btn = e.target.closest(`.btn--inline`);

      if (!btn) return;

      const gotoPage = +btn.dataset?.goto;

      handeler(gotoPage);
    });
  }

  nextPage() {
    return `
  <button data-goto="${
    this._data.page + 1
  }" class="btn--inline pagination__btn--next">
    <span>Page ${this._data.page + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button> `;
  }

  previousPage() {
    return `<button  data-goto="${
      this._data.page - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${this._data.page - 1}</span>
  </button>`;
  }

  _generateHtml() {
    // this is to determine the number of pages
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currpage = this._data.page;
    // console.log(numPages);
    // page one and we have others
    if (currpage === 1 && numPages > 1) {
      // page one and others

      return this.nextPage();
    }

    // last page
    if (currpage === numPages && numPages > 1) {
      // last page
      return this.previousPage();
    }
    // other page
    if (currpage < numPages) {
      const bothPages = this.previousPage() + this.nextPage();
      return bothPages;
    }
    // page one and no other others
    return ``;
  }
}

export default new padination();
