// Render cocktails
function renderCocktail(cocktail) {
  const selectedCocktail = favouritesListData.find(favCocktail => favCocktail.strDrink === cocktail.strDrink);
  const liElement = document.createElement('li');
  const articleElement = document.createElement('article');
  const h3Element = document.createElement('h3');
  const title = document.createTextNode(cocktail.strDrink);
  const imgElement = document.createElement('img');

  liElement.setAttribute('class', `li js-li-cocktail ${selectedCocktail && 'selected'}`);
  liElement.setAttribute('id', cocktail.idDrink);

  articleElement.setAttribute('class', 'li__article');

  h3Element.setAttribute('class', 'li__article--title');

  imgElement.setAttribute('src', cocktail.strDrinkThumb || imgPlaceholder);
  imgElement.setAttribute('class', 'li__article--img');

  h3Element.appendChild(title);
  articleElement.appendChild(h3Element);
  articleElement.appendChild(imgElement);
  liElement.appendChild(articleElement);
  cocktailsList.appendChild(liElement);
}

function renderCocktailsList(cocktailsListData) {
  cocktailsList.innerHTML = '';
  for (const cocktail of cocktailsListData) {
    renderCocktail(cocktail);
  }
  addEventToCocktail();
}

//Render favourite cocktails

function renderFavCocktail(cocktail) {
  const liElement = document.createElement('li');
  const articleElement = document.createElement('article');
  const h3Element = document.createElement('h3');
  const favBtn = document.createElement('span');
  const imgElement = document.createElement('img');

  liElement.setAttribute('class', 'liFav js-li-cocktail');
  liElement.setAttribute('id', cocktail.idDrink);

  articleElement.setAttribute('class', 'liFav__article');

  h3Element.setAttribute('class', 'liFav__article--title');
  const title = document.createTextNode(cocktail.strDrink);

  favBtn.setAttribute('class', 'fa-solid fa-heart js-fav-btn');
  favBtn.addEventListener('click', handleClickFavBtn);

  imgElement.setAttribute('src', cocktail.strDrinkThumb || imgPlaceholder);
  imgElement.setAttribute('class', 'liFav__article--img');

  h3Element.appendChild(title);
  h3Element.appendChild(favBtn);
  articleElement.appendChild(h3Element);
  articleElement.appendChild(imgElement);
  liElement.appendChild(articleElement);
  favouritesList.appendChild(liElement);
}

function renderFavouritesList(favouritesListData) {
  favouritesList.innerHTML = '';
  for (const cocktail of favouritesListData) {
    renderFavCocktail(cocktail);
  }
}

function addEventToCocktail() {
  const liElementsList = document.querySelectorAll('.js-li-cocktail');
  for (const li of liElementsList) {
    li.addEventListener('click', handleClickCocktail);
  }
}
