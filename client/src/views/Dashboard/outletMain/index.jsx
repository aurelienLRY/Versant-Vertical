import { useState } from "react";

import CreateSession from "../../../features/Session/createSession";
import GetActiveSessions from "../../../features/Session/getActiveSession";
import SessionCard from "../../../components/sessionCard";
/* Custom hooks */
import useSessions from "../../../hooks/useSessions";

/* Styles */
import "./outletMain.scss";
import Modal from "../../../components/modal";
import AddCustomerSession from "../../../features/customerSession/addCustomerSession";

function OutletMain() {
  const [isCreateSessionOpen, setIsCreateSessionOpen] = useState(false);
  const [modalAddCustomer, SetModalAddCustomer] = useState(false);
  const { activeSessions } = useSessions();
  
  return (
    <>
      <h2>Dashboard</h2>
      <div className="dashboard_body">
        <div className="dashboard_stats">
          <aside>
            <iframe
              src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FParis&bgcolor=%23ffffff&showTitle=0&showCalendars=0&showTz=0&showPrint=0&src=ZDdlNzFlMzYzMmJkZjI3Mjg2Y2UyZmY5NDE0NmY0M2E1MWE5MTA3Y2FlYTJlM2U0Y2NhNjhmZTQ2OTNkOGYzOUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23F09300"
              className="calendar"
            ></iframe>
          </aside>
          <article className="dashboard_session ">
            <h3>Les sessions</h3>
            <GetActiveSessions className="dashboard_session-grid" />
          </article>
        </div>
        <div className="dashboard_action">
          <button
            onClick={() => setIsCreateSessionOpen(true)}
            className="btn xl"
          >
            Ajouter une session
          </button>
          {activeSessions.length > 0 && 
            <button className="btn xl" onClick={()=> SetModalAddCustomer(true)}>
              Ajouter un client sur une session
            </button>
          }
        </div>
      </div>

      <CreateSession
        isOpened={isCreateSessionOpen}
        modalClosed={() => setIsCreateSessionOpen(false)}
      />

      <Modal isOpened={modalAddCustomer} Closed={() => SetModalAddCustomer(false)}>
        <AddCustomerSession closed={() => SetModalAddCustomer(false) }/>
      </Modal>
    </>
  );
}

export default OutletMain;
