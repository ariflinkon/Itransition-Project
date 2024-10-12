// src/client/pages/UserProfilePage.js
import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../services/api';

const UserProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getUserProfile().then(setProfile);
  }, []);

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-profile-page p-5">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>Email: {profile.email}</p>
      <p>Username: {profile.username}</p>
      {/* You can add more fields like profile management options */}
    </div>
  );
};

export default UserProfilePage;
