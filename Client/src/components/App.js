import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const contextData = {
    login: function login(id) {
      setIsLoggedIn(true);
      setUserId(id)
    },

    logout: function logout() {
      setIsLoggedIn(false);
      setUserId(null)
    },
    userId,
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/hero");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <Outlet context={contextData} />
    </div>
  );
}

export default App;
