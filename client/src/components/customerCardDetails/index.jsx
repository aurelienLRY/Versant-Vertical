/* Libraries */
import {useState}from "react";
import { Tooltip } from "antd";
/* Redux */
import { useDispatch } from "react-redux";
import { ActionUpdateCustomer } from "../../redux/actions/customerAction";
import { updateBooking } from "../../redux/reducers/sessionSlice";
/* Custom hooks */
import useCustomerSession from "../../hooks/useCustomerSession";
import useToken from "../../hooks/useToken";
/* icons */
import { BsFillPeopleFill } from "react-icons/bs";
import { IoPersonRemoveSharp } from "react-icons/io5";
/* services */
import { findItemById } from "../../services/relationCollection";
/* Components */
import Feedback from "../FeedBack";

/* styles */
import "./customerCardDetails.scss";
import moduleStyle from "../../assets/sass/main.module.scss";
import useSessions from "../../hooks/useSessions";

export default function DetailsCustomerSession({ customer , archiveCustomer , sessionId  }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const customers = useCustomerSession();
  const dispatch = useDispatch();
  const token = useToken();
  const {allSession} = useSessions();
  const session = findItemById(allSession, sessionId);

  const removeOnePeople = async (peopleId , customerId) => {
      const customer = findItemById(customers, customerId);
    const updatedPeopleList = customer.people_list.filter(people => people._id !== peopleId);
  
    const updatedCustomer = {
      ...customer,
      people_list: updatedPeopleList,
      number_of_people : customer.number_of_people -1 ,
    };
  
    const action = await dispatch(ActionUpdateCustomer({ token, customer: updatedCustomer }));
   
    if (action.type.endsWith("rejected")) {
      setError(action.error.message);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
    if (action.type.endsWith("fulfilled")) {
      const b = {
        ...session,
        placesReserved: session.placesReserved - 1,
      };
      dispatch(updateBooking(b));
      
      setSuccess("La personne a bien été retirée de la session");
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    }
  } 
  return (
    <>
    <Feedback error={error} success={success} />
    <div className={`detailsCustomerSession ${customer.status === "cancelled" ? 'disabled': ""}` }>
      <div className="detailsCustomerSession_header">
        <p>
          <strong>{customer.last_name}</strong>  {" "}
          {customer.first_names}
        </p>
        <p>
          <a href={`mailto:${customer.email}`}>{customer.email}</a>
        </p>
        <p>
          <a href={`tel:+${customer.phone}`}>{customer.phone}</a>
        </p>
      </div>
      <div className="detailsCustomerSession_people">
        {customer.people_list.map((people, index) => (
          <div key={index} className="item">
            <div>
              <BsFillPeopleFill className="icon" /><span>{index + 1}</span>
            </div>
            <div className="col">
              <p>{`Poids: ${people.weight} kg`}</p>
              <p>{`Taille: ${people.size} cm`}</p>
            </div>
            <div className="cta">
              {customer.number_of_people > 1 && (
                <Tooltip
                  title="Retirer la personne du groupe "
                  placement="right"
                  color={moduleStyle.toolTipBackground}
                >
                  <IoPersonRemoveSharp className="icon remove" onClick={() => removeOnePeople(people._id , customer._id)}/>
                </Tooltip>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="cta">
        {customer.status === "validated" && (
          <button className="btn-danger small" onClick={() => archiveCustomer(customer._id)}>Annuler</button>
        )}
      </div>
    </div>
    </>
  );
}


