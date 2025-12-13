import React, { useState } from "react";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

function App() {
  const [products, setProducts] = useState([]);
  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div className="App">
      <h1>Uzuri Boutique</h1>
      <ProductForm onProductAdded={handleProductAdded} />
      <ProductList products={products} />
      <ProductList />
    </div>
  );
}

export default App;
