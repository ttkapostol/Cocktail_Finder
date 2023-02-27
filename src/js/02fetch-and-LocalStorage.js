//FETCH or LS, Standard Margaritas
const storedCocktails = JSON.parse(localStorage.getItem(`cocktails`));

if (storedCocktails) { 
  favouritesListData = storedCocktails;
  renderFavouritesList(favouritesListData);
  console.log('I have LS');
}

function addCocktails(url) {
  fetch(url)
  .then((response) => response.json())
  .then(data => {
      if (data.drinks) {
        cocktailsListData = data.drinks;
        renderCocktailsList(cocktailsListData);
        notFound.innerHTML = '';
        console.log('I fetch');
      } else {
        notFound.innerHTML = '¡Nos has pillado! Parece que no tenemos el coctel que estás buscando...';
        cocktailsListData = [];
        renderCocktailsList(cocktailsListData);
      }
    });
}

addCocktails('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');