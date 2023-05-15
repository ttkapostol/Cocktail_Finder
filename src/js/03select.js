//Select favourites

function addSelected(item) {
  if (item !== null) {
    item.classList.add('selected');
  }
  resetFavBtnHidden();
}

function removeSelected(item) {
  if (item !== null) {
    item.classList.remove('selected');
  }
  resetFavBtnHidden();
}

function handleClickCocktail(ev) {
  const idSelected = ev.currentTarget.id;
  const selectedCocktail = cocktailsListData.find(cocktail => cocktail.idDrink === idSelected);
  const indexCocktail = favouritesListData.findIndex(cocktail => cocktail.idDrink === idSelected);
  console.log(selectedCocktail.strDrink);
  if (indexCocktail === -1) { 
    favouritesListData.push(selectedCocktail);
    addSelected(ev.currentTarget);
  } else {
    favouritesListData.splice(indexCocktail, 1);
    removeSelected(ev.currentTarget);
  }
  renderCocktailsList(cocktailsListData);
  renderFavouritesList(favouritesListData);

  localStorage.setItem('cocktails', JSON.stringify(favouritesListData));
}
