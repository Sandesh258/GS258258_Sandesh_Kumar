import logo from '../assets/Logo.svg';

const Navbar = () => (
  <nav className="navbar navbar-light bg-light px-3 w-100 d-flex justify-content-between" style={{ width: "100vw" }}>
    <img src={logo} alt="Company Logo" height="40" />
    <button className="btn btn-outline-primary">Sign In</button>
  </nav>
);

export default Navbar;
