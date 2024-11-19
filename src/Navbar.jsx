import React from "react";
import { NavLink } from "react-router-dom";
import { routesConfig } from "./routes";

const Navbar = () => {
  return (
    <nav>
      <ul>
        {routesConfig.map(
          (route) =>
            route.isNavLink && (
              <li>
                <NavLink to={route.path}>{route.name}</NavLink>
              </li>
            )
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
