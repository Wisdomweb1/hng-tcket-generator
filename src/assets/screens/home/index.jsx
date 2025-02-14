import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div className=" font-serif">
       <header> <h1 className="bg-blue-500 h-96 px-28 text-7xl py-28 rounded-t-2xl">HNG Practice <br />Designs file</h1> </header>
      <footer className=" bg-green-600 h-80 px-28 py-32 text-5xl rounded-b-2xl hover:bg-green-800 transition-transform shadow-transparent">
      <Link to="/tickets ">
        <button>
          
        Ticket Booking Generator
        
      </button>
        </Link>
      </footer>
     
    </div>
  );
};

export default Home;
