import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

function Search() {
  const navigate = useNavigate();
  const { updateBooking } = useBooking();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const searchTrain = (e) => {
    e.preventDefault();

    if (!from || !to || !date) {
      setError("Please fill all fields.");
      return;
    }

    if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
      setError("Source and destination cannot be the same.");
      return;
    }

    // Update booking context with lowercase or trimmed matching values
    updateBooking({ 
      from: from.trim(), 
      to: to.trim(), 
      date 
    });
    
    navigate("/trainlist");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow p-4 border-0">
        <h2 className="text-center mb-4 text-primary fw-bold">
          Search Train
        </h2>

        {error && (
          <div className="alert alert-danger py-2">
            {error}
          </div>
        )}

        <form onSubmit={searchTrain}>
          <div className="mb-3">
            <label className="form-label fw-semibold">From</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter source station (e.g. Chittoor)"
              value={from}
              onChange={(e) => { setFrom(e.target.value); setError(""); }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">To</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter destination station (e.g. Tirupati)"
              value={to}
              onChange={(e) => { setTo(e.target.value); setError(""); }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Date of Journey</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => { setDate(e.target.value); setError(""); }}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold py-2"
          >
            Search Trains
          </button>
        </form>
      </div>
    </div>
  );
}

export default Search;