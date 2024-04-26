import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionGetAllSession } from "../redux/actions/sessionAction";

/**
 * Custom hook to retrieve bookings from the Redux store.
 * @returns {Array} The array of bookings.
 */
function useSessions() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.session.sessions);

  useEffect(() => {
    if (bookings.length === 0) {
      dispatch(ActionGetAllSession());
    }
  }, [bookings, dispatch]);

  return bookings;
}

export default useSessions;