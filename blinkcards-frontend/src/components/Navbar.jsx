import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <Link to="/"> Blinkcards</Link>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Link to="/" className="link">Home</Link>
        </div>
      </div>
    </nav>
  );
}
