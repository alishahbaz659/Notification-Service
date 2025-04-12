import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center my-5">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p className="lead mb-4">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound; 