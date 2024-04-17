import useBooking from '../../hooks/useBooking';
import { formatDate } from '../../services/formatDate';

/**
 * Component for displaying booking activities.
 * @returns {JSX.Element} The BookingActivities component.
 */
function BookingActivities() {
  const Bookings = useBooking();

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
              <th>Actions</th>
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
                <td>
                  <button onClick={() => handleEdit(booking._id)}>Modifier</button>
                  <button onClick={() => handleDelete(booking._id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </>
  );
}

export default BookingActivities;