import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About TrackWave 🚆</h1>
        <p>Your ultimate companion for seamless train travel, live tracking, and station services.</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Who We Are</h2>
          <p>
            TrackWave is a next-generation railway management and booking platform designed to make train journeys smoother, safer, and more convenient for everyone. Whether you are checking seat availability, booking tickets, or interacting with our smart AI assistant, TrackWave brings everything to your fingertips.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Advanced Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>🤖 Multilingual AI Chatbot</h3>
              <p>Get instant assistance in English, Telugu, and Hindi. Our smart widget guides you end-to-end through bookings, PNR status, tracking, and cancellations.</p>
            </div>
            <div className="feature-card">
              <h3>🎤 Voice-Enabled Assistant</h3>
              <p>Use dynamic voice recognition input across multiple regional languages to talk directly to your AI assistant hands-free.</p>
            </div>
            <div className="feature-card">
              <h3>🎫 Smart Ticket Booking & Seats</h3>
              <p>Quickly search routes, verify seat availability, check journey dates, and smoothly manage your travel flow.</p>
            </div>
            <div className="feature-card">
              <h3>🍲 Food & Accommodation</h3>
              <p>Order fresh meals right to your train seat or book comfortable station-side rooms during your travel.</p>
            </div>
            <div className="feature-card">
              <h3>🚨 Emergency SOS</h3>
              <p>Access instant railway emergency authorities (139) with a single click during unexpected situations.</p>
            </div>
          </div>
        </section>

        <section className="about-section text-center">
          <h2>Ready to plan your next journey?</h2>
          <button className="explore-btn" onClick={() => navigate("/")}>
            Get Started
          </button>
        </section>
      </div>
    </div>
  );
}

export default About;