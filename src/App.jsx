import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "@/aircall/components/Header/index.jsx";
import Loader from "@/aircall/components/Loader/index.jsx";
import Navbar from "@/aircall/components/Navbar/index.jsx";

import { LoaderProvider } from "@/aircall/providers/LoaderProvider.jsx";

import { routesConfig } from "@/aircall/routes.js";

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
