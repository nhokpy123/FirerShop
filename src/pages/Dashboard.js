import React from 'react';
import UserList from '../components/UserList';
import ProductList from '../components/ProductList';

export default function Dashboard() {
  return (
    <div className="container my-4">
      <h2 className="mb-4">Admin Dashboard</h2>
      <UserList />
      <ProductList />
    </div>
  );
}
