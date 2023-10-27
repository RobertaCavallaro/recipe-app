import React, { useState, useEffect } from 'react';
import './recipe.css';

const RecipeDisplay = () => {
  const [randomRecipe, setRandomRecipe] = useState(null);
  const API_KEY = '7b0c3d2f87cd4d42bfcf0ca5a35c0f24';
  const randomRecipeURL = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}`;

  const fetchRandomRecipe = async () => {
    try {
      const response = await fetch(randomRecipeURL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRandomRecipe(data.recipes[0]);
    } catch (error) {
      console.error('Error fetching random recipe:', error);
    }
  };

  useEffect(() => {
    fetchRandomRecipe();
  }, []); // Fetch a random recipe on initial load

  const handleGenerateRandomRecipe = () => {
    fetchRandomRecipe();
  };

  return (
    <div className="content-container">
      <nav className="navigation-menu">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Recipes</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
      <div>
        <button className="generate-button" onClick={handleGenerateRandomRecipe}>
          Generate Random Recipe
        </button>
      </div>
      {randomRecipe && (
        <div>
          <h2>
            <a target="_blank" href={randomRecipe.sourceUrl}>
              {randomRecipe.title}
            </a>
          </h2>
          <img src={randomRecipe.image} alt={randomRecipe.title} />
        </div>
      )}
    </div>
  );
};

export default RecipeDisplay;
