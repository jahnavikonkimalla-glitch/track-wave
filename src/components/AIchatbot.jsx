import { useState } from "react";
import { useBooking } from "../context/BookingContext";

function AIChatbot() {
  const { currentLang, t } = useBooking();
  const [isOpen, setIsOpen] = useState(false); // Toggle state for the chat window
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      let replyText = "I can help you search for trains or check your PNR status!";
      setMessages((prev) => [...prev, { sender: "ai", text: replyText }]);
    }, 600);

    setInput("");
  };

  return (
    <div className="position-fixed bottom-0 end-0 m-4" style={{ zIndex: 1050 }}>
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-primary rounded-circle shadow-lg p-3 d-flex align-items-center justify-content-center"
          style={{ width: "60px", height: "60px" }}
        >
          🤖
        </button>
      )}

      {/* Chat Window Box */}
      {isOpen && (
        <div className="card border-0 shadow-lg bg-white rounded" style={{ width: "360px" }}>
          <div className="d-flex justify-content-between align-items-center border-bottom p-3 bg-primary text-white rounded-top">
            <h6 className="m-0 fw-bold">🤖 {t ? t("chatbotTitle") : "AI Assistant"} ({currentLang})</h6>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-sm text-white fw-bold"
              style={{ fontSize: "1.2rem", lineHeight: 1 }}
            >
              &times;
            </button>
          </div>

          <div className="chat-window p-3 bg-light" style={{ height: "220px", overflowY: "auto" }}>
            {messages.length === 0 ? (
              <div className="text-muted text-center small mt-5">Type a message to start chatting...</div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`mb-2 d-flex justify-content-${msg.sender === "user" ? "end" : "start"}`}>
                  <div className={`p-2 rounded ${msg.sender === "user" ? "bg-primary text-white" : "bg-white text-dark border"}`} style={{ maxWidth: "85%", fontSize: "0.9rem" }}>
                    {msg.text}
                  </div>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleSend} className="d-flex gap-2 p-3 border-top bg-white rounded-bottom">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder={t ? t("typePlaceholder") : "Type a message..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="btn btn-sm btn-dark">{t ? t("send") : "Send"}</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AIChatbot;