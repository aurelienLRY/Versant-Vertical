import { useState } from "react";

/* Redux */
import { useDispatch } from "react-redux";
import { ActionUpdateCustomer } from "../../../redux/actions/customerAction";
import { ActionUpdateSession } from "../../../redux/actions/sessionAction";
import { updateBooking } from "../../../redux/reducers/sessionSlice";

/* Custom hooks */
import useActivities from "../../../hooks/useActivities";
import useSessions from "../../../hooks/useSessions";
import useCustomerSession from "../../../hooks/useCustomerSession";
import useToken from "../../../hooks/useToken";
/* Components */
import CustomerCard from "../../../components/customerCard";
import Modal from "../../../components/modal";
import Feedback from "../../../components/FeedBack";
/* servies */
import {
  findItemById,
  filterCustomerSessionBySessionId,
  findActivityNameBySessionId,
} from "../../../services/relationCollection";
import { formatDate, formatTime } from "../../../services/formatDate";

/* Styles */
import "./canceledCustomerSession.scss";

function CanceledCustomerSession({ isOpen, Closed, thisCustomerSession }) {
  const activities = useActivities();
  const { allSession } = useSessions();
  const dispatch = useDispatch();
  const customers = useCustomerSession();
  const token = useToken();

  const session = findItemById(allSession, thisCustomerSession);
  const getCustomerSession = filterCustomerSessionBySessionId(
    thisCustomerSession,
    customers
  );

  const activityName = findActivityNameBySessionId(
    activities,
    session._id,
    allSession
  );

  const allCustomerSessionIsCancelled = (getCustomerSession) =>
    getCustomerSession.every((customer) => customer.status === "cancelled");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleCanceledCustomerSession = async (id) => {
    if (window.confirm("Êtes vous sûr de vouloir annuler cette réservation?")) {
      const customer = { ...findItemById(customers, id) };
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
  };

  const handleArchiveSession = async () => {
    if (window.confirm("Voulez-vous vraiment archiver cette session?")) {
      const data = { ...session, status: "archived" };
      const action = await dispatch(ActionUpdateSession({ token, data }));

      if (action.type.endsWith("rejected")) {
        setError(action.error.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
      }

      if (action.type.endsWith("fulfilled")) {
        dispatch(updateBooking(action.payload));
        setSuccess("La session a été archivée avec succès");
        setTimeout(() => {
          setSuccess(null);
          Closed();
        }, 3000);
      }
    }
  };

  return (
    <Modal isOpened={isOpen} Closed={Closed}>
      <div className="canceledCustomerSession">
        <div className="canceledCustomerSession_header">
          <h3>Annuler la session</h3>
          <Feedback err={error} success={success} />
          <p>
            <strong>Session:</strong>
            {` ${activityName} du ${formatDate(session.date)} à 
          ${formatTime(session.startTime)}h`}
          </p>
        </div>
        <div className="canceledCustomerSession_content">
          {getCustomerSession.map((customerSession) => (
            <CustomerCard
              key={customerSession._id}
              customer={customerSession}
              typeAction="delete"
              action={() => handleCanceledCustomerSession(customerSession._id)}
            />
          ))}
        </div>
        {allCustomerSessionIsCancelled(getCustomerSession) &&
          session.status !== "archived" && (
            <button className="btn-danger large" onClick={handleArchiveSession}>
              Archiver
            </button>
          )}
      </div>
    </Modal>
  );
}

export default CanceledCustomerSession;
