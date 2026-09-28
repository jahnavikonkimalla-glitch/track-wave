import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

function Booking() {
  const navigate = useNavigate();
  const { booking, updateBooking } = useBooking();
  const { train, passenger, gst } = booking;
  const pnrGenerated = useRef(false);

  useEffect(() => {
    if (!train || !passenger) {
      navigate("/search");
      return;
    }
    if (!booking.pnr && !pnrGenerated.current) {
      pnrGenerated.current = true;
      const pnr = String(Math.floor(1000000000 + Math.random() * 9000000000));
      updateBooking({ pnr });
    }
  }, [train, passenger, booking.pnr, navigate, updateBooking]);

  if (!train || !passenger) return null;

  const fare = train.fare;
  const total = fare + gst;

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Booking Summary</h2>
        <table className="table table-bordered">
          <tbody>
            <tr><th>Train Name</th><td>{train.name}</td></tr>
            <tr><th>Train Number</th><td>{train.number}</td></tr>
            <tr><th>Passenger</th><td>{passenger.name}</td></tr>
            <tr><th>Coach</th><td>{passenger.coach}</td></tr>
            <tr><th>Seat Preference</th><td>{passenger.seat}</td></tr>
            <tr><th>PNR Number</th><td>{booking.pnr}</td></tr>
            <tr><th>Ticket Fare</th><td>₹ {fare}</td></tr>
            <tr><th>GST</th><td>₹ {gst}</td></tr>
            <tr><th>Total Amount</th><td><strong>₹ {total}</strong></td></tr>
          </tbody>
        </table>
        <button className="btn btn-success w-100" onClick={() => navigate("/payment")}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default Booking;