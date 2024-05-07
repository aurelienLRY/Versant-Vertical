import React from "react";

/* librairie*/
import { Collapse } from "antd";

/* components */
import CustomerCard from "../../../components/customerCard";
/* services*/
import { formatDate, formatTime } from "../../../services/formatDate";
import {
  findItemNameById,
  filterCustomerSessionBySessionId,
} from "../../../services/relationCollection";
/* custom hooks */
import useSessions from "../../../hooks/useSessions";
import useCustomerSession from "../../../hooks/useCustomerSession";
import useActivities from "../../../hooks/useActivities";
import useSpot from "../../../hooks/useSpot";
/* styles */
import "./getCustomer.scss";

function GetCustomersSession() {
  const customers = useCustomerSession();
  const { activeSessions } = useSessions();
  const activities = useActivities();
  const spots = useSpot();
  const reservedSessions = activeSessions.filter(
    (session) => session.placesReserved > 0
  );

  const handleAction = () => {
    console.log("action");
  };

  const headerCollapse = (session) => {
    return (
      <>
        <h4>
          {findItemNameById(activities, session.activity)} du{" "}
          {formatDate(session.date)} à {session.startTime}
        </h4>
        <p>{findItemNameById(spots, session.spot)}</p>
      </>
    );
  };

  const bodyCollapse = (session) => {
    return (
      <div className="session_grid">
        {filterCustomerSessionBySessionId(session._id, customers).map(
          (customerSession) => {
            return (
              <CustomerCard
                customer={customerSession}
                typeAction="details"
                action={handleAction}
              />
            );
          }
        )}
      </div>
    );
  };

  const items = reservedSessions.map((session, index) => {
    return {
      key: (index + 1).toString(),
      label: headerCollapse(session),
      children: bodyCollapse(session), // Remplacez `session` par la propriété appropriée de l'objet session
    };
  });



  return (
    <article className="customers_session">
      <h3>Sessions reservées</h3>
      <Collapse accordion items={items} />
    </article>
  );
}

export default GetCustomersSession;
