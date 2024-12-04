import React from "react";
import NavBar from "../components/NavBar";
import { useOutletContext } from "react-router-dom";
import Footer from "../components/Footer";
function About() {
  const contextData = useOutletContext();

  function onLogOut() {
    contextData.logout();
  }
  return (
    <div>
      <NavBar logout={onLogOut} />
      <div className="about-container">
        <h1 className="heading">About Us</h1>
        <div className="about-content">
          <div>
            <img
              src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Fresh produce"
              className="about-image"
            />
            <p className="about-text">
              Welcome to FreshMart! We're a passionate team dedicated to
              bringing you the freshest produce and highest quality grocery
              items. Our goal is to make healthy eating easy and enjoyable for
              everyone.
            </p>
          </div>
          <div>
            <p className="about-text">
              With our wide selection of fruits, vegetables, and more, we hope
              to add a little joy to your everyday shopping experience. Thank
              you for choosing FreshMart, where freshness is always at your
              fingertips!
            </p>
            <img
              src="https://images.pexels.com/photos/95425/pexels-photo-95425.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Happy team"
              className="about-image"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
