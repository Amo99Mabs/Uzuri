import React, { useState } from "react";

const ProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5004/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringifly(formData),
      });
      const newProduct = await res.json();
      onProductAdded(newProduct); // update list
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        imageURL: "",
      });
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Product</h2>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Stock"
      />
      <input
        name="imageURL"
        value={formData.imageURL}
        onChange={handleChange}
        placeholder="Image URL"
      />
      <button type="submit">Add product</button>
    </form>
  );
};
export default ProductForm;
