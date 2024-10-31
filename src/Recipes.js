import React, { useState } from "react";

const Recipes = ({ recipe }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="recipe_section">
      <div className={`recipe_header`} onClick={() => setIsActive(!isActive)}>
        <img
          src={recipe.recipe.images["REGULAR"]["url"]}
          alt={recipe.recipe.label}
        />
        <h1>{recipe.recipe.label}</h1>
        <h2>
          Recipe found on{" "}
          <a href={recipe.recipe.url} target="_blank">
            {recipe.recipe.source}
          </a>
        </h2>
        <p>{isActive ? "-" : "+"}</p>
      </div>
      {isActive && (
        <div className="recipe_body">
          <div className="calories">
            <h2>Calories per Serving</h2>
            <p>
              {Math.round(parseInt(recipe.recipe.calories)) /
                parseInt(recipe.recipe.yield)}
            </p>
          </div>
          <div className="meal_type">
            <h2>Meal Type</h2>
            <p>{recipe.recipe.mealType}</p>
          </div>
          <div className="cuisine_type">
            <h2>Cuisine</h2>
            <p>{recipe.recipe.cuisineType.join(", ")}</p>
          </div>
          <div className="ingredients">
            <h2>Ingredients</h2>
            <ul>
              {recipe.recipe.ingredientLines.map(ingr => (
                <li key={ingr}>{ingr}</li>
              ))}
            </ul>
          </div>
          <div className="diet_type">
            <h2>Diet</h2>
            <p>
              {recipe.recipe.dietLabels.length > 0
                ? recipe.recipe.dietLabels.join(", ")
                : "N/A"}
            </p>
          </div>
          <div className="health_type">
            <h2>Health Tags</h2>
            <p>
              {recipe.recipe.healthLabels.length > 0
                ? recipe.recipe.healthLabels.join(", ")
                : "N/A"}
            </p>
          </div>
          <div className="cautions">
            <h2>Cautions</h2>
            <p>
              {recipe.recipe.cautions.length > 0
                ? recipe.recipe.cautions.join(", ")
                : "N/A"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
