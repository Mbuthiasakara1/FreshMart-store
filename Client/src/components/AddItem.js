import React, { useState } from "react"

function AddItem({ onAddItem, products,userId }) {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('Select Category')
    const [price, setPrice] = useState()
    const [quantity, setQuantity] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')


    function handleSubmit(e) {
        e.preventDefault();
        const newItem = {
            id: (products.length + 1).toString(),
            name: name,
            category: category,
            price: parseFloat(price),
            quantity: parseFloat(quantity),
            description: description,
            image: image,
            user_id:userId
            
        };
        console.log(newItem)

        fetch("http://127.0.0.1:5555/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        })
          .then((response) => response.json())
          .then((data) => onAddItem(data));

        setName("");
        setCategory("Select Category");
        setPrice("");
        setQuantity("");
        setDescription("");
        setImage("");
    }

    function getUniqueCategories(products) {
        const categories = products.map(product => product.category);
        return [...new Set(categories)];
    }


    const uniqueCategories = getUniqueCategories(products);

    return (
        <form className="submitForm" onSubmit={handleSubmit}>
            <h2>Add New Item</h2>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="category">Category</label>
            <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="Select Category">Select Category</option>
                {uniqueCategories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}

            </select>

            <label htmlFor="price">Price</label>
            <input
                type="text"
                placeholder="Price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <label htmlFor="quantity">Quantity</label>
            <input
                type="text"
                placeholder="Quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />

            <label htmlFor="description">Description</label>
            <input
                type="text"
                placeholder="Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <label htmlFor="image">Image</label>
            <input
                type="text"
                placeholder="Image URL"
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />

            <button type="submit" >Add Item</button>
        </form>

    )
}

export default AddItem;

