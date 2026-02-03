import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api";
import EditProductForm from "./EditProductForm";
import AddProductForm from "./AddProductForm";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

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
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
    
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
  
  const filteredProducts = products.filter((p) => 
    p.name.toLowerCase().includes(search.toLowerCase())
);
  
  let sortedProducts = [...filteredProducts];
  if (sort === "priceAsc") sortedProducts.sort((a, b) => a.price - b.price);
  if (sort === "priceDesc") sortedProducts.sort((a, b) => b.price - a.price);
  if (sort === "stock") sortedProducts.sort((a, b) => b.stock - a.stock);
  if (sort === "nameAsc") sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "nameDesc") sortedProducts.sort((a, b) => b.name.localeCompare(a.name));

  const highlightMatch = (name) => {
    if (!search) return name;
   const regex = new RegExp(`(${search})`, "gi");

    return name.replace(regex, "<strong>$1</strong>");
  };
  
  return (
    <div>
      <h2>Uzuri Products</h2>
     {error && <p className="error">{error}</p>}
     {success && <p className="success">{success}</p>}
{editing && (
 <EditProductForm 
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
       type="text" 
       placeholder="Search products..." 
       value={search} 
       onChange={(e) => setSearch(e.target.value)}
       style={{ marginBottom: "12px", padding: "6px", width: "60%" }}
      />
 <select 
  value={category} 
  onChange={(e) => setCategory(e.target.value)} 
  style={{ marginBottom: "12px", padding: "6px" }} 
> 
 <option value="">All Categories</option> 
 <option value="Clothing">Clothing</option> 
 <option value="Shoes">Shoes</option> 
 <option value="Accessories">Accessories</option> 
</select> 
<select 
 value={sort} 
 onChange={(e) => setSort(e.target.value)} 
 style={{ marginBottom: "12px", padding: "6px" }} 
> 
 <option value="">Sort by</option> 
 <option value="priceAsc">Price: Low to High</option> 
 <option value="priceDesc">Price: High to Low</option> 
 <option value="stock">Stock</option> 
 <option value="nameAsc">Name: A–Z</option> 
 <option value="nameDesc">Name: Z–A</option> 
</select>

<button onClick={() => setSort("")} className="btn-reset">
  Reset Sort
</button> 
{sortedProducts.length === 0 ? (
  <p>No products found.</p>
  ) : (
      <ul>
        {sortedProducts.map((product) => (
          <li key={product._id} className="product-card">
            <h3>
  {product.imageURL && ( <img src={product.imageURL} alt={product.name} style={{ maxWidth: "120px", borderRadius: "6px", marginBottom: "8px" }} /> )}
              <Link to={`/products/${product._id}`}>{product.name}</Link>
              </h3>
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
