import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Link } from "react-router-dom";
import Home from "./assets/screens/home";
import TicketSelection from "./assets/screens/tickets";
import EditProfile from "./assets/screens/profile";
import TicketConfirmation from "./assets/screens/ticketConfirmation";
import MyTickets from "./assets/screens/myTickets";
import Events from "./assets/screens/events";
import AboutProjects from "./assets/screens/aboutProjects";
import AddEvent from "./assets/screens/addEvent";



function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <Router future={{ v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tickets" element={<TicketSelection />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/ticketConfirmation" element={<TicketConfirmation />} />
        <Route path="/aboutProjects" element={<AboutProjects />} />
        <Route path="/events" element={<Events />} />
        <Route path="/MyTickets" element={<MyTickets />} />
        <Route path="/addEvent" element={<AddEvent />} />
        
      </Routes>
    </Router>
      </div>
    </>
  );
}

export default App;
