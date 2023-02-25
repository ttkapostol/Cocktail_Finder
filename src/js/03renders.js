/* eslint-disable strict */

//Render cocktails
function renderCocktail(cocktail) {
  let html = `<li class="li js-li-cocktail" id="${cocktail.idDrink}">
        <article class="li__article">
            <h3 class="li__article--title">${cocktail.strDrink}</h3>
            <span class="fa-solid fa-heart hidden js-fav-btn"></span>
            <img class="li__article--img" alt="Photo of the cocktail" title="Photo of the cocktail" src=${cocktail.strDrinkThumb || imgPlaceholder} />
            </article>
    </li>`;
  return html;
}

function renderCocktailsList(cocktailsListData) {
  for (const cocktail of cocktailsListData) {
    cocktailsList.innerHTML += renderCocktail(cocktail);
  }
addEventToCocktail()
}


//Render favourite cocktails

function renderFavouritesList(favouritesListData) {
  favouritesList.innerHTML = ``;
  for (const favCocktail of favouritesListData) {
    favouritesList.innerHTML += renderCocktail(favCocktail);
  }
  favBtns.classList.remove('hidden');
  removeFromFav()
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

  localStorage.setItem('favourites', JSON.stringify(favouritesListData));
}

function addEventToCocktail() {
  const liElementsList = document.querySelectorAll('.js-li-cocktail');
  for (const li of liElementsList) {
    li.addEventListener('click', handleClickCocktail);
  }
}




