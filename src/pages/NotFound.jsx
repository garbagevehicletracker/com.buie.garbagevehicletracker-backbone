import { Link } from "react-router-dom";
import "../styles/NotFound.css"; // Make sure to create a corresponding CSS file

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      {/* <img src="/6325254.jpg" alt="Page Not Found" className="not-found-image" /> */}
      <img src="/404.png" alt="Page Not Found" className="not-found-image" />
      <Link to="/" className="home-link">
        <button className="home-button">Go Back to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
