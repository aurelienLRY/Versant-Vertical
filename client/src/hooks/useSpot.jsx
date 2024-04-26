import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionGetAllSpots } from "../redux/actions/spotAction";

/**
 * Custom hook to retrieve spots from the Redux store.
 * @returns {Array} The spots array.
 */
function useSpots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spot.spots);

  useEffect(() => {
    if (spots.length === 0) {
      dispatch(ActionGetAllSpots());
    }
  }, [spots, dispatch]);

  return spots;
}

export default useSpots;