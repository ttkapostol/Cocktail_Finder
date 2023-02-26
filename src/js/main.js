'use strict';

console.log('>> Ready :)');

const imgPlaceholder = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
const input = document.querySelector('.js-input');
const searchBtn = document.querySelector('.js-search-btn');
const resetBtn = document.querySelector('.js-reset-btn');
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
fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita') 
  .then((response) => response.json())
  .then(data => {
      cocktailsListData = data.drinks;
      console.log(data.drinks);
      renderCocktailsList(cocktailsListData);
      localStorage.setItem('cocktails', JSON.stringify(cocktailsListData));
      console.log('Hago fetch');
  });
};
