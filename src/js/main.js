'use strict';

const imgPlaceholder = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
const input = document.querySelector('.js-input');
const searchBtn = document.querySelector('.js-search-btn');
const resetBtn = document.querySelector('.js-reset-btn');
const notFound = document.querySelector('.js-msg');
const cocktailsList = document.querySelector('.js-list-cocktails');
const favouritesList = document.querySelector('.js-list-favourites');


let cocktailsListData = [];
let favouritesListData = [];


//FETCH or LS, Standard Margaritas
const storedCocktails = JSON.parse(localStorage.getItem(`cocktails`));

if (storedCocktails) { 
  favouritesListData = storedCocktails;
  renderFavouritesList(favouritesListData);
  console.log('I have LS');
}

function addCocktails(url) {
  fetch(url)
  .then((response) => response.json())
  .then(data => {
      if (data.drinks) {
        cocktailsListData = data.drinks;
        console.log(data.drinks);
        renderCocktailsList(cocktailsListData);
        notFound.innerHTML = '';
        console.log('I fetch');
      } else {
        notFound.innerHTML = '¡Nos has pillado! Parece que no tenemos el coctel que estás buscando...';
        cocktailsListData = [];
        renderCocktailsList(cocktailsListData);
      }
    });
}

addCocktails('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');

// Search cocktails with the search button

function handleClickSearch() {
  const searchValue = input.value;
  let url = `http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;
  cocktailsList.innerHTML = '';
  addCocktails(url);
}

function handleEnterSearch(ev) {
  if (ev.keyCode === 13) {
    handleClickSearch(ev);
  }
}

// Render cocktails
function renderCocktail(cocktail) {
  const selectedCocktail = favouritesListData.find(favCocktail => favCocktail.strDrink === cocktail.strDrink);
  const liElement = document.createElement('li');
  const articleElement = document.createElement('article');
  const h3Element = document.createElement('h3');
  const title = document.createTextNode(cocktail.strDrink);
  const imgElement = document.createElement('img');

  liElement.setAttribute('class', `li js-li-cocktail ${selectedCocktail && 'selected'}`);
  liElement.dataset.id = cocktail.idDrink;

  articleElement.setAttribute('class', 'li__article');

  imgElement.setAttribute('src', cocktail.strDrinkThumb || imgPlaceholder);
  imgElement.setAttribute('class', 'li__article--img');

  h3Element.appendChild(title);
  articleElement.appendChild(h3Element);
  articleElement.appendChild(imgElement);
  liElement.appendChild(articleElement);
  cocktailsList.appendChild(liElement);
}

function renderCocktailsList(cocktailsListData) {
  for (const cocktail of cocktailsListData) {
    renderCocktail(cocktail);
  }
  addEventToCocktail();
}

//Render favourite cocktails

function renderFavCocktail(cocktail) {
  const liElement = document.createElement('li');
  const articleElement = document.createElement('article');
  const h3Element = document.createElement('h3');
  const favBtn = document.createElement('span');
  const imgElement = document.createElement('img');

  liElement.setAttribute('class', 'li js-li-cocktail');
  liElement.setAttribute('id', cocktail.idDrink);

  articleElement.setAttribute('class', 'li__article');

  const title = document.createTextNode(cocktail.strDrink);

  favBtn.setAttribute('class', 'fa-solid fa-heart js-fav-btn');
  //favBtn.addEventListener('click', handleClickRemoveFav);

  imgElement.setAttribute('src', cocktail.strDrinkThumb || imgPlaceholder);
  imgElement.setAttribute('class', 'li__article--img');

  h3Element.appendChild(title);
  articleElement.appendChild(h3Element);
  articleElement.appendChild(favBtn);
  articleElement.appendChild(imgElement);
  liElement.appendChild(articleElement);
  favouritesList.appendChild(liElement);
}

function renderFavouritesList(favouritesListData) {
  favouritesList.innerHTML = '';
  for (const cocktail of favouritesListData) {
    renderFavCocktail(cocktail);
  }
  addEventToFavBtn();
}

function addEventToCocktail() {
  const liElementsList = document.querySelectorAll('.js-li-cocktail');
  for (const li of liElementsList) {
    li.addEventListener('click', handleClickCocktail);
  }
}

function addEventToFavBtn() {
  const favBtns = document.querySelectorAll('.js-fav-btn');
  for (const favBtn of favBtns) {
    favBtn.addEventListener('click', handleClickFavBtn);
  }
}

//Select favourites

function handleClickCocktail(ev) {
  ev.currentTarget.classList.toggle('selected');
  const idSelected = ev.currentTarget.id;
  const selectedCocktail = cocktailsListData.find(cocktail => cocktail.idDrink === idSelected);
  const indexCocktail = favouritesListData.findIndex(cocktail => cocktail.idDrink === idSelected);

  if (indexCocktail === -1) { 
    favouritesListData.push(selectedCocktail);
  } else {
    favouritesListData.splice(indexCocktail, 1);
  }
  renderFavouritesList(favouritesListData);

  localStorage.setItem('cocktails', JSON.stringify(favouritesListData));
}

//Remove from favourites

function handleClickFavBtn(ev) {
const idSelected = ev.currentTarget.id;
  const indexCocktail = listDataFavorites.findIndex(cocktail => cocktail.idDrink === idSelected);
  if(indexCocktail !== -1) {
    listDataFavorites.splice(indexCocktail, 1);
  }
  renderFavouritesList(favouritesListData);
  renderCocktailsList(cocktailsListData);
  localStorage.setItem('cocktails', JSON.stringify(favouritesListData));
}

//Reset everything with the reset button

function handleClickReset(event) {
  event.preventDefault();
  cocktailsListData = [];
  favouritesListData = [];
  input.value = '';
  localStorage.removeItem('cocktails');
  renderListFavorites(favouritesListData);
  renderCocktailList(cocktailsListData);
}

//EVENTOS
resetBtn.addEventListener('click', handleClickReset);
searchBtn.addEventListener('click', handleClickSearch);
input.addEventListener('keypress', handleEnterSearch);
