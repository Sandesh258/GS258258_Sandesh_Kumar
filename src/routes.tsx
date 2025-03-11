import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Stores from './pages/StorePage';
import SKUs from './pages/SKUs';
import Planning from './pages/Planning';
import Chart from './pages/Chart';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const AppRoutes = () => (
  <Router>
    <Navbar />
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid p-4">
        <Routes>
          <Route path="/stores" element={<Stores />} />
          <Route path="/skus" element={<SKUs />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/chart" element={<Chart />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default AppRoutes;
