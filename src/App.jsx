import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header.jsx";
import Navbar from "./Navbar.jsx";

import { routesConfig } from "./routes.js";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Navbar />
        <main>
          <Routes>
            {routesConfig.map((item) => (
              <Route
                key={item.id}
                path={item.path}
                element={<item.component />}
              />
            ))}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
