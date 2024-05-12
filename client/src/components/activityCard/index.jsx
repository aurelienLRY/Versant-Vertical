/* librairie*/
import React from "react";
import PropTypes from "prop-types";

/* styles */
import "./activityCard.scss";

function ActivityCard({ activity, updateActivity, deleteActivity }) {
  const {
    name,
    description,
    half_day,
    full_day,
    price_half_day,
    price_full_day,
    min_age,
    max_OfPeople,
    min_OfPeople,
  } = activity;



  return (
      <div className="activityCard card" data-testId="activityCard">
        <div className=" card_header">
          <h3>{name}</h3>
        </div>
        <div className="card_body">
          <p>
            <strong>Nombre de personnes :</strong>{" "}
            {min_OfPeople && "Min : " + min_OfPeople}
            {min_OfPeople && max_OfPeople && " | "}
            {max_OfPeople && "Max : " + max_OfPeople}
          </p>
          <p>
            <strong> Type de formules: </strong> {half_day && "Demi-journée"}
            {half_day && full_day && " | "}
            {full_day && "Journée"}
          </p>
          <p>
            <strong> Tarifs :</strong>{" "}
            {price_half_day && "Demi-journée : " + price_half_day + "€"}
            {price_half_day && price_full_day && " | "}
            {price_full_day && "Journée : " + price_full_day + "€"}
          </p>
          <p>
            <strong> Age minimum :</strong> {min_age && min_age + " ans"}
          </p>
          <p>
            <strong> Nombre de participants :</strong>{" "}
            {min_OfPeople && "Min : " + min_OfPeople}
            {min_OfPeople && max_OfPeople && " | "}
            {max_OfPeople && "Max : " + max_OfPeople}
          </p>
          <p>
            <strong> Description :</strong> {description}
          </p>
        </div>
        <div className="card_footer">
          <button
            className="btn-warning-outline small"
            onClick={updateActivity}
          >
            Modifier
          </button>
          <button className="btn-danger-outline small" onClick={deleteActivity}>
            Supprimer
          </button>
        </div>
      </div>
  );
}

export default ActivityCard;
