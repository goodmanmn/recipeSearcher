import React from "react";
import AddIngredient from "./AddIngredient";

export const QuerySearch = ({
  recipeName,
  setRecipeName,
  ingredient,
  setIngredient,
  ingredientList,
  addIngredient,
  deleteIngredient,
}) => {
  return (
    <div>
      <section className="query_search">
        <label>
          Search by Recipe Name:
          <input
            type="text"
            id="recipe_name"
            value={recipeName}
            onChange={e => setRecipeName(e.target.value)}
          />
        </label>
      </section>
      <section className="query_search">
        <AddIngredient
          arr={ingredientList}
          type={"ingredient"}
          value={ingredient}
          onAdd={addIngredient}
          onDelete={deleteIngredient}
          onChange={setIngredient}
        />
      </section>
    </div>
  );
};

export default QuerySearch;
