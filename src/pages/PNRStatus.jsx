import React, { useState } from 'react';

export default function PNRStatus() {
  const [pnr, setPnr] = useState('');
  const [statusData, setStatusData] = useState(null);

  const checkStatus = (e) => {
    e.preventDefault();
    if (pnr.length === 10) {
      setStatusData({
        pnr: pnr,
        train: "Pinakini Express (12711)",
        passenger: "John Doe",
        status: "Confirmed (CNF) / S2 - 45",
        chart: "Chart Prepared"
      });
    } else {
      alert("Please enter a valid 10-digit PNR number.");
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow border-0 p-4">
        <h3 className="text-primary text-center mb-3">Check PNR Status</h3>
        <form onSubmit={checkStatus}>
          <div className="mb-3">
            <label className="form-label">10-Digit PNR Number</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. 1234567890" 
              maxLength="10"
              value={pnr}
              onChange={(e) => setPnr(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">Get Status</button>
        </form>

        {statusData && (
          <div className="mt-4 alert alert-success">
            <h5>PNR Details:</h5>
            <p className="mb-1"><strong>PNR:</strong> {statusData.pnr}</p>
            <p className="mb-1"><strong>Train:</strong> {statusData.train}</p>
            <p className="mb-1"><strong>Passenger:</strong> {statusData.passenger}</p>
            <p className="mb-1"><strong>Status:</strong> <span className="badge bg-success">{statusData.status}</span></p>
            <p className="mb-0"><strong>Chart Status:</strong> {statusData.chart}</p>
          </div>
        )}
      </div>
    </div>
  );
}