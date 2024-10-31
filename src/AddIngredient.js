import { TiDelete } from "react-icons/ti";
import React from "react";

const AddIngredient = ({ arr, type, value, onAdd, onDelete, onChange }) => {
  const addElement = (
    <label>
      Search by Ingredients:
      <input
        type="text"
        id={`add_${type}`}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <button onClick={() => onAdd(type)}>+</button>
    </label>
  );
  if (arr.length > 0) {
    const list = arr.map(item => (
      <li key={item}>
        <button onClick={() => onDelete(type, item)}>
          <TiDelete />
        </button>
        {item}
      </li>
    ));
    return (
      <div className="add_ingr">
        {addElement}
        <ul>{list}</ul>
      </div>
    );
  } else {
    return <div className="add_ingr">{addElement}</div>;
  }
};

export default AddIngredient;
