/* eslint-disable strict */

//Render cocktails
function renderCocktail(cocktail) {
  const liElement = document.createElement('li');
  const articleElement = document.createElement('article');
  const h3Element = document.createElement('h3');
  const title = document.createTextNode(cocktail.strDrink);
  const imgElement = document.createElement('img');

  liElement.setAttribute('class', 'li js-li-cocktail');
  liElement.dataset.idLi = cocktail.idDrink;

  articleElement.setAttribute('class', 'li__article');
  
  h3Element.appendChild(title);
  
  imgElement.setAttribute('src', cocktail.strDrinkThumb || imgPlaceholder);
  imgElement.setAttribute('class', 'li__article--img');

  articleElement.appendChild(h3Element);
  articleElement.appendChild(imgElement);
  liElement.appendChild(articleElement);
  cocktailsList.appendChild(liElement);
}

function renderCocktailsList(cocktailsListData) {
  for (const cocktail of cocktailsListData) {
    renderCocktail(cocktail);
  }
addEventToCocktail();
}

//Render favourite cocktails

function renderFavouritesList(favouritesListData) {
  favouritesList.innerHTML = ``;
  for (const cocktail of favouritesListData) {
    renderCocktail(cocktail);
  }
}

//Select favourites

function handleClickCocktail(ev) {
  ev.currentTarget.classList.toggle('selected');
  const idSelected = ev.currentTarget.id;
  const selectedCocktail = cocktailsListData.find(cocktail => cocktail.idDrink === idSelected);
  const indexCocktail = favouritesListData.findIndex(cocktail => cocktail.idDrink === idSelected);

  if (indexCocktail === -1) { 
    favouritesListData.push(selectedCocktail);
  } else {
    favouritesListData.splice(indexCocktail, 1);
  }
  renderFavouritesList(favouritesListData);
  localStorage.setItem('cocktails', JSON.stringify(favouritesListData));
}

function addEventToCocktail() {
  const liElementsList = document.querySelectorAll('.js-li-cocktail');
  for (const li of liElementsList) {
    li.addEventListener('click', handleClickCocktail);
  }
}