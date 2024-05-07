import { useState } from "react";
/*redux*/
import { useDispatch } from "react-redux";
import { ActionDeleteSession } from "../../../redux/actions/sessionAction";

/*components*/
import SessionCard from "../../../components/sessionCard";
import SessionDetails from "../../../components/sessionDetails";
/*custom hook*/
import useSessions from "../../../hooks/useSessions";
import useToken from "../../../hooks/useToken";
import Feedback from "../../../components/FeedBack";


function GetArchiveSession({ className = "archiveSession" }) {
  const [modalDetails, setModalDetails] = useState(false);
  const [detailsSession, setDetailsSession] = useState();
  const [error, setError] = useState(null); 
const  [success, setSuccess] = useState(null);
  const dispatch = useDispatch();
  const token =  useToken();

  const { archivedSessions } = useSessions();


  const handleDelete = async (id)  => {
    if (window.confirm("Voulez-vous vraiment supprimer cette session?")) {
      const action = await dispatch(ActionDeleteSession({ token, id }));
      if (action.type.endsWith("fulfilled")) {
        setSuccess("Session supprimée");
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }
      if(action.type.endsWith("rejected")){
        console.log("error", action.error);
        setError(action.error.message);
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    }
  };

  const handleDetails = (id) => {
    setDetailsSession(id);
    setModalDetails(true);
  };

  return (
    <>  
    <Feedback error={error} success={success} />
      <div className={`${className}`}>
        {archivedSessions.map((session) => (
          <SessionCard
            key={session._id}
            session={session}
            deleteSession={() => handleDelete(session._id)}
            detailsSession={() => handleDetails(session._id)}
          />
        ))}
      </div>
      {detailsSession && modalDetails && (
        <SessionDetails
          isOpen={modalDetails}
          Closed={() => setModalDetails(false)}
          sessionId={detailsSession}
        />
      )}
    </>
  );
}

export default GetArchiveSession;
