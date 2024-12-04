
import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function Signup() {
  const signup = useOutletContext();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then((resp) => resp.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };

    fetch("http://127.0.0.1:5555/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers((prevUsers) => [...prevUsers, data]);
        signup.login();
      })
      .catch((error) => console.error(error));

    setUsername("");
    setPassword("");
  }

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="signup-container">
      <div className="signup">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Signup</button>
        </form>
        <button onClick={handleGoBack}>Back</button>
      </div>
    </div>
  );
}

export default Signup;

