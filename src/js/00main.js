'use strict';

console.log('>> Ready :)');

const input = document.querySelector('.js-input');
const searchBtn = document.querySelector('.js-search-btn');
const resetBtn = document.querySelector('.js-reset-btn');
const cocktailsList = document.querySelector('.js-list-cocktails');
const favouritesList = document.querySelector('.js-list-favourites');

let cocktailsListData = [];
let favouritesListData = [];

//const cocktailsStored = JSON.parse(localStorage.getItem("cocktails"));

fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita') /*${inputSearchValue}*/
  .then((response) => response.json())
  .then(data => {
    cocktailsListData = data.drinks;
    console.log(data.drinks);
    renderCocktailsList(cocktailsListData);
  });

//Pinta todos los elementos de la lista
function renderCocktailsList(cocktailsListData) {
  for (const cocktail of cocktailsListData) {
    cocktailsList.innerHTML += renderCocktail(cocktail);
  }
//addEventToPalette();
}

function renderCocktail(cocktail) {
  let html = `<li class="li">
        <article class="li__article js-li-cocktail" id=${cocktail.idDrink}">
            <h3 class="li__article--title">${cocktail.strDrink}</h3>
            <img class="li__article--img" alt="Photo of the cocktail" title="Photo of the cocktail" src=${cocktail.strDrinkThumb} />
        </article>
    </li>`;
  return html;
}


// 1- Obtener los datos de la API (fetch, lista )
// 2- Búsqueda por nombre --ev input
// 3- Incluir/Pintarlos en el HTML : innerHtml / DOM Avanzado
// 4- Seleccionar los favoritos
// 5- Pintar los favoritos en su lista (cuidado con los duplicados > comprobar si existen ya o no findIndex)
// 6- Lista que se queda pintada
// 7- Lista que se queda guardada en LocalStorage
// 8- Quitar favoritos de la lista y del localStorage (splice y removeItem?)

