import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="notfound">
    <h2>404 - Page Not Found</h2>
    <p>Oops! The page you’re looking for doesn’t exist.</p>
    <Link to="/products">Go back to Product List</Link>
  </div>
);

export default NotFound;
