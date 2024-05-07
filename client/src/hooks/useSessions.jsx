import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionGetAllSession } from "../redux/actions/sessionAction";

/**
 * Custom hook to retrieve bookings from the Redux store.
 * @returns {Array} The array of bookings.
 */
function useSessions() {
  const dispatch = useDispatch();
  const allSession = useSelector((state) => state.session.sessions);
  const activeSessions = allSession.filter( (booking) => booking.status === "active");
  const archivedSessions = allSession.filter( (booking) => booking.status === "archived");

  useEffect(() => {
    if (allSession.length === 0) {
      dispatch(ActionGetAllSession());
    }
  }, [allSession, dispatch]);

  return {"allSession" : allSession  , "activeSessions" : activeSessions , 'archivedSessions' :archivedSessions} ;
}

export default useSessions;