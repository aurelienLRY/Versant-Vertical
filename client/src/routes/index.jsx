import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/*views*/
import HomePage from "../views/Homepage";
import Dashboard from "../views/Dashboard";
/*outlets*/
import Spot from "../views/Dashboard/outletSpot";
import OutletActivity from "../views/Dashboard/outletActivity";
import OutletBooking from "../views/Dashboard/outletBookingActitivy";
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
        <Route path="spot" element={<Spot />} />
        <Route path="reservation" element={<OutletBooking />} />
        <Route path="activities" element={<OutletActivity/>} />
      </Route>
    </Routes>
  );
}

export default Routeur;