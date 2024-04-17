// component that displays all spot .
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ActionDeleteSpot } from "../../redux/actions/spotAction";
import { Tooltip } from "antd";

import UpdateSpot from "../updateSpot";
import CreateSpot from "../createSpot";

import Feedback from "../../components/FeedBack";
//import custom hooks
import useSpots from "../../hooks/useSpot";
import useToken from "../../hooks/useToken";

/* import icons */
import { IoAddCircleOutline } from "react-icons/io5";

import "./allSpots.scss";




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
  const handleDelete = (id) => {
    const action = dispatch(ActionDeleteSpot({ token: token, id: id }));
    if (action.type.endsWith("fulfilled")) {
      setFeedBack("Spot supprimé avec succès");
      setTimeout(() => {
        setFeedBack(null);
      }, 3000);
    }
  };

  const handleEdit = (spot) => {
    setSpot(spot);
    setModalUpdateIsOpen(true);
  };

  const handleCreate = () => {
    setModalCreateIsOpen(true);
  };

  return (
    <>
    <article className="allSpots">
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
            <Tooltip title="Ajouter un lieu"  placement="right">
            <th onClick={(e)=> setModalCreateIsOpen(true)}> <IoAddCircleOutline className="spotAdd"/> </th>
            </Tooltip>
          </tr>
        </thead> 
        <tbody>
          {spots.map((spot) => (
            <tr key={spot._id}>
              <td>{spot.name}</td>
              <td className="td_activities">
                {spot.practicedActivities.map((activity, index) => (
                  <span key={activity.activityId}>{activity.activityName}</span>
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
              <td >
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
    {modalUpdateIsOpen &&
    <UpdateSpot spot={spot} onOpen={modalUpdateIsOpen} modalClosed={(e) => setModalUpdateIsOpen(false)} />
    }
    {ModalCreateIsOpen && 
    <CreateSpot isOpened={ModalCreateIsOpen} modalClosed={(e) => setModalCreateIsOpen(false)} />}
    </>
  );
}

export default AllSpot;
