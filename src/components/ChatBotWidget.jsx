import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import "./ChatBotWidget.css";
import robot from "../assets/robo.png";

const translations = {
  en: {
    welcome: "👋 Welcome to Track Wave AI! Say 'Hi' or ask me about seat availability, bookings, tracking, or cancellation.",
    placeholder: "Type your message or ask about TrackWave...",
    hiReply: "Hello! How can I help you with your train journey today? You can ask for seat availability, booking, or tracking.",
    defaultReply: "I can help you with TrackWave seat checks, train bookings, tracking, and cancellations. What would you like to do?",
    pnrReply: "To track your train or check PNR status, please visit the 'View My Bookings' page or check your ticket.",
    cancelReply: "To cancel your ticket, please go to your bookings section or provide your booking ID.",
    seatQueryReply: "To check seat availability, please tell me your **From Station**, **Destination**, and **Journey Date**.",
    bookPrompt: "Let's book your tickets! Please enter your **From Station**:",
    toPrompt: "📍 Enter **Destination Station**:",
    datePrompt: "📅 Enter **Journey Date** (e.g., 2026-06-15):",
    seatPrompt: "💺 Enter preferred **Coach / Seat Type** (e.g., AC 3Tier, Sleeper):",
    passengerCountPrompt: "👥 How many passengers are traveling? (e.g., 1, 2, 3)",
    passengerNamePrompt: "📝 Enter full name for passenger:",
    summaryTitle: "Booking Summary & Seat Check (Ready for Payment)",
    paymentBtn: "💳 Proceed to Payment",
    errorVoice: "Voice Recognition is not supported in this browser.",
  },
  te: {
    welcome: "👋 ట్రాక్ వే AI కి స్వాగతం! 'Hi' అనండి లేదా సీట్ లభ్యత, బుకింగ్, ట్రాకింగ్ గురించి అడగండి.",
    placeholder: "మీ సందేశాన్ని టైప్ చేయండి...",
    hiReply: "హలో! ఈరోజు మీ రైలు ప్రయాణానికి నేను ఎలా సహాయం చేయగలను?",
    defaultReply: "నేను మీకు TrackWave సీట్ లభ్యత, బుకింగ్, ట్రాకింగ్ మరియు రద్దు విషయాలలో సహాయం చేయగలను.",
    pnrReply: "మీ రైలును ట్రాక్ చేయడానికి లేదా PNR స్టేటస్ చూసుకోవడానికి 'View My Bookings' పేజ్ ని సందర్శించండి.",
    cancelReply: "మీ టికెట్ రద్దు చేయడానికి బుకింగ్స్ సెక్షన్‌కి వెళ్లండి.",
    seatQueryReply: "సీట్ లభ్యతను తనిఖీ చేయడానికి, దయచేసి మీ **బయలుదేరే స్టేషన్**, **గమ్యస్థానం** మరియు **ప్రయాణ తేదీని** చెప్పండి.",
    bookPrompt: "మీ బుకింగ్ ప్రారంభిద్దాం! దయచేసి మీరు బయలుదేరే స్టేషన్‌ను టైప్ చేయండి:",
    toPrompt: "📍 గమ్యస్థాన స్టేషన్‌ను నమోదు చేయండి:",
    datePrompt: "📅 ప్రయాణ తేదీని నమోదు చేయండి (ఉదా: 2026-06-15):",
    seatPrompt: "💺 కోచ్ లేదా సీట్ రకం (ఉదా: AC 3Tier, Sleeper):",
    passengerCountPrompt: "👥 ఎంతమంది ప్రయాణికులు ప్రయాణిస్తున్నారు? (ఉదా: 1, 2, 3)",
    passengerNamePrompt: "📝 ప్రయాణికుని పూర్తి పేరును నమోదు చేయండి:",
    summaryTitle: "బుకింగ్ వివరాలు (చెల్లింపు కోసం సిద్ధంగా ఉంది)",
    paymentBtn: "💳 చెల్లింపుకు వెళ్లండి",
    errorVoice: "ఈ బ్రౌజర్‌లో వాయిస్ రికగ్నిషన్ సపోర్ట్ చేయదు.",
  },
  hi: {
    welcome: "👋 ट्रैक वे AI में आपका स्वागत है! 'Hi' कहें या सीट उपलब्धता, बुकिंग, ट्रैकिंग के बारे में पूछें।",
    placeholder: "अपना संदेश टाइप करें...",
    hiReply: "नमस्ते! आज मैं आपकी ट्रेन यात्रा में कैसे मदद कर सकता हूँ?",
    defaultReply: "मैं TrackWave सीट उपलब्धता, बुकिंग, ट्रैकिंग और कैंसिलेशन में आपकी मदद कर सकता हूँ।",
    pnrReply: "अपनी ट्रेन ट्रैक करने या PNR स्टेटस देखने के लिए 'View My Bookings' पर जाएं।",
    cancelReply: "टिकट रद्द करने के लिए कृपया अपनी बुकिंग सेक्शन में जाएं।",
    seatQueryReply: "सीट की उपलब्धता जांचने के लिए, कृपया अपना **प्रस्थान स्टेशन**, **गंतव्य** और **यात्रा की तारीख** बताएं।",
    bookPrompt: "आइए आपकी बुकिंग शुरू करें! कृपया प्रस्थान स्टेशन दर्ज करें:",
    toPrompt: "📍 गंतव्य स्टेशन दर्ज करें:",
    datePrompt: "📅 यात्रा की तारीख दर्ज करें (जैसे: 2026-06-15):",
    seatPrompt: "💺 कोच / सीट का प्रकार दर्ज करें (जैसे: AC 3Tier, Sleeper):",
    passengerCountPrompt: "👥 कितने यात्री यात्रा कर रहे हैं? (जैसे: 1, 2, 3)",
    passengerNamePrompt: "📝 यात्री का पूरा नाम दर्ज करें:",
    summaryTitle: "बुकिंग सारांश (भुगतान के लिए तैयार)",
    paymentBtn: "💳 भुगतान के लिए आगे बढ़ें",
    errorVoice: "इस ब्राउज़र में वॉयस रिकग्निशन समर्थित नहीं है.",
  }
};

function ChatBotWidget() {
  const navigate = useNavigate();
  const { updateBooking } = useBooking();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [lang, setLang] = useState("en");
  const [isDark, setIsDark] = useState(false);

  // Booking Flow States
  const [bookingStep, setBookingStep] = useState(0); 
  const [bookingData, setBookingData] = useState({
    from: "",
    to: "",
    date: "",
    seatType: "",
    passengerCount: 1,
    passengers: [],
  });
  const [currentPassengerIndex, setCurrentPassengerIndex] = useState(0);

  const t = translations[lang];

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("trackwave_chat_history");
    return saved ? JSON.parse(saved) : [
      { sender: "AI", text: translations["en"].welcome }
    ];
  });

  useEffect(() => {
    localStorage.setItem("trackwave_chat_history", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("trackwave_chat_theme");
    if (savedTheme === "dark") {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("trackwave_chat_theme", newTheme ? "dark" : "light");
  };

  const addAIMessage = (text) => {
    setMessages(prev => [...prev, { sender: "AI", text }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { sender: "You", text }]);
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    setBookingStep(0); 
    setMessages([
      { sender: "AI", text: translations[newLang].welcome }
    ]);
  };

  const handleUserQuestion = (query) => {
    const q = query.toLowerCase();

    // 1. Interactive Booking & Passenger Collection Steps
    if (bookingStep > 0) {
      if (bookingStep === 1) {
        setBookingData(prev => ({ ...prev, from: query }));
        addAIMessage(t.toPrompt);
        setBookingStep(2);
        return;
      } else if (bookingStep === 2) {
        setBookingData(prev => ({ ...prev, to: query }));
        addAIMessage(t.datePrompt);
        setBookingStep(3);
        return;
      } else if (bookingStep === 3) {
        setBookingData(prev => ({ ...prev, date: query }));
        addAIMessage(t.seatPrompt);
        setBookingStep(4);
        return;
      } else if (bookingStep === 4) {
        setBookingData(prev => ({ ...prev, seatType: query }));
        addAIMessage(t.passengerCountPrompt);
        setBookingStep(5);
        return;
      } else if (bookingStep === 5) {
        const count = parseInt(query) || 1;
        setBookingData(prev => ({ ...prev, passengerCount: count, passengers: [] }));
        setCurrentPassengerIndex(0);
        addAIMessage(`${t.passengerNamePrompt} 1 (of ${count}):`);
        setBookingStep(6);
        return;
      } else if (bookingStep === 6) {
        const updatedPassengers = [...bookingData.passengers, { name: query, age: "25", gender: "Not Specified", seat: `Seat-${bookingData.passengers.length + 1}` }];
        setBookingData(prev => ({ ...prev, passengers: updatedPassengers }));

        if (currentPassengerIndex + 1 < bookingData.passengerCount) {
          setCurrentPassengerIndex(prev => prev + 1);
          addAIMessage(`${t.passengerNamePrompt} ${currentPassengerIndex + 2} (of ${bookingData.passengerCount}):`);
        } else {
          addAIMessage(`✅ All passenger details successfully registered! Please review your summary and proceed to payment.`);
          setBookingStep(7); // Show Summary Card with Payment Button
        }
        return;
      }
    }

    // 2. Keyword & Intent Recognition
    if (q === "hi" || q === "hello" || q === "hai" || q === "హాయ్" || q === "नमस्ते") {
      addAIMessage(t.hiReply);
    } else if (q.includes("seat") || q.includes("availability") || q.includes("available") || q.includes("सीट") || q.includes("సీట్")) {
      addAIMessage(t.seatQueryReply);
      setBookingStep(1); 
    } else if (q.includes("book") || q.includes("ticket") || q.includes("बुक") || q.includes("బుక్")) {
      addAIMessage(t.bookPrompt);
      setBookingStep(1); 
    } else if (q.includes("track") || q.includes("pnr") || q.includes("status") || q.includes("స్థితి") || q.includes("స్టేటस")) {
      addAIMessage(t.pnrReply);
    } else if (q.includes("cancel") || q.includes("refund") || q.includes("రద్దు") || q.includes("रद्द")) {
      addAIMessage(t.cancelReply);
    } else {
      addAIMessage(t.defaultReply);
    }
  };

  const sendMessage = () => {
    if (message.trim() === "") return;

    const userInput = message;
    addUserMessage(userInput);
    setMessage("");

    setTimeout(() => {
      handleUserQuestion(userInput);
    }, 500);
  };

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(t.errorVoice);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'te' ? 'te-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.start();

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setMessage(voiceText);
    };
  };

  const handleProceedToPayment = () => {
    const finalPayload = {
      ...bookingData,
      train: { name: "TrackWave Express", fare: 500 },
      totalFare: bookingData.passengerCount * 500
    };

    updateBooking(finalPayload);
    setBookingStep(0);
    setOpen(false);
    navigate("/payment", { state: finalPayload });
  };

  return (
    <>
      <button
        className="chatbot-button"
        onClick={() => setOpen(!open)}
      >
        🤖
      </button>

      {open && (
        <div className={`chat-window ${isDark ? "dark-theme" : ""}`}>
          <div className="chat-header">
            <div className="header-left">
              <img src={robot} alt="Robot" className="robot-image" />
              <div>
                <h4>Track Wave AI</h4>
                <small>Online</small>
              </div>
            </div>
            
            <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <select 
                value={lang} 
                onChange={handleLanguageChange}
                style={{ padding: '2px 4px', borderRadius: '4px', fontSize: '11px' }}
              >
                <option value="en">English</option>
                <option value="te">తెలుగు</option>
                <option value="hi">हिन्दी</option>
              </select>
              <button 
                onClick={toggleTheme} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}
                title="Toggle Theme"
              >
                {isDark ? '☀️' : '🌙'}
              </button>
              <button className="close-btn" onClick={() => setOpen(false)}>
                ✖
              </button>
            </div>
          </div>

          <div className="chat-body">
            <div className="messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.sender === "AI" ? "ai-message" : "user-message"
                  }
                  style={{ whiteSpace: "pre-line" }}
                >
                  {msg.text}
                </div>
              ))}

              {/* Summary and Payment Action Step */}
              {bookingStep === 7 && (
                <div className="booking-summary" style={{ background: isDark ? "#333" : "#f1f1f1", padding: "10px", borderRadius: "8px", marginTop: "10px" }}>
                  <h5>{t.summaryTitle}</h5>
                  <p><b>From:</b> {bookingData.from}</p>
                  <p><b>To:</b> {bookingData.to}</p>
                  <p><b>Journey Date:</b> {bookingData.date}</p>
                  <p><b>Coach/Seat Type:</b> {bookingData.seatType}</p>
                  <p><b>Total Passengers:</b> {bookingData.passengerCount}</p>
                  
                  <div style={{ margin: "6px 0", fontSize: "12px" }}>
                    <b>Passengers:</b>
                    {bookingData.passengers.map((p, idx) => (
                      <div key={idx} style={{ marginLeft: "10px" }}>• {p.name} ({p.seat})</div>
                    ))}
                  </div>

                  <p style={{ color: "green", fontSize: "12px" }}>✔ Seats Available (Ready for Secure Checkout)</p>
                  
                  <button
                    className="menu-btn"
                    style={{ background: "#007bff", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer", marginTop: "5px", fontWeight: "bold", width: "100%" }}
                    onClick={handleProceedToPayment}
                  >
                    {t.paymentBtn}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="chat-footer">
            <input
              type="text"
              placeholder={t.placeholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                e.key === "Enter" && sendMessage();
              }}
            />
            <button className="voice-btn" onClick={startVoice} title="Voice Input">
              🎤
            </button>
            <button className="send-btn" onClick={sendMessage} title="Send">
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBotWidget;