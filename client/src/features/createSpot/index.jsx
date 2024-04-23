import { useEffect, useState } from "react"; // React hooks
import { useDispatch } from "react-redux"; // Redux hook
import { ActionCreateSpot } from "../../redux/actions/spotAction"; // Redux action
import "./createSpot.scss";
import Feedback from "../../components/FeedBack"; // Feedback component
import Modal from "../../components/modal"; // Modal component
import useActivities from "../../hooks/useActivities"; // Custom hook
import useToken from "../../hooks/useToken"; // Custom hook
/**
 * CreateSpot component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpened - Indicates whether the modal is opened or not.
 * @param {Function} props.modalClosed - Callback function to close the modal.
 * @returns {JSX.Element} The CreateSpot component.
 */
function CreateSpot({ isOpened, modalClosed }) {
  const token = useToken(); // Get the token from the custom hook
  const dispatch = useDispatch(); // Dispatch the action
  const [isOpen, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [fullDayIsChecked, setFullDayIsChecked] = useState();
  const [halfDayIsChecked, setHalfDayIsChecked] = useState();
  const activities = useActivities();

  /*
   * Event handler for full day change.
   * @param {Object} event - The event object.
   */
  const handleFullDayChange = (event) => {
    setFullDayIsChecked(event.target.checked);
  };

  /*
   * Event handler for half day change.
   * @param {Object} event - The event object.
   */
  const handleHalfDayChange = (event) => {
    setHalfDayIsChecked(event.target.checked);
  };

  /*
   * Event handler for form submission.
   * @param {Object} event - The event object.
   * @returns {Promise<void>} The async function.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Array.from(formData.entries()).reduce(
      (acc, [key, value]) => {
        const activity = activities.find((activity) => activity.name === key);

        if (key === "half_day" || key === "full_day") {
          value = value === "on";
          acc[key] = value;
        } else if (activity) {
          // Initialize the practicedActivities array if it doesn't exist
          if (!acc.practicedActivities) {
            acc.practicedActivities = [];
          }
          // Add the activity to the practicedActivities array
          acc.practicedActivities.push({
            activityName: activity.name,
            activityId: activity._id,
          });
        } else {
          acc[key] = value;
        }

        return acc;
      },
      { half_day: false, full_day: false }
    );

    console.log("OnSubmit createSpot > data >>>", data);

    try {
      const action = await dispatch(
        ActionCreateSpot({ token: token, data: data })
      );

      if (action.type.endsWith("fulfilled")) {
        event.target.reset();
      }
      if (action.type.endsWith("rejected")) {
        console.log("Erreur! ", action.error);
        setError(action.error.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  /*
   * Event handler for modal closed.
   */
  const handleModalClosed = () => {
    setOpen(false);
    modalClosed(true);
  };

  /*
   * Effect hook to set the modal state.
   */
  useEffect(() => {
    setOpen(isOpened);
  }, [isOpened]);

  return (
    <Modal isOpened={isOpen} Closed={handleModalClosed}>
      <article className="createSpot" data-testid="create-spot">
        <h3>Ajouter un spot</h3>
        <Feedback err={error} />

        <form onSubmit={handleSubmit} className="createSpot_form">
          <div className="group-form">
            <label htmlFor="name">
              Nom du spot
              <input type="text" name="name" id="name" required />
            </label>

            <label htmlFor="description">
              Description
              <textarea name="description" id="description" />
            </label>
          </div>

          <div className="practicedActivities">
            {activities.map((activity) => {
              return (
                <label htmlFor={activity.name} key={activity._id}>
                  {activity.name}
                  <input
                    type="checkbox"
                    name={activity.name}
                    id={activity.name}
                    value={activity._id}
                  />
                </label>
              );
            })}
          </div>

          <div className="formule_type">
            <span>Type de formule </span>
            <div className="group-form">
              <label htmlFor="half_day">
                Demi journée
                <input
                  type="checkbox"
                  name="half_day"
                  id="half_day"
                  checked={halfDayIsChecked}
                  onChange={handleHalfDayChange}
                />
              </label>
              <label htmlFor="full_day">
                Journée
                <input
                  type="checkbox"
                  name="full_day"
                  id="full_day"
                  checked={fullDayIsChecked}
                  onChange={handleFullDayChange}
                />
              </label>
            </div>
          </div>

          <div className="numberPeople">
            <span>Gestion des groupes</span>
            <div className="group-form">
              <label htmlFor="min_OfPeople">
                Minimum
                <input
                  type="number"
                  name="min_OfPeople"
                  id="min_OfPeople"
                  required
                  placeholder="Nombre de personnes min"
                />
              </label>
              <label htmlFor="max_OfPeople">
                Maximum
                <input
                  type="number"
                  name="max_OfPeople"
                  id="max_OfPeople"
                  required
                  placeholder="Nombre de personnes max"
                />
              </label>
            </div>
          </div>

          <div className="group-form">
            <label htmlFor="gpsCoordinates">
              Coordonnées GPS
              <input
                type="text"
                name="gpsCoordinates"
                id="gpsCoordinates"
                required
              />
            </label>

            <label htmlFor="meetingPoint">
              Point de rencontre
              <input
                type="text"
                name="meetingPoint"
                id="meetingPoint"
                required
              />
            </label>
          </div>
          <label htmlFor="estimatedDuration">
            Durée estimée
            <input
              type="text"
              name="estimatedDuration"
              id="estimatedDuration"
              required
            />
          </label>

          <button type="submit" className="btn-secondary-outline small">
            Enregistrer
          </button>
        </form>
      </article>
    </Modal>
  );
}

export default CreateSpot;
