import React, { useState } from "react";
import SectionContainer from "../SectionContainer/SectionContainer";
import './Comments.css'

function Comments({ selectedItem, onCommentAdd }) {
  const title = selectedItem ? `Comments #${selectedItem.id}` : "Comments";
  const [commentName, setCommentName] = useState("");
  const [commentColor, setCommentColor] = useState('#000000');

  const handleCommentAdd = (e) => {
    e.preventDefault();

    const newComment = {
      id: Date.now().toString(),
      name: commentName,
      color: commentColor,
    };

    if (commentName.length && selectedItem) {
      onCommentAdd(newComment, selectedItem.id);
      setCommentColor("#000000")
      setCommentName("");
    }
  };

  const handleColorChange = (e) => {
    setCommentColor(e.target.value);
  };

  return (
    <SectionContainer title={title}>
      <ul className="comments__list">
        {selectedItem &&
          selectedItem.comments.map((item) => (
            <li
              className="comments__list-item"
              key={item.id} >
              <div
                style={{ backgroundColor: item.color }}
                className="comments__list-color"
              >                
              </div>
              <p className="comments__list-content">{item.name}</p>
            </li>
          ))}
      </ul>

      <form onSubmit={handleCommentAdd} className="comments__form">
        <input
          type="color"
          aria-label="Select comment color"
         className="comments__input-color"
          onChange={handleColorChange}
          value={commentColor}
        />
        <textarea
          placeholder="Type comment here ..."
          aria-label="Enter comment name"
          required
          value={commentName}
          onChange={(e) => setCommentName(e.target.value)}
         className="comments__textarea"
          rows={10}
          cols={40}
        />
        <button
          type="submit"
          aria-label="Add comment to item"          
          className="comments__add-button"
        >Add new</button>
      </form>
    </SectionContainer>
  );
}

export default Comments;
