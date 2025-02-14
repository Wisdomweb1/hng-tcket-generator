import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { Link } from "react-router-dom";
import logo from "../profile/images/logo.png";
import arrow from "../profile/images/arrow.png";

const EditProfile = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  const [specialRequest, setSpecialRequest] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("userData"));
    if (savedData) {
      setFullName(savedData.fullName);
      setEmail(savedData.email);
      setAvatar(savedData.avatar);

      setSpecialRequest(savedData.specialRequest || "");
    }
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !email || !avatar) {
      alert("All fields are required!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Invalid email format!");
      return;
    }

    const updatedData = { fullName, email, avatar, specialRequest };
    localStorage.setItem("userData", JSON.stringify(updatedData));

    // Generate & Save Ticket as a Blob URL
    const ticketBlob = generateTicket(updatedData);
    const ticketURL = URL.createObjectURL(ticketBlob);
    localStorage.setItem("ticket", ticketURL); // Store ticket as a direct URL

    alert("Profile updated successfully!");
    navigate("/ticketConfirmation"); // Ensure this route is correctly defined
  };

  const generateTicket = (data) => {
    const doc = new jsPDF();
    doc.text("🎟 Conference Ticket", 10, 10);
    doc.text(`Name: ${data.fullName}`, 10, 20);
    doc.text(`Email: ${data.email}`, 10, 30);
    doc.text(`Special Request: ${data.specialRequest || "None"}`, 10, 40);
    doc.addImage(data.avatar, "JPEG", 10, 50, 30, 30);
    return doc.output("blob");
  };

  const handleImageClick = () => {
    document.getElementById("avatar-upload").click();
  };

  const handleClear = () => {
    setFullName("");
    setEmail("");
    setAvatar("");
    setSpecialRequest("");
  };

  return (
    <div className="bg-gray-900 p-20">
      <header className="flex flex-col md:flex-row justify-between items-center p-3 md:p-3 border border-b-slate-500 rounded-2xl mx-4 ">
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

      <div className="min-h-screen p-28">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-white mb-6">Edit Profile</h1>
          <h1 className="text-2xl font-bold text-white mb-6">2/3</h1>
        </div>
        <hr className=" border-blue-500 mb-5 " />
        <div className="flex flex-col items-center justify-center  bg-gray-900">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-6 rounded-lg shadow-lg w-full "
          >
            <h2 className="text-white">Upload Your Profile</h2>

            {/* Avatar Upload Section */}
            <div
              className="flex justify-center mb-4 relative cursor-pointer"
              onClick={handleImageClick}
            >
              {/* Display Avatar Image */}
              <img
                src={avatar || "https://via.placeholder.com/150"}
                alt="Avatar"
                className="w-24 h-24 rounded-lg border-2 border-teal-500"
              />

              {/* Upload Text and Icon */}
              {!avatar && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-xs bg-black bg-opacity-50 rounded-full">
                  <span>Drag & Drop or Click to Upload</span>
                </div>
              )}

              {/* Hidden File Input */}
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            <label className="block text-gray-300 mb-1">Full Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white mb-4"
              required
            />

            <label className="block text-gray-300 mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white mb-4"
              required
            />

            <label className="block text-gray-300 mb-1">Special Request:</label>
            <textarea
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white mb-4"
            ></textarea>

            {/* Button Group */}
            <div className="flex space-x-4">
              {/* Clear Button */}
              <button
                type="button"
                onClick={handleClear}
                className="w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-500 transition"
              >
                Clear
              </button>

              {/* Save & Generate Ticket Button */}
              <button
                type="submit"
                className="w-full bg-teal-500 text-white p-2 rounded hover:bg-teal-700 transition"
              >
                Save & Generate Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
