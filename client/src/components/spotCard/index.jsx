
import React from "react";
import PropTypes from "prop-types";

/* styles */
import "./spotCard.scss";

/**
 * SpotCard component displays information about a spot.
 * @param {Object} spot - The spot object containing spot details.
 * @param {Function} updateSpot - The function to update the spot.
 * @param {Function} deleteSpot - The function to delete the spot.
 * @returns {JSX.Element} JSX representation of the SpotCard component.
 */
function SpotCard({ spot, updateSpot, deleteSpot }) {
  const { name, gpsCoordinates, half_day, full_day, estimatedDuration } = spot;
  return (
    <div className="spotCard card" data-testid="spotCard">
      <div className="card_header">
        <h3>{name}</h3>
      </div>
      <div className="card_body">
        <p>
          <strong>Nombre de personnes :</strong>{" "}
          {spot.min_OfPeople && "Min : " + spot.min_OfPeople}
          {spot.min_OfPeople && spot.max_OfPeople && " | "}
          {spot.max_OfPeople && "Max : " + spot.max_OfPeople}
        </p>
        <p>
        <strong> Type de formules: </strong>
          {" "}{half_day && "Demi-journée"}
          {half_day && full_day && " | "}
          {full_day && "Journée"}
        </p>
        <p><strong>Durée estimée :</strong>{" "}{estimatedDuration}</p>
       
        <div className="spotCard_body_activities"> 
        <strong>Activités :</strong>
          {spot.practicedActivities.map((activity, index) => (
            <span key={activity.activityId}>{activity.activityName}</span>
          ))}
        </div>
        <p>
          <strong>Localisation :</strong> {gpsCoordinates}
        </p>
        <p>
          <strong>Point de rendez-vous :</strong> {spot.meetingPoint}
        </p>
      </div>
      <div className="card_footer">
        <button className="btn-warning-outline small" onClick={updateSpot}>
          Modifier
        </button>
        <button className="btn-danger-outline small" onClick={deleteSpot}>
          Supprimer
        </button>
      </div>
    </div>
  );
}
SpotCard.PropTypes = {
  spot: PropTypes.object.isRequired,
  updateSpot: PropTypes.func.isRequired,
  deleteSpot: PropTypes.func.isRequired,
};

export default SpotCard;
