import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = ({ products }) => {
  const { id } = useParams(); 
  const product = products.find((p) => p._id === id);

  if (!product) return <p>Product not found.</p>;

  return ( 
    <div className="product-details-card">
      <h2>{product.name}</h2> 
      {product.imageUrl && (
       <img src={product.imageUrl} alt={product.name} /> 
     )} 
     <p>Price: R{product.price}</p> 
     <p>Stock: {product.stock}</p>
     <p>{product.description}</p>
       
     {product.category && <p>Category: {product.category}</p>}
     {product.sku && <p>SKU: {product.sku}</p>}
     {product.createdAt && <p>Added on: {new Date(product.createdAt).toLocaleDateString()}</p>}

     <button onClick={() => window.history.back()} className="btn-back">
       ← Back to Products
     </button>
   </div>
 );
};

export default ProductDetails;
