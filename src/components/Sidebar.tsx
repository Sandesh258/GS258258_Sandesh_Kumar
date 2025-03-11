import { Link, useLocation } from "react-router-dom";
import { FaStore, FaBoxes, FaCogs, FaChartBar } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="d-flex flex-column p-3 bg-dark text-white sidebar">
      <h4 className="mb-4">Menu</h4>
      <nav className="nav flex-column">
        <Link to="/stores" className={`nav-link text-white ${location.pathname === "/stores" ? "fw-bold" : ""}`}>
          <FaStore className="me-2" /> Stores
        </Link>
        <Link to="/skus" className={`nav-link text-white ${location.pathname === "/skus" ? "fw-bold" : ""}`}>
          <FaBoxes className="me-2" /> SKUs
        </Link>
        <Link to="/planning" className={`nav-link text-white ${location.pathname === "/planning" ? "fw-bold" : ""}`}>
          <FaCogs className="me-1.8" /> Planning
        </Link>
        <Link to="/chart" className={`nav-link text-white ${location.pathname === "/chart" ? "fw-bold" : ""}`}>
          <FaChartBar className="me-2" /> Chart
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
