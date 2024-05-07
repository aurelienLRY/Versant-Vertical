/* Libraries */
import { useState } from "react";
/* Custom hooks */
import useSessions from "../../../hooks/useSessions";
import useActivities from "../../../hooks/useActivities";
import useCustomerSession from "../../../hooks/useCustomerSession";
import useSpots from "../../../hooks/useSpot";
import useToken from "../../../hooks/useToken";
/* Redux */
import { useDispatch } from "react-redux";
/* Action*/
import { ActionDeleteSession } from "../../../redux/actions/sessionAction";
/* Components */
import UpdateSession from "../updateSession";
import CanceledCustomerSession from "../../customerSession/canceledCustomerSession";
import SessionDetails from "../../../components/sessionDetails";
import SessionCard from "../../../components/sessionCard";
import Feedback from "../../../components/FeedBack";
/*services */
import { checkCustomerSessionVsSession } from "../../../services/relationCollection";

/* Styles */
import "./getSession.scss";

function GetActiveSessions({ className = "activeSession" }) {
  const dispatch = useDispatch(); // useDispatch is a hook from react-redux library
  const { activeSessions } = useSessions(); // useBooking is a custom hook

  const customerSession = useCustomerSession(); // useBooking is a custom hook

  const token = useToken(); // useToken is a custom hook
  /*Modal*/
  const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
  const [modalCanceledIsOpen, setModalCanceledIsOpen] = useState(false);
  const [modalDetailsIsOpen, setModalDetailsIsOpen] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [thisSessionDetails, setThisSessionDetails] = useState();
  const [thisCustomerSession, setThisCustomerSession] = useState(); // thisCustomerSession is a state variable initialized with an empty array [
  const [booking, setBooking] = useState(null);

  const handleEdit = (booking) => {
    console.log(booking);
    setBooking(booking);
    setModalUpdateIsOpen(true);
  };

  const handleDelete = async (id) => {
    const check = checkCustomerSessionVsSession(id, customerSession);
    if (check) {
      setThisCustomerSession(id);
      setModalCanceledIsOpen(true);
    } else {
      if (window.confirm("Voulez-vous vraiment supprimer cette session?")) {
        const action = dispatch(ActionDeleteSession({ token, id }));

        if (action.type.endsWith("rejected")) {
          setError(action.error.message);
          setTimeout(() => {
            setError(null);
          }, 3000);
        }

        if (action.type.endsWith("fulfilled")) {
          setSuccess("Session supprimée");
          setTimeout(() => {
            setSuccess(null);
          }, 3000);
        }
      }
    }
  };

  const handleDetails = (id) => {
    setThisSessionDetails(id);
    setModalDetailsIsOpen(true);
  };

  return (
    <>
      <Feedback error={error} success={success} />
      {activeSessions.length > 0 ? (
        <div className={`${className}`}>
          {activeSessions.map((booking) => (
            <SessionCard
              key={booking._id}
              session={booking}
              updateSession={() => handleEdit(booking)}
              deleteSession={() => handleDelete(booking._id)}
              detailsSession={() => handleDetails(booking._id)}
            />
          ))}
        </div>
      ) : (
        <div> Aucune session programmée </div>
      )}
      {modalUpdateIsOpen && (
        <UpdateSession
          onOpen={modalUpdateIsOpen}
          modalClosed={() => setModalUpdateIsOpen(false)}
          booking={booking}
        />
      )}

      {modalCanceledIsOpen && (
        <CanceledCustomerSession
          isOpen={modalCanceledIsOpen}
          Closed={() => setModalCanceledIsOpen(false)}
          thisCustomerSession={thisCustomerSession}
        />
      )}
      {modalDetailsIsOpen && (
        <SessionDetails
          isOpen={modalDetailsIsOpen}
          Closed={() => setModalDetailsIsOpen(false)}
          sessionId={thisSessionDetails}
        />
      )}
    </>
  );
}

export default GetActiveSessions;
