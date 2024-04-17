import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionCreateActivity } from "../../redux/actions/activityAction";
import "./creatActivity.scss";
import Feedback from "../../components/FeedBack";

/**
 * Component for creating a new activity.
 * @returns {JSX.Element} The CreateActivity component.
 */
function CreateActivity() {
  const { token } = useSelector((state) => state.auth.user); // Retrieves the user's token
  const dispatch = useDispatch(); // Dispatch to send the action
  const [error, setError] = useState(null); // Error handling
  const [full_dayIsChecked, setFull_dayIsChecked] = useState(); // State for the full day checkbox
  const [half_dayIsChecked, setHalf_dayIsChecked] = useState(); // State for the half day checkbox]

  //  Function to handle the full day checkbox
  const handleFullDayChange = (event) => {
    setFull_dayIsChecked(event.target.checked);
  };

  // Function to handle the half day checkbox
  const handleHalfDayChange = (event) => {
    setHalf_dayIsChecked(event.target.checked);
  };

  /**
   * Handles the form submission.
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Array.from(formData.entries()).reduce(
      (acc, [key, value]) => {
        if (key === "half_day" || key === "full_day") {
          value = value === "on";
        }
        acc[key] = value;
        return acc;
      },
      { half_day: false, full_day: false }
    );
    console.log("data", data);

    // Create the activity
    try {
      const action = await dispatch(
        ActionCreateActivity({ token: token, data: data })
      );

      // If the action is successful, reset the form
      if (action.type.endsWith("fulfilled")) {
        event.target.reset();
      }
      if (action.type.endsWith("rejected")) {
        console.log("Erreur! ", action.error);
        setError(action.error.message);
      }
    } catch (err) {
      // Error handling
      setError(err.message);
    }
  };

  // Render the form
  return (
    <article className="createActivity" data-testid="create-activity">
      <div className="createActivity_header">
        <h4>Ajouter une activité</h4>
        <Feedback err={error} />
      </div>

      <form onSubmit={handleSubmit} className="createActivity_form">
        
        <div className="createActivity_body">
          <div className="body_bloc">
            <div className="group-form">
              <label htmlFor="name">Nom de l'activité</label>
              <input type="text" name="name" id="name" required />
            </div>

            <div className="group-form">
              <label htmlFor="description">Description</label>
              <textarea name="description" id="description" />
            </div>
          </div>

          <div className="formule_content body_bloc">
            <div className="formule_type">
              <span>Type de formule </span>
              <div className="group-form">
                <label htmlFor="half_day">
                  Demi journée{" "}
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
            <div className="formule_pricing">
              <span>Tarification</span>
              <div className="group-form">
                <input
                  type="number"
                  name="price_half_day"
                  id="price-half_day"
                  placeholder=" prix de la demi-journée"
                  disabled={!half_dayIsChecked}
                />
                <input
                  type="number"
                  name="price_full_day"
                  id="price-full_day"
                  placeholder=" prix de la journée"
                  disabled={!full_dayIsChecked}
                />
              </div>
            </div>
          </div>

          <div className="numberPeople body_bloc">
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

            <label htmlFor="min_age">
              Âge minimum
              <input type="number" name="min_age" id="min_age" required />
            </label>
          </div>
        </div>
        <button type="submit" className="btn-secondary-outline small">
          Enregistrer
        </button>
      </form>
    </article>
  );
}

export default CreateActivity;
