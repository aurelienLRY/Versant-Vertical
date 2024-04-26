/* Libraries */
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5"; // IoAddCircleOutline is a component from react-icons library
import { Tooltip } from "antd"; // Tooltip is a component from antd library
 /* Custom hooks */
import useSessions from "../../../hooks/useSessions";
import useActivities from "../../../hooks/useActivities";
import useSpots from "../../../hooks/useSpot";
import useToken from "../../../hooks/useToken";
/* Redux */
import { useDispatch } from "react-redux";
/* Action*/
import { ActionDeleteSession} from "../../../redux/actions/sessionAction";
/* Components */
import CreateSession from "../createSession";
import UpdateSession from "../updateSession";
import { formatDate, formatTime } from "../../../services/formatDate";
/* Styles */
import "./getSession.scss";
import moduleStyle from "../../../assets/sass/main.module.scss";



function findItemById(items, id) {
  const foundItem = items.find((item) => item._id === id);
  return foundItem ? foundItem.name : "";
}

function GetSessions() {
  const dispatch = useDispatch(); // useDispatch is a hook from react-redux library
  const bookings = useSessions(); // useBooking is a custom hook 
  const activities = useActivities(); // useActivities is a custom hook
  const token  = useToken(); // useToken is a custom hook
  const spots = useSpots(); // useSpots is a custom hook
  const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false); 
  const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
  const  [booking, setBooking] = useState(null);

  const handleEdit = (id) => {
    const b = bookings.find((booking) => booking._id === id);
    setBooking(b);
    setModalUpdateIsOpen(true);
  };
  
  
  
  
  const handleDelete = (id) => {
    const session = bookings.find((booking) => booking._id === id);
    if(session.placesReserved > 0){
      alert("Vous ne pouvez pas supprimer une session avec des places réservées");
      return;
    }
    else{
      if (window.confirm("Voulez-vous vraiment supprimer cette session?")) {
        dispatch(ActionDeleteSession({ token, id }));
      }
    }
  
  };
  const handleCreate = () => setModalCreateIsOpen(true);

  return (
    <>
      <article className="activities_program outlet">
        <h3>Sessions programmées</h3>
        <table>
          <thead>
            <tr>
              <th>Activité</th>
              <th>Date</th>
              <th>Créneau horaire</th>
              <th>Spot</th>
              <th>User Max</th>
              <th>Places Reserved</th>
              <th onClick={handleCreate}>
                <Tooltip
                  title="Créer une session"
                  placement="right"
                  color={moduleStyle.toolTipBackground}
                >
                  <IoAddCircleOutline className="icon add" />
                </Tooltip>
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{findItemById(activities, booking.activity)}</td>
                <td>{formatDate(booking.date)}</td>
                <td>{`${formatTime(booking.startTime) } | ${formatTime(booking.endTime)}`}</td>
                <td>{findItemById(spots, booking.spot)}</td>
                <td>{booking.placesMax}</td>
                <td>{booking.placesReserved}</td>
                <td className="td_action">
                  <button
                    onClick={() => handleEdit(booking._id)}
                    className="btn-warning-outline small"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="btn-danger-outline small"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
      {modalCreateIsOpen && (
        <CreateSession
          isOpened={modalCreateIsOpen}
          modalClosed={() => setModalCreateIsOpen(false)}
        />
      )}

      {modalUpdateIsOpen && (
        <UpdateSession
          onOpen={modalUpdateIsOpen}
          modalClosed={() => setModalUpdateIsOpen(false)}
          booking={booking}
          
        />
      )}
    </>
  );
}

export default GetSessions;