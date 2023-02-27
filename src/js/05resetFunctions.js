//Remove from favourites

function resetFavBtnHidden() {
  if (favouritesListData && favouritesListData.length > 0) {
    resetFavBtn.classList.remove('hidden');
  } else {
    resetFavBtn.classList.add('hidden');
  }
}

function handleClearFavList() {
  favouritesListData = [];
  localStorage.removeItem('cocktails');
  resetFavBtnHidden();
  renderFavouritesList(favouritesListData);
  renderCocktailsList(cocktailsListData);
}


function handleClickFavBtn(ev) {
  const idSelected = ev.currentTarget.id;
  const indexCocktail = favouritesListData.findIndex(cocktail => cocktail.idDrink === idSelected);
  if(indexCocktail !== -1) {
    favouritesListData.splice(indexCocktail, 1);
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
  resetFavBtnHidden();
  addCocktails('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
  renderFavouritesList(favouritesListData);
  renderCocktailsList(cocktailsListData);
}