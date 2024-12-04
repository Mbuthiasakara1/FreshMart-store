
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Login() {
  const contextData = useOutletContext();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleLogin(e) {
    e.preventDefault();

    // POST request to the login endpoint
    fetch("http://127.0.0.1:5555/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }
        return response.json();
      })
      .then((data) => {
        contextData.login(data.user_id);
        alert(data.message);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="login-container">
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account?
          <Link to="/signup">Sign Up</Link>
        </p>
        <button onClick={handleGoBack}>Back</button>
      </div>
    </div>
  );
}

export default Login;
