import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ActionCreateActivity } from "../../redux/actions/activityAction";
import "./creatActivity.scss";

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

    // Create the activity
    try {
      const action = await dispatch(
        ActionCreateActivity({ token: token, data: data })
      );

      // If the action is successful, reset the form
      if (action.type.endsWith("fulfilled")) {
        event.target.reset();
      }
    } catch (err) {
      // Error handling
      setError(err.message);
    }
  };

  // Render the form
  return (
    <article className="createactivity" data-testid="create-activity">
      <h4>Ajouter une activité</h4>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="createactivity_form">
        <div className="group-form">
          <label htmlFor="name">Nom de l'activité</label>
          <input type="text" name="name" id="name" required />
        </div>

        <div className="group-form">
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" />
        </div>

        <div className="formule_content">
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

        <div className="numberPeople">
          <span>Gestion des groupes</span>
          <label htmlFor="min_number_of_people">
            Minimum
            <input
              type="number"
              name="min_number_of_people"
              id="min_number_of_people"
              required
            />
          </label>
          <label htmlFor="max_number_of_people">
            Maximum
            <input
              type="number"
              name="max_number_of_people"
              id="max_number_of_people"
              required
            />
          </label>

          <label htmlFor="minimum_age">
            Âge minimum
            <input type="number" name="minimum_age" id="minimum_age" required />
          </label>
        </div>

        <button type="submit" className="btn-secondary-outline small">
          Enregistrer
        </button>
      </form>
    </article>
  );
}

export default CreateActivity;
