import React from "react";
import { Link } from "react-router-dom";
import "./slideBar.scss"
function SlideBar() {
  return (
    <nav className="slidebar">
      <Link to="/dashboard/reservation" className="slidebar-link">
        Réservation
      </Link>
      <Link to="/dashboard/Spot" className="slidebar-link">
        Spot
      </Link>
      <Link to="/dashboard/activities" className="slidebar-link">
        Activités
      </Link>
    </nav>
  );
}

export default SlideBar;
