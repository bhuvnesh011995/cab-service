import React, { useState } from "react";
import "./CheckboxList.css"; 

export default function CheckboxList({ items, title, selectedItems ,setSelectedItems ,selectAll, setSelectAll}) {

  const toggleCheckbox = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

 

  return (
    <div className="checkbox-list ">
      <h3>{title}</h3>

      {/* <div className="checkbox-container">
        <input 
          type="checkbox"
          id="selectAll"
          checked={selectedItems.length === items.length}
          onChange={() => {
            if (selectedItems.length === items.length) {
              setSelectedItems([]);
            } else {
              setSelectedItems([...items]);
            }
          }}
        />
        <label htmlFor="selectAll">Select All</label>
        
      </div> */}

      <div className="item-list">
        {items.map((item) => (

          <div className="checkbox-container" key={item}>
            
            <input
              type="checkbox"
              id={item}
              checked={selectedItems.includes(item)}
              onChange={() => toggleCheckbox(item)}
              
            />
            <label htmlFor={item}>{item}</label>
          </div>
        
        ))}
      </div>
    </div>
  
  );
}
