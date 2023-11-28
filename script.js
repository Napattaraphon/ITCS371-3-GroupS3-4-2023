const searchBtn = document.getElementById('search-btn');
const userInput = document.getElementById('user-inp');
const resultContainer = document.getElementById('result');

const cocktailByNameUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener('click', () => {
  const searchTerm = userInput.value.trim();
  if (searchTerm !== '') {
    searchCocktails(searchTerm);
  }
});

async function searchCocktails(searchTerm) {
  try {
    const cocktailByNameResponse = await fetch(cocktailByNameUrl + searchTerm);
    const cocktailByNameData = await cocktailByNameResponse.json();

    if (cocktailByNameData.drinks) {
      if (cocktailByNameData.drinks.length > 0) {
        displayResults(cocktailByNameData.drinks);
      } else {
        resultContainer.innerHTML = '<p>No results found</p>';
      }
    } else {
      resultContainer.innerHTML = '<p>No results found</p>';
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    resultContainer.innerHTML = '<p>Error fetching data. Please try again.</p>';
  }
}

function displayResults(cocktails) {
  resultContainer.innerHTML = '';
  cocktails.forEach(cocktail => {
    const cocktailCard = document.createElement('div');
    cocktailCard.classList.add('cocktail-card');
    cocktailCard.innerHTML = `
      <h3>${cocktail.strDrink}</h3>
      <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" />
      <p>Ingredients: ${getIngredients(cocktail)}</p>
      <p>Instructions: ${cocktail.strInstructions}</p>
      
    `;
    resultContainer.appendChild(cocktailCard);
  });
}

function getIngredients(cocktail) {
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients.push(`${measure} ${ingredient}`);
    } else if (ingredient) {
      ingredients.push(ingredient);
    }
  }
  return ingredients.join(', ');
}
