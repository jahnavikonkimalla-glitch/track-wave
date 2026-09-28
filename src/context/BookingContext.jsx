import { createContext, useContext, useState, useEffect } from "react";

const BookingContext = createContext(null);

const initialBooking = {
  from: "",
  to: "",
  date: "",
  train: null,
  passenger: null,
  pnr: "",
  paymentMethod: "",
  gst: 50,
};

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function BookingProvider({ children }) {

  const [booking, setBooking] = useState(initialBooking);
  const [user, setUser] = useState(() => loadFromStorage("trackwave_user", null));
  const [bookings, setBookings] = useState(() => loadFromStorage("trackwave_bookings", []));

  useEffect(() => {
    if (user) {
      localStorage.setItem("trackwave_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("trackwave_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("trackwave_bookings", JSON.stringify(bookings));
  }, [bookings]);

  const updateBooking = (fields) => {
    setBooking((prev) => ({ ...prev, ...fields }));
  };

  const resetBooking = () => {
    setBooking(initialBooking);
  };

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  const addBooking = (completedBooking) => {
    setBookings((prev) => [completedBooking, ...prev]);
  };

  const removeBooking = (pnr) => {
    setBookings((prev) => prev.filter((b) => b.pnr !== pnr));
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        updateBooking,
        resetBooking,
        user,
        login,
        logout,
        bookings,
        addBooking,
        removeBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}