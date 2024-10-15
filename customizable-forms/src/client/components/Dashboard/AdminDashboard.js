import React, { useEffect, useState } from "react";
import api from "../../services/api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleBlockUser = (userId) => {
    api.post(`/admin/block/${userId}`)
      .then(() => {
        setUsers(users.map(user =>
          user.id === userId ? { ...user, blocked: true } : user
        ));
      })
      .catch(error => {
        console.error("Error blocking user:", error);
      });
  };

  const handleUnblockUser = (userId) => {
    api.post(`/admin/unblock/${userId}`)
      .then(() => {
        setUsers(users.map(user =>
          user.id === userId ? { ...user, blocked: false } : user
        ));
      })
      .catch(error => {
        console.error("Error unblocking user:", error);
      });
  };

  const handleDeleteUser = (userId) => {
    api.delete(`/admin/delete/${userId}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="users-list">
        {users.length ? (
          users.map(user => (
            <div key={user.id} className="user-card">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Status: {user.blocked ? "Blocked" : "Active"}</p>
              <button onClick={() => handleBlockUser(user.id)}>
                Block
              </button>
              <button onClick={() => handleUnblockUser(user.id)}>
                Unblock
              </button>
              <button onClick={() => handleDeleteUser(user.id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No users available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
