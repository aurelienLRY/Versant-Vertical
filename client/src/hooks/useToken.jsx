import { useSelector } from 'react-redux';
/**
 * Custom hook to retrieve the token from the Redux store.
 * @returns {string} The token value.
 */
function useToken() {
  const token = useSelector((state) => state.auth.user.token);
    return token;
}

export default useToken