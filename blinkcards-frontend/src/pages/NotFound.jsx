import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="panel">
      <h1 className="h1">404 – Not Found</h1>
      <p className="meta">The page you’re looking for doesn’t exist.</p>
      <div className="actions" style={{ marginTop: 10 }}>
        <Link to="/" className="btn">Go Home</Link>
      </div>
    </div>
  );
}
