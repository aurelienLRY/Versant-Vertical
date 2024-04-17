import { useSelector } from "react-redux";

/*
 * Custom hook to retrieve booking from the Redux store.
 * @returns {Object} The booking object.
 */
function useBookings() {
  const booking = useSelector((state) => state.booking.bookings);
  return booking;
}

export default useBookings;