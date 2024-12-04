import React from "react";
import { Link } from "react-router-dom";

function ItemList({ image, name, price, id }) {
  return (
    <div className="item-list">
      <img src={image} alt="products" />
      <h2>{name}</h2>
      <h3>Price: Ksh. {price}</h3>
      <Link to={`/items/${id}`}>View Details</Link>
    </div>
  );
}

export default ItemList;
