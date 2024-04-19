import useToken from "../../hooks/useToken"; // Custom hook
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Feedback from "../../components/FeedBack"; // Feedback component
import Modal from "../../components/modal"; // Modal component
import "./createBooking.scss";

/* import action */
import { ActionCreateBooking } from "../../redux/actions/bookingAction";
import useActivities from "../../hooks/useActivities";

/**
 * Component for creating a booking activity.
 * @component
 */
function CreateBookingActivity({ isOpened, modalClosed }) {
  const token = useToken();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const activities = useActivities();

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
              <select name="activity" id="activity" required>
                <option value={""} disabled>Choisir une activité</option>
                {activities.map((activity) => (
                  <option value={activity._id} key={activity._id} >{activity.name}</option>
                ))
                }
              </select>
            </div>
            <div className="group-form">
              <label htmlFor="spot">Nombre de places</label>
              <input type="number" id="spot" name="spot" required />
            </div>
            <div className="group-form">
              <label htmlFor="userMax">Nombre de participants maximum</label>
              <input type="number" id="userMax" name="userMax" required />
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
