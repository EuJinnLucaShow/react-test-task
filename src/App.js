import React, { useState, useEffect } from 'react';
import Comments from './components/Comments/Comments';
import Item from './components/Item/Item';
import './App.css';

function App() {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem('items');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const [selectedItem, setSelectedItem] = useState(() => {
    const storedSelectedItem = localStorage.getItem('selectedItem');
    return storedSelectedItem ? JSON.parse(storedSelectedItem) : null;
  });

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('selectedItem', JSON.stringify(selectedItem));
  }, [items, selectedItem]);

  const onSelectItem = item => {
    const newSelectedItem = selectedItem?.id !== item.id ? item : null;
    setSelectedItem(newSelectedItem);
  };

  const onItemAdd = newItem => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    setSelectedItem(newItem);
  };

  const onItemDelete = itemId => {
    const newItems = items.filter(item => item.id !== itemId);

    setItems(newItems);
    if (selectedItem && itemId === selectedItem.id) {
      setSelectedItem(null);
    }
  };

  const onCommentAdd = (comment, itemId) => {
    const itemIndex = items.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
      const updatedItems = [...items];

      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        comments: [...updatedItems[itemIndex].comments, comment],
      };

      setItems(updatedItems);
      setSelectedItem(updatedItems[itemIndex]);
    }
  };

  return (
    <main className="wrapper">
      <aside className="aside">
        <h1>DAYRY APP</h1>
        <p>Comments with no sense</p>
      </aside>
      <div className="sections">
        <Item
          items={items}
          onItemAdd={onItemAdd}
          onItemSelect={onSelectItem}
          onItemDelete={onItemDelete}
          selectedItemId={selectedItem?.id}
        />
        <Comments selectedItem={selectedItem} onCommentAdd={onCommentAdd} />
      </div>
    </main>
  );
}

export default App;
