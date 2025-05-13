import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get('https://api-shop-render.onrender.com/api/users');
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://api-shop-render.onrender.com/api/users/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <h5>User Management</h5>
      </div>
      <div className="card-body">
        <UserForm onSuccess={fetchUsers} editUser={editUser} />

        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th style={{ width: '150px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => setEditUser(user)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}>
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
