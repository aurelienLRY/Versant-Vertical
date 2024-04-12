import { useState } from "react";
import { Link } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { MdDashboard } from "react-icons/md";

import "./slideBar.scss";
function SlideBar() {
  const [isOpen, setIsOpen] = useState(true);

  const HandleOpened = () => {
    setIsOpen(!isOpen);
    console.log("on ouvre ", isOpen);
  };

  return (
    <nav className={isOpen ? "slidebar" : "slidebar closed"}>
      <SlArrowRight className="icon" onClick={HandleOpened} />

      <Link to="/dashboard" className="slidebar-link">
        {!isOpen ? <MdDashboard className="link_icon" /> : "Dashboard"}
      </Link>
      <Link to="/dashboard/activities" className="slidebar-link">
        Activités
      </Link>
      <Link to="/dashboard/Spot" className="slidebar-link">
        Lieux
      </Link>
      <Link to="/dashboard/reservation" className="slidebar-link">
        Programmation
      </Link>
    </nav>
  );
}

export default SlideBar;
