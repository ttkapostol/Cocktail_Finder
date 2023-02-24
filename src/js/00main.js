'use strict';

console.log('>> Ready :)');

const input = document.querySelector('.js-input');
const searchBtn = document.querySelector('.js-search-btn');
const resetBtn = document.querySelector('.js-reset-btn');
const cocktailsList = document.querySelector('.js-list-cocktails');
const favouritesList = document.querySelector('.js-list-favourites');


fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
  .then((response) => response.json())
  .then((data) => (document.body.innerHTML = data.result));


// 0- Crear variables básicas
// 1- Obtener los datos de la API (fetch, lista )
// 2- Búsqueda por nombre --ev input
// 3- Incluir/Pintarlos en el HTML : innerHtml / DOM Avanzado
// 4- Seleccionar los favoritos
// 5- Pintar los favoritos en su lista (cuidado con los duplicados > comprobar si existen ya o no findIndex)
// 6- Lista que se queda pintada
// 7- Lista que se queda guardada en LocalStorage
// 8- Quitar favoritos de la lista y del localStorage (splice y removeItem?)

