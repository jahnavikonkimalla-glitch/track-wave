import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">🚆 Welcome to Track Wave</h1>
          <h3 className="text-dark">Your Smart Railway Reservation System</h3>
          <p className="lead text-muted">
            Book railway tickets, track trains live, manage bookings, and pay securely.
          </p>

          <Link
            to="/search"
            className="btn btn-warning btn-lg mt-3 fw-bold shadow"
          >
            Start Booking
          </Link>

          {/* Horizontal Moving Train Toy Animation (Homepage Only) */}
          <div className="train-animation-container mt-4 position-relative overflow-hidden" style={{ height: "70px", width: "100%" }}>
            <div className="moving-trains position-absolute d-flex align-items-center">
              <span className="fs-1 me-4">🤖</span>
              <span className="fs-1 me-4">🚂</span>
              <span className="fs-1 me-4">🚃</span>
              <span className="fs-1 me-4">🚃</span>
              <span className="fs-1 me-4">🚃</span>
            </div>
          </div>
        </div>
      </section>

      {/* Scoped CSS for Horizontal Train Movement */}
      <style>{`
        @keyframes horizontalMove {
          0% {
            left: -150px;
          }
          100% {
            left: 100%;
          }
        }
        .moving-trains {
          animation: horizontalMove 8s linear infinite;
          white-space: nowrap;
          top: 0;
        }
      `}</style>

      {/* Features */}
      <div className="container mt-5">
        <div className="row g-4 justify-content-center">
          <div className="col-md-5">
            <div className="card p-4 text-center shadow-sm">
              <h2>🎫</h2>
              <h4>Easy Booking</h4>
              <p>Search trains and reserve seats in minutes.</p>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card p-4 text-center shadow-sm">
              <h2>📍</h2>
              <h4>Live Tracking</h4>
              <p>Track train location and platform updates.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4">Quick Services</h2>

        <div className="row g-3 justify-content-center">
          <div className="col-md-4">
            <Link to="/search" className="btn btn-primary w-100 fw-bold">
              🚆 Book Ticket
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/tracking" className="btn btn-success w-100 fw-bold">
              📍 Live Tracking
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/cancellation" className="btn btn-danger w-100 fw-bold">
              ❌ Cancel Ticket
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;