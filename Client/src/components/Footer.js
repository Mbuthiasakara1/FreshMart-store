import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-section">
        <h3>Why us</h3>

        <p>
          At FreshMart Grocery, we pride ourselves on offering the freshest
          produce and highest quality products. Our commitment to quality and
          customer satisfaction sets us apart.
        </p>
      </div>
      <div className="footer-section">
        <h3>Contact us</h3>
        <p>Located along Kenyatta Ave. (Opp.MKU towers)</p>
        <p>
          <strong>Telephone:</strong> (254) 456-7890
        </p>
        <p>
          <strong>Phone Number:</strong> (254) 456-7890
        </p>
        <p>
          <strong>Email:</strong> contact@example.com
        </p>
      </div>
      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li>
            <Link to="/home">Products</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
