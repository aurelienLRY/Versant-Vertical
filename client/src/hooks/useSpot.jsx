import { useSelector } from 'react-redux';
/**
 * Custom hook to retrieve spots from the Redux store.
 * @returns {Array} The spots array.
 */
function useSpots() {
  const spots = useSelector((state) => state.spot.spots);
  return spots;
}

export default useSpots;