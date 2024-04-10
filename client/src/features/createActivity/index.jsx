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
    <article className="createactivity"  data-testid="create-activity">
      <h4>Ajouter une activité</h4>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="createactivity_form">
        <div className="group-form">
          <label htmlFor="nom">nom de l'activité</label>
          <input type="text" name="nom" id="nom" required />
        </div>
        <div className="group-form">
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" required />
        </div>
        <button type="submit" className="btn-secondary-outline small">
          Enregistrer
        </button>
      </form>
    </article>

  );
}

export default CreateActivity;
