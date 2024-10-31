import { TiDelete } from "react-icons/ti";
import React, { useState } from "react";

const AddExclude = ({ arr, type, title, value, onAdd, onDelete, onChange }) => {
  const [isActive, setIsActive] = useState(false);
  const addElement = (
    <label>
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
      <div className="category">
        <p className="collapse" onClick={() => setIsActive(!isActive)}>
          {title}
        </p>
        {isActive && (
          <section className="content exc_ingr">
            {addElement}
            <ul>{list}</ul>
          </section>
        )}
      </div>
    );
  } else {
    return (
      <div className="category ">
        <p className="collapse" onClick={() => setIsActive(!isActive)}>
          {title}
        </p>
        {isActive && (
          <section className="content exc_ingr">{addElement}</section>
        )}
      </div>
    );
  }
};

export default AddExclude;
