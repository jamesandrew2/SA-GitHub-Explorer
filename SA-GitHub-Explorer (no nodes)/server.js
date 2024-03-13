// Import necessary Node.js modules
const express = require('express'); // Express framework for building the HTTP server
const helmet = require('helmet'); // Helmet for securing the app by setting various HTTP headers
const axios = require('axios'); // Axios for making HTTP requests to the GitHub API

const app = express(); // Initialize the Express application

// Middleware
app.use(helmet()); // Enhances app security
app.use(express.json()); // Parses incoming requests with JSON payloads

// GitHub User Search Route
// This route allows searching for users on GitHub by username.
app.get('/api/search/users/:username', async (req, res) => {
  try {
    const { username } = req.params; // Extracts the username from the route parameter
    const response = await axios.get(`https://api.github.com/search/users?q=${username}+in:login`);
    res.json(response.data); // Sends the fetched data back to the client
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching data from GitHub' });
  }
});

// GitHub User Details Route
// Fetches detailed information about a specific user, including some of their repos.
app.get('/api/users/:username', async (req, res) => {
  try {
    const { username } = req.params; // Extracts the username from the route parameter
    // Fetch user details
    const userDetails = await axios.get(`https://api.github.com/users/${username}`);
    
    // Fetch user repos, limited to 5 for this example
    const userRepos = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5`);

    // Combines user details and repos in the response
    res.json({
      userDetails: userDetails.data,
      userRepos: userRepos.data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user details or repos from GitHub' });
  }
});

// Define the port number and start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));