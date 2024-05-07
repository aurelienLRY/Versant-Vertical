import React from "react";
import Modal from "../modal";
/*custom hooks */
import useSessions from "../../hooks/useSessions";
import useActivities from "../../hooks/useActivities";
import useCustomerSession from "../../hooks/useCustomerSession";
import useSpots from "../../hooks/useSpot";

/*components */
import CustomerCard from "../customerCard";

/*services */
import {
  filterCustomerSessionBySessionId,
  findItemById,
} from "../../services/relationCollection";
import { formatDate, formatTime } from "../../services/formatDate";

/*style */
import "./sessionDetails.scss";

function SessionDetails({ isOpen, Closed, sessionId }) {
  const { allSession } = useSessions();
  const activities = useActivities();
  const customersSession = useCustomerSession();
  const spots = useSpots();
console.log("allSessions",allSession)
  const session = findItemById(allSession, sessionId);
  console.log(session);
  const spot = findItemById(spots, session.spot);
  const activity = findItemById(activities, session.activity);
  const activityName = activity.name;

  const customerSession = filterCustomerSessionBySessionId(
    sessionId,
    customersSession
  );

  return (
    <Modal isOpened={isOpen} Closed={Closed}>
      <div className="sessionDetails">
        <div className="sessionDetails_header">
          <h3>Détails de la session</h3>
        </div>
        <div className="sessionDetails_body">
          <p>
            <strong>Activité:</strong> {activityName}{" "}
          </p>
          <p>
            <strong>Lieu:</strong> {spot.name}{" "}
          </p>
          <p>
            <strong>Date :</strong> {formatDate(session.date)}
          </p>
          <p>
            <strong>Heure:</strong>
            {` de ${formatTime(session.startTime)}h à ${formatTime(
              session.endTime
            )}h `}
          </p>
          <p>
            <strong>Nombre de participants:</strong> {session.placesReserved}
          </p>
          <p>
            <strong>Places disponibles:</strong>
            {` ${session.placesMax - session.placesReserved}`}
          </p>

          <div className="customerSession">
            <h4>Participants</h4>
            <div className="customerSession_group">
              {customerSession.map((customer, index) => (
                <CustomerCard
                  key={index}
                  customer={customer}
                  typeAction="details"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="sessionDetails_footer"></div>
      </div>
    </Modal>
  );
}

export default SessionDetails;
