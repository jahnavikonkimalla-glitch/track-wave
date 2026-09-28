import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// Complete train list data covering 30 trains
const trainsList = [
  {
    number: "12760",
    name: "Charminar Express",
    from: "Hyderabad",
    to: "Chennai",
    totalKm: 800,
    stops: [
      { station: "Hyderabad", km: 0, time: "06:00 AM", delay: 0 },
      { station: "Kazipet", km: 130, time: "08:10 AM", delay: 5 },
      { station: "Khammam", km: 200, time: "09:30 AM", delay: 10 },
      { station: "Vijayawada", km: 320, time: "11:15 AM", delay: 15 },
      { station: "Ongole", km: 420, time: "01:00 PM", delay: 0 },
      { station: "Nellore", km: 500, time: "02:15 PM", delay: 0 },
      { station: "Chennai", km: 800, time: "05:30 PM", delay: 0 },
    ],
    currentIndex: 3,
    platform: "3",
  },
  {
    number: "12727",
    name: "Godavari Express",
    from: "Hyderabad",
    to: "Visakhapatnam",
    totalKm: 630,
    stops: [
      { station: "Hyderabad", km: 0, time: "05:15 PM", delay: 0 },
      { station: "Warangal", km: 150, time: "07:00 PM", delay: 0 },
      { station: "Khammam", km: 260, time: "08:20 PM", delay: 8 },
      { station: "Rajahmundry", km: 430, time: "11:30 PM", delay: 12 },
      { station: "Samalkot", km: 480, time: "12:10 AM", delay: 0 },
      { station: "Visakhapatnam", km: 630, time: "06:00 AM", delay: 0 },
    ],
    currentIndex: 2,
    platform: "1",
  },
  {
    number: "20701",
    name: "Vande Bharat Express",
    from: "Vijayawada",
    to: "Chennai",
    totalKm: 480,
    stops: [
      { station: "Vijayawada", km: 0, time: "08:00 AM", delay: 0 },
      { station: "Ongole", km: 100, time: "09:10 AM", delay: 0 },
      { station: "Nellore", km: 180, time: "10:00 AM", delay: 3 },
      { station: "Gudur", km: 220, time: "10:25 AM", delay: 3 },
      { station: "Chennai", km: 480, time: "01:00 PM", delay: 0 },
    ],
    currentIndex: 1,
    platform: "2",
  },
  {
    number: "17406",
    name: "Rayalaseema Express",
    from: "Hyderabad",
    to: "Chennai",
    totalKm: 780,
    stops: [
      { station: "Hyderabad", km: 0, time: "09:30 PM", delay: 0 },
      { station: "Kurnool", km: 210, time: "12:15 AM", delay: 10 },
      { station: "Anantapur", km: 320, time: "01:40 AM", delay: 0 },
      { station: "Renigunta", km: 650, time: "07:00 AM", delay: 5 },
      { station: "Chennai", km: 780, time: "11:00 AM", delay: 0 },
    ],
    currentIndex: 2,
    platform: "4",
  },
  {
    number: "12951",
    name: "Rajdhani Express",
    from: "Mumbai",
    to: "Delhi",
    totalKm: 1384,
    stops: [
      { station: "Mumbai", km: 0, time: "04:35 PM", delay: 0 },
      { station: "Vadodara", km: 390, time: "08:52 PM", delay: 0 },
      { station: "Kota", km: 970, time: "03:00 AM", delay: 20 },
      { station: "Mathura", km: 1200, time: "05:40 AM", delay: 10 },
      { station: "Delhi", km: 1384, time: "08:35 AM", delay: 0 },
    ],
    currentIndex: 2,
    platform: "6",
  },
  {
    number: "12007",
    name: "Chennai Shatabdi",
    from: "Chennai",
    to: "Bangalore",
    totalKm: 362,
    stops: [
      { station: "Chennai", km: 0, time: "06:00 AM", delay: 0 },
      { station: "Katpadi", km: 129, time: "07:35 AM", delay: 0 },
      { station: "Jolarpettai", km: 180, time: "08:10 AM", delay: 5 },
      { station: "Bangalore", km: 362, time: "11:00 AM", delay: 0 },
    ],
    currentIndex: 1,
    platform: "7",
  },
  {
    number: "12626",
    name: "Kerala Express",
    from: "New Delhi",
    to: "Trivandrum",
    totalKm: 3032,
    stops: [
      { station: "New Delhi", km: 0, time: "08:10 PM", delay: 0 },
      { station: "Agra", km: 195, time: "10:45 PM", delay: 0 },
      { station: "Bhopal", km: 700, time: "06:10 AM", delay: 15 },
      { station: "Nagpur", km: 1092, time: "12:30 PM", delay: 0 },
      { station: "Trivandrum", km: 3032, time: "04:30 AM", delay: 0 },
    ],
    currentIndex: 2,
    platform: "2",
  },
  {
    number: "12840",
    name: "Howrah Mail",
    from: "Chennai",
    to: "Howrah",
    totalKm: 1661,
    stops: [
      { station: "Chennai", km: 0, time: "11:45 PM", delay: 0 },
      { station: "Vijayawada", km: 431, time: "06:20 AM", delay: 5 },
      { station: "Visakhapatnam", km: 780, time: "12:40 PM", delay: 0 },
      { station: "Bhubaneswar", km: 1222, time: "07:30 PM", delay: 10 },
      { station: "Howrah", km: 1661, time: "03:50 AM", delay: 0 },
    ],
    currentIndex: 2,
    platform: "5",
  },
  {
    number: "12953",
    name: "August Kranti Rajdhani",
    from: "Mumbai",
    to: "Delhi",
    totalKm: 1377,
    stops: [
      { station: "Mumbai", km: 0, time: "05:10 PM", delay: 0 },
      { station: "Surat", km: 294, time: "08:17 PM", delay: 0 },
      { station: "Kota", km: 920, time: "02:25 AM", delay: 0 },
      { station: "Delhi", km: 1377, time: "09:43 AM", delay: 0 },
    ],
    currentIndex: 1,
    platform: "4",
  },
  {
    number: "12002",
    name: "Bhopal Shatabdi",
    from: "New Delhi",
    to: "Bhopal",
    totalKm: 700,
    stops: [
      { station: "New Delhi", km: 0, time: "06:00 AM", delay: 0 },
      { station: "Agra", km: 195, time: "08:10 AM", delay: 0 },
      { station: "Jhansi", km: 411, time: "10:43 AM", delay: 5 },
      { station: "Bhopal", km: 700, time: "02:25 PM", delay: 0 },
    ],
    currentIndex: 2,
    platform: "1",
  },
  {
    number: "12301",
    name: "Howrah Rajdhani",
    from: "Howrah",
    to: "New Delhi",
    totalKm: 1447,
    stops: [
      { station: "Howrah", km: 0, time: "04:55 PM", delay: 0 },
      { station: "Dhanbad", km: 269, time: "07:35 PM", delay: 0 },
      { station: "Mughalsarai", km: 649, time: "12:22 AM", delay: 15 },
      { station: "New Delhi", km: 1447, time: "10:00 AM", delay: 0 },
    ],
    currentIndex: 2,
    platform: "9",
  },
  {
    number: "12655",
    name: "Navajeevan Express",
    from: "Ahmedabad",
    to: "Chennai",
    totalKm: 1831,
    stops: [
      { station: "Ahmedabad", km: 0, time: "06:25 AM", delay: 0 },
      { station: "Surat", km: 230, time: "10:17 AM", delay: 10 },
      { station: "Nagpur", km: 890, time: "11:45 PM", delay: 0 },
      { station: "Vijayawada", km: 1500, time: "12:15 PM", delay: 20 },
      { station: "Chennai", km: 1831, time: "06:10 PM", delay: 0 },
    ],
    currentIndex: 3,
    platform: "3",
  },
  {
    number: "12296",
    name: "Sanghamitra Express",
    from: "Patna",
    to: "Bangalore",
    totalKm: 2244,
    stops: [
      { station: "Patna", km: 0, time: "08:15 PM", delay: 0 },
      { station: "Jabalpur", km: 545, time: "07:30 AM", delay: 0 },
      { station: "Nagpur", km: 924, time: "02:10 PM", delay: 30 },
      { station: "Bangalore", km: 2244, time: "04:15 AM", delay: 0 },
    ],
    currentIndex: 2,
    platform: "5",
  },
  {
    number: "12138",
    name: "Punjab Mail",
    from: "Firozpur",
    to: "Mumbai",
    totalKm: 1930,
    stops: [
      { station: "Firozpur", km: 0, time: "09:45 PM", delay: 0 },
      { station: "Delhi", km: 318, time: "05:10 AM", delay: 0 },
      { station: "Bhopal", km: 1022, time: "06:05 PM", delay: 10 },
      { station: "Mumbai", km: 1930, time: "07:35 AM", delay: 0 },
    ],
    currentIndex: 2,
    platform: "2",
  },
  {
    number: "12556",
    name: "Gorakhdham Express",
    from: "Gorakhpur",
    to: "New Delhi",
    totalKm: 760,
    stops: [
      { station: "Gorakhpur", km: 0, time: "03:35 PM", delay: 0 },
      { station: "Lucknow", km: 272, time: "08:30 PM", delay: 15 },
      { station: "Kanpur", km: 346, time: "10:15 PM", delay: 0 },
      { station: "New Delhi", km: 760, time: "05:20 AM", delay: 0 },
    ],
    currentIndex: 1,
    platform: "1",
  },
  {
    number: "12903",
    name: "Golden Temple Mail",
    from: "Mumbai",
    to: "Amritsar",
    totalKm: 1779,
    stops: [
      { station: "Mumbai", km: 0, time: "09:25 PM", delay: 0 },
      { station: "Vadodara", km: 390, time: "03:00 AM", delay: 0 },
      { station: "Kota", km: 926, time: "10:20 AM", delay: 25 },
      { station: "Amritsar", km: 1779, time: "05:50 AM", delay: 0 },
    ],
    currentIndex: 2,
    platform: "6",
  },
  {
    number: "12612",
    name: "Garib Rath Express",
    from: "Hazrat Nizamuddin",
    to: "Chennai",
    totalKm: 2176,
    stops: [
      { station: "Hazrat Nizamuddin", km: 0, time: "03:55 PM", delay: 0 },
      { station: "Jhansi", km: 403, time: "08:50 PM", delay: 0 },
      { station: "Nagpur", km: 1227, time: "11:50 AM", delay: 10 },
      { station: "Chennai", km: 2176, time: "06:05 AM", delay: 0 },
    ],
    currentIndex: 2,
    platform: "3",
  },
  {
    number: "12677",
    name: "Ernakulam Intercity",
    from: "Chennai",
    to: "Ernakulam",
    totalKm: 696,
    stops: [
      { station: "Chennai", km: 0, time: "06:10 AM", delay: 0 },
      { station: "Katpadi", km: 129, time: "07:48 AM", delay: 0 },
      { station: "Coimbatore", km: 494, time: "01:22 PM", delay: 5 },
      { station: "Ernakulam", km: 696, time: "05:05 PM", delay: 0 },
    ],
    currentIndex: 2,
    platform: "8",
  },
  {
    number: "12245",
    name: "Howrah Yesvantpur Duronto",
    from: "Howrah",
    to: "Yesvantpur",
    totalKm: 1960,
    stops: [
      { station: "Howrah", km: 0, time: "10:50 AM", delay: 0 },
      { station: "Bhubaneswar", km: 437, time: "05:15 PM", delay: 0 },
      { station: "Visakhapatnam", km: 994, time: "03:20 AM", delay: 15 },
      { station: "Yesvantpur", km: 1960, time: "10:30 PM", delay: 0 },
    ],
    currentIndex: 2,
    platform: "4",
  },
  {
    number: "12723",
    name: "Telangana Express",
    from: "Hyderabad",
    to: "New Delhi",
    totalKm: 1667,
    stops: [
      { station: "Hyderabad", km: 0, time: "06:50 AM", delay: 0 },
      { station: "Balharshah", km: 367, time: "01:25 PM", delay: 0 },
      { station: "Nagpur", km: 575, time: "04:30 PM", delay: 10 },
      { station: "New Delhi", km: 1667, time: "01:10 PM", delay: 0 },
    ],
    currentIndex: 2,
    platform: "2",
  },
  {
    number: "12801",
    name: "Purushottam Express",
    from: "Puri",
    to: "New Delhi",
    totalKm: 1861,
    stops: [
      { station: "Puri", km: 0, time: "09:55 PM", delay: 0 },
      { station: "Bhubaneswar", km: 63, time: "11:25 PM", delay: 0 },
      { station: "Tatanagar", km: 569, time: "08:15 AM", delay: 20 },
      { station: "New Delhi", km: 1861, time: "04:55 AM", delay: 0 },
    ],
    currentIndex: 2,
    platform: "1",
  },
  {
    number: "12955",
    name: "Mumbai Express",
    from: "Mumbai",
    to: "Jaipur",
    totalKm: 1163,
    stops: [
      { station: "Mumbai", km: 0, time: "06:20 PM", delay: 0 },
      { station: "Surat", km: 294, time: "10:02 PM", delay: 0 },
      { station: "Ahmedabad", km: 493, time: "01:30 AM", delay: 5 },
      { station: "Jaipur", km: 1163, time: "01:15 PM", delay: 0 },
    ],
    currentIndex: 2,
    platform: "5",
  },
  {
    number: "12313",
    name: "Sealdah Rajdhani",
    from: "Sealdah",
    to: "New Delhi",
    totalKm: 1453,
    stops: [
      { station: "Sealdah", km: 0, time: "04:50 PM", delay: 0 },
      { station: "Dhanbad", km: 266, time: "07:35 PM", delay: 0 },
      { station: "Mughalsarai", km: 646, time: "12:15 AM", delay: 12 },
      { station: "New Delhi", km: 1453, time: "10:10 AM", delay: 0 },
    ],
    currentIndex: 2,
    platform: "3",
  },
  {
    number: "12604",
    name: "Chennai Express",
    from: "Hyderabad",
    to: "Chennai",
    totalKm: 715,
    stops: [
      { station: "Hyderabad", km: 0, time: "04:45 PM", delay: 0 },
      { station: "Guntur", km: 381, time: "10:10 PM", delay: 0 },
      { station: "Renigunta", km: 610, time: "03:15 AM", delay: 8 },
      { station: "Chennai", km: 715, time: "05:45 AM", delay: 0 },
    ],
    currentIndex: 1,
    platform: "2",
  },
  {
    number: "12622",
    name: "Tamil Nadu Express",
    from: "New Delhi",
    to: "Chennai",
    totalKm: 2182,
    stops: [
      { station: "New Delhi", km: 0, time: "10:30 PM", delay: 0 },
      { station: "Agra", km: 195, time: "12:50 AM", delay: 0 },
      { station: "Vijayawada", km: 1738, time: "07:20 PM", delay: 15 },
      { station: "Chennai", km: 2182, time: "07:15 AM", delay: 0 },
    ],
    currentIndex: 2,
    platform: "4",
  },
  {
    number: "12792",
    name: "Secunderabad Express",
    from: "Patna",
    to: "Secunderabad",
    totalKm: 1695,
    stops: [
      { station: "Patna", km: 0, time: "12:15 PM", delay: 0 },
      { station: "Varanasi", km: 230, time: "05:00 PM", delay: 5 },
      { station: "Nagpur", km: 1010, time: "08:30 AM", delay: 20 },
      { station: "Secunderabad", km: 1695, time: "09:30 PM", delay: 0 },
    ],
    currentIndex: 2,
    platform: "7",
  },
  {
    number: "12219",
    name: "Secunderabad Duronto",
    from: "Mumbai",
    to: "Secunderabad",
    totalKm: 787,
    stops: [
      { station: "Mumbai", km: 0, time: "11:05 PM", delay: 0 },
      { station: "Pune", km: 173, time: "02:45 AM", delay: 0 },
      { station: "Secunderabad", km: 787, time: "11:15 AM", delay: 0 },
    ],
    currentIndex: 1,
    platform: "1",
  },
  {
    number: "12688",
    name: "Dehradun Express",
    from: "Madurai",
    to: "Dehradun",
    totalKm: 3004,
    stops: [
      { station: "Madurai", km: 0, time: "06:20 AM", delay: 0 },
      { station: "Chennai", km: 495, time: "03:15 PM", delay: 10 },
      { station: "New Delhi", km: 2664, time: "07:00 AM", delay: 25 },
      { station: "Dehradun", km: 3004, time: "01:00 PM", delay: 0 },
    ],
    currentIndex: 2,
    platform: "6",
  },
  {
    number: "12510",
    name: "Guwahati Express",
    from: "Bengaluru",
    to: "Guwahati",
    totalKm: 3012,
    stops: [
      { station: "Bengaluru", km: 0, time: "11:40 PM", delay: 0 },
      { station: "Vijayawada", km: 994, time: "02:30 PM", delay: 15 },
      { station: "Guwahati", km: 3012, time: "05:30 AM", delay: 0 },
    ],
    currentIndex: 1,
    platform: "8",
  },
  {
    number: "12642",
    name: "Thirukural Express",
    from: "Kanyakumari",
    to: "Hazrat Nizamuddin",
    totalKm: 2921,
    stops: [
      { station: "Kanyakumari", km: 0, time: "11:15 AM", delay: 0 },
      { station: "Madurai", km: 154, time: "02:30 PM", delay: 0 },
      { station: "Hazrat Nizamuddin", km: 2921, time: "07:00 AM", delay: 0 },
    ],
    currentIndex: 1,
    platform: "2",
  }
];

function Tracking() {
  const [searchParams, setSearchParams] = useSearchParams();

  const requestedNumber = searchParams.get("number");
  const initialTrain = 
    trainsList.find((t) => t.number === requestedNumber) || trainsList[0];

  const [currentTrain, setCurrentTrain] = useState(initialTrain);
  const [platform, setPlatform] = useState(initialTrain.platform);
  const [searchInput, setSearchInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [speed, setSpeed] = useState(78);

  // Sync state if URL query params change externally
  useEffect(() => {
    if (requestedNumber) {
      const found = trainsList.find((t) => t.number === requestedNumber);
      if (found) {
        setCurrentTrain(found);
        setPlatform(found.platform);
      }
    }
  }, [requestedNumber]);

  // Simulated live speed variations every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(60 + Math.floor(Math.random() * 50));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleTrainSelect = (e) => {
    const selectedNum = e.target.value;
    const found = trainsList.find((t) => t.number === selectedNum);
    if (found) {
      setCurrentTrain(found);
      setPlatform(found.platform);
      setSearchParams({ number: selectedNum });
    }
  };

  const handleManualSearch = (e) => {
    e.preventDefault();
    const trimmedInput = searchInput.trim();
    const found = trainsList.find((t) => t.number === trimmedInput);
    
    if (found) {
      setCurrentTrain(found);
      setPlatform(found.platform);
      setSearchParams({ number: trimmedInput });
      setSearchInput("");
    } else {
      alert(`Train number "${trimmedInput}" not found in your train list!`);
    }
  };

  const changePlatform = () => {
    setPlatform((prev) => (prev === "5" ? "3" : "5"));
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000);
  };

  const activeStop = currentTrain.stops[currentTrain.currentIndex];
  const nextStop = currentTrain.stops[currentTrain.currentIndex + 1];
  const kmCovered = activeStop.km;
  const kmRemaining = currentTrain.totalKm - kmCovered;
  const progressPercent = Math.round((kmCovered / currentTrain.totalKm) * 100);

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">🚆 Live Train Tracking & Search</h2>

        {/* Manual Search Input Form */}
        <form onSubmit={handleManualSearch} className="mb-4">
          <label className="fw-bold mb-2">Search Train by Train Number:</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter train number (e.g., 12760, 12626)..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Track Train
            </button>
          </div>
        </form>

        <div className="text-center text-muted mb-3">— OR SELECT FROM LIST —</div>

        {/* Dropdown Selector mapped directly from trainsList */}
        <div className="mb-4">
          <select
            className="form-select fw-bold text-primary"
            value={currentTrain.number}
            onChange={handleTrainSelect}
          >
            {trainsList.map((train) => (
              <option key={train.number} value={train.number}>
                {train.name} ({train.number}) - {train.from} ➜ {train.to}
              </option>
            ))}
          </select>
        </div>

        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Train Name</th>
              <td>{currentTrain.name}</td>
            </tr>
            <tr>
              <th>Train Number</th>
              <td>{currentTrain.number}</td>
            </tr>
            <tr>
              <th>Route</th>
              <td className="fw-bold text-secondary">
                {currentTrain.from} ➜ {currentTrain.to}
              </td>
            </tr>
            <tr>
              <th>Current Location</th>
              <td>{activeStop.station}</td>
            </tr>
            <tr>
              <th>Next Station</th>
              <td>{nextStop ? nextStop.station : "Destination reached"}</td>
            </tr>
            <tr>
              <th>Platform</th>
              <td>{platform}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td className={activeStop.delay > 0 ? "text-danger fw-bold" : "text-success fw-bold"}>
                {activeStop.delay > 0 ? `Delayed by ${activeStop.delay} min` : "On Time"}
              </td>
            </tr>
            <tr>
              <th>Distance Covered</th>
              <td>{kmCovered} km / {currentTrain.totalKm} km</td>
            </tr>
            <tr>
              <th>Distance Remaining</th>
              <td>{kmRemaining} km</td>
            </tr>
            <tr>
              <th>Current Speed</th>
              <td>{speed} km/h</td>
            </tr>
          </tbody>
        </table>

        {/* Journey Progress Bar */}
        <div className="mb-4">
          <div className="d-flex justify-content-between mb-1">
            <span>{currentTrain.from}</span>
            <span>{currentTrain.to}</span>
          </div>
          <div className="progress" style={{ height: "10px" }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        <h5 className="mb-3">Route Timeline</h5>

        <ul className="list-group mb-4">
          {currentTrain.stops.map((stop, index) => (
            <li
              key={stop.station}
              className={
                "list-group-item d-flex justify-content-between align-items-center " +
                (index === currentTrain.currentIndex
                  ? "list-group-item-primary fw-bold"
                  : index < currentTrain.currentIndex
                  ? "list-group-item-light text-muted"
                  : "")
              }
            >
              <span>
                {index < currentTrain.currentIndex && "✅ "}
                {index === currentTrain.currentIndex && "🚆 "}
                {stop.station}
              </span>
              <span>
                {stop.time}
                {stop.delay > 0 && (
                  <span className="text-danger ms-2">(+{stop.delay} min)</span>
                )}
              </span>
            </li>
          ))}
        </ul>

        <button className="btn btn-warning" onClick={changePlatform}>
          Change Platform
        </button>
      </div>

      {showPopup && (
        <div className="alert alert-danger mt-4">
          <h4>⚠ Platform Changed</h4>
          <p><strong>New Platform:</strong> {platform}</p>
          <p>Please proceed immediately.</p>
        </div>
      )}
    </div>
  );
}

export default Tracking;