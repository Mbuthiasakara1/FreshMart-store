import React from "react";
import Home from "../pages/Home";
import ItemCard from "./ItemCard";
import Hero from "./Hero";
import Login from "./Login";
import Signup from "./Signup";
import Seller from "../pages/Seller";
import App from "./App";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
const routes = [
  
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/hero",
        element: <Hero />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/items/:id",
        element: <ItemCard />,
      },
      {
        path: "/seller",
        element: <Seller />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
    ],
  },
];

export default routes;
