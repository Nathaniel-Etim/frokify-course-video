//
class searchView {
  _parentElement = document.querySelector(`.search`);

  // this is the search input area .. note 👉 the input here is the query which is passed in the url and also state.search.query 👈

  searchInput() {
    const query = this._parentElement.querySelector(`.search__field`).value;
    this._clearinput();

    return query;
  }

  // once the submit is clicked then the form is cleared with theh function below👇

  _clearinput() {
    this._parentElement.querySelector(`.search__field`).value = ``;
  }

  // this listen for the submit event this is being called in the control and it calls the promise

  addhandelersearch(handler) {
    this._parentElement.addEventListener(`submit`, function (e) {
      e.preventDefault();

      handler();
    });
  }
}

export default new searchView();
