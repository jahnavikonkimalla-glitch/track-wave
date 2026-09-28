import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import html2pdf from "html2pdf.js";

function Payment() {
  const navigate = useNavigate();
  const { booking, updateBooking, addBooking } = useBooking();

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [isPaid, setIsPaid] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  
  // Accommodation Confirmation Modal State
  const [showAccommodationConfirmModal, setShowAccommodationConfirmModal] = useState(false);

  // Emergency SOS Modal State
  const [showSosModal, setShowSosModal] = useState(false);
  const [sosStatus, setSosStatus] = useState("");

  const trainFare = booking.train?.fare || 500;
  const gst = booking.gst || 50;
  const accommodationCost = booking.accommodationTotal || 0;
  const totalFare = trainFare + gst + accommodationCost;

  const handlePayment = async () => {
    setLoadingPayment(true);
    
    const generatedPnr = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const updatedDetails = { paymentMethod, pnr: generatedPnr, totalFare };
    
    updateBooking(updatedDetails);

    const completedBooking = {
      ...booking,
      ...updatedDetails,
      date: booking.date || new Date().toISOString().split("T")[0],
    };

    try {
      const response = await fetch("http://localhost:5000/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(completedBooking),
      });
      const data = await response.json();
      console.log("Saved to MongoDB successfully:", data);
    } catch (error) {
      console.error("Database save error:", error);
    }

    setTimeout(() => {
      setLoadingPayment(false);
      setIsPaid(true);
      setShowAccommodationConfirmModal(true);
      addBooking(completedBooking);
    }, 1200);
  };

  // Auto-download all tickets container as PDF once paid
  useEffect(() => {
    if (isPaid && !showAccommodationConfirmModal) {
      const timer = setTimeout(() => {
        const element = document.getElementById("all-tickets-container");
        const options = {
          margin: 10,
          filename: `TrackWave-All-Tickets-${booking.pnr || "Booking"}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };

        html2pdf().from(element).set(options).save();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isPaid, showAccommodationConfirmModal, booking]);

  const handleEmergencyCall = (type) => {
    if (type === 'family') {
      setSosStatus("🚨 Emergency SMS & Live Location sent to registered family members!");
    } else if (type === 'medical') {
      setSosStatus("🏥 Medical Help requested! TTE and RPF alerted for the next station.");
    }
  };

  if (isPaid) {
    const passengers = booking.passengers && booking.passengers.length > 0 
      ? booking.passengers 
      : [{ name: booking.passenger?.name || "Passenger", age: booking.passenger?.age || "-", gender: booking.passenger?.gender || "-", seat: booking.passenger?.seat || "Seat 1" }];

    return (
      <div className="container mt-5 mb-5 position-relative" style={{ maxWidth: "700px" }}>
        
        {showAccommodationConfirmModal && (
          <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-4 text-center shadow-lg border-primary border-2 bg-white">
                <h4 className="text-primary fw-bold mb-2">🏨 Need Accommodation or Food?</h4>
                <p className="text-muted small mb-4">
                  Payment Successful! Destination daggara stay kosam rooms ledha food select chesukuntara?
                </p>

                <div className="d-flex justify-content-center gap-3">
                  <button 
                    className="btn btn-secondary px-4 py-2 fw-bold"
                    onClick={() => setShowAccommodationConfirmModal(false)}
                  >
                    Cancel
                  </button>

                  <button 
                    className="btn btn-success px-4 py-2 fw-bold"
                    onClick={() => navigate("/accommodation")}
                  >
                    OK (Yes, Go)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Container wrapping individual tickets for PDF export */}
        <div id="all-tickets-container">
          <div className="text-center mb-3">
            <span className="badge bg-success fs-6 mb-1">🎉 Payment Successful!</span>
            <h3 className="fw-bold text-dark">Official Passenger E-Tickets</h3>
            <p className="text-muted small">Showing separate tickets for each passenger.</p>
          </div>

          {passengers.map((p, index) => (
            <div 
              key={index} 
              className="card shadow-lg p-4 mx-auto border-success bg-white mb-4"
            >
              <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                <h5 className="fw-bold text-primary mb-0">Ticket #{index + 1}</h5>
                <span className="badge bg-secondary">PNR: {booking.pnr}</span>
              </div>

              <div className="border rounded p-3 bg-light mb-2">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Passenger Name:</span>
                  <span className="fw-bold text-dark">{p.name || "N/A"}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Age / Gender:</span>
                  <span>{p.age || "-"} yrs / {p.gender || "-"}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">ID Verification:</span>
                  <span className="text-success">[Aadhaar Redacted]</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Train Name:</span>
                  <span className="fw-bold">
                    {booking.train?.name || "Express Train"} ({booking.train?.number || "12711"})
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Route:</span>
                  <span>{booking.train?.from || booking.from || "Origin"} ➜ {booking.train?.to || booking.to || "Destination"}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Coach & Seat:</span>
                  <span className="fw-bold text-secondary">
                    {booking.coachType || booking.train?.coach || "Sleeper"} - <span className="text-primary">{p.seat || `Seat ${index + 1}`}</span>
                  </span>
                </div>

                {booking.selectedFood && booking.selectedFood !== "None" && (
                  <div className="d-flex justify-content-between mb-2 text-primary">
                    <span className="small">Food Item:</span>
                    <span className="small fw-bold">{booking.selectedFood}</span>
                  </div>
                )}
                
                <div className="d-flex justify-content-between border-top pt-2 mb-1">
                  <span className="text-muted small">Payment Method:</span>
                  <span className="badge bg-secondary">{booking.paymentMethod || paymentMethod}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted small">Fare Share:</span>
                  <span className="fw-bold text-success">₹{Math.round(totalFare / passengers.length)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="card shadow p-4 bg-white">
          <div className="d-flex flex-column gap-2">
            <button 
              className="btn btn-danger py-2 fw-bold"
              onClick={() => { setShowSosModal(true); setSosStatus(""); }}
            >
              🚨 Emergency SOS & Health Help
            </button>
            <button 
              className="btn btn-outline-dark py-2 fw-bold"
              onClick={() => {
                const element = document.getElementById("all-tickets-container");
                html2pdf().from(element).save(`TrackWave-All-Tickets-${booking.pnr}.pdf`);
              }}
            >
              📥 Download All Tickets PDF
            </button>
            <button 
              className="btn btn-primary py-2 fw-bold"
              onClick={() => navigate("/bookings")}
            >
              🎫 View My Bookings
            </button>
          </div>
        </div>

        {showSosModal && (
          <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-4 text-center shadow-lg border-danger border-2 bg-white">
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

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Payment</h2>

        <div className="bg-light p-3 rounded mb-3">
          <h6 className="fw-bold mb-1">{booking.train?.name || "Selected Train"}</h6>
          <p className="small text-muted mb-0">
            Fare: ₹{trainFare} + GST: ₹{gst}
            {accommodationCost > 0 && ` + Add-ons/Food: ₹${accommodationCost}`}
          </p>
          <p className="small fw-bold text-success mb-0">
            Total Amount to Pay: ₹{totalFare}
          </p>
        </div>

        <h5 className="mb-3">Select Payment Method</h5>

        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            checked={paymentMethod === "UPI"}
            onChange={() => setPaymentMethod("UPI")}
          />
          <label className="form-check-label">UPI ID / QR</label>
        </div>

        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            checked={paymentMethod === "PhonePe"}
            onChange={() => setPhonePe}
          />
          <label className="form-check-label">PhonePe</label>
        </div>

        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            checked={paymentMethod === "Google Pay"}
            onChange={() => setPaymentMethod("Google Pay")}
          />
          <label className="form-check-label">Google Pay</label>
        </div>

        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            checked={paymentMethod === "Paytm"}
            onChange={() => setPaymentMethod("Paytm")}
          />
          <label className="form-check-label">Paytm</label>
        </div>

        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            checked={paymentMethod === "Card"}
            onChange={() => setPaymentMethod("Card")}
          />
          <label className="form-check-label">Debit / Credit Card</label>
        </div>

        <button
          className="btn btn-success w-100 py-2 fw-bold"
          onClick={handlePayment}
          disabled={loadingPayment}
        >
          {loadingPayment ? "Processing Payment..." : `Pay ₹${totalFare} Now`}
        </button>
      </div>
    </div>
  );
}

export default Payment;