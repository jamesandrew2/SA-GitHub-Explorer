// RepoDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RepoDetails = () => {
  // State to hold the repository details
  const [repoDetails, setRepoDetails] = useState(null);
  const [commits, setCommits] = useState([]);

  // Extracting the username and repoName from the URL parameters
  const { username, repoName } = useParams();

  useEffect(() => {
    // Function to fetch repository details
    const fetchRepoDetails = async () => {
      try {
        // Fetching repository details
        const repoResponse = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
        setRepoDetails(repoResponse.data);

        // Fetching the last 5 commits of the repository
        const commitsResponse = await axios.get(`https://api.github.com/repos/${username}/${repoName}/commits?per_page=5`);
        setCommits(commitsResponse.data);
      } catch (error) {
        console.error("Failed to fetch repository details or commits", error);
      }
    };

    fetchRepoDetails();
  }, [username, repoName]);

  if (!repoDetails) return <div>Loading...</div>;

  return (
    <div>
      <h1>{repoDetails.name}</h1>
      <p>Description: {repoDetails.description}</p>
      <p>Created at: {new Date(repoDetails.created_at).toLocaleDateString()}</p>
      <h2>Last 5 Commits:</h2>
      <ul>
        {commits.map((commit, index) => (
          <li key={index}>{commit.commit.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default RepoDetails;