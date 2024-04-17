import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ActionCreateSpot } from "../../redux/actions/spotAction";
import "./createSpot.scss";
import Feedback from "../../components/FeedBack";
import Modal from "../../components/modal";
import useActivities from "../../hooks/useActivities";
import useToken from "../../hooks/useToken";

function CreateSpot({ isOpened, modalClosed }) {
  const  token  = useToken(); // Get the token from the custom hook
  const dispatch = useDispatch(); // Dispatch the action
  const [isOpen, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [fullDayIsChecked, setFullDayIsChecked] = useState();
  const [halfDayIsChecked, setHalfDayIsChecked] = useState();
  const activities = useActivities();

  const handleFullDayChange = (event) => {
    setFullDayIsChecked(event.target.checked);
  };

  const handleHalfDayChange = (event) => {
    setHalfDayIsChecked(event.target.checked);
  };

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

  const handleModalClosed = () => {
    setOpen(false);
    modalClosed(true);
  };

  useEffect(() => { 
    setOpen(isOpened);
  }, [isOpened]);


  return (

    <Modal isOpened={isOpen} Closed={handleModalClosed}  >  
    <article className="createSpot" data-testid="create-spot">
      <h4>Ajouter un spot</h4>
      <Feedback err={error} />
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
          <label htmlFor="min_OfPeople">
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
    </article>
    </Modal>
  );
}

export default CreateSpot;
