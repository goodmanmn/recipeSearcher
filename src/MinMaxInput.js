import React, { useState } from "react";

const MinMaxInput = ({ arr, type, title, onChange }) => {
  const [isActive, setIsActive] = useState(false);

  const range = arr.map(item => (
    <label key={type + item.name}>
      {item.name}
      <input
        type="number"
        min="0"
        id={type + item.name}
        value={item.amount}
        onChange={e => onChange(e.target.value, type, item.name)}
      />
    </label>
  ));
  return (
    <div className="category min_max">
      <p className="collapse" onClick={() => setIsActive(!isActive)}>
        {title}
      </p>
      {isActive && <section className="content">{range}</section>}
    </div>
  );
};

export default MinMaxInput;
