import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => (
  <div className="welcome">
    <div className="container-fluid">
      <h1>Battleship</h1>
      <Link to="/wait" className="btn btn-primary">Start</Link>
    </div>
  </div>
);

export default WelcomePage;
