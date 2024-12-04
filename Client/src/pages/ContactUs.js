import React from "react";
import { useOutletContext } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
function ContactUs() {
  const contextData = useOutletContext();

  function onLogOut() {
    contextData.logout();
  }
  return (
    <div>
      <NavBar logout={onLogOut} />
      <div>
        <h1 className="heading">Find Us</h1>
      </div>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8122913524758!2d36.81436207612459!3d-1.286694498701066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10c55202d22b%3A0x9476f14fd49cde4d!2sKenyatta%20Ave%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1723665949664!5m2!1sen!2ske"
          style={{ border: 0 }}
          title="location"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="lazy"
        ></iframe>

        <div className="contact-info">
          <h1>Our info</h1>
          <h2>Contact Details</h2>
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
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;
