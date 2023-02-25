'use strict';

// 2- Búsqueda por nombre --ev input

// 3- Incluir/Pintarlos en el HTML : innerHtml / DOM Avanzado

// 6- Lista que se queda pintada 1/2

// 7- Lista que se queda guardada en LocalStorage 1/2

// 9- Quitar favoritos con btn

// 10- Quitar favoritos del localStorage (removeItem?)

const imgPlaceholder = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
const input = document.querySelector('.js-input');
const searchBtn = document.querySelector('.js-search-btn');
const resetBtn = document.querySelector('.js-reset-btn');
const favBtn = document.querySelector('.js-fav-btn');
const cocktailsList = document.querySelector('.js-list-cocktails');
const favouritesList = document.querySelector('.js-list-favourites');

let cocktailsListData = [];
let favouritesListData = [];

const storedCocktails = JSON.parse(localStorage.getItem(`cocktails`));

if (storedCocktails) {
  cocktailsListData = storedCocktails;
  renderCocktailsList(cocktailsListData);
  console.log('I have LS');
} else {
fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita') //${inputSearchValue}
  .then((response) => response.json())
  .then(data => {
      cocktailsListData = data.drinks;
      console.log(data.drinks);
      renderCocktailsList(cocktailsListData);
      localStorage.setItem('cocktails', JSON.stringify(cocktailsListData));
      console.log('Hago fetch');
  });
};


//Render cocktails
function renderCocktail(cocktail) {
  let html = `<li class="li js-li-cocktail" id="${cocktail.idDrink}">
        <article class="li__article">
            <h3 class="li__article--title">${cocktail.strDrink}</h3>
            <img class="li__article--img" alt="Photo of the cocktail" title="Photo of the cocktail" src=${cocktail.strDrinkThumb || imgPlaceholder} />
            <i class="fa-solid fa-star hidden js-fav-btn"></i>
            </article>
    </li>`;
  return html;
}

function renderCocktailsList(cocktailsListData) {
  for (const cocktail of cocktailsListData) {
    cocktailsList.innerHTML += renderCocktail(cocktail);
  }
addEventToCocktail()
}


//Render favourite cocktails

function renderFavouritesList(favouritesListData) {
  favouritesList.innerHTML = ``;
  for (const favCocktail of favouritesListData) {
    favouritesList.innerHTML += renderCocktail(favCocktail);
  }
  /*favBtn.classList.remove('hidden');*/
}

//Select favourites

function handleClickCocktail(ev) {
  ev.currentTarget.classList.toggle('selected');
  const idSelected = ev.currentTarget.id;
  console.log(idSelected);

  const selectedCocktail = cocktailsListData.find(cocktail => cocktail.idDrink === idSelected);

  const indexCocktail = favouritesListData.findIndex(cocktail => cocktail.idDrink === idSelected);
  console.log(indexCocktail);

  if (indexCocktail === -1) { 
    favouritesListData.push(selectedCocktail);
  } else {
    favouritesListData.splice(indexCocktail, 1);
  }
  renderFavouritesList(favouritesListData);

  localStorage.setItem('favourites', JSON.stringify(favouritesListData));
  console.log('favourites');
}

function addEventToCocktail() {
  const liElementsList = document.querySelectorAll('.js-li-cocktail');
  for (const li of liElementsList) {
    li.addEventListener('click', handleClickCocktail);
  }
}

// Búsqueda por search

function handleClickSearch(ev) {
  ev.preventDefault();
  cocktailsList.innerHTML = '';
  const searchValue = input.value;
  
  fetch(`http://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      cocktailsListData = data.drinks;
      renderCocktailsList(cocktailsListData);
    }
    );
}

searchBtn.addEventListener('click', handleClickSearch);