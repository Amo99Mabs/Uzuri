import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = ({ products }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const product = products.find((p) => p._id === id);

  if (!product) return <p>Product not found.</p>;

  return ( 
    <div className="product-details-card">
      <h2>{product.name}</h2> 
      {product.imageUrl && (
       <img src={product.imageUrl} alt={product.name} className="product-image"/>
     )} 
     <p><strong>Price:</strong> R{product.price}</p> 
     <p><strong>Stock:</strong> {product.stock}</p>
     <p>{product.description}</p>
       
     {product.category && <p><strong>Category:</strong> {product.category}</p>}
     {product.sku && <p><strong>SKU:</strong> {product.sku}</p>}
     {product.createdAt && ( <p><strong>Added on:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>)}

     <button onClick={() => navigate(-1)} className="btn-back">
       ← Back to Products
     </button>
   </div>
 );
};

export default ProductDetails;
