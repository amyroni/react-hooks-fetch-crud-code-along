import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
    .then(response => response.json())
    .then(data => setItems(data))
  }, [])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleItemFormSubmit(newItem) {
    setItems([...items, newItem]);
  }

  function handleAddToCartClick(isInCart, id) {
    const newItems = items.map(item => {
      if (item.id === id) {
        return {...item, isInCart: isInCart}
      } else {
        return item
      }
    })
    setItems(newItems);
  }

  function handleDelete(id) {
    const newItems = items.filter(item => {
      return (item.id !== id);
    })
    setItems(newItems);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onAddToCartClick={handleAddToCartClick} onDelete={handleDelete}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
