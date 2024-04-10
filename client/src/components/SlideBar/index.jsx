import React from "react";
import { Link } from "react-router-dom";
import "./slideBar.scss";
function SlideBar() {
  return (
    <nav className="slidebar">
      <Link to="/dashboard" className="slidebar-link">
        Dashboard
      </Link>
      <Link to="/dashboard/activities" className="slidebar-link">
        Activités
      </Link>
      <Link to="/dashboard/Spot" className="slidebar-link">
        Spot
      </Link>
      <Link to="/dashboard/reservation" className="slidebar-link">
        Réservation
      </Link>
    </nav>
  );
}

export default SlideBar;
