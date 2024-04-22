
import { useSelector } from "react-redux";

/**
 * Custom hook to retrieve bookings from the Redux store.
 * @returns {Array} The array of bookings.
 */
function useBookings() {
  const booking = useSelector((state) => state.booking.bookings);
  return booking;
}

export default useBookings;