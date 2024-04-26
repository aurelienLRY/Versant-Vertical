/* hook*/
import { useState } from "react";

/* custom hooks */
import useActivities from "../../../hooks/useActivities";
import useToken from "../../../hooks/useToken";

/* Components */
import Feedback from "../../../components/FeedBack";

/* libraries */
import { Tooltip } from "antd";
import { IoMdAddCircle, IoIosRemoveCircle } from "react-icons/io";
import PropTypes from "prop-types";

/*redux*/
import { useDispatch } from "react-redux";
import { ActionCreateCustomer } from "../../../redux/actions/customerAction";

/* Styles */
import "./addCustomer.scss";
import { formatDate } from "../../../services/formatDate";

function AddCustomer({ session, newSession, closed }) {
  const [erreur, setErreur] = useState(null);
  const [success, setSuccess] = useState(null);
  const [index, setIndex] = useState(0);
  const [placesReserved, setPlacesReserved] = useState(1);

  const activities = useActivities();
  const token = useToken();
  const activity = activities.find(
    (activity) => activity._id === session.activity
  );

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const customer = Array.from(formData.entries()).reduce(
      (acc, [key, value]) => {
        if (key.startsWith("size") || key.startsWith("weight")) {
          const index = key.split("-")[1];
          if (!acc.people_list) {
            acc.people_list = [];
          }
          if (!acc.people_list[index]) {
            acc.people_list[index] = {};
          }
          acc.people_list[index][key.split("-")[0]] = value;
        } else {
          acc[key] = value;
        }
        return acc;
      },
      {
        sessionId: session._id,
        date: new Date(),
        status: "validated",
        typeOfReservation: "ByCompany",
        number_of_people: placesReserved,
      }
    );
    console.log(customer);
    const action = await dispatch(ActionCreateCustomer({ token, customer }));
    if (action.type.endsWith("fulfilled")) {
      console.log("payload >>>>>>", action.payload);
      setSuccess("Client ajouté avec succès");
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    }
    if (action.type.endsWith("rejected")) {
      setErreur(action.error.message);
      setTimeout(() => {
        setErreur(null);
      }, 5000);
    }
  };

  return (
    <div className="addCustomer">
      <div className="addCustomer_header">
        <h3>Ajouter un client</h3>
        <p>
          Session: {activity.name} <br></br> le {formatDate(session.date)} à{" "}
          {session.startTime}h
        </p>
        <Feedback err={erreur} success={success} />
      </div>
      {index === 0 && (
        <form onSubmit={handleSubmit} className="addCustomer_form">
          <div className="group-form">
            <label htmlFor="last_name">
              Nom
              <input type="text" name="last_name" required />
            </label>
            <label htmlFor="first_names">
              Prénoms
              <input type="text" name="first_names" required />
            </label>
          </div>

          <div className="group-form">
            <label htmlFor="email">
              Email
              <input type="email" name="email" required />
            </label>
            <label htmlFor="phone">
              Téléphone
              <input type="tel" name="phone" required />
            </label>
          </div>
          {placesReserved && (
            <div className="placesReserved">
              <div className="placesReserved_header">
                <h4>Participant</h4>
                <Tooltip title="Ajouter un participant">
                  <IoMdAddCircle
                    className="icon add"
                    onClick={() => setPlacesReserved(placesReserved + 1)}
                  />
                </Tooltip>
                <Tooltip title="Supprimer un participant">
                  <IoIosRemoveCircle
                    className="icon add"
                    onClick={() => setPlacesReserved(placesReserved - 1)}
                  />
                </Tooltip>
              </div>
              {Array.from({ length: placesReserved }, (_, index) => (
                <>
                  <span> Personne {index + 1} </span>
                  <div key={index} className="group-form">
                    <label htmlFor={`size-${index}`}>
                      Taille en cm
                      <input
                        type="number"
                        id={`size-${index}`}
                        name={`size-${index}`}
                        min="1"
                        required
                        placeholder="Exemple: 180"
                      />
                    </label>

                    <label htmlFor={`weight-${index}`}>
                      Poids en kg
                      <input
                        type="number"
                        id={`weight-${index}`}
                        name={`weight-${index}`}
                        min="1"
                        required
                        placeholder="Exemple: 70"
                      />
                    </label>
                  </div>
                </>
              ))}
            </div>
          )}

          <button type="submit" className="btn">
            Ajouter
          </button>
        </form>
      )}
      {index === 1 && (
        <div className="addCustomer_success">
          <button className="btn-secondary-outline" onClick={() => setIndex(0)}>
            Ajouter un autre client
          </button>
          <button className="btn-secondary-outline" onClick={() => newSession}>
            Créer une session
          </button>
          <button className="btn-secondary-outline" onClick={closed}>
            fermer
          </button>
        </div>
      )}
    </div>
  );
}

AddCustomer.propTypes = {
  session: PropTypes.object.isRequired,
};

export default AddCustomer;
