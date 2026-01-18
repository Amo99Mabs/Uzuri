import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api";
import EditProductForm from "./EditProductForm";
import AddProductForm from "./AddProductForm";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");

  const handleUpdated = (updated) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p))
    );
    setEditing(null);
    setSuccess("Product updated.");
  };

  const handleCancelEdit = () => {
    setEditing(null); 
    setSuccess(""); 
    setError("");
  };

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
  const handleStartEdit = (product) => {
    setEditing(product);
    setSuccess("");
    setError("");
  };
  if (loading) return <p>Loading products...</p>;
  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) );
  return (
    <div>
      <h2>Uzuri Products</h2>
     {error && <p className="error">{error}</p>}
     {success && <p className="success">{success}</p>}
     
      {editing && (
 <EditProductForm product={editing}
   product={editing}
   onUpdated={handleUpdated} 
   onCancel={handleCancelEdit} 
 /> 
)}
  <AddProductForm 
     onCreated={(newProduct) => {
     setProducts((prev) => [...prev, newProduct]);
     setSuccess("Product added.");
     setError("");
      }}
    />
    <input 
       type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "12px", padding: "6px", width: "60%" }}
      />
      <ul>
        {products.map((product) => (
          <li key={product._id} className="product-card">
            <h3>{product.name}</h3> 
            <p>Price: R{product.price}</p>
            {product.description && <p>{product.description}</p>}
            <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
            <button className="btn-edit" onClick={() => handleStartEdit(product)}>Edit</button>
<button className="btn-delete" onClick={() => handleDelete(product._id)}>Delete</button>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
