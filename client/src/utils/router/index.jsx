import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";



/*views*/
import HomePage from "../../views/Homepage";
import Dashboard from "../../views/Dashboard";
import Spot from "../../views/Dashboard/spot";
import Reservation from "../../views/Dashboard/reservations";

function Routeur() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/"/>} >
        <Route path="spot" element={<Spot />} />
        <Route path="reservation" element={<Reservation />} />
      </Route>
    </Routes>
  );
}

export default Routeur;