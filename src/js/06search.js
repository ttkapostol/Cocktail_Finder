
// Search cocktails with the search button

function handleClickSearch(ev) {
  ev.preventDefault();
  cocktailsList.innerHTML = '';
  const searchValue = input.value;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;
  addCocktails(url);
}
