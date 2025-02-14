import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AddEvent = () => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventId, setEventId] = useState(null);

  // Check if event data exists in localStorage and load it
  useEffect(() => {
    const storedEvent = localStorage.getItem('eventData');
    if (storedEvent) {
      const event = JSON.parse(storedEvent);
      setEventName(event.name);
      setEventDate(event.date);
      setEventId(event.id);
    }
  }, []);

  const handleSave = () => {
    const newEvent = {
      id: eventId || Date.now(),  // Generate a new ID if not already present
      name: eventName,
      date: eventDate,
    };

    // Save to localStorage
    localStorage.setItem('eventData', JSON.stringify(newEvent));

    // Navigate back to event list or another page
    navigate('/events');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Add / Edit Event</h1>

      <div className="bg-[#112240] p-8 rounded-lg shadow-lg">
        {/* Event Form */}
        <div className="mb-4">
          <label className="block text-sm text-gray-300">Event Name</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#0A263D] text-white border border-gray-500 focus:ring-2 focus:ring-[#65D9E9]"
            placeholder="Enter event name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-300">Event Date</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#0A263D] text-white border border-gray-500 focus:ring-2 focus:ring-[#65D9E9]"
          />
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => navigate('/events')}
            className="px-6 py-2 border border-gray-500 rounded-lg text-gray-300 hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-[#65D9E9] text-black hover:bg-[#52BCCF] transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
