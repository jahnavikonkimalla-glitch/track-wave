import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

function AdminDashboard() {
  const { user } = useBooking();
  const navigate = useNavigate();
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If user is not logged in or is not an admin, redirect them away
    if (!user || !user.isAdmin) {
      navigate("/");
      return;
    }

    // Fetch all bookings for the admin view from MongoDB
    fetch("http://localhost:5000/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        setAllBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, [user, navigate]);

  if (!user || !user.isAdmin) return null;

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-primary fw-bold">🛡️ TrackWave Admin Dashboard</h2>
        <p className="text-muted">Welcome back, {user.name} (Admin Mode Active)</p>
        
        <hr />

        <h4 className="mt-3">All User Bookings ({allBookings.length})</h4>
        {loading ? (
          <p>Loading bookings...</p>
        ) : allBookings.length === 0 ? (
          <p>No bookings found in the database yet.</p>
        ) : (
          <div className="table-responsive mt-3">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Booking ID</th>
                  <th>Train Name</th>
                  <th>Passenger Name</th>
                  <th>Coach / Seat</th>
                  <th>Fare</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map((b, index) => (
                  <tr key={index}>
                    <td>{b.id}</td>
                    <td>{b.trainName} ({b.trainNumber})</td>
                    <td>{b.passenger?.name}</td>
                    <td>{b.passenger?.coach} - {b.passenger?.seat}</td>
                    <td>₹{b.totalFare}</td>
                    <td>{b.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;