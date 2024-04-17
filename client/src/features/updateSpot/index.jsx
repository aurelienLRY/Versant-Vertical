//modal update spot
// Path: client/src/features/updateSpot/index.jsx

import Modal from "../../components/modal";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { ActionUpdateSpot } from "../../redux/actions/spotAction";
import Feedback from "../../components/FeedBack";
import PropTypes from "prop-types";
import "./updateSpot.scss";
import useActivities from "../../hooks/useActivities";
import useToken from "../../hooks/useToken";
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("UpdateSpot -handleSubmit", formValues);
    const action = await dispatch(ActionUpdateSpot({ token, data: formValues }));
    if (action.type.endsWith("rejected")) {
      setError(action.error.message);
    }

    if (action.type.endsWith("fulfilled")) {
      setError(null);
      handleModalClosed();
    }
  };

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
        <Feedback err={error} />
        <form onSubmit={handleSubmit} className="createSpot_form">
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

          <div className="practicedActivities">
            {activities.map((activity) => {
              return (
                <label htmlFor={activity.name} key={activity._id}>
                  {activity.name}
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
                </label>
              );
            })}
          </div>

          {/* Ajoutez ici les champs de formulaire pour practicedActivities et photos */}

          <div className="formule_type">
            <span>Type de formule </span>
            <div className="group-form">
              <label htmlFor="half_day">
                Demi journée
                <input
                  type="checkbox"
                  name="half_day"
                  id="half_day"
                  checked={formValues.half_day}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="full_day">
                Journée
                <input
                  type="checkbox"
                  name="full_day"
                  id="full_day"
                  checked={formValues.full_day}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <div className="numberPeople">
            <span>Gestion des groupes</span>
            <label htmlFor=" min_OfPeople">
              Minimum
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
              Maximum
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
            Point de rencontre
            <input
              type="text"
              name="meetingPoint"
              id="meetingPoint"
              required
              value={formValues.meetingPoint}
              onChange={handleChange}
            />
          </label>

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
