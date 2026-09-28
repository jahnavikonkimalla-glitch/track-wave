import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import TrainList from "./pages/Trainlist";
import SeatSelection from "./pages/SeatSelection"; 
import Passenger from "./pages/Passenger";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import Accommodation from "./pages/Accommodation";
import Tracking from "./pages/Tracking";
import Offers from "./pages/Offers";
import Cancellation from "./pages/Cancellation";
import MyBookings from "./pages/MyBookings";
import { SmartSearch } from "./pages/SmartSearch";
import EmergencyContact from "./pages/EmergencyContact"; 
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard"; // <-- Imported Admin Dashboard
import ChatBotWidget from "./components/ChatBotWidget";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/smart-search" element={<SmartSearch />} />
        <Route path="/trainlist" element={<TrainList />} />
        <Route path="/select-seats" element={<SeatSelection />} /> 
        <Route path="/passenger" element={<Passenger />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/cancellation" element={<Cancellation />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/mybookings" element={<MyBookings />} />
        
        {/* Emergency Contact Route */}
        <Route path="/add-emergency-contact" element={<EmergencyContact />} />

        {/* About Us Route */}
        <Route path="/about" element={<About />} />

        {/* Admin Dashboard Route */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>

      {/* Global AI Chatbot Component */}
      <ChatBotWidget />
    </>
  );
}

export default App;