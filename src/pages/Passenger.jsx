import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

function Passenger() {
  const navigate = useNavigate();
  const { booking, updateBooking } = useBooking();

  const passengerCount = Number(booking.passengerCount) || 1;

  const [passengers, setPassengers] = useState([
    {
      name: "",
      age: "",
      gender: "",
      email: "",
      aadhaar: "",
      coach: booking.train?.coach || "AC",
      seat: "Lower Berth",
    },
  ]);

  // State for accommodation selection and details
  const [includeAccommodation, setIncludeAccommodation] = useState(booking.includeAccommodation || false);
  const [accommodationType, setAccommodationType] = useState(booking.accommodationType || "Standard Room");
  const [error, setError] = useState("");

  const handleChange = (index, e) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][e.target.name] = e.target.value;
    setPassengers(updatedPassengers);
    setError("");
  };

  const handleAddPassenger = () => {
    if (passengers.length < passengerCount) {
      setPassengers([
        ...passengers,
        {
          name: "",
          age: "",
          gender: "",
          email: "",
          aadhaar: "",
          coach: booking.train?.coach || "AC",
          seat: "Lower Berth",
        },
      ]);
    }
  };

  const handleRemovePassenger = (index) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();

    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.name || !p.age || !p.gender || !p.email || !p.aadhaar) {
        setError(`Please fill all details for Passenger ${i + 1}.`);
        return;
      }

      if (p.name.trim().length < 2) {
        setError(`Please enter a valid name for Passenger ${i + 1}.`);
        return;
      }

      const ageNum = Number(p.age);
      if (!Number.isInteger(ageNum) || ageNum <= 0 || ageNum > 120) {
        setError(`Please enter a valid age for Passenger ${i + 1}.`);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(p.email)) {
        setError(`Please enter a valid email address for Passenger ${i + 1}.`);
        return;
      }

      const aadhaarRegex = /^\d{12}$/;
      if (!aadhaarRegex.test(p.aadhaar)) {
        setError(`Aadhaar number for Passenger ${i + 1} must be exactly 12 digits.`);
        return;
      }
    }

    // Save passengers, accommodation choice, and type to context
    updateBooking({ 
      passengers, 
      includeAccommodation, 
      accommodationType: includeAccommodation ? accommodationType : null 
    });
    navigate("/payment");
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "700px" }}>
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Passenger Details</h2>

        <div className="bg-light p-3 rounded mb-3 small">
          <b>Selected Train:</b> {booking.train?.name || "Express Train"} <br />
          <b>Route:</b> {booking.train?.from || "Origin"} ➜ {booking.train?.to || "Destination"} <br />
          <b>Total Passengers:</b> {passengerCount}
        </div>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleProceedToPayment}>
          {passengers.map((passenger, index) => (
            <div key={index} className="border p-3 rounded mb-4 bg-white shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0 text-primary">Passenger {index + 1}</h5>
                {passengers.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleRemovePassenger(index)}
                  >
                    Remove
                  </button>
                )}
              </div>

              <input
                type="text"
                name="name"
                placeholder="Passenger Name"
                className="form-control mb-3"
                value={passenger.name}
                onChange={(e) => handleChange(index, e)}
              />

              <input
                type="number"
                name="age"
                placeholder="Age"
                className="form-control mb-3"
                value={passenger.age}
                onChange={(e) => handleChange(index, e)}
              />

              <select
                name="gender"
                className="form-control mb-3"
                value={passenger.gender}
                onChange={(e) => handleChange(index, e)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="form-control mb-3"
                value={passenger.email}
                onChange={(e) => handleChange(index, e)}
              />

              <input
                type="text"
                name="aadhaar"
                placeholder="Aadhaar Number (12 digits)"
                className="form-control mb-3"
                value={passenger.aadhaar}
                onChange={(e) => handleChange(index, e)}
                maxLength={12}
              />

              <label className="fw-bold">Coach Type</label>
              <select
                name="coach"
                className="form-control mb-3"
                value={passenger.coach}
                onChange={(e) => handleChange(index, e)}
              >
                <option value="AC">AC</option>
                <option value="Sleeper">Sleeper</option>
                <option value="Economy">Economy</option>
              </select>

              <label className="fw-bold">Seat Preference</label>
              <select
                name="seat"
                className="form-control"
                value={passenger.seat}
                onChange={(e) => handleChange(index, e)}
              >
                <option value="Lower Berth">Lower Berth</option>
                <option value="Middle Berth">Middle Berth</option>
                <option value="Upper Berth">Upper Berth</option>
              </select>
            </div>
          ))}

          {/* Add Passengers Details button displays only when passengerCount > 1 */}
          {passengerCount > 1 && passengers.length < passengerCount && (
            <button
              type="button"
              className="btn btn-outline-primary w-100 mb-3 fw-bold"
              onClick={handleAddPassenger}
            >
              + Add Passengers Details ({passengers.length}/{passengerCount})
            </button>
          )}

          {/* Accommodation Toggle Button */}
          <div className="mb-3">
            <button
              type="button"
              className={`btn w-100 py-2 fw-bold ${
                includeAccommodation ? "btn-dark" : "btn-outline-dark"
              }`}
              onClick={() => setIncludeAccommodation(!includeAccommodation)}
            >
              {includeAccommodation ? "✓ Accommodation Selected" : "+ Add Accommodation / Stay"}
            </button>
          </div>

          {/* Conditionally Display Accommodation Options when Toggled */}
          {includeAccommodation && (
            <div className="border border-dark p-3 rounded mb-4 bg-light">
              <h5 className="text-dark mb-3">Hotel & Stay Preferences</h5>
              <label className="fw-bold">Select Room Type</label>
              <select
                className="form-control mb-3"
                value={accommodationType}
                onChange={(e) => setAccommodationType(e.target.value)}
              >
                <option value="Standard Room">Standard Room (₹1,000 / night)</option>
                <option value="Deluxe Room">Deluxe Room (₹2,500 / night)</option>
                <option value="Luxury Suite">Luxury Suite (₹5,000 / night)</option>
              </select>
              <small className="text-muted">
                * Accommodation will be reserved near your destination station: <b>{booking.train?.to || "Destination"}</b>.
              </small>
            </div>
          )}

          <button type="submit" className="btn btn-success w-100 py-2 fw-bold">
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
}

export default Passenger;