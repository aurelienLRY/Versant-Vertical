// Desc: Dashboard view
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import SlideBar from "../../components/SlideBar";

import useCustomerSession from "../../hooks/useCustomerSession";

import "./dashboard.scss";

function Dashboard() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); //getting the isAuthenticated state from the store
 const customers = useCustomerSession();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <main className="dashboard" data-testid="dashboard">
      <SlideBar />
      <section>
        <Outlet />
      </section>
    </main>
  );
}

export default Dashboard;
