import logo from '../assets/logo.svg';

const Navbar = () => (
  <nav className="navbar navbar-light bg-light px-3 w-100 d-flex justify-content-between align-items-center navcustom">
    <img src={logo} alt="Company Logo" height="40" />
    <div className="flex-grow-1 text-center">
      <span className="navbar-brand mb-0 h1 fw-bold">Data Viewer</span>
    </div>
    <button type='submit' className="btn btn-outline-primary">Sign In</button>
  </nav>
);

export default Navbar;
