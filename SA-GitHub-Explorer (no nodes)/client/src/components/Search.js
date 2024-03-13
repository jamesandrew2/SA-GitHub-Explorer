// Search.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory hook for navigation

const Search = () => {
  // State to hold the username input
  const [username, setUsername] = useState('');

  // useHistory hook to programmatically navigate to other routes
  const history = useHistory();

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    history.push(`/users/${username}`); // Navigate to the user details page with the username
  };

  return (
    // Form for searching GitHub users
    <form onSubmit={handleSubmit}>
      {/* Input field for entering the GitHub username */}
      <input
        type="text"
        placeholder="Search GitHub Users"
        value={username} // Controlled component with username as its value
        onChange={(e) => setUsername(e.target.value)} // Update state on input change
      />
      {/* Submit button for the form */}
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;