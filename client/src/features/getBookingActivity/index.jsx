import useBooking from '../../hooks/useBooking'; // 
import { useState } from 'react'; //
import { formatDate } from '../../services/formatDate'; //
import { IoAddCircleOutline } from "react-icons/io5"; // Icon 
import './getBookingActivity.scss'
import { Tooltip } from "antd"; // Ant design 
import CreateBookingActivity from '../createBookingActivity'

/**
 * Component for displaying booking activities.
 * @returns {JSX.Element} The BookingActivities component.
 */
function BookingActivities() {
  const Bookings = useBooking();
  const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
  const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);

  /**
   * Handles the edit action for a booking.
   * @param {string} id - The ID of the booking to edit.
   */
  const handleEdit = (id) => {
    // Code to handle editing a booking
    console.log(`Edit booking with id ${id}`);
  };

  /**
   * Handles the delete action for a booking.
   * @param {string} id - The ID of the booking to delete.
   */
  const handleDelete = (id) => {
    // Code to handle deleting a booking
    console.log(`Delete booking with id ${id}`);
  };


const handleCreate = () => {
  setModalCreateIsOpen(true);
}


  return (
    <>
      <article className='Activity_table'>
        <h3>Activités programmées </h3>
        <table>
          <thead>
            <tr>
              <th>Activité</th>
              <th>Date</th>
              <th>Spot</th>
              <th>User Max</th>
              <th>Places Reserved</th>
              <Tooltip title="Enregistrer un créneau"  placement="right">
            <th onClick={(e)=> setModalCreateIsOpen(true)}> <IoAddCircleOutline className="bookingAdd"/> </th>
            </Tooltip>
            </tr>
          </thead>
          <tbody>
            {Bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.activity}</td>
                <td>{formatDate(booking.date)}</td>
                <td>{booking.spot}</td>
                <td>{booking.userMax}</td>
                <td>{booking.placesReserved}</td>
                <td className="td_action">
                  <button onClick={() => handleEdit(booking._id)} className='btn-warning-outline small'>Modifier</button>
                  <button onClick={() => handleDelete(booking._id)} className='btn-danger-outline small'>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
      {modalCreateIsOpen && 
      <CreateBookingActivity isOpened={modalCreateIsOpen} modalClosed={() => setModalCreateIsOpen(false)} />
      
      }
    </>
  );
}

export default BookingActivities;