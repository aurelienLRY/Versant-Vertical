import React from 'react'
import useCustomerSession from "../../../hooks/useCustomerSession";
import { formatDateTime } from '../../../services/formatDate';

function GetCustomer() {
  
  const customers = useCustomerSession();
  
  
    return (
    <article className='customers_session'>
        <h3>Sessions reservées</h3>
        <table>
            <thead>
            <tr>
              <th>Date de la réservation</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>status</th>
            </tr>
            </thead>
            <tbody>
            {customers.map((customer) => (
                <tr key={customer._id}>
                <td>{formatDateTime(customer.date)}</td>
                <td>{customer.first_names}</td>
                <td>{customer.last_name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.status}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </article>
  )
}

export default GetCustomer