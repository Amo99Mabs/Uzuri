import React, { useState } from "react";
import { updateProduct } from "../api";
const EditProductForm = ({ product, onUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product.name || "",
    description: product.description || "",
    price: product.price ?? 0,
    stock: product.stock ?? 0,
    imageURL: product.imageUrl || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numeric = name == "price" || name === "stock";
    setFormData((prev) => ({
      ...prev,
      [name]: numeric ? Number(value) : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const update = await updateProduct(product._id, formData);
      onUpdated(updated);
    } catch (err) {
      setError("Update failed.");
    } finally {
      setSaving(false);
    }
  };
    return ( <form onSubmit={handleSubmit} className="product-card"> <h3>Edit product</h3> {error && <p className="error">{error}</p>} <div className="form-grid">
        <label>Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <lable>Description</lable>
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <label>Price</label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <label>Stock</label>
        <input
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
        />
        <label>Image URL</label>
        <input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" className="btn-edit" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
        <button type="button" className="btn-delete" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;
