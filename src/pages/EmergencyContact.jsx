import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmergencyContact() {
  const navigate = useNavigate();
  
  // Form fields kosam state
  const [contactName, setContactName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [relation, setRelation] = useState("Family");
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Data validation
    if (!contactName || !phoneNumber) {
      alert("Daya chesi Name mariyu Phone Number enter cheyandi.");
      return;
    }

    const newContact = {
      name: contactName,
      phone: phoneNumber,
      relation: relation,
    };

    // LocalStorage lo save cheyadam (leka backend/context ki pampovachu)
    const existingContacts = JSON.parse(localStorage.getItem("emergencyContacts")) || [];
    localStorage.setItem("emergencyContacts", JSON.stringify([...existingContacts, newContact]));

    setSuccessMessage(true);

    // 2 seconds taruvatha payment leka home page ki redirect cheyadam
    setTimeout(() => {
      navigate(-1); // Venkatiki velthundi (Previous page)
    }, 1500);
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4 bg-white">
        <h3 className="text-center text-danger fw-bold mb-3">🚨 Add Emergency Contact</h3>
        <p className="text-muted small text-center mb-4">
          Apatkaala samayamlo (Emergency) mimmalni samparkinchadaniki mi kutumba sabhyula details ikkada save cheyandi.
        </p>

        {successMessage && (
          <div className="alert alert-success text-center fw-bold">
            ✅ Emergency Contact successfully saved!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Contact Name */}
          <div className="mb-3">
            <label className="form-label fw-bold">Contact Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Ramesh (Father)"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-3">
            <label className="form-label fw-bold">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="10-digit mobile number"
              pattern="[0-9]{10}"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          {/* Relation */}
          <div className="mb-4">
            <label className="form-label fw-bold">Relation</label>
            <select
              className="form-select"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
            >
              <option value="Family">Family Member / Parent</option>
              <option value="Spouse">Spouse / Partner</option>
              <option value="Friend">Friend</option>
              <option value="Guardian">Guardian</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-danger w-100 py-2 fw-bold">
            Save Emergency Contact
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmergencyContact;