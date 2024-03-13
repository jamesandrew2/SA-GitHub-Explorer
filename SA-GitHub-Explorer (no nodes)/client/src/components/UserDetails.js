// UserDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To access the username parameter from the URL
import axios from 'axios'; // For making HTTP requests to your backend

const UserDetails = () => {
  const { username } = useParams(); // Extract the username from the URL parameters
  const [userDetails, setUserDetails] = useState(null); // State for user details
  const [error, setError] = useState(''); // State to handle any errors

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Attempt to fetch user details from your backend
        const result = await axios(`/api/users/${username}`);
        setUserDetails(result.data);
      } catch (err) {
        // If there's an error (e.g., network error, user not found), store the error message
        setError('Failed to fetch user details');
        console.error(err);
      }
    };

    fetchUserDetails();
  }, [username]); // This effect depends on the username, so it re-runs when the username changes

  // Display a loading message if userDetails haven't been fetched yet
  if (!userDetails && !error) return <div>Loading...</div>;

  // Display an error message if there was a problem fetching userDetails
  if (error) return <div>{error}</div>;

  return (
    <div>
      {/* Display user information once it's been fetched */}
      <h2>{userDetails.name} - @{userDetails.login}</h2>
      <img src={userDetails.avatar_url} alt="User Avatar" />
      <p>{userDetails.bio}</p>
      
      {/* Check if userRepos exists before attempting to map over it */}
      {userDetails.userRepos && (
        <>
          <h3>Repositories:</h3>
          <ul>
            {userDetails.userRepos.map(repo => (
              <li key={repo.id}>{repo.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default UserDetails;