/*
  Ce composant est utilisé pour mettre à jour un spot.
  Il est utilisé dans le composant SpotList pour mettre à jour un spot.
  */

import Modal from "../../../components/modal"; // Modal component
import { useDispatch } from "react-redux"; // Redux hook
import { useState, useEffect } from "react"; // React hooks
import { ActionUpdateSpot } from "../../../redux/actions/spotAction"; // Redux action
import Feedback from "../../../components/FeedBack"; // Feedback component
import PropTypes from "prop-types"; // Prop types
import "./updateSpot.scss"; // Styles
import "../createSpot/createSpot.scss"; // Styles
import useActivities from "../../../hooks/useActivities"; // Custom hook
import useToken from "../../../hooks/useToken"; // Custom hook
/**
 * Component for updating a spot.
 * @param {Object} props - The component props.
 * @param {boolean} props.onOpen - Flag indicating whether the modal is open.
 * @param {Object} props.spot - The spot object to be updated.
 *  @param {Function} props.modalClosed - Callback function to be called when the modal is closed.
 * @returns {JSX.Element} - The rendered component.
 */
function UpdateSpot({ onOpen, spot, modalClosed }) {
  const token = useToken();
  const dispatch = useDispatch();
  const activities = useActivities();
  const [Open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const [formValues, setFormValues] = useState(spot);

  useEffect(() => {
    setOpen(onOpen);
  }, [onOpen]);

  /**
   * Event handler for modal closed.
   */
  const handleModalClosed = () => {
    setOpen(false);
    modalClosed(true);
  };

  /*
   * Event handler for form submission.
   * @param {Object} event - The event object.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("UpdateSpot -handleSubmit", formValues);
    const action = await dispatch(
      ActionUpdateSpot({ token, data: formValues })
    );
    if (action.type.endsWith("rejected")) {
      setError(action.error.message);
    }

    if (action.type.endsWith("fulfilled")) {
      setError(null);
      handleModalClosed();
    }
  };

  /*
   * Event handler for form change.
   * @param {Object} event - The event object.
   */
  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (target.type === "checkbox") {
      if (target.getAttribute("data-practiced")) {
        if (value) {
          // Si la case est cochée, ajoutez l'activité à practicedActivities
          setFormValues((prevState) => ({
            ...prevState,
            practicedActivities: [
              ...prevState.practicedActivities,
              { activityId: target.value, activityName: name },
            ],
          }));
        } else {
          // Si la case n'est pas cochée, retirez l'activité de practicedActivities
          setFormValues((prevState) => ({
            ...prevState,
            practicedActivities: prevState.practicedActivities.filter(
              (activity) => activity.activityId !== target.value
            ),
          }));
        }
      } else {
        setFormValues((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <Modal isOpened={Open} Closed={handleModalClosed}>
        <form onSubmit={handleSubmit} className="create-spot createSpot_form">
          <h3>Modifier un lieu</h3>
          <Feedback err={error} />
          <div className="group-form">
            <label htmlFor="name">
              Nom du spot
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formValues.name}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="description">
              Description
              <textarea
                name="description"
                id="description"
                value={formValues.description}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="practicedActivities border-secondary">
            <h4>Activités pratiqués</h4>
            <div className="practicedActivities_grill">
              {activities.map((activity) => {
                return (
                  <div className="group-form checkbox">
                    <input
                      type="checkbox"
                      data-practiced={true}
                      name={activity.name}
                      id={activity.name}
                      value={activity._id}
                      checked={formValues.practicedActivities.some(
                        (act) => act.activityId === activity._id
                      )}
                      onChange={handleChange}
                    />
                    <label htmlFor={activity.name} key={activity._id}>
                      {activity.name}{" "}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="formule_type">
            <h4>Type de formule </h4>
            <div className="formule_type_content">
              <div className="group-form checkbox">
                <input
                  type="checkbox"
                  name="half_day"
                  id="half_day"
                  checked={formValues.half_day}
                  onChange={handleChange}
                />
                <label htmlFor="half_day">Demi journée</label>
              </div>
              <div className="group-form checkbox">
                <input
                  type="checkbox"
                  name="full_day"
                  id="full_day"
                  checked={formValues.full_day}
                  onChange={handleChange}
                />
                <label htmlFor="full_day">Journée</label>
              </div>
            </div>
          </div>

          <div className="numberPeople border-secondary">
            <h4>Gestion des groupes</h4>
            <div className="group-form ">
              <label htmlFor=" min_OfPeople">
                Personnes Minimum
                <input
                  type="number"
                  name="min_OfPeople"
                  id="min_OfPeople"
                  required
                  value={formValues.min_OfPeople}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="max_OfPeople">
                Personnes Maximum
                <input
                  type="number"
                  name="max_OfPeople"
                  id="max_OfPeople"
                  required
                  value={formValues.max_OfPeople}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className="geography">
            <h4>Géographie</h4>
            <div className="group-form">
              <label htmlFor="gpsCoordinates">
                Coordonnées GPS
                <input
                  type="text"
                  name="gpsCoordinates"
                  id="gpsCoordinates"
                  required
                  value={formValues.gpsCoordinates}
                  onChange={handleChange}
                />
              </label>

              <label htmlFor="meetingPoint">
                Coordonnées du lieu de rdv
                <input
                  type="text"
                  name="meetingPoint"
                  id="meetingPoint"
                  required
                  value={formValues.meetingPoint}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className="cotation border-secondary">
            <h4>Cotation</h4>
            <div className="cotation_content">
              <label htmlFor="estimatedDuration">
                Durée estimée
                <input
                  type="text"
                  name="estimatedDuration"
                  id="estimatedDuration"
                  required
                  value={formValues.estimatedDuration}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <button type="submit" className="btn-secondary-outline small">
            Modifier
          </button>
        </form>
      </Modal>
    </>
  );
}
UpdateSpot.propTypes = {
  onOpen: PropTypes.bool.isRequired,
  spot: PropTypes.object.isRequired,
  modalClosed: PropTypes.func.isRequired,
};

export default UpdateSpot;