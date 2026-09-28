import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBooking } from "../context/BookingContext";
import { generateTicketPDF } from "../utils/generateTicketPDF";

function Confirmation() {
  const navigate = useNavigate();
  const { booking, resetBooking } = useBooking();
  const [showAccommodationModal, setShowAccommodationModal] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);
  const [sosStatus, setSosStatus] = useState("");
  
  // Extract details from backend response or context state safely
  const confirmed = booking.confirmedBooking || {};
  const train = confirmed.train || booking.train || {};
  const passenger = confirmed.passenger || booking.passenger || {};
  const pnr = booking.pnr || confirmed.id;

  useEffect(() => {
    if (!train.name || !passenger.name || !pnr) {
      // If essential booking state is missing, redirect back to home or search
      navigate("/");
    } else {
      // Automatically triggers PDF download on page load
      generateTicketPDF(booking);
      // Automatically show the accommodation modal popup on load
      setShowAccommodationModal(true);
    }
  }, [train, passenger, pnr, navigate, booking]);

  if (!train.name || !passenger.name || !pnr) {
    return null;
  }

  const handleDownload = () => {
    generateTicketPDF(booking);
  };

  const handleYesAccommodation = () => {
    setShowAccommodationModal(false);
    navigate("/accommodation", { state: booking });
  };

  const handleNoAccommodation = () => {
    setShowAccommodationModal(false);
    resetBooking();
    navigate("/");
  };

  const handleBackHome = () => {
    resetBooking();
    navigate("/");
  };

  const handleEmergencyCall = (type) => {
    if (type === 'family') {
      setSosStatus("🚨 Emergency SMS & Live Location sent to registered family members!");
    } else if (type === 'medical') {
      setSosStatus("🏥 Medical Help requested! TTE and RPF alerted for the next station.");
    }
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow p-5 text-center">
        <h1 className="text-success mb-2">🎉 Booking Successful</h1>
        <p className="text-muted">Your railway ticket for the NTR District route has been successfully reserved.</p>

        <hr />

        <h4 className="text-secondary mb-1">PNR Number / Booking ID</h4>
        <h2 className="text-primary mb-4">{pnr}</h2>

        <div className="card bg-light p-3 text-start mb-4 border">
          <p className="mb-2"><b>Train:</b> {train.name} ({train.number})</p>
          <p className="mb-2"><b>Route:</b> {train.from} ➜ {train.to}</p>
          <hr className="my-2" />
          <p className="mb-2"><b>Passenger Name:</b> {passenger.name}</p>
          <p className="mb-2"><b>Age / Gender:</b> {passenger.age} yrs, {passenger.gender}</p>
          <p className="mb-2"><b>Email:</b> {passenger.email}</p>
          <p className="mb-2"><b>Identification:</b> [Aadhaar Redacted]</p>
          <p className="mb-2"><b>Coach / Seat:</b> {passenger.coach} / {passenger.seat}</p>
          <p className="mb-0 text-muted small mt-2">
            <b>Booked on:</b> {confirmed.bookingDate ? new Date(confirmed.bookingDate).toLocaleString() : new Date().toLocaleString()}
          </p>
        </div>

        <div className="d-flex flex-column gap-2 mx-auto" style={{ width: "100%" }}>
          <button className="btn btn-success py-2 fw-bold" onClick={() => setShowAccommodationModal(true)}>
            🏨 Select Accommodation & Food
          </button>

          <button className="btn btn-danger py-2 fw-bold" onClick={() => { setShowSosModal(true); setSosStatus(""); }}>
            🚨 Emergency SOS & Health Help
          </button>

          <button className="btn btn-warning py-2 fw-bold" onClick={handleDownload}>
            ⬇ Download Ticket Again (PDF)
          </button>

          <button className="btn btn-primary py-2 fw-bold" onClick={handleBackHome}>
            Back to Home
          </button>
        </div>
      </div>

      {/* Accommodation Toast / Modal Popup */}
      {showAccommodationModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4 text-center shadow-lg border-0">
              <h3 className="text-primary mb-3">🏨 Need Accommodation?</h3>
              <p className="text-muted mb-4">
                Would you like to book a retiring room or hotel at your destination station?
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button type="button" className="btn btn-outline-secondary px-4 py-2 fw-bold" onClick={handleNoAccommodation}>
                  No, Go Home
                </button>
                <button type="button" className="btn btn-success px-4 py-2 fw-bold" onClick={handleYesAccommodation}>
                  Yes, Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency SOS Modal Popup */}
      {showSosModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4 text-center shadow-lg border-danger border-2">
              <h3 className="text-danger fw-bold mb-2">🚨 Train Emergency (SOS)</h3>
              <p className="text-muted small mb-4">
                Sudden ga health bagakapothe ikkada click chesi immediate help pondandi.
              </p>

              <div className="d-grid gap-3 mb-3">
                <button 
                  className="btn btn-danger py-2 fw-bold"
                  onClick={() => handleEmergencyCall('family')}
                >
                  📞 Alert Family Members (SMS)
                </button>

                <button 
                  className="btn btn-warning py-2 fw-bold text-dark"
                  onClick={() => handleEmergencyCall('medical')}
                >
                  🏥 Medical Emergency on Board
                </button>
              </div>

              {sosStatus && (
                <div className="alert alert-info py-2 small fw-bold mb-3">
                  {sosStatus}
                </div>
              )}

              <div className="border-top pt-2 text-start small mb-3 text-muted">
                <p className="mb-1">🚄 Railway Helpline: <b>139</b></p>
                <p className="mb-0">🚑 General Emergency: <b>112</b></p>
              </div>

              <button 
                type="button" 
                className="btn btn-secondary btn-sm w-100 py-1" 
                onClick={() => setShowSosModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Confirmation;