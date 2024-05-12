/* librairie*/
import { Collapse } from "antd";
import { useState } from "react";
/* components */
import Modal from "../../../components/modal";
import AddCustomerSession from "../addCustomerSession";
import Feedback from "../../../components/FeedBack";
/* Redux */
import { useDispatch } from "react-redux";
import { ActionUpdateCustomer } from "../../../redux/actions/customerAction";
import { ActionUpdateSession } from "../../../redux/actions/sessionAction";
import { updateBooking } from "../../../redux/reducers/sessionSlice";

/* services*/
import { formatDate } from "../../../services/formatDate";
import {
  findItemNameById,
  filterCustomerSessionBySessionId,
} from "../../../services/relationCollection";

/* custom hooks */
import useSessions from "../../../hooks/useSessions";
import useCustomerSession from "../../../hooks/useCustomerSession";
import useActivities from "../../../hooks/useActivities";
import useSpot from "../../../hooks/useSpot";
import useToken from "../../../hooks/useToken";

/* services */
import { findItemById } from "../../../services/relationCollection";

/* styles */
import "./getCustomer.scss";
import DetailsCustomerSession from "../../../components/customerCardDetails";

function GetCustomersSession() {
  const [modalAddCustomer, SetModalAddCustomer] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { activeSessions } = useSessions();
  const customers = useCustomerSession();
  const activities = useActivities();
  const spots = useSpot();
  const token = useToken();
  const dispatch = useDispatch();
  const reservedSessions = activeSessions.filter(
    (session) => session.placesReserved > 0
  );

  async function removeCustomerSession(customerId, sessionId) {
    if (window.confirm("Êtes vous sûr de vouloir annuler cette réservation?")) {
      const session = findItemById(activeSessions, sessionId);
      console.log("removeCustomerSession", customerId, sessionId);
      const customer = { ...findItemById(customers, customerId) };
      customer.status = "cancelled";
      const numberOfPeople = customer.number_of_people;
      const action = await dispatch(ActionUpdateCustomer({ token, customer }));

      if (action.type.endsWith("rejected")) {
        setError(action.error.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
      }

      if (action.type.endsWith("fulfilled")) {
        const b = {
          ...session,
          placesReserved: session.placesReserved - numberOfPeople,
        };
        dispatch(updateBooking(b));
        setSuccess("La réservation a été annulée avec succès");
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }
    }
  }

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
              <DetailsCustomerSession
                key={customerSession._id}
                sessionId = {session._id}
                customer={customerSession}
                archiveCustomer={(id) => removeCustomerSession(id, session._id)}
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
    <>
      <article className="customers_session">
        <h2>Sessions réservées</h2>
        <button
          className="btn-secondary xl"
          onClick={() => SetModalAddCustomer(true)}
        >
          {" "}
          Ajouter un client sur une session
        </button>
        <Feedback err={error} success={success} />
        <Collapse accordion items={items} />
      </article>

      <Modal
        isOpened={modalAddCustomer}
        Closed={() => SetModalAddCustomer(false)}
      >
        <AddCustomerSession closed={() => SetModalAddCustomer(false)} />
      </Modal>
    </>
  );
}

export default GetCustomersSession;
