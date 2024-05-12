import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/*views*/
import HomePage from "../views/Homepage";
import Dashboard from "../views/Dashboard";
import NoFoundPage from "../views/Nofound";
/*outlets*/
import GetSpots from "../features/Spots/getSpots";
import GetActivities from "../features/Activity/getActivities";
import GetCustomersSession from "../features/customerSession/getCustomerSession";
import OutletMain from "../views/Dashboard/outletMain";
import OutletSession from "../views/Dashboard/outletSession";
/**
 * Renders the router component for handling different routes.
 * @returns {JSX.Element} The router component.
 */
function Routeur() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/"/>} >
        <Route  index element={<OutletMain/>} />
        <Route path="spot" element={<GetSpots />} />
        <Route path="sessions" element={<OutletSession/>} />
       < Route path="customer-session" element={<GetCustomersSession/>} />
        <Route path="activities" element={<GetActivities/>} />
      </Route>
      <Route path="*" element={<NoFoundPage/>} />
    </Routes>
  );
}

export default Routeur;