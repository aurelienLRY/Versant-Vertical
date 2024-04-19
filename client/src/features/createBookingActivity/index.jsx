import useToken from "../../hooks/useToken"; // Custom hook
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Feedback from "../../components/FeedBack"; // Feedback component
import Modal from "../../components/modal"; // Modal component
import "./createBooking.scss";

/* import action */
import { ActionCreateBooking } from "../../redux/actions/bookingAction";
import useActivities from "../../hooks/useActivities";
import useSpots from "../../hooks/useSpot";

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

    console.log("handlesoumit", data);
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
      const b = Math.min(activity.max_OfPeople, spot.max_OfPeople);
      setMaxOfPeople(b);
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
            <div className="group-form">
              <label htmlFor="date">Date </label>
              <input type="date" id="date" name="date" required />
            </div>
            <div className="group-form">
              <label htmlFor="activity">Activité</label>
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
            </div>
            <div>
              <label htmlFor="spot">Lieu</label>
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
            </div>

            <div className="group-form">
              <label htmlFor="userMax">Nombre de participants maximum</label>
              <input type="number" id="userMax" name="userMax" required value={maxOfPeople} onChange={handleMaxOfPeople}/>
            </div>

            <div className="group-form">
              <label htmlFor="placesReserved">Nombre de places réservées</label>
              <input
                type="number"
                id="placesReserved"
                name="placesReserved"
                required
              />
            </div>
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
