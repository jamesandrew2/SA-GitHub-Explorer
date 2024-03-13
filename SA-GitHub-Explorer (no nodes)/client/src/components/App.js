// Import React and necessary components from react-router-dom for navigation
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
// Import your custom components that handle searching and displaying user details
import Search from './Search';
import UserDetails from './UserDetails';

function App() {
  return (
    // Use Router to wrap your application to enable routing
    <Router>
      <div>
        {/* Switch component is used to render only the first route that matches the location */}
        <Routes>
          {/* Route for the search page, which will render when the path is exactly "/" */}
          <Route path="/" exact component={Search} />
          {/* Route for displaying details of a specific user */}
          {/* :username is a URL parameter that UserDetails component can access */}
          <Route path="/users/:username" component={UserDetails} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;