import React from "react";
import PropTypes from "prop-types";

import { FaUserGroup } from "react-icons/fa6";

import "./customerCard.scss";

function CustomerCard({ customer, typeAction, action }) {
  const { last_name, first_names, number_of_people, email, phone, status } =
    customer;
  const tag = (status) => {
    if (status === "validated") {
      return "validé";
    }
    if (status === "pending") {
      return "warning";
    }

    if (status === "cancelled") {
      return "Annulé";
    }
  };

  return (
    <div className="customerCard">
      <span
        className={`customerCard_tag ${
          status === "validated" ? "success" : ""
        } ${status === "pending" ? "warning" : ""} ${
          status === "cancelled" ? "danger" : ""
        }`}
      >
        {tag(status)}
      </span>
      <div className="customerCard_header">
        {" "}
        <FaUserGroup className="icon" /> <span>{last_name}</span>
        {first_names}
      </div>
      <div className="customerCard_content">
        <div className="info">
          <p>{`Nombre d'inscrit: ${number_of_people}`}</p>
          <strong>Contact: </strong>
          <a href={`mailto:${email}`}>{email}</a>
          <a href="tel:+">{phone}</a>
        </div>
      </div>
      <div className="cta">
        {typeAction === "delete" && status !== "cancelled" && (
          <button className="btn-danger-outline small " onClick={action}>
            annuler
          </button>
        )}
        {typeAction === "details" && (
          <button className="btn small " onClick={action}>
            détails
          </button>
        )}
      </div>
    </div>
  );
}

CustomerCard.propTypes = {
  customer: PropTypes.object.isRequired,
  action: PropTypes.func,
};

export default CustomerCard;
