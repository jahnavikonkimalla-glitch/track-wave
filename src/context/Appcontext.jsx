import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const translations = {
  English: {
    title: "AI Train Booking Assistant",
    placeholder: "Type e.g., 'Book train from Hyderabad to Chennai'...",
    send: "Send",
    selectLang: "Language",
    trainsFound: "Here are the matching trains:",
    bookingSuccess: "Ticket successfully booked! PNR generated:",
  },
  Hindi: {
    title: "एआई ट्रेन बुकिंग सहायक",
    placeholder: "टाइप करें जैसे 'हैदराबाद से चेन्नई के लिए ट्रेन बुक करें'...",
    send: "भेजें",
    selectLang: "भाषा",
    trainsFound: "यहाँ मिलान करने वाली ट्रेनें हैं:",
    bookingSuccess: "टिकट सफलतापूर्वक बुक हो गया! पीएनआर:",
  },
  Telugu: {
    title: "AI రైలు బుకింగ్ సహాయకుడు",
    placeholder: "ఉదాహరణకు టైప్ చేయండి 'హైదరాబాద్ నుండి చెన్నైకి రైలు బుక్ చేయండి'...",
    send: "పంపు",
    selectLang: "భాష",
    trainsFound: "సరిపోలే రైళ్లు ఇక్కడ ఉన్నాయి:",
    bookingSuccess: "టికెట్ విజయవంతంగా బుక్ చేయబడింది! PNR:",
  },
  Tamil: {
    title: "AI ரயில் முன்பதிவு உதவியாளர்",
    placeholder: "உதாரணமாக தட்டச்சு செய்க 'ஹைதராபாத்தில் இருந்து சென்னைக்கு ரயில் பதிவு செய்'...",
    send: "அனுப்பு",
    selectLang: "மொழி",
    trainsFound: "பொருத்தமான ரயில்கள் இதோ:",
    bookingSuccess: "டிக்கெட் வெற்றிகரமாக முன்பதிவு செய்யப்பட்டது! PNR:",
  },
  Odia: {
    title: "AI ଟ୍ରେନ୍ ବୁକିଂ ସହାୟକ",
    placeholder: "ଟାଇପ୍ କରନ୍ତୁ ଯେପରି 'ହାଇଦ୍ରାବାଦରୁ ଚେନ୍ନାଇ ପାଇଁ ଟ୍ରେନ୍ ବୁକ୍ କରନ୍ତୁ'...",
    send: "ପଠାନ୍ତୁ",
    selectLang: "ଭାଷା",
    trainsFound: "ଏଠାରେ ମେ খাওয়ার ଟ୍ରେନ୍ ଗୁଡ଼ିକ ଅଛି:",
    bookingSuccess: "ଟିକେଟ୍ ସଫଳତାପୂର୍ବକ ବୁକ୍ ହୋଇଛି! PNR:",
  }
};

export function AppProvider({ children }) {
  const [currentLang, setCurrentLang] = useState("English");
  const [chatHistory, setChatHistory] = useState([
    { sender: "ai", text: "Hello! I am your AI assistant. You can search trains, select 'From' and 'To' stations, pick your language preference, and book tickets right here!" }
  ]);

  const t = (key) => translations[currentLang]?.[key] || translations["English"][key] || key;

  return (
    <AppContext.Provider value={{ currentLang, setCurrentLang, chatHistory, setChatHistory, t }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);