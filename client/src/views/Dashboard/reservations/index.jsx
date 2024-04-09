import React from "react";
import CreateReservation from "./create";
import AllReservations from "./get";
import "./reservation.scss";

function Reservation() {



  return (
    <div className="reservation">
      <AllReservations />
      <CreateReservation />
    </div>
  );
}

export default Reservation;
