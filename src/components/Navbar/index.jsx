import React from "react";
import { NavLink } from "react-router-dom";
import { routesConfig } from "@/aircall/routes";
import './style.css'

const Navbar = () => {
  return (
    <nav>
      <ul className="navbar flex">
        {routesConfig.map(
          (route) =>
            route.isNavLink && (
              <li key={route.id}>
                <NavLink to={route.path}>{route.name}</NavLink>
              </li>
            )
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
