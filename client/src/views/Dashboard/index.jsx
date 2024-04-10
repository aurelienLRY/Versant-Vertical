// Desc: Dashboard view
import {useSelector , useDispatch} from 'react-redux'
import { Navigate , Outlet  } from "react-router-dom";
import SlideBar from "../../components/SlideBar";
import "./dashboard.scss";


import {ActionGetAllActivities} from "../../redux/actions/activityAction"; //importing the action to get all activities

function Dashboard() {
  const dispatch = useDispatch();//dispatch function
  
  
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated) //getting the isAuthenticated state from the store
  
  
  dispatch(ActionGetAllActivities());//dispatching the action to get all activities
  
  
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
