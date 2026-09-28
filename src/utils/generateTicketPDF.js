import jsPDF from "jspdf";

/**
 * Generates a Track Wave e-ticket PDF and triggers a download.
 * @param {Object} booking - booking data from chatbot state or context
 */
export function generateTicketPDF(booking) {
  if (!booking) {
    alert("Booking details are missing. Cannot generate ticket.");
    return;
  }

  // Handle both chatbot data structure and website nested objects
  const train = booking.train || {
    name: "Track Wave Express",
    number: "12655",
    from: booking.from || "Source",
    to: booking.to || "Destination",
    departure: "06:00 AM",
    arrival: "02:00 PM",
    fare: 550,
  };

  const passenger = booking.passenger || {
    name: booking.passengerName || "Valued Passenger",
    age: booking.age || "25",
    gender: booking.gender || "Any",
    coach: booking.coach || "AC",
    seat: booking.seat || "Lower",
  };

  const pnr = booking.pnr || "TRK" + Math.floor(100000 + Math.random() * 900000);
  const date = booking.date || new Date().toISOString().split("T")[0];
  const paymentMethod = booking.paymentMethod || "Online Payment";
  const gst = booking.gst || 25;

  const fare = train.fare;
  const total = fare + gst;

  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 40;
  let y = 50;

  // Header
  doc.setFillColor(21, 101, 192); // brand blue
  doc.rect(0, 0, pageWidth, 70, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Track Wave", marginX, 45);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("E-Ticket / Railway Reservation", marginX, 62);

  y = 100;
  doc.setTextColor(0, 0, 0);

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Booking Confirmed", marginX, y);

  y += 25;

  const rows = [
    ["PNR Number", pnr],
    ["Train Name", train.name],
    ["Train Number", train.number],
    ["From", train.from],
    ["To", train.to],
    ["Journey Date", date],
    ["Departure", train.departure],
    ["Arrival", train.arrival],
    ["Passenger Name", passenger.name],
    ["Age / Gender", `${passenger.age} / ${passenger.gender}`],
    ["Coach", passenger.coach],
    ["Seat Preference", passenger.seat],
    ["Payment Method", paymentMethod],
    ["Ticket Fare", `Rs. ${fare}`],
    ["GST", `Rs. ${gst}`],
    ["Total Paid", `Rs. ${total}`],
  ];

  doc.setFontSize(11);

  const labelX = marginX;
  const valueX = 220;
  const rowHeight = 24;

  rows.forEach(([label, value], index) => {
    const rowY = y + index * rowHeight;

    if (index % 2 === 0) {
      doc.setFillColor(244, 247, 251);
      doc.rect(marginX - 10, rowY - 15, pageWidth - (marginX - 10) * 2, rowHeight, "F");
    }

    doc.setFont("helvetica", "bold");
    doc.text(String(label), labelX, rowY);

    doc.setFont("helvetica", "normal");
    doc.text(String(value), valueX, rowY);
  });

  const footerY = y + rows.length * rowHeight + 30;

  doc.setDrawColor(200, 200, 200);
  doc.line(marginX, footerY, pageWidth - marginX, footerY);

  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "This is a computer-generated e-ticket and does not require a signature.",
    marginX,
    footerY + 18
  );
  doc.text(
    "Please carry a valid photo ID during your journey.",
    marginX,
    footerY + 32
  );

  doc.save(`TrackWave_Ticket_${pnr}.pdf`);
}