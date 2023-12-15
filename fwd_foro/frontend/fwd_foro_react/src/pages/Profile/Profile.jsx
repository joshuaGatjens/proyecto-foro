// Profile.jsx
import React, { useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import UserProfile from '../../components/ProfileComponents/UserProfile/UserProfile';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../User/UserContext';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { useState } from 'react';
function Profile() {
  const { currUser, setCurrUser } = useUser();
  const { userId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const currentUserId = decoded.sub;
      fetch(`http://localhost:3001/api/v1/users/${currentUserId}`)
        .then((response) => response.json())
        .then((data) => {
          setCurrUser(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // Set default user data if not logged in
      setCurrUser({
        name: "Guest",
        email: "guest@gmial.com",
        description: "aaaaaaaaaaaaaaaaaaaaaaaaa"
      });
    }
  }, [setCurrUser]);

  return (
    <div className='contain-profile'>
      <Navbar
        onSearchChange={handleSearch}
        searchQuery={searchQuery}></Navbar>

      <UserProfile userId={userId} searchQuery={searchQuery}></UserProfile>
      <Footer></Footer>
    </div>
  )
}

export default Profile;
