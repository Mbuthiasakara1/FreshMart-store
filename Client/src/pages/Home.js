import React, { useState, useEffect } from "react";
import ItemList from "../components/itemList";
import NavBar from "../components/NavBar";
import { useOutletContext } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {
  const contextData = useOutletContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/products`)
      .then((resp) => resp.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  function onLogOut() {
    contextData.logout();
  }

  return (
    <div className="home-container">
      <NavBar logout={onLogOut} />
      <div>
        <h1 className="heading">Home</h1>
        <div className="App">
          {products.map((product) => (
            <ItemList
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
            />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
