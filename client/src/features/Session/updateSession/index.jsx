/*
  Ce composant est utilisé pour mettre à jour un créneau de reservation (booking) .
  Il est utilisé dans le composant booking pour mettre à jour .
  */

/* Redux */
import { useDispatch } from "react-redux"; // Redux hook
import { ActionUpdateSession} from "../../../redux/actions/sessionAction"; // Redux action
/* librairies */
import { useState, useEffect } from "react"; // React hooks
import PropTypes from "prop-types"; // Prop types
/* Components */
import Modal from "../../../components/modal"; // Modal component
import Feedback from "../../../components/FeedBack"; // Feedback component

import { formatDateToInput } from "../../../services/formatDate"; // formatDateToInput function
import { checkAvailabilityBook } from "../../../services/checkAvailabilityBook";

/* Custom hooks */
import useSessions from "../../../hooks/useSessions";
import useSpots from "../../../hooks/useSpot"; // Custom hook
import useActivities from "../../../hooks/useActivities"; // Custom hook
import useToken from "../../../hooks/useToken"; // Custom hook
/* Styles */
import "./updateBooking.scss"; // Styles
import { findItemById, findItemNameById } from "../../../services/relationCollection";
import { act } from "react";

/**
 * Component for updating a booking.
 * @param {Object} props - The component props.
 * @param {boolean} props.onOpen - Flag indicating whether the modal is open.
 * @param {Object} props.bookingId - The id booking.
 * @param {Function} props.modalClosed - Callback function to be called when the modal is closed.
 * @returns {JSX.Element} - The rendered component.
 */
function UpdateSession({ onOpen, booking, modalClosed }) {
  const token = useToken();
  const dispatch = useDispatch();
  const spots = useSpots();
  const activities = useActivities();
  const { activeSessions } = useSessions();
  const [Open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState(booking);
  const [activitySelect, setActivitySelect] = useState(null);


  console.log(formValues);

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
      activeSessions,
    );
    if (check) {
      setError("La réservation est en conflit avec une autre réservation");
      return;
    }

    const action = await dispatch(
      ActionUpdateSession({ token, data: formValues })
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
      <form onSubmit={handleSubmit} className="Booking_create">
        <div className="Booking_create_header">
          <h3>Modifier une activité </h3>
          <Feedback err={error} />
        </div>

        <div className="Booking_create_body">
          <div className="timestamp border-secondary">
            <h4>Créneau horaire</h4>
            <div className="group-form">
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

              <div className="group-form hourly">
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
          </div>

          <div className="practice">
            <h4>Practice</h4>
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
                    {
                    findItemNameById(activities, formValues.activity)}
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
                    {findItemNameById(spots, formValues.spot)}
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
          </div>

          <div className="numberPeople border-secondary">
            <h4>Gestion des groupes</h4>
            <div className="group-form">
              <label htmlFor="placesMax">
                Personnes maximums
                <input
                  type="number"
                  id="placesMax"
                  name="placesMax"
                  required
                  value={formValues.placesMax}
                  onChange={handleChange}
                />
              </label>

              <label htmlFor="placesReserved">
                Places réservées
                <input
                  type="number"
                  id="placesReserved"
                  name="placesReserved"
                  required
                  value={formValues.placesReserved}
                  disabled
                />
              </label>
            </div>
          </div>
        </div>
        
        <div className="Booking_create_footer">
          <button type="submit" className=" btn-secondary-outline ">
            Enregistrer
          </button>
        </div>
      </form>
    </Modal>
  );
}

// Proptypes
UpdateSession.propTypes = {
  onOpen: PropTypes.bool,
  booking: PropTypes.object,
  modalClosed: PropTypes.func,
};

export default UpdateSession;
