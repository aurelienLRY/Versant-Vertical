import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionGetAllCustomer } from "../redux/actions/customerAction";


/**
 * Custom hook to retrieve customers from the Redux store.
 * @returns {Array} The customers array.
 */
function useCustomerSession() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customerSession.customers);

  useEffect(() => {
    if (customers.length === 0) {
      dispatch(ActionGetAllCustomer());
    }
  }, [customers, dispatch]);

  return customers;
}

export default useCustomerSession;