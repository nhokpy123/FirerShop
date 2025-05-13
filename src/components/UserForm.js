import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserForm({ onSuccess, editUser }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  useEffect(() => {
    if (editUser) {
      setForm({ username: editUser.username, email: editUser.email, password: '' });
    }
  }, [editUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editUser) {
      await axios.put(`https://api-shop-render.onrender.com/api/users/${editUser._id}`, form);
    } else {
      await axios.post('https://api-shop-render.onrender.com/api/auth/register', form);
    }
    setForm({ username: '', email: '', password: '' });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} required />
      <input placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required />
      <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required={!editUser} />
      <button type="submit">{editUser ? 'Update' : 'Create'}</button>
    </form>
  );
}
