const imgPlaceholder = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
const input = document.querySelector('.js-input');
const searchBtn = document.querySelector('.js-search-btn');
const resetBtn = document.querySelector('.js-reset-btn');
//const favBtn = document.querySelector('.js-fav-btn');
const cocktailsList = document.querySelector('.js-list-cocktails');
const favouritesList = document.querySelector('.js-list-favourites');

let cocktailsListData = [];
let favouritesListData = [];

const storedCocktails = JSON.parse(localStorage.getItem(`cocktails`));