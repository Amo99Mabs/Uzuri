import React, { useEffect, useState } from "react";
import { getProducts } from "../api";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };
    fetchProducts();
  }, []);
  retrun(
    <div>
      <h2>Uzuri Products</h2>{" "}
      <ul>
        {" "}
        {products.map((product) => (
          <li key={product._id}>
            {" "}
            <strong>{product.name}</strong> – R{product.price}{" "}
          </li>
        ))}{" "}
      </ul>
    </div>
  );
};
