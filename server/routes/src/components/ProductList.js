import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api";
import EditProductForm from "./EditProductForm";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState(null); // utilize in step 2
  const [editingId, setEditingId] = useState(null);
  const [editProduct, setEditProduct] = useState({ name: "", price: "", description: "", stock: 0 });


  const handleUpdate = async  (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5004/api/products/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editProduct),
      });
      const updated = await res.json();
      setProducts(prev => prev.map(p => p._id === updated._id ? updated : p));
      setEditingId(null);
      } catch (err) {
        console.error("Update failed:", err);
      }
  };

  const handleUpdated = (updated) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p))
    );
    setEditing(null);
    setSuccess("Product updated.");
  };

  const handleCancelEdit = () => setEditing(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const handleDelete = async (id) => {
    setError("");
    setSuccess("");
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setSuccess("Product deleted.");
    } catch (err) {
      setError("Delete failed");
    }
  };
  const handleStarEdit = (product) => {
    setEditing(product);
    setSuccess("");
    setError("");
  };
  if (loading) return <p>Loading products...</p>;
  return (
    <div>
      <h2>Uzuri Products</h2>
      {error && <div style={{ color: "crimson" }}>{error}</div>}
      {success && <div style={{ color: "seagreen" }}>{success}</div>}
      {editing && (
        <EditProductForm
          product={editing}
          onUpdated={handleUpdated}
          onCancel={handleCancelEdit}
        />
      {editing && (
  <form onSubmit={handleUpdate}>
    <input value={editProduct.name} onChange={e => setEditProduct({...editProduct, name: e.target.value})} />
    <input value={editProduct.price} onChange={e => setEditProduct({...editProduct, price: e.target.value})} />
    <button type="submit">Save</button>
  </form>
)}

      )}
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {" "}
            <strong>{product.name}</strong> – R{product.price}
            {product.description && <p>{product.description}</p>}
            <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
              <button onClick={() => handleStartEdit(product)}>Edit</button>
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
