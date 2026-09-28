import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext"; // Context import chesam

function Accommodation() {
  const navigate = useNavigate();
  const { updateBooking } = useBooking();
  
  const [selectedFood, setSelectedFood] = useState("");
  const [selectedExtras, setSelectedExtras] = useState({
    bedsheet: false,
    pillow: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedExtras((prev) => ({ ...prev, [name]: checked }));
  };

  const handleConfirmBooking = () => {
    // 1. Food price calculation
    let foodPrice = 0;
    if (selectedFood.includes("150")) foodPrice = 150;
    else if (selectedFood.includes("200")) foodPrice = 200;
    else if (selectedFood.includes("90")) foodPrice = 90;
    else if (selectedFood.includes("220")) foodPrice = 220;

    // 2. Add-ons price calculation
    let extrasPrice = 0;
    if (selectedExtras.bedsheet) extrasPrice += 50;
    if (selectedExtras.pillow) extrasPrice += 30;

    const accommodationTotal = foodPrice + extrasPrice;

    // Context lo values save chestunnam
    updateBooking({
      selectedFood: selectedFood || "None",
      selectedExtras,
      accommodationTotal,
    });

    navigate("/payment");
  };

  return (
    <div className="container mt-4 mb-5" style={{ maxWidth: "650px" }}>
      <div className="card shadow p-4 bg-white">
        <h2 className="text-center text-primary mb-2">🍽️ Food & Comfort Add-ons</h2>
        <p className="text-muted small text-center mb-4">
          Travel lo kavalsina food mariyu comfort items select chesukondi.
        </p>

        {/* 1. Food Items List */}
        <h5 className="fw-bold mb-3 text-secondary">1. Select Meal / Food Item</h5>
        <div className="mb-4">
          <select 
            className="form-select"
            value={selectedFood}
            onChange={(e) => setSelectedFood(e.target.value)}
          >
            <option value="">-- Choose Food Option (Optional) --</option>
            <option value="South Indian Veg Thali (₹150)">South Indian Veg Thali - ₹150</option>
            <option value="North Indian Deluxe Meal (₹200)">North Indian Deluxe Meal - ₹200</option>
            <option value="Light Breakfast & Tea (₹90)">Light Breakfast & Tea - ₹90</option>
            <option value="Biryani Combo (₹220)">Biryani Combo - ₹220</option>
          </select>
        </div>

        {/* 2. Bedsheet and Pillow Extras */}
        <h5 className="fw-bold mb-3 text-secondary">2. Comfort Add-ons</h5>
        <div className="border p-3 rounded bg-light mb-4">
          <div className="form-check mb-2">
            <input 
              className="form-check-input" 
              type="checkbox" 
              name="bedsheet" 
              id="bedsheetCheck"
              checked={selectedExtras.bedsheet}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label fw-bold" htmlFor="bedsheetCheck">
              Clean Sanitized Bedsheet (+₹50)
            </label>
          </div>

          <div className="form-check">
            <input 
              className="form-check-input" 
              type="checkbox" 
              name="pillow" 
              id="pillowCheck"
              checked={selectedExtras.pillow}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label fw-bold" htmlFor="pillowCheck">
              Extra Comfortable Pillow (+₹30)
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-2">
          <button 
            className="btn btn-secondary w-50 py-2 fw-bold"
            onClick={() => navigate(-1)}
          >
            Back to Ticket
          </button>
          
          <button 
            className="btn btn-primary w-50 py-2 fw-bold"
            onClick={handleConfirmBooking}
          >
            Confirm & Proceed
          </button>
        </div>

      </div>
    </div>
  );
}

export default Accommodation;