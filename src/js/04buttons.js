/* eslint-disable strict */

// Search cocktails with the search button

function handleEnterSearch(ev) {
  if (ev.keyCode === 13) {
    handleClickSearch(ev);
  }
}

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

//Remove from favourites
function handleClickRemoveFav(ev) {
const idSelected = ev.currentTarget.id;
  const indexCocktail = listDataFavorites.findIndex(cocktail => cocktail.idDrink === idSelected);
  if(indexCocktail !== -1) {
    listDataFavorites.splice(indexCocktail, 1);
  }
  renderFavouritesList(favouritesListData);
  renderCocktailsList(cocktailsListData);
  localStorage.setItem('cocktails', JSON.stringify(favouritesListData));
}


function removeFromFav() {
  const favBtns = document.querySelectorAll('.js-fav-btn');
  for (const eachBtn of favBtns) {
    eachBtn.addEventListener('click', handleClickRemoveFav);
  }
}

//Reset everything with the reset button

function handleClickReset(event) {
  event.preventDefault();
  cocktailsList.innerHTML = '';
  favouritesList.innerHTML = '';
  input.value = '';
  localStorage.removeItem('cocktails');
  /*localStorage.removeItem('favourites');*/
}

//EVENTOS

resetBtn.addEventListener('click', handleClickReset);
searchBtn.addEventListener('click', handleClickSearch);
document.addEventListener('keypress', handleEnterSearch);