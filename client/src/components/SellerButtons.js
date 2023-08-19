import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from './Header';
import '../styles/SellerButtons.css';

const SellerButtons = () => {
  return (
    <div>
      <div className="home-page">
      <Header />
        <div className="content-container">
          <h2 className="welcome-text">Welcome Seller/Worker</h2>
          <h5>Please Login to your account to continue. If you don't have
            an account, please register.
          </h5>

          <div className="button-container">
            <Link to="/WorkerRegistration">
              <Button variant="primary" className="worker-button">Register as Worker</Button>
            </Link>
            <Link to="/WorkerLogin">
              <Button variant="primary" className="worker-button">Login as Worker</Button>
            </Link>
            <Link to = "/SellerRegistration">
            <Button variant="secondary" className="seller-button">Register as Seller</Button>
            </Link>
            <Link to="/SellerLogin">
            <Button variant="secondary" className="seller-button">Login as Seller</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerButtons;

