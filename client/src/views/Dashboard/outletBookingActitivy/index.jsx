
import CreateBookingActivity from "../../../features/createBookingActivity";
import BookingActivities from "../../../features/getBookingActivity";
import "./reservation.scss";



function OutletBooking() {
  return (
    <div className="outletReservation">
      <BookingActivities />
      <CreateBookingActivity />
    </div>
  );
}

export default OutletBooking;
