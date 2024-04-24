import { useState } from "react";
import { useDispatch } from "react-redux";
import { ActionDeleteActivity } from "../../redux/actions/activityAction";
import UpdateActivity from "../updateActivity";
import CreateActivity from "../createActivity";
import Feedback from "../../components/FeedBack";

import { IoAddCircleOutline } from "react-icons/io5"; // IoAddCircleOutline is a component from react-icons library
import { Tooltip } from "antd"; // Tooltip is a component from antd library

import "./allActivities.scss";
import moduleStyle from "../../assets/sass/main.module.scss";

//import custom hooks
import useActivities from "../../hooks/useActivities";
import useToken from "../../hooks/useToken";

/**
 * Component that displays all activities.
 * @returns {JSX.Element} The rendered component.
 */
function AllActivities() {
  const dispatch = useDispatch();
  const activities = useActivities();
  const token = useToken();
  const [modalUpadateIsopen, setModalUpdateIsOpen] = useState(false);
  const [modalCreateIsopen, setModalCreateIsOpen] = useState(false);
  const [activity, setActivity] = useState(null);
  const [FeedBack, setFeedBack] = useState(null);

  /**
   * Handles the delete action for an activity.
   * @param {string} id - The ID of the activity to delete.
   */
  const handleDelete = (id) => {
    const action = dispatch(ActionDeleteActivity({ token: token, id: id }));

    if (action.type.endsWith("fulfilled")) {
      setFeedBack("Activité supprimée avec succès");
      setTimeout(() => {
        setFeedBack(null);
      }, 3000);
    }
  };

  /**
   * Handles the edit action for an activity.
   * @param {object} activity - The activity to edit.
   */
  const handleEdit = (activity) => {
    setActivity(activity);
    setModalUpdateIsOpen(true);
  };

  const handleCreate = () => setModalCreateIsOpen(true);

  return (
    <>
      <article className="allActivities outlet">
        <h3>Activities enregistrées</h3>
        <Feedback err={FeedBack} />
        <table className="allActivities_table">
          <thead>
            <tr>
              <th>Nom</th>
              {/* <th>Description</th> */}
              <th>Type de formule</th>
              <th>Prix</th>
              <th>Nombre de personnes</th>
              <th>Age minimum</th>
              <th onClick={handleCreate} >
              <Tooltip
                  title="Ajouter une activité"
                  placement="right"
                  color={moduleStyle.toolTipBackground}
                >
                  <IoAddCircleOutline className="icon add" />
                </Tooltip>
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td>{activity.name}</td>
                {/* <td>{activity.description}</td> */}
                <td>
                  {activity.half_day && "Demi-journée"}
                  {activity.half_day && activity.full_day && " | "}
                  {activity.full_day && "Journée"}
                </td>
                <td>
                  {activity.half_day &&
                    activity.price_half_day &&
                    activity.price_half_day + "€"}
                  {activity.full_day &&
                    activity.half_day &&
                    activity.price_half_day &&
                    activity.price_full_day &&
                    " | "}
                  {activity.full_day &&
                    activity.price_full_day &&
                    activity.price_full_day + "€"}
                </td>
                <td>
                  {activity.min_OfPeople && "Min : " + activity.min_OfPeople}
                  {activity.max_OfPeople && activity.min_OfPeople && " | "}
                  {activity.max_OfPeople && "Max : " + activity.max_OfPeople}
                </td>
                <td>{activity.min_age + " ans"}</td>
                <td>
                  <div className="td_action">
                    <button
                      onClick={() => handleEdit(activity)}
                      className="btn-warning-outline small"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(activity._id)}
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
      {modalUpadateIsopen && (
        <UpdateActivity
          onOpen={modalUpadateIsopen}
          modalClosed={(e) => setModalUpdateIsOpen(e)}
          activ={activity}
        />
      )}

      {modalCreateIsopen && (
        <CreateActivity
          isOpened={modalCreateIsopen}
          modalClosed={() => setModalCreateIsOpen(false)}
        />
      )}
    </>
  );
}

export default AllActivities;
