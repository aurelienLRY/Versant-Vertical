//modal update spot
// Path: client/src/features/updateSpot/index.jsx

import Modal from "../../components/modal";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { ActionUpdateSpot } from "../../redux/actions/spotAction";
import Feedback from "../../components/FeedBack";
import useToken  from "../../hooks/useToken";
import PropTypes from "prop-types";
import "./updateSpot.scss";
import useActivities from "../../hooks/useActivities";

/**
 * Component for updating a spot.
 * @param {Object} props - The component props.
 * @param {boolean} props.onOpen - Flag indicating whether the modal is open.
 * @param {Object} props.spot - The spot object to be updated.
 *  @param {Function} props.modalClosed - Callback function to be called when the modal is closed.
 * @returns {JSX.Element} - The rendered component.
 */
function UpdateSpot({ onOpen, spot, modalClosed }) {

  /*
  * CONSOLE.LOG
  */

  console.log("UpdateSpot -spot", spot);





  const token = useToken();
  const dispatch = useDispatch();
  const activities = useActivities();
  const [Open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [half_dayIsChecked, setHalfDayIsChecked] = useState(false);
  const [full_dayIsChecked, setFullDayIsChecked] = useState(false);


  const [formValues, setFormValues] = useState();


  useEffect(() => {
    setFormValues({
        name: spot.name,
        description: spot.description,
        gpsCoordinates: spot.gpsCoordinates,
        practicedActivities: spot.practicedActivities,
        photos: spot.photos,
        half_day: spot.half_day,
        full_day: spot.full_day,
        max_OfPeople: spot.max_OfPeople,
        min_OfPeople: spot.min_OfPeople,
        meetingPoint: spot.meetingPoint,
        estimatedDuration: spot.estimatedDuration,
    });
    setHalfDayIsChecked(spot.half_day);
    setFullDayIsChecked(spot.full_day);
}, [spot]);


 useEffect(() => {
    setOpen(onOpen);
    }, [onOpen]);

      /**
   * Event handler for modal closed.
   */
  const handleModalClosed = () => {
    setOpen(false);
    setFullDayIsChecked(null);
    setHalfDayIsChecked(null);
    modalClosed(true);
  };

  const handleSubmit = async (event) => {}

  const handleHalfDayChange = (event) => {
    setHalfDayIsChecked(event.target.checked);
  };

  const handleFullDayChange = (event) => {
    setFullDayIsChecked(event.target.checked);
  };

  return (
    <>
      <Modal isOpened={Open} Close={handleModalClosed}>
      <form onSubmit={handleSubmit} className="createSpot_form">
        <label htmlFor="name">
          Nom du spot
          <input type="text" name="name" id="name" required />
        </label>

        <label htmlFor="description">
          Description
          <textarea name="description" id="description" />
        </label>

        <div className="practicedActivities">
          {activities.map((activity) => {
            return (
              <label htmlFor={activity.name} key={activity._Id}>
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
                checked={half_dayIsChecked}
                onChange={handleHalfDayChange}
              />
            </label>
            <label htmlFor="full_day">
              Journée
              <input
                type="checkbox"
                name="full_day"
                id="full_day"
                checked={full_dayIsChecked}
                onChange={handleFullDayChange}
              />
            </label>
          </div>
        </div>

        <div className="numberPeople">
          <span>Gestion des groupes</span>
          <label htmlFor=" min_OfPeople:">
            Minimum
            <input
              type="number"
              name="min_OfPeople"
              id="min_OfPeople"
              required
            />
          </label>
          <label htmlFor="max_OfPeople">
            Maximum
            <input
              type="number"
              name="max_OfPeople"
              id="max_OfPeople"
              required
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
          />
        </label>
        
        <label htmlFor="meetingPoint">
          Point de rencontre
          <input type="text" name="meetingPoint" id="meetingPoint" required />
        </label>

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
