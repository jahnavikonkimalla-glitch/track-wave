import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { generateTicketPDF } from "../utils/generateTicketPDF";

function MyBookings() {
  const navigate = useNavigate();
  const { bookings, removeBooking } = useBooking();

  const handleCancel = (pnr) => {
    const confirmCancel = window.confirm("Cancel this booking? This cannot be undone.");
    if (confirmCancel) {
      removeBooking(pnr);
    }
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "800px" }}>
      <h2 className="mb-4 fw-bold text-center">My Bookings History</h2>

      {bookings.length === 0 ? (
        <div className="text-center card shadow-sm p-5 bg-light">
          <p className="text-muted mb-3">You haven't booked any tickets yet.</p>
          <button 
            className="btn btn-primary mx-auto" 
            onClick={() => navigate("/")}
          >
            🔍 Search Trains
          </button>
        </div>
      ) : (
        bookings.map((b) => {
          const totalFare = (b.train?.fare || 500) + (b.gst || 50);
          return (
            <div 
              className="card shadow-sm mb-4 border-start border-4 border-success p-4 bg-white" 
              key={b.pnr}
            >
              <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                <div>
                  <h5 className="fw-bold mb-1">
                    {b.train?.name || "Express Train"} ({b.train?.number || "12711"})
                  </h5>
                  <span className="text-muted small">
                    Route: {b.train?.from || b.from || "Origin"} ➜ {b.train?.to || b.to || "Destination"}
                  </span>
                </div>
                <span className="badge bg-success fs-6">Confirmed</span>
              </div>

              <div className="row mb-3">
                <div className="col-md-6 mb-2 mb-md-0">
                  <p className="mb-1 text-muted small">PNR Number:</p>
                  <h6 className="fw-bold text-primary">{b.pnr}</h6>
                </div>
                <div className="col-md-6">
                  <p className="mb-1 text-muted small">Booking Date:</p>
                  <h6 className="fw-semibold">{b.date || "N/A"}</h6>
                </div>
              </div>

              <div className="border rounded p-3 bg-light mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted small">Passenger Name:</span>
                  <span className="fw-bold">
                    {b.passenger?.name || b.passenger || b.name || b.passengerName || "N/A"}
                    {b.passenger?.age ? ` (${b.passenger.age}, ${b.passenger.gender || ""})` : ""}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted small">Coach & Seat:</span>
                  <span>{b.passenger?.coach || "Sleeper"} - {b.passenger?.seat || "Lower Berth"}</span>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted small">Payment Method:</span>
                  <span className="badge bg-secondary">{b.paymentMethod || "UPI"}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted small">Total Fare Paid:</span>
                  <span className="fw-bold text-success">₹{totalFare}</span>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2 justify-content-end">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigate(`/tracking?number=${b.train?.number || "12711"}`)}
                >
                  🚆 Track Live
                </button>

                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => generateTicketPDF(b)}
                >
                  📥 Download Ticket PDF
                </button>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleCancel(b.pnr)}
                >
                  ❌ Cancel Booking
                </button>
              </div>
            </div>
          );
        })
      )}

      <div className="text-center mt-4">
        <button className="btn btn-secondary px-4" onClick={() => navigate("/")}>
          🏠 Back to Home
        </button>
      </div>
    </div>
  );
}

export default MyBookings;