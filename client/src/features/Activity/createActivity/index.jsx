/* import librairies */
import { useState, useEffect } from "react";
/* import custom hooks */
import useToken from "../../../hooks/useToken";

/* import redux */
import { useSelector, useDispatch } from "react-redux";
/* action*/
import { ActionCreateActivity } from "../../../redux/actions/activityAction";
/* components */
import Feedback from "../../../components/FeedBack";
import Modal from "../../../components/modal"; // Modal component

/* styles*/
import "./creatActivity.scss";
/**
 * Component for creating a new activity.
 * @returns {JSX.Element} The CreateActivity component.
 */
function CreateActivity({ isOpened, modalClosed }) {
  const  token  = useToken(); // Get the token from the custom hook
  const dispatch = useDispatch(); // Dispatch to send the action
  const [isOpen, setIsOpen] = useState(false); // State for the modal
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
      if (action.type.endsWith("rejected")) {
        console.log("Erreur! ", action.error);
        setError(action.error.message);
      }
    } catch (err) {
      // Error handling
      setError(err.message);
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

  // Render the form
  return (
    <Modal isOpened={isOpen} Closed={handleModalClosed}>
      <form
        onSubmit={handleSubmit}
        className=" createActivity"
        data-testid="create-activity"
      >
        <div className="createActivity_header">
          <h3>Ajouter une activité</h3>
          <Feedback err={error} />
        </div>

        <div className="createActivity_body">
          <div className="group-form ni">
            <label htmlFor="name">
              Nom de l'activité
              <input type="text" name="name" id="name" required />
            </label>

            <label htmlFor="description">
              Description
              <textarea name="description" id="description" />
            </label>
          </div>

          <div className="formule_type border-secondary">
            <h4>Type de formule </h4>
            <div className="formule_type_content">
              <div className="group-form checkbox">
                <input
                  type="checkbox"
                  name="half_day"
                  id="half_day"
                  checked={half_dayIsChecked}
                  onChange={handleHalfDayChange}
                />
                <label htmlFor="half_day">Demi journée</label>
              </div>

              <div className="group-form checkbox">
                <input
                  type="checkbox"
                  name="full_day"
                  id="full_day"
                  checked={full_dayIsChecked}
                  onChange={handleFullDayChange}
                />
                <label htmlFor="full_day">Journée</label>
              </div>
            </div>

            <div className="formule_pricing">
              <h4>Tarification</h4>
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
            <h4>Gestion des groupes</h4>
            <div className="group-form">
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
    </Modal>
  );
}

export default CreateActivity;
