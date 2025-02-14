import React from 'react';

const AboutProject = () => {
  return (
      <div className='bg-gray-900 text-white p-6'>
        <header className='text-center'>
      <h1 className="text-3xl font-bold mb-6">About Project</h1>
      </header>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <p className="text-gray-300 text-lg">
        This project is a conference ticket booking system built using React. Users can browse upcoming events, 
        book tickets, and view their booked tickets.
      </p>
    </div>
      </div>
  );
};

export default AboutProject;
