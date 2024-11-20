import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/index.jsx";
import Loader from "./components/loader/index.jsx";
import Navbar from "./components/navbar/index.jsx";

import { LoaderProvider } from "./providers/loader.jsx";

import { routesConfig } from "./routes.js";

const App = () => {
  return (
    <LoaderProvider>
      <BrowserRouter>
        <div className="container flex flex-column">
          <Header />
          <Navbar />
          <main className="p-4 mx-2 mb-2">
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
          <Loader />
        </div>
      </BrowserRouter>
    </LoaderProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
