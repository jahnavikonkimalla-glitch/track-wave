import { useState } from "react";
import { useApp } from "./AppContext";

function UnifiedAIChatbot() {
  const { currentLang, setCurrentLang, chatHistory, setChatHistory, t } = useApp();
  const [input, setInput] = useState("");

  // Mock database of trains
  const trainDatabase = [
    { id: 1, name: "Charminar Express", number: "12760", from: "Hyderabad", to: "Chennai", fare: 950, seats: 12 },
    { id: 2, name: "Godavari Express", number: "12727", from: "Hyderabad", to: "Visakhapatnam", fare: 620, seats: 5 },
    { id: 3, name: "Vande Bharat Express", number: "20701", from: "Vijayawada", to: "Chennai", fare: 1250, seats: 20 },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newHistory = [...chatHistory, { sender: "user", text: userText }];
    setChatHistory(newHistory);
    setInput("");

    // Simulate AI Intent Processing
    setTimeout(() => {
      let aiReply = "";
      const lowerInput = userText.toLowerCase();

      if (lowerInput.includes("search") || lowerInput.includes("train") || lowerInput.includes("from")) {
        // Simple extraction logic for demonstration
        aiReply = `${t("trainsFound")}\n` + trainDatabase.map(t => 
          `• ${t.name} (${t.number}) | ${t.from} ➜ ${t.to} | ₹${t.fare} | Available: ${t.seats}`
        ).join("\n") + "\n\nType 'book [Train Number]' to secure your seats!";
      } else if (lowerInput.includes("book")) {
        const pnrNumber = Math.floor(1000000000 + Math.random() * 9000000000);
        aiReply = `🎉 ${t("bookingSuccess")} ${pnrNumber}. Enjoy your journey!`;
      } else {
        aiReply = `I understand you said: "${userText}". Try asking: "Search trains from Hyderabad to Chennai" or change your language preference above!`;
      }

      setChatHistory((prev) => [...prev, { sender: "ai", text: aiReply }]);
    }, 700);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <div className="card shadow-lg border-0">
        
        {/* Chat Header with Language Switcher */}
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
          <h5 className="m-0 fw-bold">🤖 {t("title")}</h5>
          <div className="d-flex align-items-center gap-2">
            <span className="small text-white-50">{t("selectLang")}:</span>
            <select
              className="form-select form-select-sm bg-secondary text-white border-0"
              value={currentLang}
              onChange={(e) => setCurrentLang(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Hindi">हिन्दी</option>
              <option value="Telugu">తెలుగు</option>
              <option value="Tamil">தமிழ்</option>
              <option value="Odia">ଓଡ଼ିଆ</option>
            </select>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="card-body bg-light" style={{ height: "380px", overflowY: "auto" }}>
          {chatHistory.map((msg, index) => (
            <div key={index} className={`mb-3 d-flex ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}>
              <div 
                className={`p-3 rounded-3 shadow-sm ${msg.sender === "user" ? "bg-primary text-white" : "bg-white text-dark border"}`}
                style={{ maxWidth: "80%", whiteSpace: "pre-line" }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input Footer */}
        <div className="card-footer bg-white py-3">
          <form onSubmit={handleSendMessage} className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder={t("placeholder")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="btn btn-dark px-4 fw-bold">
              {t("send")}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default UnifiedAIChatbot;