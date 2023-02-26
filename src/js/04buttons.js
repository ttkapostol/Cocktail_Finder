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
      renderCocktailsList(cocktailsList);
    }
    );
}

//Reset everything with the reset button

function handleClickReset(event) {
  event.preventDefault();
  cocktailsList.innerHTML = '';
  favouritesList.innerHTML = '';
  input.value = '';
  localStorage.removeItem('cocktails');
}

//EVENTOS

resetBtn.addEventListener('click', handleClickReset);
searchBtn.addEventListener('click', handleClickSearch);
document.addEventListener('keypress', handleEnterSearch);