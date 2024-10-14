import React, { useEffect, useState } from 'react';
import { getUsers, updateUserStatus } from '../../services/api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the backend
    getUsers().then(setUsers);
  }, []);

  const handleUpdateStatus = (userId, status) => {
    updateUserStatus(userId, status).then((updatedUser) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
    });
  };

  return (
    <div className="admin-dashboard p-5">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-4">
            <span>{user.name} ({user.email}) - {user.role}</span>
            <button
              onClick={() => handleUpdateStatus(user.id, 'blocked')}
              className="btn-danger ml-4"
            >
              Block
            </button>
            <button
              onClick={() => handleUpdateStatus(user.id, 'admin')}
              className="btn-secondary ml-4"
            >
              Promote to Admin
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
