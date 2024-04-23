/*
  Ce composant est utilisé pour mettre à jour un créneau de reservation (booking) .
  Il est utilisé dans le composant booking pour mettre à jour .
  */

/* Redux */
import { useDispatch } from "react-redux"; // Redux hook
import { ActionUpdateBooking } from "../../redux/actions/bookingAction"; // Redux action
/* librairies */
import { useState, useEffect } from "react"; // React hooks
import PropTypes from "prop-types"; // Prop types
/* Components */
import Modal from "../../components/modal"; // Modal component
import Feedback from "../../components/FeedBack"; // Feedback component

import { formatDateToInput } from "../../services/formatDate"; // formatDateToInput function
import { checkAvailabilityBook } from "../../services/checkAvailabilityBook";

/* Custom hooks */
import useBooking from "../../hooks/useBooking"; // Custom hook
import useSpots from "../../hooks/useSpot"; // Custom hook
import useActivities from "../../hooks/useActivities"; // Custom hook
import useToken from "../../hooks/useToken"; // Custom hook
/* Styles */
import "./updateBooking.scss"; // Styles

function findItemById(items, id) {
  const foundItem = items.find((item) => item._id === id);
  return foundItem ? foundItem.name : "";
}

/**
 * Component for updating a booking.
 * @param {Object} props - The component props.
 * @param {boolean} props.onOpen - Flag indicating whether the modal is open.
 * @param {Object} props.bookingId - The id booking.
 * @param {Function} props.modalClosed - Callback function to be called when the modal is closed.
 * @returns {JSX.Element} - The rendered component.
 */
function UpdateBooking({ onOpen, booking, modalClosed }) {
  const token = useToken();
  const dispatch = useDispatch();
  const spots = useSpots();
  const activities = useActivities();
  const bookings = useBooking();
  const [Open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState(booking);
  const [activitySelect, setActivitySelect] = useState(null);
  const [spotSelect, setSpotSelect] = useState(null);

  useEffect(() => {
    setOpen(onOpen);
  }, [onOpen]);

  useEffect(() => {
    setFormValues(booking);
  }, [booking]);

  /**
   * Event handler for modal closed.
   */
  const handleModalClosed = () => {
    setOpen(false);
    modalClosed(true);
  };

  /**
   * Event handler for form submission.
   * @param {Object} event - The event object.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const check = checkAvailabilityBook(
      formValues.date,
      formValues.startTime,
      formValues.endTime,
      bookings,
      formValues._id
    );
    if (check) {
      setError("La réservation est en conflit avec une autre réservation");
      return;
    }

    const action = await dispatch(
      ActionUpdateBooking({ token, data: formValues })
    );
    if (action.type.endsWith("rejected")) {
      setError(action.error.message);
    }

    if (action.type.endsWith("fulfilled")) {
      setError(null);
      handleModalClosed();
    }
  };

  /**
   * Event handler for form change.
   * @param {Object} event - The event object.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Modal isOpened={Open} Closed={handleModalClosed}>
      <form onSubmit={handleSubmit}>
        <div className="Booking_create">
          <div className="Booking_create_header">
            <h3> Ajouter une activité </h3>
            <Feedback err={error} />
          </div>

          <div className="Booking_create_body">
            <div className="timestamp">
              <label htmlFor="date">
                Date
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formatDateToInput(formValues.date)}
                  onChange={handleChange}
                />
              </label>

              <div className="group-form">
                <label htmlFor="startTime">
                  Heure de début
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    required
                    min="08:00"
                    max="18:00"
                    step="900"
                    value={formValues.startTime}
                    onChange={handleChange}
                  />
                </label>

                <label htmlFor="endTime">
                  Heure de fin
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    required
                    min="08:00"
                    max="18:00"
                    step="900"
                    value={formValues.endTime}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

            <div className="group-form">
              <label htmlFor="activity">
                Activité
                <select
                  name="activity"
                  id="activity"
                  required
                  onChange={handleChange}
                >
                  <option value={formValues.activity}>
                    {findItemById(activities, formValues.activity)}
                  </option>
                  {activities.map((activity) => (
                    <option value={activity._id} key={activity._id}>
                      {activity.name}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="spot">
                Lieu
                <select name="spot" id="spot" required onChange={handleChange}>
                  <option value={formValues.spot}>
                    {findItemById(spots, formValues.spot)}
                  </option>
                  {spots.map((spot) => {
                    if (
                      spot.practicedActivities.some(
                        (a) => a.activityId === activitySelect
                      ) ||
                      activitySelect === null
                    ) {
                      return (
                        <option value={spot._id} key={spot._id}>
                          {spot.name}
                        </option>
                      );
                    }
                    return null;
                  })}
                </select>
              </label>
            </div>

            <label htmlFor="userMax">
              Nombre de participants maximum
              <input
                type="number"
                id="userMax"
                name="userMax"
                required
                value={formValues.userMax}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="placesReserved">
              Nombre de places réservées
              <input
                type="number"
                id="placesReserved"
                name="placesReserved"
                required
                value={formValues.placesReserved}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="Booking_create_footer">
            <button type="submit" className=" btn-secondary-outline ">
              Enregistrer
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

// Proptypes
UpdateBooking.propTypes = {
  onOpen: PropTypes.bool,
  booking: PropTypes.object,
  modalClosed: PropTypes.func,
};

export default UpdateBooking;
