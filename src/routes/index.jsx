import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import CreateNote from "../components/CreateNote";
import PreviewNote from "../components/PreviewNote";
import "../index.css";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateNote />} />
      <Route path="/edit/:id" element={<CreateNote />} />
      <Route path="/preview/:id" element={<PreviewNote />} />
    </Routes>
  </Router>
);

export default AppRoutes;
