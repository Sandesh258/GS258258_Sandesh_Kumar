import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div
      className="d-flex flex-column p-3 bg-dark text-white"
      style={{
        width: "250px",
        minHeight: "100vh", // Ensures sidebar reaches full height
        overflowY: "auto", // Enables scrolling when content overflows
        position: "sticky",
        top: "0",
      }}
    >
      <h4 className="mb-4">Menu</h4>
      <nav className="nav flex-column">
        <Link to="/stores" className={`nav-link text-white ${location.pathname === "/stores" ? "fw-bold" : ""}`}>Stores</Link>
        <Link to="/skus" className={`nav-link text-white ${location.pathname === "/skus" ? "fw-bold" : ""}`}>SKUs</Link>
        <Link to="/planning" className={`nav-link text-white ${location.pathname === "/planning" ? "fw-bold" : ""}`}>Planning</Link>
        <Link to="/chart" className={`nav-link text-white ${location.pathname === "/chart" ? "fw-bold" : ""}`}>Chart</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
