import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../profile/images/logo.png";
import arrow from "../profile/images/arrow.png";
import subtract from "../profile/images/subtract.png";
import BarCode from "../profile/images/BarCode.png";

const TicketConfirmation = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTicket = localStorage.getItem("ticket");
    const savedUserData = JSON.parse(localStorage.getItem("userData"));

    console.log(savedUserData);

    if (storedTicket && savedUserData) {
      setUserData(savedUserData);
    } else {
      alert("No ticket or user data found. Please update your profile first.");
      navigate("/");

      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("ticket", JSON.stringify(ticketData));
    }
  }, [navigate]);

  const handleBookAnotherTicket = () => {
    // Clear stored ticket and navigate to home
    localStorage.removeItem("ticket");
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div className="bg-gray-900 p-6">
      <header className="flex flex-col md:flex-row justify-between items-center p-3 md:p-3 border border-b-slate-500 rounded-2xl mx-4 ">
          <img src={logo} alt="images" />
        <div className="mt-4 md:mt-0">
          <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-9 text-white text-center px-7">
            <Link to="/events" className="hover:text-gray-300">
              Events
            </Link>
            <Link to="/mytickets" className="hover:text-gray-300">
              My Tickets
            </Link>
            <Link to="/aboutProjects" className="hover:text-gray-300">
              About Projects
            </Link>
          </ul>
        </div>
        
            <img src={arrow} alt="images" />
      </header>
      <div className="bg-gray-900 ">
        <div className="text-white flex justify-between pt-10 px-52">
          <h2>READY</h2>
          <h2>3/3</h2>
        </div>
        <hr className=" border-blue-500 mx-52" />
        <div className="flex flex-col items-center justify-center pt-10">
          <p className="text-gray-300 mb-6">
            Your ticket has been generated successfully!
          </p>

          {userData && (
            <div className="relative w-screen  h-screen flex items-center  justify-center">
              <img src={subtract} alt="background" className="absolute z-0" />
              <div className=" text-white relative z-10">
                <div className=" border-2 border-teal-800 rounded-lg  mb-10  shadow-lg">
                  <div className="text-center ">
                    <h2 className="text-2xl font-bold">HNG Fest '25</h2>
                    <p className="text-sm flex items-center justify-center">
                      <span role="img" aria-label="location">
                        📍
                      </span>{" "}
                      7a Obadina Street, Lagos island
                    </p>
                    <p className="text-sm flex items-center justify-center">
                      <span role="img" aria-label="calendar">
                        📅
                      </span>{" "}
                      March 15, 2025 | 7:00 PM
                    </p>
                  </div>

                  <div className="flex justify-center pb-1 pt-2">
                    <img
                      src={userData.avatar}
                      alt="Ticket Holder"
                      className="rounded-lg w-32 h-32 object-cover"
                    />
                  </div>

                  <div className="px-3 py-3 my-3 justify-self-center bg-teal-900 text-xs  rounded-lg w-52 relative overflow-hidden">
                    {/* Vertical line in the center */}
                    <div className="absolute top-0 left-1/2 w-px h-28 mt-3 bg-gray-300"></div>

                    <div className="grid grid-cols-2 truncate text-xs mb-2">
                      <p>Enter your name</p>
                      <p className="pl-4">Enter your email *</p>
                    </div>

                    <div className="grid grid-cols-2 text-xs font-bold mb-4">
                      <p className="truncate">{userData.fullName}</p>
                      <p className="pl-4 truncate">{userData.email}</p>
                    </div>
                    <hr />

                    <div className="grid grid-cols-2 mb-2 pt-2">
                      <h2>Ticket Type:</h2>
                      <h2 className="pl-4">Ticket for:</h2>
                    </div>

                    <div className="grid grid-cols-2 text-white font-bold mb-6">
                      <p>{userData.ticketType}</p>
                      <p className="pl-4">{userData.quantity}</p>
                    </div>

                    <hr />

                    <div className="pb-5">
                      <p className="truncate">Special request?</p>
                    </div>
                    <div className="font-bold">
                      <p>
                        {userData.specialRequest ||
                          "Nil ? Or the users sad story they write in there gets this whole space, Max of three rows"}
                      </p>
                    </div>
                  </div>
                </div>
                <img
                  className="justify-self-center pt-"
                  src={BarCode}
                  alt="images"
                />
              </div>
            </div>
          )}

          <div className="flex gap-10 pt-8">
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleBookAnotherTicket}
                className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
              >
                Book Another Ticket
              </button>
            </div>
            <div className="mt-8 text-center">
              <a
                href={localStorage.getItem("ticket")}
                download="Conference_Ticket.pdf"
                className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-700 transition"
              >
                Download Ticket
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketConfirmation;