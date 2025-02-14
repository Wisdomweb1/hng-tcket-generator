import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa"; // Importing a trash icon from react-icons

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch tickets from localStorage when the component is mounted
    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(storedTickets);
  }, []); // Empty dependency array ensures it runs only once on mount

  const handleDeleteTicket = (ticketId) => {
    // Filter out the ticket with the given id
    const updatedTickets = tickets.filter((ticket) => ticket.id !== ticketId);

    // Update the tickets in localStorage
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));

    // Update the state to reflect the change in the UI
    setTickets(updatedTickets);
  };

  return (
      <div className="bg-gray-900 text-white">
        <header className="text-center p-5">
      <h1 className="text-3xl font-bold mb-6">My Tickets</h1>
      </header>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white ">
      {tickets.length === 0 ? (
        <p className="text-gray-300">You have not booked any tickets yet.</p>
      ) : (
        <ul className="space-y-4">
          {tickets.map((ticket) => (
            <li
              key={ticket.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg w-80"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-bold">{ticket.event}</h2>
                  <p>Name: {ticket.fullName}</p>
                  <p>Email: {ticket.email}</p>
                  <p>Special Request: {ticket.specialRequest || "None"}</p>
                  <p>Ticket ID: {ticket.id}</p>
                </div>

                {/* Delete Icon */}
                <button
                  onClick={() => handleDeleteTicket(ticket.id)}
                  className=" text-red-500 hover:text-red-700"
                >
                  <FaTrash size={20} />
                </button>
              </div>

              {/* Show ticket image (if available) */}
              {ticket.ticketURL && (
                <a
                  href={ticket.ticketURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-500 hover:underline mt-2 block"
                >
                  View Ticket
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
      </div>
  );
};

export default MyTickets;
