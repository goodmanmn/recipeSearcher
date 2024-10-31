import React, { useState } from "react";
import Recipes from "./Recipes";
import axios from "axios";

const DisplayRecipes = ({ apiData }) => {
  const [recipes, setRecipes] = useState(apiData["hits"]);
  const [nextPageUrl, setNextPageUrl] = useState(
    apiData["_links"]["next"]["href"]
  );
  const getNextPageData = async url => {
    try {
      await axios.get(url).then(response => {
        const data = response.data;
        loadNextPage(data);
      });
    } catch (error) {
      console.error(error);
    }
  };
  const loadNextPage = data => {
    setNextPageUrl(data["_links"]["next"]["href"]);
    const nextRecipes = data["hits"];
    const newRecipeList = recipes.concat(nextRecipes);
    setRecipes(newRecipeList);
    console.log(data);
  };
  const popRecipes = recipes.map(recipe => <Recipes recipe={recipe} />);

  return (
    <div className="recipe_list">
      {popRecipes}
      <button className="load_btn" onClick={() => getNextPageData(nextPageUrl)}>
        Load More
      </button>
    </div>
  );
};

export default DisplayRecipes;
