import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import NotFound from "./components/NotFound";
function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5004/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products.");
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <BrowserRouter>
    <div className="App">
      <h1>Uzuri Boutique</h1>
      <ProductForm onProductAdded={handleProductAdded} />
      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && ( 
        <Routes>
          <Route path="/" element={<ProductList products={products} />} />
          <Route path="/products/:id" element={<ProductDetails products={products} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </div>
  </BrowserRouter>
  );
}
export default App;
