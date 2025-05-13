import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get('https://api-shop-render.onrender.com/api/products/getAllProduct');
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://api-shop-render.onrender.com/api/products/delete/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="card mb-4">
      <div className="card-header bg-success text-white">
        <h5>Product Management</h5>
      </div>
      <div className="card-body">
        <ProductForm onSuccess={fetchProducts} editProduct={editProduct} />

        <table className="table table-hover mt-4">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price ($)</th>
              <th>Category</th>
              <th>Image</th>
              <th style={{ width: '150px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.price}</td>
                <td>{p.category}</td>
                <td>
                  <img src={p.image} alt={p.title} width="50" height="50" style={{ objectFit: 'cover' }} />
                </td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => setEditProduct(p)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
