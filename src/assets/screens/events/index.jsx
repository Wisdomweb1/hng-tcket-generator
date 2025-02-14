import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Event = () => {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    // Load event data from localStorage
    const storedEvent = localStorage.getItem('eventData');
    if (storedEvent) {
      const event = JSON.parse(storedEvent);
      setEventData([event]);  // Assuming you only have one event for now
    }
  }, []);

  return (
      <div className='bg-gray-900 text-white'>
        <header className=' text-center p-7'>
        <h1 className="text-3xl font-bold ">Upcoming Events</h1>
      </header>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="absolute top-6 right-6 ">
        <Link
          to="/addEvent"
          className="bg-teal-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 transition"
        >
          Add Event
        </Link>
      </div>

      <ul className="space-y-4">
        {eventData.length === 0 ? (
          <p>No events added yet.</p>
        ) : (
          eventData.map((event) => (
            <li key={event.id} className="bg-gray-800 p-4 rounded-lg shadow-lg w-80">
              <h2 className="text-xl font-bold">{event.name}</h2>
              <p>{event.date}</p>
              <Link to="/tickets">
              <button className="bg-teal-500 text-white py-2 px-4 rounded mt-2 hover:bg-teal-700 transition">
                Book Ticket
              </button>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
      </div>
  );
};

export default Event;
