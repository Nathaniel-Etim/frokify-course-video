import recipeView from './views/recipeViews.js';
import resultView from './views/resultView.js';
import padinationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import * as model from '../js/model.js';
import { MODEL_CLOSE } from './config.js';
import searchView from './views/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import addReceipeView from './views/addReceipeView.js';
import { async } from 'regenerator-runtime';
import { add, result } from 'lodash';
import previewView from './views/previewView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// loading recipe
const recipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;

    // calling the spinner function
    recipeView.renderSpinner();

    resultView.update(model.getSearchResultPage());

    await model.loadRecipe(id);

    const recipes = model.state.recipe;
    recipeView.render(recipes);
  } catch (err) {
    recipeView.errorMsg();
  }
};

// recipe();

// the innit handeler is outside the receipt function because it determines the loading and hashchange event

export const controlSearchResult = async function () {
  try {
    // get search query or the item being seached for the query is shown at
    // resultView.renderSpinner();

    const query = searchView.searchInput();

    if (!query) return;

    resultView.renderSpinner();

    // load query
    await model.loadSearchResult(query);

    // render result
    const request = model.state.search.results;

    resultView.render(model.getSearchResultPage(1));
    bookmarkView.update(model.state.bookmark);

    // render initial padination
    padinationView.render(model.state.search);
  } catch (err) {
    throw err;
  }
};

// 🔥🔥🔥 really important this will change then grouped item displyed of the search item into different groups

const controlpadination = function (goTOpage) {
  resultView.renderSpinner();

  // render new result
  resultView.render(model.getSearchResultPage(goTOpage));

  // render initial new  padination
  padinationView.render(model.state.search);
  // console.log(goTOpage);
};

// receipe serving

const controlServing = function (newServings) {
  // update the recipe saving in the state
  model.updateServings(newServings);
  // updating the underline data and the view
  const recipes = model.state.recipe;

  // recipeView.render(recipes);
  recipeView.update(recipes);
};

const controlAddBookmark = function (e) {
  // model.state.recipe.bookmark = true simply means that the item is in bookmark but if not it will be added to the bookmark

  if (!model.state.recipe.bookmark) {
    model.addBookMark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // model.addBookMark(model.state.recipe);
  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmark);
};

const controlBookmark = function (e) {
  bookmarkView.render(model.state.bookmark);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // loading spinner
    addReceipeView.renderSpinner();

    await model.uploadReceipe(newRecipe);

    recipeView.render(model.state.recipe);

    // sucess message
    // addReceipeView.successMsg();

    // add new element to the bookmark view
    bookmarkView.render(model.state.bookmark);

    // changeurl id
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // to go back and forward in pages
    // window.history.back();

    // DISPLAY RECEIPE
    recipeView.render(model.state.recipe);

    previewView.render(model.state.recipe);
    // close window form
  } catch (err) {
    // console.error(err);
    addReceipeView.errorMsg(err.message);
  }
};

// the init is an event handeler that will load the hash and the load event
const init = function () {
  bookmarkView.addHandelerRender(controlBookmark);
  recipeView.addHandlerRender(recipe);
  recipeView.addHandelerUpdateServings(controlServing);
  recipeView.addHandelerBookmark(controlAddBookmark);
  searchView.addhandelersearch(controlSearchResult);
  padinationView.addhandlerClick(controlpadination);
  addReceipeView._addHandelerUpload(controlAddRecipe);
};
init();
