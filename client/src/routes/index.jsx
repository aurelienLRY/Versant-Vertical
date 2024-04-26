import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/*views*/
import HomePage from "../views/Homepage";
import Dashboard from "../views/Dashboard";
import NoFoundPage from "../views/Nofound";
import BookPage from "../views/Book";
/*outlets*/
import GetSpots from "../features/Spots/getSpots";
import GetActivities from "../features/Activity/getActivities";
import GetSessions from "../features/Session/getSession";
import GetCustomer from "../features/customer/getCustomer";
import OutletMain from "../views/Dashboard/outletMain";
/**
 * Renders the router component for handling different routes.
 * @returns {JSX.Element} The router component.
 */
function Routeur() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/book" element={<BookPage />} />
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/"/>} >
        <Route  index element={<OutletMain/>} />
        <Route path="spot" element={<GetSpots />} />
        <Route path="sessions" element={<GetSessions/>} />
       < Route path="customer-session" element={<GetCustomer/>} />
        <Route path="activities" element={<GetActivities/>} />
      </Route>
      <Route path="*" element={<NoFoundPage/>} />
    </Routes>
  );
}

export default Routeur;