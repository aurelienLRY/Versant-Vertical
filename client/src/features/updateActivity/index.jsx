import Modal from "../../components/modal";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { ActionUpdateActivity } from "../../redux/actions/activityAction";
import PropTypes from "prop-types";


/**
 * Component for updating an activity.
 * @param {Object} props - The component props.
 * @param {boolean} props.onOpen - Flag indicating whether the modal is open.
 * @param {Object} props.activ - The activity object to be updated.
 * @param {Function} props.modalClosed - Callback function to be called when the modal is closed.
 * @returns {JSX.Element} - The rendered component.
 */
function UpdateActivity({ onOpen, activ, modalClosed }) {
    const { token } = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);
    const [formValues, setFormValues] = useState({
        nom: activ.nom,
        description: activ.description,
        id: activ._id
    });

    useEffect(() => {
        setOpen(onOpen);
    }, [onOpen]);

    useEffect(() => {
        setFormValues({
            nom: activ.nom,
            description: activ.description,
            id: activ._id
        });
    }, [activ]);

    /**
     * Event handler for input change.
     * @param {Object} event - The input change event.
     */
    const handleChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        });
    };

    /**
     * Event handler for form submission.
     * @param {Object} event - The form submission event.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const action = await dispatch(
                ActionUpdateActivity({ token, data: formValues })
            );

            if (action.type.endsWith("fulfilled")) {
                setOpen(false);
                modalClosed(false);
            }
        } catch (err) {
            console.error(err.message);
            setError(err.message);
        }
    };

    /**
     * Event handler for modal closed.
     */
    const handleModalClosed = () => {
        setOpen(false);
        modalClosed(false);
    };

    return (
        <>
            <Modal isOpened={open} Closed={handleModalClosed}>
                <form onSubmit={handleSubmit} className="createactivity_form">
                {error && <div className="error">{error}</div>}
                    <div className="group-form">
                        <label htmlFor="nom">nom de l'activité</label>
                        <input
                            type="text"
                            name="nom"
                            id="nom"
                            required
                            value={formValues.nom}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="group-form">
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            required
                            value={formValues.description}
                            onChange={handleChange}
                        />
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
    modalClosed: PropTypes.func.isRequired
};

export default UpdateActivity;