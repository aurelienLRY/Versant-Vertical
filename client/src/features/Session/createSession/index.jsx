/* import librairies */
import { useState, useEffect } from "react";
/* import custom hooks */
import useToken from "../../../hooks/useToken";
import useActivities from "../../../hooks/useActivities";
import useSession from "../../../hooks/useSessions";
import useSpots from "../../../hooks/useSpot";
/* import components */
import Feedback from "../../../components/FeedBack"; // Feedback component
import Modal from "../../../components/modal"; // Modal component
import AddCustomer from "../../customer/addCustomer";
/* import redux */
import { useDispatch } from "react-redux";
/* import action */
import { ActionCreateSession } from "../../../redux/actions/sessionAction";
import { checkAvailabilityBook } from "../../../services/checkAvailabilityBook";

/* styles*/
import "./createSession.scss";

/**
 * Component for creating a booking activity.
 * @component
 */
function CreateSession({ isOpened, modalClosed }) {
  const token = useToken();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [activitySelect, setActivitySelect] = useState(null);
  const [spotSelect, setSpotSelect] = useState(null);

  const [maxOfPeople, setMaxOfPeople] = useState(null);
  const [placesReserved, setPlacesReserved] = useState(0);

  const [thisSession, setThisSession] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const activities = useActivities();
  const bookings = useSession();
  const spots = useSpots();

  /**
   * Handles the form submission.
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log("form", form);
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
      setError("Une session est déjà programmée sur ce créneau ");
      console.log(error);
      // Réinitialise l'erreur après 5 secondes
      setTimeout(() => {
        setError(null);
      }, 5000);

      return;
    }

    const action = await dispatch(ActionCreateSession({ token, data }));

    if (action.type.endsWith("fulfilled")) {
      //TODO: handle the fulfilled action
      // mettre en place addCustomer
      setError(null);
      const session = action.payload;
      setThisSession(session);
      event.target.reset();
      setMaxOfPeople(null);
      setSlideIndex(1);
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

  const handlePlacesReserved = (e) => {
    setPlacesReserved(e.target.value);
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
      {slideIndex === 0 && (
        <form onSubmit={handleSubmit} className="Booking_create">
          <div className="Booking_create_header">
            <h3> Ajouter une session </h3>
            <Feedback err={error} />
          </div>

          <div className="Booking_create_body">
            <div className="timestamp border-secondary ">
              <h4>Créneau horaire</h4>
              <div className="group-form">
                <label htmlFor="date">
                  Date
                  <input type="date" id="date" name="date" required />
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
                    value={maxOfPeople}
                    onChange={handleMaxOfPeople}
                  />
                </label>

                <label htmlFor="placesReserved">
                  Places réservées
                  <input
                    type="number"
                    id="placesReserved"
                    name="placesReserved"
                    required
                    value={placesReserved}
                    onChange={handlePlacesReserved}
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
      )}
      {slideIndex === 1 && (
        <CreateSuccess
          slideIndex={(index) => setSlideIndex(index)}
          isClosed={handleModalClosed}
        />
      )}

      {slideIndex === 2 && (
        <AddCustomer
          session={thisSession}
          newSession={() => setSlideIndex(0)}
          closed={ handleModalClosed}
          
        />
      )}
    </Modal>
  );
}

export default CreateSession;

export function CreateSuccess({ slideIndex, isClosed }) {
  return (
    <div className="createSuccess">
      <Feedback success="Session enregistrée avec succès" />
      <h4> Que souhaitez vous Faire ? </h4>
      <div className="Booking_create_success-cta">
        <button onClick={() => slideIndex(2)} className="btn-secondary-outline">
          Ajouter un client à la session
        </button>

        <button onClick={() => slideIndex(0)} className="btn-secondary-outline">
          Ajouter une session
        </button>
        <button onClick={isClosed} className="btn-secondary-outline">
          Fermer
        </button>
      </div>
    </div>
  );
}
