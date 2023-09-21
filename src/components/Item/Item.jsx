import React, { useState } from "react";
import SectionContainer from "../SectionContainer/SectionContainer";
import './Item.css'

function Item({
  items,
  onItemAdd,
  onItemSelect,
  onItemDelete,
  selectedItemId,
}) {
  const [itemName, setItemName] = useState("");

  const handleAddItem = (e) => {
    e.preventDefault();
    const newItem = { id: Date.now().toString(), name: itemName, comments: [] };

    if (itemName.length) {
      onItemAdd(newItem);
    }

    setItemName("");
  };

  return (
    <SectionContainer title="Items">
      <form onSubmit={handleAddItem} className="item__form">
        <input
          type="text"
          placeholder="Type name here ..."
          aria-label="Enter item name"
          className='item__input'
          value={itemName}
          required
          onChange={(e) => setItemName(e.target.value)}
        />
        <button
          type="submit"
          aria-label="Add item to list"
          value="Add new"
          className="item__add-button"
        >Add new</button>
      </form>

      <ul className="item__list">
        {items.map((item) => (
          <li
            key={item.id}
            className="item__list-item"
            // className={`item__list-item ${
            //   item.id === selectedItemId && item__selected
            // }`}
          >
            <div
              onClick={() => onItemSelect(item)}
              className="item__list-item-content"
            >
              <span>{item.name}</span>
              <span className="item__comments">{item.comments.length}</span>
            </div>
            <button
              onClick={() => onItemDelete(item.id)}
              className="item__delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}

export default Item;
