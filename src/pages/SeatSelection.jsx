import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

export default function SeatSelection() {
  const navigate = useNavigate();
  const { booking, updateBooking } = useBooking();
  
  // Get train and passenger count from booking context (with fallbacks)
  const train = booking.train || { name: "Pinakini Express" };
  const groupSize = Number(booking.passengerCount) || 1;

  // Class/Coach state (defaults to previously selected coach or Sleeper)
  const [selectedClass, setSelectedClass] = useState(booking.coachType || "Sleeper");
  const [selectedSeats, setSelectedSeats] = useState(booking.selectedSeats || []);
  const [error, setError] = useState('');

  // Helper to generate seats based on selected class type
  const getSeatsForClass = (cls) => {
    const clsLower = cls.toLowerCase();
    let prefix = "S";
    if (clsLower.includes("ac")) prefix = "B";
    else if (clsLower.includes("general")) prefix = "GEN";
    else if (clsLower.includes("class a")) prefix = "A";
    else if (clsLower.includes("class b")) prefix = "B";
    else if (clsLower.includes("class c")) prefix = "C";
    else if (clsLower.includes("economy")) prefix = "E";

    return Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      number: `${prefix}1-${i + 1}`,
      type: i % 2 === 0 ? "Lower Berth" : "Upper Berth",
      isBooked: i === 3 || i === 7 // Some seats already booked as example
    }));
  };

  const [seats, setSeats] = useState(() => getSeatsForClass(selectedClass));

  // Handle class/coach dropdown change
  const handleClassChange = (e) => {
    const newClass = e.target.value;
    setSelectedClass(newClass);
    setSeats(getSeatsForClass(newClass));
    setSelectedSeats([]); // Reset seat selections when class changes
    setError('');
  };

  const toggleSeat = (seat) => {
    if (seat.isBooked) return;
    
    if (selectedSeats.includes(seat.number)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat.number));
      setError('');
    } else {
      if (selectedSeats.length >= groupSize) {
        setError(`You can only select ${groupSize} seat(s) based on your passenger count.`);
        return;
      }
      setSelectedSeats([...selectedSeats, seat.number]);
      setError('');
    }
  };

  const handleConfirmSeats = () => {
    if (selectedSeats.length !== groupSize) {
      setError(`Please select exactly ${groupSize} seat(s) before proceeding.`);
      return;
    }

    // Save selected class type, seats, and group size in global context
    updateBooking({ 
      coachType: selectedClass,
      selectedSeats, 
      passengerCount: groupSize 
    });

    navigate('/passenger');
  };

  return (
    <div className="container my-5" style={{ maxWidth: "650px" }}>
      <div className="card shadow border-0 p-4">
        <h3 className="text-center text-primary mb-2">Select Class & Seats</h3>
        <p className="text-muted text-center mb-3">
          Train: <strong>{train.name}</strong> | Required Seats: <strong>{groupSize}</strong>
        </p>

        {/* Coach / Class Type Selection Dropdown */}
        <div className="mb-4">
          <label htmlFor="coachClassSelect" className="form-label fw-bold text-secondary">
            Select Coach / Class Type
          </label>
          <select 
            id="coachClassSelect"
            className="form-select"
            value={selectedClass}
            onChange={handleClassChange}
          >
            <option value="Sleeper">Sleeper</option>
            <option value="General">General</option>
            <option value="AC 3 Tier">AC 3 Tier</option>
            <option value="AC 2 Tier">AC 2 Tier</option>
            <option value="Economy">Economy</option>
            <option value="Class A">Class A</option>
            <option value="Class B">Class B</option>
            <option value="Class C">Class C</option>
          </select>
        </div>

        {/* Legend */}
        <div className="d-flex justify-content-center gap-4 mb-4 small">
          <div><span className="badge bg-outline-primary border text-dark">&nbsp;&nbsp;</span> Available</div>
          <div><span className="badge bg-success">&nbsp;&nbsp;</span> Selected</div>
          <div><span className="badge bg-secondary">&nbsp;&nbsp;</span> Booked</div>
        </div>

        {error && <div className="alert alert-danger py-2 text-center">{error}</div>}

        {/* Seat Grid Layout */}
        <h6 className="text-muted mb-2">Available Seats for {selectedClass}</h6>
        <div className="row g-2 mb-4">
          {seats.map((seat) => {
            const isSelected = selectedSeats.includes(seat.number);
            let btnClass = "btn-outline-primary";
            if (seat.isBooked) btnClass = "btn-secondary opacity-50";
            else if (isSelected) btnClass = "btn-success text-white";

            return (
              <div className="col-3" key={seat.id}>
                <button
                  type="button"
                  className={`btn w-100 py-2 ${btnClass}`}
                  disabled={seat.isBooked}
                  onClick={() => toggleSeat(seat)}
                >
                  <strong>{seat.number}</strong><br />
                  <small style={{ fontSize: "10px" }}>{seat.type}</small>
                </button>
              </div>
            );
          })}
        </div>

        <div className="alert alert-light border text-center mb-3">
          Selected Seats ({selectedClass}): <strong>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</strong>
        </div>

        <button
          className="btn btn-primary w-100 fw-bold py-2"
          onClick={handleConfirmSeats}
        >
          Confirm Seats & Proceed to Passenger Details
        </button>
      </div>
    </div>
  );
}