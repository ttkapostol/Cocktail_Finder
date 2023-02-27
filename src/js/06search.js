
// Search cocktails with the search button
function handleEnterSearch(ev) {
  if (ev.key === "Enter") {
  ev.preventDefault();
  handleClickSearch(ev);
}
};

function handleClickSearch(ev) {
  ev.preventDefault();
  cocktailsList.innerHTML = '';
  const searchValue = input.value;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;
  addCocktails(url);
}
