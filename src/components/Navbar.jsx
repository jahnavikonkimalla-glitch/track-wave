import { Link, useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

function Navbar() {

  const navigate = useNavigate();
  const { user, logout } = useBooking();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">

      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          🚆 Track Wave
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>

            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/mybookings">
                  My Bookings
                </Link>
              </li>
            )}

            {/* 👉 Admin Panel Link (Visible only if user.isAdmin is true) */}
            {user && user.isAdmin && (
              <li className="nav-item">
                <Link className="nav-link text-warning fw-bold" to="/admin-dashboard">
                  🛡️ Admin Panel
                </Link>
              </li>
            )}

            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    Hi, {user.name}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm mt-1"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;