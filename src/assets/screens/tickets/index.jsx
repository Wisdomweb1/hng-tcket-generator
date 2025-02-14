import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../profile/images/logo.png";
import arrow from "../profile/images/arrow.png";

const TicketSelection = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const ticketOptions = [
    { type: "Regular Access", price: "Free", remaining: "20/52" },
    { type: "VIP Access", price: "$150", remaining: "20/52" },
    { type: "VVIP Access", price: "$150", remaining: "20/52" },
  ];

  const handleSelect = (ticketType) => {
    setSelectedTicket(ticketType);

    // Save ticket details to localStorage
    const ticketData = { ticketType, quantity };
    localStorage.setItem("ticket", JSON.stringify(ticketData));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0A192F] p-6">
      <div className="bg-[#112240] text-white p-8 rounded-lg shadow-lg w-full">
        <header className="flex flex-col md:flex-row justify-between items-center p-3 md:p-3 border border-b-slate-500 rounded-2xl mx-4 md:mx-10">
            <img className="pt-1" src={logo} alt="images" />
          <div className="mt-4 md:mt-0">
            <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-9 text-white text-center px-7">
              <Link to="/events" className="hover:text-gray-300">
                Events
              </Link>
              <Link to="/myTickets" className="hover:text-gray-300">
                My Tickets
              </Link>
              <Link to="/aboutProjects" className="hover:text-gray-300">
                About Projects
              </Link>
            </ul>
          </div>
          
              <img src={arrow} alt="images" />
        </header>

        <div className="px-28">
          <div className="flex justify-between pt-10">
            <h2 className="text-xl font-semibold text-center mb-4">
              Ticket Selection
            </h2>
            <h2 className="text-xl font-semibold text-center mb-4">1/3</h2>
          </div>
          <div className="border-b border-blue-500  mb-4"></div>

          <div className="bg-[#0A192F] p-5 rounded-lg shadow-md text-center">
            <h1 className="text-2xl font-bold text-[#65D9E9]">HNG Fest '25</h1>
            <p className="text-sm text-gray-300 mt-2">
              Join us for an unforgettable experience at <br />
              <span className="text-gray-400">[Afro B]!</span> Secure your spot
              now.
            </p>
            <p className="text-xs text-gray-400 mt-3 flex items-center justify-center gap-2">
              📍 [Lagos island] || 🕒 March 15, 2025 | 7:00 PM Till Mummy Call.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm text-gray-300 mb-2">Select Ticket Type:</h3>
            <div className="grid grid-cols-3 gap-3">
              {ticketOptions.map((ticket, index) => (
                <button
                  onClick={() => handleSelect(ticket.type)}
                  key={index}
                  className={`p-4 rounded-lg text-center border ${
                    selectedTicket === ticket.type
                      ? "border-[#65D9E9] bg-[#0A263D]"
                      : "border-gray-500"
                  } transition-all`}
                >
                  <h4 className="text-lg font-semibold">{ticket.price}</h4>
                  <p className="text-xs text-gray-400">{ticket.type}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {ticket.remaining}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm text-gray-300 block mb-2">
              Number of Tickets
            </label>
            <select
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                const ticketData = { ticketType: selectedTicket, quantity: e.target.value };
                localStorage.setItem("ticket", JSON.stringify(ticketData));
              }}
              className="w-full p-3 rounded-lg bg-[#0A263D] text-white border border-gray-500 focus:ring-2 focus:ring-[#65D9E9]"
            >
              {[...Array(5).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex justify-between">
            <button className="px-6 py-2 border border-gray-500 rounded-lg text-gray-300 hover:bg-gray-700 transition">
              Cancel
            </button>
            <Link to="/profile">
              <button
                className={`px-6 py-2 rounded-lg ${
                  selectedTicket
                    ? "bg-[#65D9E9] text-black hover:bg-[#52BCCF] transition"
                    : "bg-gray-700 cursor-not-allowed"
                }`}
                disabled={!selectedTicket}
              >
                Next →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSelection;
