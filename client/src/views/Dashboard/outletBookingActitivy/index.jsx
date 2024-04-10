
import CreateBookingActivity from "../../../features/createBookingActivity";
import AllReservations from "../../../features/getBookingActivity";
import "./reservation.scss";



function OutletBooking() {
  return (
    <div className="outletReservation">
      <AllReservations />
      <CreateBookingActivity />
    </div>
  );
}

export default OutletBooking;
