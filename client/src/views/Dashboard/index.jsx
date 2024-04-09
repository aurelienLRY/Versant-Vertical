import React from "react";
import {useSelector} from 'react-redux'
import { Navigate , Outlet  } from "react-router-dom";
import SlideBar from "../../components/SlideBar";
import "./dashboard.scss";

function Dashboard() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <main className="dashboard" data-testid="dashboard">
      <SlideBar />
      <section>
      <h2>Dashboard</h2>
        <Outlet />
      </section>
    </main>
  );
}

export default Dashboard;
