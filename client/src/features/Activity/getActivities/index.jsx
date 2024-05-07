import { useState } from "react";
/* redux */
import { useDispatch } from "react-redux";
import { ActionDeleteActivity } from "../../../redux/actions/activityAction";
/* components */
import Feedback from "../../../components/FeedBack";
import ActivityCard from "../../../components/activityCard";
import UpdateActivity from "../updateActivity";
import CreateActivity from "../createActivity";

/* librairie*/
import { IoAddCircleOutline } from "react-icons/io5"; // IoAddCircleOutline is a component from react-icons library
import { Tooltip } from "antd"; // Tooltip is a component from antd library

/* styles */
import "./allActivities.scss";
import moduleStyle from "../../../assets/sass/main.module.scss";

/* custom hooks */
import useActivities from "../../../hooks/useActivities";
import useToken from "../../../hooks/useToken";

/**
 * Component that displays all activities.
 * @returns {JSX.Element} The rendered component.
 */
function GetActivities() {
  const dispatch = useDispatch();
  const activities = useActivities();
  const token = useToken();
  const [modalUpdateIsopen, setModalUpdateIsOpen] = useState(false);
  const [modalCreateIsopen, setModalCreateIsOpen] = useState(false);
  const [activity, setActivity] = useState(null);
  const [FeedBack, setFeedBack] = useState(null);

  /**
   * Handles the delete action for an activity.
   * @param {string} id - The ID of the activity to delete.
   */
  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette activité?")) {
      const action = dispatch(ActionDeleteActivity({ token: token, id: id }));

      if (action.type.endsWith("fulfilled")) {
        setFeedBack("Activité supprimée avec succès");
        setTimeout(() => {
          setFeedBack(null);
        }, 3000);
      }
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
      <article className="allActivities ">
        <div className="allActivities_header">
          <h2>Gestion des activités </h2>
          <Feedback err={FeedBack} />
          <button className="btn-secondary xl" onClick={() => setModalCreateIsOpen(true) }>Ajouter une activité</button>
        </div>
        <div className="allActivities_body">
          {activities.map((activity) => (
            <ActivityCard
              key={activity._id}
              activity={activity}
              updateActivity={() => handleEdit(activity)}
              deleteActivity={() => handleDelete(activity._id)}
            />
          ))}
        </div>
        <div className="allActivities_footer"></div>
      </article>

      {modalUpdateIsopen && (
        <UpdateActivity
          onOpen={modalUpdateIsopen}
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

export default GetActivities;
