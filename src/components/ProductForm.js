import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductForm({ onSuccess, editProduct }) {
  const [form, setForm] = useState({ title: '', price: '', description: '', category: '', image: '' });

  useEffect(() => {
    if (editProduct) {
      setForm(editProduct);
    }
  }, [editProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editProduct) {
      await axios.put(`https://api-shop-render.onrender.com/api/products/putProductById/${editProduct._id}`, form);
    } else {
      await axios.post('https://api-shop-render.onrender.com/api/products/postProduct', form);
    }
    setForm({ title: '', price: '', description: '', category: '', image: '' });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required />
      <input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} required />
      <input placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} required />
      <input placeholder="Category" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} required />
      <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} required />
      <button type="submit">{editProduct ? 'Update' : 'Create'}</button>
    </form>
  );
}
