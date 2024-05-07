import { useState } from "react";
import {
  findActivityById,
  findItemNameById,
} from "../../services/relationCollection";
import { formatDate } from "../../services/formatDate";
import useActivities from "../../hooks/useActivities";
import useSpots from "../../hooks/useSpot";
import { BsPeopleFill } from "react-icons/bs";

import "./sessionCard.scss";

function SessionCard({
  session,
  updateSession,
  deleteSession,
  detailsSession,
}) {
  const {
    date,
    startTime,
    endTime,
    activity,
    spot,
    placesMax,
    placesReserved,
  } = session;
  const activities = useActivities();
  const spots = useSpots();
  const activityName = findActivityById(activities, activity);
  const spotName = findItemNameById(spots, spot);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  return (
    <div
      className="sessionCard card"
      data-testId="sessionCard"
      onClick={() => setIsDetailsOpen(!isDetailsOpen)}
    >
      <div className="card_header">
        <h3>{activityName}</h3>
        {placesReserved > 0 && (
          <p className="placesReserved">
            <BsPeopleFill className="icon" />
            <strong>{placesReserved} </strong>{" "}
            {placesReserved > 1 ? "places réservées" : "place réservée"}{" "}
          </p>
        )}
      </div>
      <div className="overflow">
        <div className={`collapse ${isDetailsOpen ? "open" : "closed"}`}>
          <div className="card_body">
            <p>
              <strong>Date :</strong> {formatDate(date)}
            </p>
            <p>
              <strong>Heure:</strong> {`${startTime}h à ${endTime}h`}
            </p>
            <p>
              <strong>Lieu :</strong> {spotName}
            </p>
            <p>
              <strong>Places disponibles :</strong> {placesMax - placesReserved}
            </p>
          </div>
          <div className="card_footer">
            {detailsSession && (
              <button className="btn-outline small " onClick={detailsSession}>
                Détails
              </button>
            )}
            {updateSession && (
              <button
                className="btn-warning-outline small "
                onClick={updateSession}
              >
                Modifier
              </button>
            )}
            {deleteSession && (
              <button
                className="btn-danger-outline small"
                onClick={deleteSession}
              >
                {placesReserved > 0 ? "Annuler" : "Supprimer"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionCard;
