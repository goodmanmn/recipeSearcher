import { FaInfoCircle } from "react-icons/fa";
import React, { useState } from "react";

const Checkbox = ({ type, arr, title, onChange }) => {
  const [isActive, setIsActive] = useState(false);

  const list = arr.map(item => (
    <label className={`checkbox_${type}`} key={item.name}>
      {item.tooltip ? (
        <span className="tooltip" data-tooltip={item.tooltip}>
          <FaInfoCircle />
        </span>
      ) : (
        ""
      )}
      <input
        type="checkbox"
        id={item.name}
        name={type}
        checked={item.checked}
        onChange={() => onChange(item.name, type)}
      />
      {item.name}
    </label>
  ));

  return (
    <div className="category">
      <p className="collapse" onClick={() => setIsActive(!isActive)}>
        {title}
      </p>
      {isActive && <section className="content">{list}</section>}
    </div>
  );
};

export default Checkbox;
