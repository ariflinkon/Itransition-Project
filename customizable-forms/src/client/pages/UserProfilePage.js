import React, { useEffect, useState } from "react";
import api from "../services/api";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user information
    api.get("/user/info")
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("Error fetching user information:", error);
      });
  }, []);

  return (
    <div className="user-profile-page">
      {user && (
        <div className="user-info">
          <h1>Welcome, {user.name}</h1>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;