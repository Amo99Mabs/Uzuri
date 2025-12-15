import React, {useEffect, useState} from 'react';
import { getProducts, deleteProduct } from "../api";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editing, setEditing] = useState(null); // utilize in step 2

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products.');
      } finally{
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const handleDelete = async (id) => {
    setError('');
    setSuccess('');
    try{
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p._id !== id));
      setSuccess('Product deleted.');
      } catch(err){
        setError('Delete failed');
      }
    };
    const handleStarEdit = (product) => {
      setEditing(product);
      setSuccess('');
      setError('');
    };
    if (loading) return <p>Loading products...</p>;
    return (
      <div>
        <h2>Uzuri Products</h2>
        {error && <div style={{ color: 'crimson'}}>{error}
      </div>}
      {success && <div style={{ color: 'seagreen'}}>{success}</div>}
      {/* Edit form renders here in Step 2*/}
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {" "}
            <strong>{product.name}</strong> – R{product.price}
            {product.description && <p>{product.description}</p>}
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px'}}>
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

