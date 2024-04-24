import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionGetAllActivities } from "../redux/actions/activityAction";

/**
 * Custom hook to retrieve activities from the Redux store.
 * @returns {Array} The activities array.
 */
function useActivities() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activity.activities);

  useEffect(() => {
    if (activities.length === 0) {
      dispatch(ActionGetAllActivities());
    }
  }, [activities, dispatch]);

  return activities;
}

export default useActivities;