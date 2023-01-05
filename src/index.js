import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "./homepage.css";
import "./newproject-project.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewProject from "./pages/NewProject";

const Root = ReactDOM.createRoot(document.getElementById("root"));

Root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/new-project" element={<NewProject />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
