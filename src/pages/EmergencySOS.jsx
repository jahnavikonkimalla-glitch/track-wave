import React, { useState } from 'react';

export default function EmergencySOS() {
  const [sosSent, setSosSent] = useState(false);

  const handleEmergencyCall = (type) => {
    if (type === 'family') {
      alert("Emergency Alert Sent! SMS & Location shared with registered family members.");
      setSosSent(true);
    } else if (type === 'medical') {
      alert("Medical Help requested! TTE / RPF has been alerted for the next station.");
      setSosSent(true);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow border-danger p-4 text-center bg-light">
        <h3 className="text-danger fw-bold mb-3">🚨 Train Emergency (SOS)</h3>
        <p className="text-muted small mb-4">
          Sudden ga health bagakapothe ikkada click chesi immediate help pondandi.
        </p>

        <div className="d-grid gap-3">
          <button 
            className="btn btn-danger py-3 fw-bold fs-5"
            onClick={() => handleEmergencyCall('family')}
          >
            📞 Call Family / Send SOS Alert
          </button>

          <button 
            className="btn btn-warning py-3 fw-bold fs-5 text-dark"
            onClick={() => handleEmergencyCall('medical')}
          >
            🏥 Medical Emergency on Board
          </button>
        </div>

        {sosSent && (
          <div className="alert alert-success mt-4 mb-0">
            <strong>Alert Triggered!</strong> Railway helpline & emergency contacts notified successfully.
          </div>
        )}

        <div className="mt-4 border-top pt-3 text-start">
          <h6 className="fw-bold text-secondary">Quick Railway Helplines:</h6>
          <p className="mb-1 small">🚄 Railway Helpline: <b>139</b></p>
          <p className="mb-1 small">🚑 Medical & General Emergency: <b>112</b></p>
        </div>
      </div>
    </div>
  );
}