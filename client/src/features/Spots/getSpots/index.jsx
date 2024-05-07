/**
 * Component that displays all spots.
 * @component
 */

/* react */
import { useState } from "react"; // React hooks

/* redux */
import { useDispatch } from "react-redux"; // Redux hook
import { ActionDeleteSpot } from "../../../redux/actions/spotAction"; // Redux action

/* ant design */
import { Tooltip } from "antd"; // Ant design tooltip

/* components */
import UpdateSpot from "../updateSpot"; // Update spot component
import CreateSpot from "../createSpot"; // Create spot component
import Feedback from "../../../components/FeedBack"; // Feedback component
import SpotCard from "../../../components/spotCard";

//import custom hooks
import useSpots from "../../../hooks/useSpot"; // Custom hook
import useToken from "../../../hooks/useToken"; // Custom hook

/* import icons */
import { IoAddCircleOutline } from "react-icons/io5"; // Icon

/* styles */
import "./allSpots.scss";
import moduleStyle from "../../../assets/sass/main.module.scss";

/**
 * Component that displays all spots.
 * @returns {JSX.Element} JSX representation of the component.
 */
function GetSpots() {
  //Data
  const token = useToken();
  const spots = useSpots();
  //State
  const dispatch = useDispatch();
  const [FeedBack, setFeedBack] = useState(null);
  const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
  const [ModalCreateIsOpen, setModalCreateIsOpen] = useState(false);
  const [spot, setSpot] = useState(null);

  //Handlers
  /**
   * Handles spot deletion.
   * @param {string} id - The ID of the spot to be deleted.
   */
  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce lieu?")) {
      const action = dispatch(ActionDeleteSpot({ token: token, id: id }));
      if (action.type.endsWith("fulfilled")) {
        setFeedBack("Spot supprimé avec succès");
        setTimeout(() => {
          setFeedBack(null);
        }, 3000);
      }
    }
  };

  /**
   * Handles spot editing.
   * @param {Object} spot - The spot object to be edited.
   */
  const handleEdit = (spot) => {
    setSpot(spot);
    setModalUpdateIsOpen(true);
  };

  /**
   * Handles spot creation.
   */
  const handleCreate = () => {
    setModalCreateIsOpen(true);
  };

  return (
    <>
      <article className="allSpots">
        <div className="allSpots_header">
          <h2>Gestion des lieux</h2>
          <Feedback err={FeedBack} />
          <button className="btn-secondary xl" onClick={() => setModalCreateIsOpen(true)}>
            Ajouter un lieu
          </button>
        </div>
        <div className="allSpots_body">
          {spots.map((spot) => (
            <SpotCard
              key={spot._id}
              spot={spot}
              updateSpot={() => handleEdit(spot)}
              deleteSpot={() => handleDelete(spot._id)}
            />
          ))}
        </div>
        <div className="allSpots_footer"></div>
      </article>
      {modalUpdateIsOpen && (
        <UpdateSpot
          spot={spot}
          onOpen={modalUpdateIsOpen}
          modalClosed={(e) => setModalUpdateIsOpen(false)}
        />
      )}
      {ModalCreateIsOpen && (
        <CreateSpot
          isOpened={ModalCreateIsOpen}
          modalClosed={(e) => setModalCreateIsOpen(false)}
        />
      )}
    </>
  );
}

export default GetSpots;
