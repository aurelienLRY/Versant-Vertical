import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionGetAllBookings } from "../redux/actions/bookingAction";

/**
 * Custom hook to retrieve bookings from the Redux store.
 * @returns {Array} The array of bookings.
 */
function useBookings() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.booking.bookings);

  useEffect(() => {
    if (bookings.length === 0) {
      dispatch(ActionGetAllBookings());
    }
  }, [bookings, dispatch]);

  return bookings;
}

export default useBookings;