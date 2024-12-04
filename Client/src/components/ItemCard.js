import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function ItemCard() {
  const params = useParams();
  const [items, setItems] = useState({});
  const itemId = params.id;

  fetch(`http://127.0.0.1:5555/products/${itemId}`)
    .then((resp) => resp.json())
    .then((data) => setItems(data))
    .catch((error) => console.error(error));

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="item-card">
      <h1>{items.name}</h1>
      <img src={items.image} alt="product" />
      <h2>Price: Ksh. {items.price}</h2>
      <p>Description: {items.description}</p>
      <p>Category: {items.category}</p>
      <p>Quantity in Stock: {items.quantity}</p>
      <button onClick={handleGoBack}>Back</button>
    </div>
  );
}

export default ItemCard;
