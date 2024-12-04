import React, { useState, useEffect } from "react";
import AddItem from "../components/AddItem";
import UpdateItem from "../components/UpdateItem";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useOutletContext } from "react-router-dom";

function Seller() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const contextData = useOutletContext();

  const{userId} =contextData;
 
  function onLogOut() {
    contextData.logout();
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/products`)
      .then((resp) => resp.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  function handleAddItem(newItem) {
    setProducts((prevProducts) => [...prevProducts, newItem]);
  }
  function handleUpdateItem(updatedItem) {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedItem.id ? updatedItem : product
      )
    );
    setSelectedProduct(null); 
  }

  function handleDelete(id) {
    fetch(`http://127.0.0.1:5555/products/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
    });
  }

  function toggleForm() {
    setShowForm(!showForm);
  }

  return (
    <div className="seller-container">
      <NavBar logout={onLogOut} />
      <h1 className="heading">Seller Dashboard</h1>

      <div className="additemsdiv">
        <h2>Add New Product:</h2>
        <button type="button" className="addItemBtn" onClick={toggleForm}>{showForm ? "Close Form" : "Add Item"}</button>
      </div>

     
      <div className="formdisplay">
        {showForm && (
          <AddItem onAddItem={handleAddItem} products={products} 
          userId={userId}
          />
        )}
        {selectedProduct && (
          <UpdateItem
            product={selectedProduct}
            onUpdateItem={handleUpdateItem}
          />
        )}
      </div>

      <h2>Existing Products:</h2>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: {product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Description: {product.description}</p>
            <button onClick={() => setSelectedProduct(product)}>Edit Item</button>
            <button onClick={() => handleDelete(product.id)}>
              Delete Item
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Seller;
