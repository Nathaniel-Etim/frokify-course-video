// the model aspect has to do with anything that communicate with the web
import { async } from 'regenerator-runtime';
import { API_URL, result_per_page, KEY } from './config';
import { AJAX } from './helpers';

export const state = {
  recipe: {},
  search: {
    // the `` in the query shows that all the input must be converted to a string
    query: ``,
    results: [],
    page: 1,
    resultsPerPage: result_per_page,
  },
  bookmark: [],
};

const createReceipeObject = function (data) {
  const recipe = data.data.recipe;
  // items from the receipe receipt are  being out in the state.receipt
  return {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image_url,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    cookingtime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

// this will deal with getting the recipe with it inbgridient (a full detile )
export const loadRecipe = async function (id) {
  try {
    // the id is gotten from listing to the window (window.location.hash)
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

    state.recipe = createReceipeObject(data);
    console.log(state.recipe);
    // this will store the bookmark
    if (state.bookmark.some(bookmark => bookmark.id === id))
      state.recipe.bookmark = true;
    else state.recipe.bookmark = false;
  } catch (err) {
    // error gotten from loading receipt(the receipe section)
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    const response = await data.data.recipes;
    // items gotten from the search are being looped over and put in  an array

    state.search.results = response.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        image: rec.image_url,
        publisher: rec.publisher,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
  } catch (err) {
    // this throws any error coming from loading the search
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; //0

  const end = page * state.search.resultsPerPage; //9

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServing) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
  });

  state.recipe.servings = newServing;
};

const storeBookmark = function () {
  // add bookmark
  localStorage.setItem(`bookmarks`, JSON.stringify(state.bookmark));
};

export const addBookMark = function (receipe) {
  // add bookmark
  state.bookmark.push(receipe);
  // mark as bookmark
  // the bookmark is added here to the state.receipe
  if (receipe.id === state.recipe.id) state.recipe.bookmark = true;

  storeBookmark();
};

export const deleteBookmark = function (id) {
  const index = state.bookmark.findIndex(el => el.id === id);

  // slice uses the index of the item in the array and the 1 is based on how many item do u want to remove
  state.bookmark.splice(index, 1);

  // mark as not bookmark
  if (id === state.recipe.id) state.recipe.bookmark = false;
  storeBookmark();
};

const init = function () {
  const storage = localStorage.getItem(`bookmarks`);
  if (storage) state.bookmark = JSON.parse(storage);
};
init();

const clearBookmark = function (e) {
  localStorage.clear(`bookmarks `);
};

export const uploadReceipe = async function (newReceipe) {
  try {
    // console.log(Object.entries(newReceipe));
    const ingredients = Object.entries(newReceipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        // const ingArr = ing[1].replaceAll(' ', '').split(',');

        console.log(ingArr);

        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format!! pls use a correct format '
          );

        const [quantity, unit, description] = ingArr;
        console.log(quantity, unit, description);

        return [
          {
            quantity: quantity ? +quantity : ``,
            unit,
            description,
          },
        ];
      });

    console.log(ingredients.flat(1));

    const receipe = {
      title: newReceipe.title,
      source_url: newReceipe.sourceUrl,
      image_url: newReceipe.image,
      publisher: newReceipe.publisher,
      cooking_time: +newReceipe.cookingTime,
      servings: +newReceipe.servings,
      ingredients: ingredients.flat(1),
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, receipe);

    state.recipe = createReceipeObject(data);

    addBookMark(state.recipe);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

clearBookmark();
