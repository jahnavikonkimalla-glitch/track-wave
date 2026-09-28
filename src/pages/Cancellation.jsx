import { useState } from "react";
import { Link } from "react-router-dom";

function Cancellation() {

  const [pnr, setPnr] = useState("");
  const [reason, setReason] = useState("");
  const [cancelled, setCancelled] = useState(false);

  const refund = Math.floor(Math.random() * 500) + 500;
  const cancelTicket = () => {

    if (pnr === "" || reason === "") {
      alert("Please enter all details");
      return;
    }

    setCancelled(true);
  };

  return (

    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          ❌ Ticket Cancellation
        </h2>

        {!cancelled ? (

          <>

            <label className="fw-bold">
              Enter PNR Number
            </label>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="PNR Number"
              value={pnr}
              onChange={(e)=>setPnr(e.target.value)}
            />

            <label className="fw-bold">
              Cancellation Reason
            </label>

            <select
              className="form-control mb-4"
              value={reason}
              onChange={(e)=>setReason(e.target.value)}
            >

              <option value="">Select Reason</option>

              <option>Personal Reason</option>

              <option>Medical Emergency</option>

              <option>Travel Plan Changed</option>

              <option>Other</option>

            </select>

            <button
              className="btn btn-danger w-100"
              onClick={cancelTicket}
            >
              Cancel Ticket
            </button>

          </>

        ) : (

          <div className="text-center">

            <h2 className="text-success">
              ✅ Ticket Cancelled Successfully
            </h2>

            <hr />

            <h4>Refund Amount</h4>

            <h2 className="text-primary">
              ₹ {refund}
            </h2>

            <p>
              Refund will be credited within 3-5 working days.
            </p>

            <Link
              to="/"
              className="btn btn-primary"
            >
              Back to Home
            </Link>

          </div>

        )}

      </div>

    </div>

  );

}

export default Cancellation;