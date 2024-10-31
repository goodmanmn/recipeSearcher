import QuerySearch from "./QuerySearch";
import CategorySearch from "./CategorySearch";
import DisplayRecipes from "./DisplayRecipes";
import { appID, appKey } from "./Key";
import { useState } from "react";
import axios from "axios";

function App() {
  // Search -> Query Search
  const [apiData, setApiData] = useState(null);
  const [recipeName, setRecipeName] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  // Search -> Category Search
  const [ingrRange, setIngrRange] = useState([
    { name: "Min", amount: 0 },
    {
      name: "Max",
      amount: 0,
    },
  ]);
  const [calRange, setCalRange] = useState([
    { name: "Min", amount: 0 },
    {
      name: "Max",
      amount: 0,
    },
  ]);
  const [dietData, setDietData] = useState([
    // diet=
    {
      name: "balanced",
      checked: false,
      tooltip: "Protein/Fat/Carb values in 15/35/50 ratio",
    },
    {
      name: "high-fiber",
      checked: false,
      tooltip: "More than 5g fiber per serving",
    },
    {
      name: "high-protein",
      checked: false,
      tooltip: "More than 50% of total calories from proteins",
    },
    {
      name: "low-carb",
      checked: false,
      tooltip: "Less than 20% of total calories from carbs",
    },
    {
      name: "low-fat",
      checked: false,
      tooltip: "Less than 15% of total calories from fat",
    },
    {
      name: "low-sodium",
      checked: false,
      tooltip: "Less than 140mg Na per serving",
    },
  ]);
  const [healthData, setHealthData] = useState([
    //health=
    {
      name: "alcohol-cocktail",
      checked: false,
      tooltip: "Describes an alcoholic cocktail",
    },
    {
      name: "alcohol-free",
      checked: false,
      tooltip: "No alcohol used or contained",
    },
    {
      name: "celery-free",
      checked: false,
      tooltip: "Does not contain celery or derivatives",
    },
    {
      name: "crustacean-free",
      checked: false,
      tooltip:
        "Does not contain crustaceans (shrimp, lobster etc.) or derivatives",
    },
    { name: "dairy-free", checked: false, tooltip: "No dairy; no lactose" },
    {
      name: "DASH",
      checked: false,
      tooltip: "Stands for: Dietary Approaches to Stop Hypertension diet",
    },
    {
      name: "egg-free",
      checked: false,
      tooltip: "No eggs or products containing eggs",
    },
    {
      name: "fish-free",
      checked: false,
      tooltip: "No fish or fish derivatives",
    },
    {
      name: "fodmap-free",
      checked: false,
      tooltip:
        "Does not contain FODMAP foods i.e. carbohydrates that are more difficult to digest",
    },
    {
      name: "gluten-free",
      checked: false,
      tooltip: "No ingredients containing gluten",
    },
    {
      name: "immuno-supportive",
      checked: false,
      tooltip:
        "Recipes which fit a science-based approach to eating to strengthen the immune system",
    },
    {
      name: "keto-friendly",
      checked: false,
      tooltip: "Maximum 7 grams of net carbs per serving",
    },
    {
      name: "kidney-friendly",
      checked: false,
      tooltip:
        "Per serving: containes less than 250 mg phosphorus AND less than 500 mg potassium AND less than 500 mg sodium",
    },
    {
      name: "kosher",
      checked: false,
      tooltip:
        "Contains only ingredients allowed by the kosher diet. However it does not guarantee kosher preparation of the ingredients themselves",
    },
    {
      name: "low-potassium",
      checked: false,
      tooltip: "Less than 150mg per serving",
    },
    {
      name: "low-sugar",
      checked: false,
      tooltip:
        "No simple sugars – glucose, dextrose, galactose, fructose, sucrose, lactose, maltose",
    },
    {
      name: "lupine-free",
      checked: false,
      tooltip: "Does not contain lupine or derivatives",
    },
    {
      name: "mollusk-free",
      checked: false,
      tooltip:
        "No mollusks (clams, mussels, snails, oysters, scallops, squid etc.)",
    },
    {
      name: "mustard-free",
      checked: false,
      tooltip: "Does not contain mustard or derivatives",
    },
    {
      name: "no-oil-added",
      checked: false,
      tooltip:
        "No oil added except to what is contained in the basic ingredients",
    },
    {
      name: "paleo",
      checked: false,
      tooltip:
        "Excludes what are perceived to be agricultural products; grains, legumes, dairy products, potatoes, refined salt, refined sugar, and processed oils",
    },
    {
      name: "peanut-free",
      checked: false,
      tooltip: "No peanuts or products containing peanuts",
    },
    {
      name: "pescatarian",
      checked: false,
      tooltip:
        "Does not contain meat or meat based products, can contain dairy and fish",
    },
    {
      name: "pork-free",
      checked: false,
      tooltip: "Does not contain pork or derivatives",
    },
    {
      name: "red-meat-free",
      checked: false,
      tooltip:
        "Does not contain beef, lamb, pork, duck, goose, game, horse, and other types of red meat or products containing red meat",
    },
    {
      name: "sesame-free",
      checked: false,
      tooltip: "Does not contain sesame seed or derivatives",
    },
    {
      name: "shellfish-free",
      checked: false,
      tooltip:
        "No shellfish or shellfish derivatives, includes crustaceans and mollusks",
    },
    {
      name: "soy-free",
      checked: false,
      tooltip: "No soy or products containing soy",
    },
    {
      name: "sugar-conscious",
      checked: false,
      tooltip: "Less than 4g of sugar per serving",
    },
    { name: "sulfite-free", checked: false, tooltip: "No Sulfites" },
    {
      name: "tree-nut-free",
      checked: false,
      tooltip: "No tree nuts or products containing tree nuts",
    },
    {
      name: "vegan",
      checked: false,
      tooltip: "No meat, poultry, fish, dairy, eggs or honey",
    },
    {
      name: "vegetarian",
      checked: false,
      tooltip: "No meat, poultry, or fish",
    },
    {
      name: "wheat-free",
      checked: false,
      tooltip: "No wheat, can contain gluten though",
    },
  ]);
  const [cuisineData, setCuisineData] = useState([
    //cuisineType=
    { name: "American", checked: false },
    { name: "Asian", checked: false },
    { name: "British", checked: false },
    { name: "Caribbean", checked: false },
    { name: "Central Europe", checked: false },
    { name: "Chinese", checked: false },
    { name: "Eastern Europe", checked: false },
    { name: "French", checked: false },
    { name: "Indian", checked: false },
    { name: "Italian", checked: false },
    { name: "Japanese", checked: false },
    { name: "Kosher", checked: false },
    { name: "Mediterranean", checked: false },
    { name: "Mexican", checked: false },
    { name: "Middle Eastern", checked: false },
    { name: "Nordic", checked: false },
    { name: "South American", checked: false },
    { name: "South East Asian", checked: false },
  ]);
  const [mealData, setMealData] = useState([
    //mealType=
    { name: "Breakfast", checked: false },
    { name: "Lunch", checked: false },
    { name: "Dinner", checked: false },
    { name: "Snack", checked: false },
    { name: "Teatime", checked: false },
  ]);
  const [excluded, setExcluded] = useState("");
  const [excludedList, setExcludedList] = useState([]);
  // URL API
  const headers = {
    headers: {
      accept: "application/json",
      "Accept-Language": "en",
    },
  };

  const url = "https://api.edamam.com/api/recipes/v2?type=public";
  const fetchApi = async (url, config) => {
    try {
      await axios.get(url, config).then(response => {
        const data = response.data;
        setApiData(data);
      });
    } catch (error) {
      console.error(error);
    }
  };
  const createURL = (queryParams, categoryParams) => {
    if (queryParams.length > 0 && categoryParams.length > 0) {
      const queryString = queryParams.join("&");
      const categoryString = categoryParams.join("&");
      const searchURL =
        url + "&q=" + queryString + appID + appKey + "&" + categoryString;
      return searchURL;
    } else if (queryParams.length > 0 && categoryParams.length === 0) {
      const queryString = queryParams.join("&");
      const searchURL = url + "&q=" + queryString + appID + appKey;
      return searchURL;
    } else if (queryParams.length === 0 && categoryParams.length > 0) {
      const categoryString = categoryParams.join("&");
      const searchURL = url + appID + appKey + "&" + categoryString;
      return searchURL;
    }
  };
  /* 
  spaces = %20
  + = %2B
  url join with &
  query i.e. recipe name or ingredients
    q=
  each type including excluded
    type=
  ranges
    calories=
    ingr=
      min = num+
      range = num-num
      max = num

  order:
  url
  query
  appID
  appKey
  ingr
  diet
  health
  cuisineType
  mealType
  calories
  excluded
  */
  const getRange = (min, max) => {
    if (min === 0) {
      return max;
    } else if (max === 0) {
      return `${min}%2B`;
    } else {
      return `${min}-${max}`;
    }
  };

  // Category Search Methods
  const onNumRangeInputChange = (value, type, name) => {
    if (type === "ingr") {
      if (value < 0 || value === "") {
        alert("Number value must be 0 or higher");
        const numRangeList = ingrRange.map(item =>
          item.name === name ? { ...item, amount: 0 } : item
        );
        setIngrRange(numRangeList);
      } else {
        const numRangeList = ingrRange.map(item =>
          item.name === name ? { ...item, amount: value } : item
        );
        setIngrRange(numRangeList);
      }
    } else if (type === "cal") {
      if (value < 0 || value === "") {
        alert("Number value must be 0 or higher");
        const numRangeList = calRange.map(item =>
          item.name === name ? { ...item, amount: 0 } : item
        );
        setCalRange(numRangeList);
      } else {
        const numRangeList = calRange.map(item =>
          item.name === name ? { ...item, amount: value } : item
        );
        setCalRange(numRangeList);
      }
    }
  };
  const onCheckboxChange = (name, type) => {
    switch (type) {
      case "diet":
        const dietList = dietData.map(item =>
          item.name === name ? { ...item, checked: !item.checked } : item
        );
        setDietData(dietList);
        break;
      case "health":
        const healthList = healthData.map(item =>
          item.name === name ? { ...item, checked: !item.checked } : item
        );
        setHealthData(healthList);
        break;
      case "cuisine":
        const cuisineList = cuisineData.map(item =>
          item.name === name ? { ...item, checked: !item.checked } : item
        );
        setCuisineData(cuisineList);
        break;
      case "meal":
        const mealList = mealData.map(item =>
          item.name === name ? { ...item, checked: !item.checked } : item
        );
        setMealData(mealList);
        break;
    }
  };
  // add or exclude ingredient methods
  const addIngredient = type => {
    if (type === "ingredient") {
      if (!ingredient) {
        alert("Please enter an ingredient");
      } else {
        setIngredientList(
          ingredientList.length > 0
            ? [ingredient, ...ingredientList]
            : [ingredient]
        );
        setIngredient("");
      }
    } else if (type === "excluded") {
      if (!excluded) {
        alert("Please enter an ingredient");
      } else {
        setExcludedList(
          excludedList.length > 0 ? [excluded, ...excludedList] : [excluded]
        );
        setExcluded("");
      }
    }
  };
  const deleteIngredient = (type, name) => {
    if (type === "ingredient") {
      const newList = ingredientList.filter(item => item !== name);
      setIngredientList(newList);
    } else if (type === "excluded") {
      const newList = excludedList.filter(item => item !== name);
      setExcludedList(newList);
    }
  };

  const resetCheckbox = (arr, fnc) => {
    const newArr = arr.map(item => ({ ...item, checked: false }));
    fnc(newArr);
  };

  const clearParams = () => {
    setRecipeName("");
    setIngredient("");
    setIngredientList([]);
    setIngrRange([
      { name: "Min", amount: 0 },
      {
        name: "Max",
        amount: 0,
      },
    ]);
    setCalRange([
      { name: "Min", amount: 0 },
      {
        name: "Max",
        amount: 0,
      },
    ]);
    setExcluded("");
    setExcludedList([]);
    resetCheckbox(dietData, setDietData);
    resetCheckbox(healthData, setHealthData);
    resetCheckbox(cuisineData, setCuisineData);
    resetCheckbox(mealData, setMealData);
  };

  const createParams = () => {
    let queryParamsList = [];
    let paramsList = [];
    //search by ingredients and/or recipe name
    if (recipeName) {
      const newRecipeName = recipeName.replace(" ", "%20");
      queryParamsList.push(newRecipeName);
    }
    if (ingredientList.length > 0) {
      const insertSpace = ingredientList.map(item => item.replace(" ", "%20"));
      const paramString = insertSpace.join("%20");
      queryParamsList.push(paramString);
    }
    // get number of ingredient range
    if (ingrRange[0].amount > 0 || ingrRange[1].amount > 0) {
      const min = parseInt(Math.round(ingrRange[0].amount));
      const max = parseInt(Math.round(ingrRange[1].amount));
      if (max < min && max !== 0) {
        alert("Maximum must be larger than minimum");
        return;
      } else {
        const range = getRange(min, max);
        const rangeParam = `ingr=${range}`;
        paramsList.push(rangeParam);
      }
    }
    // get calorie range
    if (calRange[0].amount > 0 || calRange[1].amount > 0) {
      const min = parseInt(Math.round(calRange[0].amount));
      const max = parseInt(Math.round(calRange[1].amount));
      if (max < min && max !== 0) {
        alert("Maximum must be larger than minimum");
        return;
      } else {
        const range = getRange(min, max);
        const rangeParam = `calories=${range}`;
        paramsList.push(rangeParam);
      }
    }
    //get any marked diet checkboxes
    if (dietData.find(item => item.checked)) {
      const newDietData = dietData.filter(item => item.checked);
      const dietList = newDietData.map(item => `diet=${item.name}`).join("&");
      paramsList.push(dietList);
    }
    //get any marked health checkboxes
    if (healthData.find(item => item.checked)) {
      const newHealthData = healthData.filter(item => item.checked);
      const healthList = newHealthData
        .map(item => `health=${item.name}`)
        .join("&");
      paramsList.push(healthList);
    }
    //get any marked cuisineType checkboxes
    if (cuisineData.find(item => item.checked)) {
      const newCuisineData = cuisineData.filter(item => item.checked);
      const cuisineTypeList = newCuisineData
        .map(item => `cuisineType=${item.name}`)
        .join("&");
      paramsList.push(cuisineTypeList);
    }
    //get any marked mealType checkboxes
    if (mealData.find(item => item.checked)) {
      const newMealData = mealData.filter(item => item.checked);
      const mealTypeList = newMealData
        .map(item => `mealType=${item.name}`)
        .join("&");
      paramsList.push(mealTypeList);
    }
    //get excluded list
    if (excludedList.length > 0) {
      const excludedParamString = excludedList
        .map(item => `excluded=${item}`)
        .join("&");
      paramsList.push(excludedParamString);
    }
    if (paramsList.length === 0 && queryParamsList.length === 0) {
      alert("Minimum search requirements; Recipe Name or Ingredients");
      return;
    }
    const searchURL = createURL(queryParamsList, paramsList);
    fetchApi(searchURL, headers);
  };

  return (
    <div className="App">
      <div className="sidebar">
        <QuerySearch
          recipeName={recipeName}
          setRecipeName={setRecipeName}
          ingredient={ingredient}
          setIngredient={setIngredient}
          ingredientList={ingredientList}
          addIngredient={addIngredient}
          deleteIngredient={deleteIngredient}
        />
        <div className="sidebar_buttons">
          <button onClick={clearParams}>Clear</button>
          <button onClick={createParams}>Search</button>
        </div>
        <CategorySearch
          ingrRange={ingrRange}
          calRange={calRange}
          onNumRangeInputChange={onNumRangeInputChange}
          excluded={excluded}
          setExcluded={setExcluded}
          excludedList={excludedList}
          addIngredient={addIngredient}
          deleteIngredient={deleteIngredient}
          dietData={dietData}
          healthData={healthData}
          cuisineData={cuisineData}
          mealData={mealData}
          onCheckboxChange={onCheckboxChange}
        />
      </div>
      <div className="main">
        {apiData ? (
          <DisplayRecipes apiData={apiData} />
        ) : (
          <span className="grey">Recipes Await!</span>
        )}
      </div>
    </div>
  );
}

export default App;
