import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="container py-5 text-center">
    <h1 style={{ fontSize: '5rem' }}>404</h1>
    <p className="text-muted mb-4">This page doesn't exist.</p>
    <Link to="/" className="btn btn-primary">Back to Home</Link>
  </div>
);

export default NotFound;
