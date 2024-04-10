import { useSelector } from 'react-redux';
/**
 * Custom hook to retrieve activities from the Redux store.
 * @returns {Array} The activities array.
 */
function useActivities() {
  const activities = useSelector((state) => state.activity.activities);
  return activities;
}

export default useActivities;