/* Libraries */
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5"; // IoAddCircleOutline is a component from react-icons library
import { Tooltip } from "antd"; // Tooltip is a component from antd library
 /* Custom hooks */
import useBooking from "../../hooks/useBooking";
import useActivities from "../../hooks/useActivities";
import useSpots from "../../hooks/useSpot";
import useToken from "../../hooks/useToken";
/* Redux */
import { useDispatch } from "react-redux";
/* Action*/
import { ActionDeleteBooking } from "../../redux/actions/bookingAction";
/* Components */
import CreateBookingActivity from "../createBookingActivity";
import UpdateBooking from "../updateBooking";
import { formatDate, formatTime } from "../../services/formatDate";
/* Styles */
import "./getBookingActivity.scss";
import moduleStyle from "../../assets/sass/main.module.scss";


function findItemById(items, id) {
  const foundItem = items.find((item) => item._id === id);
  return foundItem ? foundItem.name : "";
}

function BookingActivities() {
  const dispatch = useDispatch(); // useDispatch is a hook from react-redux library
  const bookings = useBooking(); // useBooking is a custom hook 
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
  
  
  
  
  const handleDelete = (id) => dispatch(ActionDeleteBooking({ token, id }));
  const handleCreate = () => setModalCreateIsOpen(true);

  return (
    <>
      <article className="Activity_table">
        <h3>Activités programmées </h3>
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
                  title="Enregistrer un créneau"
                  placement="right"
                  color={moduleStyle.toolTipBackground}
                >
                  <IoAddCircleOutline className="bookingAdd" />
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
                <td>{booking.userMax}</td>
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
        <CreateBookingActivity
          isOpened={modalCreateIsOpen}
          modalClosed={() => setModalCreateIsOpen(false)}
        />
      )}

      {modalUpdateIsOpen && (
        <UpdateBooking
          onOpen={modalUpdateIsOpen}
          modalClosed={() => setModalUpdateIsOpen(false)}
          booking={booking}
          
        />
      )}
    </>
  );
}

export default BookingActivities;