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