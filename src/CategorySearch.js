import React, { useState } from "react";
import AddExclude from "./AddExclude";
import MinMaxInput from "./MinMaxInput";
import Checkbox from "./Checkbox";

const CategorySearch = ({
  ingrRange,
  calRange,
  onNumRangeInputChange,
  excluded,
  setExcluded,
  excludedList,
  addIngredient,
  deleteIngredient,
  dietData,
  healthData,
  cuisineData,
  mealData,
  onCheckboxChange,
}) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div>
      <button
        className="collapse adv_search"
        onClick={() => setIsActive(!isActive)}>
        Advanced Search
      </button>
      {isActive && (
        <div className="content">
          <MinMaxInput
            arr={ingrRange}
            type={"ingr"}
            title={"Number of Ingredients"}
            onChange={onNumRangeInputChange}
          />
          <MinMaxInput
            arr={calRange}
            type={"cal"}
            title={"Number of Calories"}
            onChange={onNumRangeInputChange}
          />
          <AddExclude
            arr={excludedList}
            type={"excluded"}
            title={"Exclude Ingredients"}
            value={excluded}
            onAdd={addIngredient}
            onDelete={deleteIngredient}
            onChange={setExcluded}
          />
          <Checkbox
            type={"diet"}
            arr={dietData}
            title={"Type of Diet"}
            onChange={onCheckboxChange}
          />
          <Checkbox
            type={"health"}
            arr={healthData}
            title={"Diet Restrictions"}
            onChange={onCheckboxChange}
          />
          <Checkbox
            type={"cuisine"}
            arr={cuisineData}
            title={"Cuisine Type"}
            onChange={onCheckboxChange}
          />
          <Checkbox
            type={"meal"}
            arr={mealData}
            title={"Meal Type"}
            onChange={onCheckboxChange}
          />
        </div>
      )}
    </div>
  );
};

export default CategorySearch;
