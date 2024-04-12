import Modal from "../../components/modal";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import  useToken  from "../../hooks/useToken";
import { ActionUpdateActivity } from "../../redux/actions/activityAction";
import Feedback from "../../components/FeedBack";
import PropTypes from "prop-types";
import "./updateActivity.scss";

/**
 * Component for updating an activity.
 * @param {Object} props - The component props.
 * @param {boolean} props.onOpen - Flag indicating whether the modal is open.
 * @param {Object} props.activ - The activity object to be updated.
 * @param {Function} props.modalClosed - Callback function to be called when the modal is closed.
 * @returns {JSX.Element} - The rendered component.
 */
function UpdateActivity({ onOpen, activ, modalClosed }) {
  const token  =useToken();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [half_dayIsChecked, setHalfDayIsChecked] = useState(false);
  const [full_dayIsChecked, setFullDayIsChecked] = useState(false);
  const [formValues, setFormValues] = useState({
    name: activ.name,
    description: activ.description,
    id: activ._id,
    half_day: activ.half_day,
    full_day: activ.full_day,
    price_half_day: activ.price_half_day,
    price_full_day: activ.price_full_day,
    min_OfPeople: activ.min_OfPeople,
    max_OfPeople: activ.max_OfPeople,
    min_age: activ.min_age,
  });

  useEffect(() => {
    setOpen(onOpen);
  }, [onOpen]);

  useEffect(() => {
    setFormValues({
      name: activ.name,
      description: activ.description,
      id: activ._id,
      half_day: activ.half_day,
      full_day: activ.full_day,
      price_half_day: activ.price_half_day,
      price_full_day: activ.price_full_day,
      min_OfPeople: activ.min_OfPeople,
      max_OfPeople: activ.max_OfPeople,
      min_age: activ.min_age,
    });
    setHalfDayIsChecked(activ.half_day);
    setFullDayIsChecked(activ.full_day);
  }, [activ]);

  /**
   * Event handler for input change.
   * @param {Object} event - The input change event.
   */
  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
    if (error) {
      setError(null);
    }
  };

  const handleHalfDayChange = (event) => {
    setHalfDayIsChecked(event.target.checked);  
    if (error) {
      setError(null);
    }
  };

  const handleFullDayChange = (event) => {
    setFullDayIsChecked(event.target.checked);  
    if (error) {
      setError(null);
    }
  };

  /**
   * Event handler for form submission.
   * @param {Object} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formValuesCopy = {
      ...formValues,
      half_day: half_dayIsChecked,
      full_day: full_dayIsChecked,
    };

    try {
      const action = await dispatch(
        ActionUpdateActivity({ token, data: formValuesCopy })
      );

      if (action.type.endsWith("fulfilled")) {
        setOpen(false);
        setFullDayIsChecked(null);
        setHalfDayIsChecked(null);
        modalClosed(false);
      }
      if (action.type.endsWith("rejected")) {
        setError(action.error.message);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  /**
   * Event handler for modal closed.
   */
  const handleModalClosed = () => {
    setOpen(false);
    setFullDayIsChecked(null);
    setHalfDayIsChecked(null);
    modalClosed(false);
  };

  return (
    <>
      <Modal isOpened={open} Closed={handleModalClosed}>
        <form onSubmit={handleSubmit} className="createactivity_form">
          <Feedback err={error} />
          <div className="group-form">
            <label htmlFor="name">Nom de l'activité</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formValues.name}
              onChange={handleChange}
            />
          </div>
          <div className="group-form">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={formValues.description}
              onChange={handleChange}
            />
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
                  value={formValues.price_half_day}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="price_full_day"
                  id="price-full_day"
                  placeholder=" prix de la journée"
                  disabled={!full_dayIsChecked}
                  value={formValues.price_full_day}
                  onChange={handleChange}
                />
              </div>
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
                value={formValues.min_OfPeople}
                onChange={handleChange}
                required
              />
            </label>
            <label htmlFor="max_OfPeople">
              Maximum
              <input
                type="number"
                name="max_OfPeople"
                id="max_OfPeople"
                value={formValues.max_OfPeople}
                onChange={handleChange}
                required
              />
            </label>

            <label htmlFor="min_age">
              Âge minimum
              <input
                type="number"
                name="min_age"
                id="min_age"
                value={formValues.min_age}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <button type="submit" className="btn-secondary-outline small">
            Modifier
          </button>
        </form>
      </Modal>
    </>
  );
}

UpdateActivity.propTypes = {
  onOpen: PropTypes.bool.isRequired,
  activ: PropTypes.object.isRequired,
  modalClosed: PropTypes.func.isRequired,
};

export default UpdateActivity;
