import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ logout }) {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/seller">Dashboard</NavLink>
        </li>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </ul>
    </nav>
  );
}

export default NavBar;
