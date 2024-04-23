/* import librairies */
import { useState, useEffect } from "react";
/* import custom hooks */
import useToken from "../../hooks/useToken";
import useActivities from "../../hooks/useActivities";
import useBookings from "../../hooks/useBooking";
import useSpots from "../../hooks/useSpot";
/* import components */
import Feedback from "../../components/FeedBack"; // Feedback component
import Modal from "../../components/modal"; // Modal component
/* import redux */
import { useDispatch } from "react-redux";
/* import action */
import { ActionCreateBooking } from "../../redux/actions/bookingAction";
import { checkAvailabilityBook } from "../../services/checkAvailabilityBook";

/* styles*/
import "./createBooking.scss";

/**
 * Component for creating a booking activity.
 * @component
 */
function CreateBookingActivity({ isOpened, modalClosed }) {
  const token = useToken();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activitySelect, setActivitySelect] = useState(null);
  const [spotSelect, setSpotSelect] = useState(null);
  const [maxOfPeople, setMaxOfPeople] = useState(null);
  const activities = useActivities();
  const bookings = useBookings();
  const spots = useSpots();

  /**
   * Handles the form submission.
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Array.from(formData.entries()).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

    const check = checkAvailabilityBook(
      data.date,
      data.startTime,
      data.endTime,
      bookings
    );
    if (check) {
      setError("La réservation est en conflit avec une autre réservation");
      console.log(error);
      return;
    }

    const action = await dispatch(ActionCreateBooking({ token, data }));

    if (action.type.endsWith("fulfilled")) {
      event.target.reset();
    }
    if (action.type.endsWith("rejected")) {
      console.log("Erreur! ", action.error);
      setError(action.error.message);
    }
  };

  useEffect(() => {
    if (activitySelect !== null && spotSelect !== null) {
      const activity = activities.find((a) => a._id === activitySelect);
      const spot = spots.find((s) => s._id === spotSelect);
      if (activity && spot) {
        const b = Math.min(activity.max_OfPeople, spot.max_OfPeople);
        setMaxOfPeople(b);
      }
    }
  }, [activitySelect, spotSelect]);

  const handleMaxOfPeople = (e) => {
    setMaxOfPeople(e.target.value);
  };

  /*
   * Event handler for modal closed.
   */
  const handleModalClosed = () => {
    setIsOpen(false);
    modalClosed(true);
  };

  /*
   * Effect hook to set the modal state.
   */
  useEffect(() => {
    setIsOpen(isOpened);
  }, [isOpened]);

  /*console.log*/
  //console.log("activitySelect", activitySelect);

  return (
    <Modal isOpened={isOpen} Closed={handleModalClosed}>
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
                <input type="date" id="date" name="date" required />
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
                  onChange={(e) => setActivitySelect(e.target.value)}
                >
                  <option value={""}>Choisir une activité</option>
                  {activities.map((activity) => (
                    <option value={activity._id} key={activity._id}>
                      {activity.name}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="spot">
                Lieu
                <select
                  name="spot"
                  id="spot"
                  required
                  onChange={(e) => setSpotSelect(e.target.value)}
                >
                  <option value={""}>Choisir un spot</option>
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
                value={maxOfPeople}
                onChange={handleMaxOfPeople}
              />
            </label>

            <label htmlFor="placesReserved">
              Nombre de places réservées
              <input
                type="number"
                id="placesReserved"
                name="placesReserved"
                required
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

export default CreateBookingActivity;
