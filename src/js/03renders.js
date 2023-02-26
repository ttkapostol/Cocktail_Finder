/* eslint-disable strict */

//Render cocktails
// function renderCocktail(cocktail) {
//   const liElement = document.createElement('li');
//   const articleElement = document.createElement('article');
//   const h3Element = document.createElement('h3');
//   const title = document.createTextNode(cocktail.strDrink);
//   const imgElement = document.createElement('img');

//   liElement.setAttribute('class', 'li js-li-cocktail');
//   liElement.dataset.idLi = cocktail.idDrink;

//   articleElement.setAttribute('class', 'li__article');
  
//   h3Element.appendChild(title);
  
//   imgElement.setAttribute('src', cocktail.strDrinkThumb || imgPlaceholder);
//   imgElement.setAttribute('class', 'li__article--img');

//   articleElement.appendChild(h3Element);
//   articleElement.appendChild(imgElement);
//   liElement.appendChild(articleElement);
//   cocktailsList.appendChild(liElement);
// }

// function renderCocktailsList(cocktailsListData) {
//   for (const cocktail of cocktailsListData) {
//     renderCocktail(cocktail);
//   }
// addEventToCocktail();
// }

//Render favourite cocktails

// function renderFavouritesList(favouritesListData) {
//   favouritesList.innerHTML = ``;
//   for (const cocktail of favouritesListData) {
//     renderCocktail(cocktail);
//   }
// }

//Select favourites

// function handleClickCocktail(ev) {
//   ev.currentTarget.classList.toggle('selected');
//   const idSelected = ev.currentTarget.id;
//   const selectedCocktail = cocktailsListData.find(cocktail => cocktail.idDrink === idSelected);
//   const indexCocktail = favouritesListData.findIndex(cocktail => cocktail.idDrink === idSelected);

//   if (indexCocktail === -1) { 
//     favouritesListData.push(selectedCocktail);
//   } else {
//     favouritesListData.splice(indexCocktail, 1);
//   }
//   renderFavouritesList(favouritesListData);
//   localStorage.setItem('cocktails', JSON.stringify(favouritesListData));
// }

// function addEventToCocktail() {
//   const liElementsList = document.querySelectorAll('.js-li-cocktail');
//   for (const li of liElementsList) {
//     li.addEventListener('click', handleClickCocktail);
//   }
// }

//DOM WITH IF

//Render cocktails
function renderCocktail(cocktail, isFavourite) {
  const liElement = document.createElement('li');
  const articleElement = document.createElement('article');
  const h3Element = document.createElement('h3');
  const title = document.createTextNode(cocktail.strDrink);
  const imgElement = document.createElement('img');

  liElement.setAttribute('class', 'li js-li-cocktail');
  liElement.dataset.id = cocktail.idDrink;

  articleElement.setAttribute('class', 'li__article');

  imgElement.setAttribute('src', cocktail.strDrinkThumb || imgPlaceholder);
  imgElement.setAttribute('class', 'li__article--img');

  h3Element.appendChild(title);
  articleElement.appendChild(h3Element);
  articleElement.appendChild(imgElement);
  liElement.appendChild(articleElement);

  if (isFavourite) {
    favouritesList.appendChild(liElement);

    const favBtn = document.createElement('div');
    const favBtnIcon = document.createElement('span');

    favBtn.setAttribute('id', cocktail.idDrink);
    favBtnIcon.setAttribute('class', 'fa-solid fa-heart');

    favBtn.appendChild(favBtnIcon);
    articleElement.appendChild(favBtn);

    favBtn.addEventListener('click', handleRemoveFav);

  } else {
      liElement.addEventListener('click', handleClickCocktail);
      cocktailsList.appendChild(liElement);
  }
}

function renderCocktailsList(list, isFavourite) {
  if (list !== null) {
  for (const cocktail of list) {
    renderCocktail(cocktail, isFavourite);
    }
  }
  addEventToCocktail();
}

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
  renderCocktailsList(cocktail, true);
  localStorage.setItem('cocktails', JSON.stringify(favouritesListData));
}

function addEventToCocktail() {
 liElement.addEventListener('click', handleClickCocktail);
}
