import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Stores from "./pages/StorePage";
import SKUs from "./pages/SKUs";
import Planning from "./pages/Planning";
import Chart from "./pages/Chart";
import "bootstrap/dist/css/bootstrap.min.css";
import MainLayout from "./components/MainLayout";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="stores" element={<Stores />} />
          <Route path="skus" element={<SKUs />} />
          <Route path="planning" element={<Planning />} />
          <Route path="chart" element={<Chart />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
