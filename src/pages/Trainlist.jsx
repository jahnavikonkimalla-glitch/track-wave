import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

export default function TrainList() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const { booking, updateBooking } = useBooking();

  // Initialize search query: If user came from Search module with 'from' or 'to', use it. Otherwise, empty.
  const initialQuery = booking.from || booking.to || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  
  const [groupSizeFilter, setGroupSizeFilter] = useState(booking.passengerCount || 1);

  useEffect(() => {
    // 30 AP-Only Trains spanning 20 Routes (including Chittoor to Tirupati)
    setTrains([
      // --- Route 1: Vijayawada to Visakhapatnam ---
      { id: 1, name: "Ratnachal Express", number: "12717", source: "Vijayawada", destination: "Visakhapatnam", departureTime: "05:55 AM", arrivalTime: "11:30 AM", coach: "Chair Car", fare: 310, seatsAvailable: 45, demand: "Normal", platform: "1", isAlternative: false },
      { id: 2, name: "Godavari Special (Alternative)", number: "07271", source: "Vijayawada", destination: "Visakhapatnam", departureTime: "07:15 AM", arrivalTime: "01:00 PM", coach: "Sleeper", fare: 280, seatsAvailable: 25, demand: "Alternative Route Option", platform: "3", isAlternative: true },

      // --- Route 2: Visakhapatnam to Tirupati ---
      { id: 3, name: "Tirumala Express", number: "17488", source: "Visakhapatnam", destination: "Tirupati", departureTime: "02:00 PM", arrivalTime: "04:30 AM", coach: "Sleeper", fare: 420, seatsAvailable: 12, demand: "Moderate Demand", platform: "2", isAlternative: false },
      { id: 4, name: "AP Special Express (Alternative)", number: "07489", source: "Visakhapatnam", destination: "Tirupati", departureTime: "04:30 PM", arrivalTime: "06:15 AM", coach: "Sleeper", fare: 400, seatsAvailable: 18, demand: "Alternative Route Option", platform: "4", isAlternative: true },

      // --- Route 3: Guntur to Tirupati ---
      { id: 5, name: "Krishna Express", number: "17406", source: "Guntur", destination: "Tirupati", departureTime: "05:00 AM", arrivalTime: "12:30 PM", coach: "Sleeper", fare: 340, seatsAvailable: 22, demand: "Normal", platform: "1", isAlternative: false },
      { id: 6, name: "Guntur-Tirupati Intercity (Alt)", number: "17205", source: "Guntur", destination: "Tirupati", departureTime: "01:30 PM", arrivalTime: "09:00 PM", coach: "Chair Car", fare: 310, seatsAvailable: 30, demand: "Alternative Route Option", platform: "2", isAlternative: true },

      // --- Route 4: Kakinada to Tirupati ---
      { id: 7, name: "Kakinada - Tirupati Express", number: "17250", source: "Kakinada Port", destination: "Tirupati", departureTime: "03:10 PM", arrivalTime: "05:20 AM", coach: "Sleeper", fare: 390, seatsAvailable: 15, demand: "Moderate Demand", platform: "3", isAlternative: false },
      { id: 8, name: "Kakinada Special (Alternative)", number: "07251", source: "Kakinada Port", destination: "Tirupati", departureTime: "06:00 PM", arrivalTime: "07:30 AM", coach: "Sleeper", fare: 360, seatsAvailable: 24, demand: "Alternative Route Option", platform: "1", isAlternative: true },

      // --- Route 5: Vijayawada to Tirupati ---
      { id: 9, name: "Vijayawada - Tirupati Express", number: "12732", source: "Vijayawada", destination: "Tirupati", departureTime: "10:30 PM", arrivalTime: "05:00 AM", coach: "Sleeper", fare: 320, seatsAvailable: 19, demand: "Normal", platform: "5", isAlternative: false },
      { id: 10, name: "Vijayawada Special (Alternative)", number: "07333", source: "Vijayawada", destination: "Tirupati", departureTime: "11:45 PM", arrivalTime: "06:30 AM", coach: "Sleeper", fare: 300, seatsAvailable: 35, demand: "Alternative Route Option", platform: "2", isAlternative: true },

      // --- Route 6: Visakhapatnam to Kakinada ---
      { id: 11, name: "Simhadri Express", number: "17239", source: "Visakhapatnam", destination: "Kakinada Port", departureTime: "08:00 AM", arrivalTime: "11:45 AM", coach: "Chair Car", fare: 180, seatsAvailable: 50, demand: "Normal", platform: "4", isAlternative: false },
      { id: 12, name: "Simhadri Special (Alternative)", number: "07240", source: "Visakhapatnam", destination: "Kakinada Port", departureTime: "02:15 PM", arrivalTime: "06:00 PM", coach: "General", fare: 150, seatsAvailable: 70, demand: "Alternative Route Option", platform: "3", isAlternative: true },

      // --- Route 7: Nellore to Vijayawada ---
      { id: 13, name: "Pinakini Express", number: "12712", source: "Nellore", destination: "Vijayawada", departureTime: "02:15 PM", arrivalTime: "06:30 PM", coach: "Chair Car", fare: 260, seatsAvailable: 28, demand: "Normal", platform: "1", isAlternative: false },

      // --- Route 8: Kurnool City to Vijayawada ---
      { id: 14, name: "Kurnool - Vijayawada Intercity", number: "12795", source: "Kurnool City", destination: "Vijayawada", departureTime: "05:30 AM", arrivalTime: "11:10 AM", coach: "Chair Car", fare: 350, seatsAvailable: 16, demand: "Moderate Demand", platform: "2", isAlternative: false },
      { id: 15, name: "Kurnool Express (Alternative)", number: "17216", source: "Kurnool City", destination: "Vijayawada", departureTime: "01:00 PM", arrivalTime: "07:30 PM", coach: "Sleeper", fare: 310, seatsAvailable: 22, demand: "Alternative Route Option", platform: "1", isAlternative: true },

      // --- Route 9: Rajahmundry to Visakhapatnam ---
      { id: 16, name: "Rajahmundry - Vizag Express", number: "17268", source: "Rajahmundry", destination: "Visakhapatnam", departureTime: "06:45 AM", arrivalTime: "09:45 AM", coach: "Chair Car", fare: 200, seatsAvailable: 40, demand: "Normal", platform: "2", isAlternative: false },

      // --- Route 10: Anantapur to Tirupati ---
      { id: 17, name: "Anantapur - Tirupati Express", number: "17603", source: "Anantapur", destination: "Tirupati", departureTime: "06:00 AM", arrivalTime: "11:30 AM", coach: "Sleeper", fare: 290, seatsAvailable: 25, demand: "Normal", platform: "1", isAlternative: false },

      // --- Route 11: Ongole to Vijayawada ---
      { id: 18, name: "Ongole - Vijayawada Passenger", number: "07577", source: "Ongole", destination: "Vijayawada", departureTime: "07:30 AM", arrivalTime: "10:30 AM", coach: "General", fare: 90, seatsAvailable: 90, demand: "Normal", platform: "3", isAlternative: false },

      // --- Route 12: Eluru to Visakhapatnam ---
      { id: 19, name: "Eluru - Vizag Express", number: "17235", source: "Eluru", destination: "Visakhapatnam", departureTime: "09:15 AM", arrivalTime: "01:15 PM", coach: "Sleeper", fare: 220, seatsAvailable: 33, demand: "Normal", platform: "2", isAlternative: false },

      // --- Route 13: Srikakulam to Vijayawada ---
      { id: 20, name: "Srikakulam - Vijayawada Express", number: "17241", source: "Srikakulam Road", destination: "Vijayawada", departureTime: "08:30 PM", arrivalTime: "03:45 AM", coach: "Sleeper", fare: 380, seatsAvailable: 14, demand: "Moderate Demand", platform: "1", isAlternative: false },
      { id: 21, name: "Srikakulam Special (Alternative)", number: "07242", source: "Srikakulam Road", destination: "Vijayawada", departureTime: "10:00 PM", arrivalTime: "05:15 AM", coach: "Sleeper", fare: 350, seatsAvailable: 29, demand: "Alternative Route Option", platform: "2", isAlternative: true },

      // --- Route 14: Machilipatnam to Vijayawada ---
      { id: 22, name: "Machilipatnam - Vijayawada Passenger", number: "07872", source: "Machilipatnam", destination: "Vijayawada", departureTime: "06:30 AM", arrivalTime: "08:15 AM", coach: "General", fare: 60, seatsAvailable: 110, demand: "Normal", platform: "1", isAlternative: false },

      // --- Route 15: Bhimavaram to Nidadavolu ---
      { id: 23, name: "Bhimavaram - Nidadavolu Passenger", number: "07881", source: "Bhimavaram", destination: "Nidadavolu", departureTime: "07:00 AM", arrivalTime: "08:15 AM", coach: "General", fare: 50, seatsAvailable: 120, demand: "Normal", platform: "1", isAlternative: false },

      // --- Route 16: Vizianagaram to Visakhapatnam ---
      { id: 24, name: "Vizianagaram - Vizag Passenger", number: "07461", source: "Vizianagaram", destination: "Visakhapatnam", departureTime: "07:45 AM", arrivalTime: "09:10 AM", coach: "General", fare: 45, seatsAvailable: 100, demand: "Normal", platform: "5", isAlternative: false },

      // --- Route 17: Chittoor to Tirupati ---
      { id: 25, name: "Chittoor - Tirupati Express", number: "17499", source: "Chittoor", destination: "Tirupati", departureTime: "08:30 AM", arrivalTime: "10:15 AM", coach: "Sleeper", fare: 110, seatsAvailable: 45, demand: "Normal", platform: "2", isAlternative: false },
      { id: 26, name: "Chittoor - Tirupati Passenger (Alternative)", number: "07455", source: "Chittoor", destination: "Tirupati", departureTime: "02:00 PM", arrivalTime: "03:45 PM", coach: "General", fare: 95, seatsAvailable: 65, demand: "Alternative Route Option", platform: "1", isAlternative: true },

      // --- Route 18: Nandyal to Guntur ---
      { id: 27, name: "Nandyal - Guntur Express", number: "17208", source: "Nandyal", destination: "Guntur", departureTime: "06:15 AM", arrivalTime: "11:45 AM", coach: "Sleeper", fare: 250, seatsAvailable: 21, demand: "Normal", platform: "1", isAlternative: false },
      { id: 28, name: "Nandyal Special (Alternative)", number: "07209", source: "Nandyal", destination: "Guntur", departureTime: "02:30 PM", arrivalTime: "08:00 PM", coach: "Sleeper", fare: 230, seatsAvailable: 32, demand: "Alternative Route Option", platform: "2", isAlternative: true },

      // --- Route 19: Kadapa to Vijayawada ---
      { id: 29, name: "Kadapa - Vijayawada Express", number: "17224", source: "Kadapa", destination: "Vijayawada", departureTime: "09:00 PM", arrivalTime: "04:30 AM", coach: "Sleeper", fare: 330, seatsAvailable: 17, demand: "Moderate Demand", platform: "3", isAlternative: false },

      // --- Route 20: Visakhapatnam to Vijayawada (Vande Bharat Hub) ---
      { id: 30, name: "Visakhapatnam - Vijayawada Vande Bharat", number: "20835", source: "Visakhapatnam", destination: "Vijayawada", departureTime: "05:45 AM", arrivalTime: "11:30 AM", coach: "AC Chair Car", fare: 920, seatsAvailable: 12, demand: "High Demand", platform: "8", isAlternative: false }
    ]);
    setLoading(false);
  }, []);

  const handlePassengerCountChange = (e) => {
    const val = parseInt(e.target.value) || 1;
    setGroupSizeFilter(val);
    updateBooking({ passengerCount: val });
  };

  const handleSelectSeats = (train) => {
    updateBooking({ 
      train, 
      passengerCount: groupSizeFilter 
    });
    navigate('/select-seats');
  };

  const handleQuickBook = (train) => {
    updateBooking({ 
      train, 
      passengerCount: groupSizeFilter 
    });
    navigate('/passenger');
  };

  // Filter trains based on search query or context
  const filteredTrains = trains.filter((train) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return false; 

    // If booking context exists, check if source or destination matches either field
    const matchesBookingRoute = 
      (booking.from && train.source.toLowerCase().includes(booking.from.toLowerCase())) ||
      (booking.to && train.destination.toLowerCase().includes(booking.to.toLowerCase()));

    const matchesQuery = (
      train.name?.toLowerCase().includes(query) ||
      train.source?.toLowerCase().includes(query) ||
      train.destination?.toLowerCase().includes(query)
    );

    return matchesBookingRoute || matchesQuery;
  });

  if (loading) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4" style={{ maxWidth: "900px" }}>
      <h4 className="mb-3 text-secondary">AP State Trains & Alternative Routes</h4>

      <div className="row mb-4 g-3">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search trains by source or destination (e.g. Chittoor to Tirupati)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text">Passengers</span>
            <input
              type="number"
              className="form-control"
              min="1"
              max="10"
              value={groupSizeFilter}
              onChange={handlePassengerCountChange}
            />
          </div>
        </div>
      </div>

      <div className="row">
        {searchQuery.trim() === '' ? (
          <div className="text-center text-muted my-5 py-4 bg-light rounded border">
            <h5>Please search for a route to view available trains.</h5>
            <p className="small mb-0">Example: Type "Chittoor" or "Tirupati" in the search box above.</p>
          </div>
        ) : filteredTrains.length === 0 ? (
          <div className="text-center text-muted my-5 py-4 bg-light rounded border">
            <h5>No trains found matching "{searchQuery}"</h5>
            <p className="small mb-0">Try searching for other AP locations like Vijayawada, Visakhapatnam, or Guntur.</p>
          </div>
        ) : (
          filteredTrains.map((train) => (
            <div className="col-12 mb-3" key={train.id}>
              <div className={`card shadow-sm border-0 p-3 ${train.isAlternative ? 'border-start border-info border-4' : ''}`}>
                <div className="d-flex justify-content-between align-items-start flex-wrap">
                  <div>
                    <h5 className="text-primary mb-1 fw-bold">
                      {train.name} <span className="text-muted small fw-normal">({train.number})</span>
                    </h5>
                    <p className="mb-1 text-secondary fw-semibold">
                      {train.source} ➡️ {train.destination}
                    </p>
                    <p className="mb-2 small text-muted">
                      Departure: {train.departureTime} | Arrival: {train.arrivalTime} <br/>
                      Coach: {train.coach} &bull; Fare: ₹{train.fare} &bull; Platform: {train.platform}
                    </p>
                  </div>
                  <div className="d-flex flex-column align-items-end gap-1">
                    <span className={`badge ${train.demand.includes('High') ? 'bg-danger' : train.isAlternative ? 'bg-info text-dark' : 'bg-warning text-dark'}`}>
                      {train.demand}
                    </span>
                    {train.isAlternative && (
                      <span className="badge bg-light text-secondary border">Alternative Option</span>
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top flex-wrap gap-2">
                  <span className="text-success fw-bold">{train.seatsAvailable} Seats Available</span>
                  <div className="d-flex gap-2 flex-wrap">
                    <button 
                      className="btn btn-outline-primary btn-sm fw-bold"
                      onClick={() => handleSelectSeats(train)}
                    >
                      Select Seats
                    </button>
                    <button 
                      className="btn btn-success btn-sm fw-bold"
                      onClick={() => handleQuickBook(train)}
                    >
                      Quick Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}