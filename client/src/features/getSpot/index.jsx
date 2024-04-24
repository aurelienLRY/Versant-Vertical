/**
 * Component that displays all spots.
 * @component
 */

/* react */
import { useState } from "react"; // React hooks

/* redux */
import { useDispatch } from "react-redux"; // Redux hook
import { ActionDeleteSpot } from "../../redux/actions/spotAction"; // Redux action

/* ant design */
import { Tooltip } from "antd"; // Ant design tooltip

/* components */
import UpdateSpot from "../updateSpot"; // Update spot component
import CreateSpot from "../createSpot"; // Create spot component
import Feedback from "../../components/FeedBack"; // Feedback component

//import custom hooks
import useSpots from "../../hooks/useSpot"; // Custom hook
import useToken from "../../hooks/useToken"; // Custom hook

/* import icons */
import { IoAddCircleOutline } from "react-icons/io5"; // Icon

/* styles */
import "./allSpots.scss";
import moduleStyle from "../../assets/sass/main.module.scss";

/**
 * Component that displays all spots.
 * @returns {JSX.Element} JSX representation of the component.
 */
function AllSpot() {
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
    const action = dispatch(ActionDeleteSpot({ token: token, id: id }));
    if (action.type.endsWith("fulfilled")) {
      setFeedBack("Spot supprimé avec succès");
      setTimeout(() => {
        setFeedBack(null);
      }, 3000);
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
      <article className="allSpots outlet">
        <h3>Lieu </h3>
        <Feedback err={FeedBack} />
        <table className="allSpots_table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Activités pratiqués</th>
              <th>Nombre de personnes</th>
              <th>Localisation</th>
              <th>point de rendez vous</th>
              <th>durée estimé</th>

              <th onClick={(e) => setModalCreateIsOpen(true)}>
                <Tooltip
                  title="Ajouter un lieu"
                  placement="right"
                  color={moduleStyle.toolTipBackground}
                >
                  <IoAddCircleOutline className="icon add" />
                </Tooltip>
              </th>
            </tr>
          </thead>
          <tbody>
            {spots.map((spot) => (
              <tr key={spot._id}>
                <td>{spot.name}</td>
                <td className="td_activities">
                  {spot.practicedActivities.map((activity, index) => (
                    <span key={activity.activityId}>
                      {activity.activityName}
                    </span>
                  ))}
                </td>
                <td>
                  {spot.min_OfPeople && "Min : " + spot.min_OfPeople}
                  {spot.max_OfPeople && spot.min_OfPeople && " | "}
                  {spot.max_OfPeople && "Max : " + spot.max_OfPeople}
                </td>

                <td>{spot.gpsCoordinates}</td>
                <td>{spot.meetingPoint}</td>
                <td>{spot.estimatedDuration}</td>
                <td>
                  <div className="td_action">
                    <button
                      onClick={() => handleEdit(spot)}
                      className="btn-warning-outline small"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(spot._id)}
                      className="btn-danger-outline small"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default AllSpot;
