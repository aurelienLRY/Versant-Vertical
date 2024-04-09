import React, { useState, useEffect } from 'react'
import GetReserve from '../models/getReservation'
import { formatDate } from '../../../../utils/helper/date';

function AllReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const data = await GetReserve();
      setReservations(data);
    };

    fetchReservations();
  }, []);

  const handleEdit = (id) => {
    // Code pour gérer l'édition d'une réservation
    console.log(`Edit reservation with id ${id}`);
  };

  const handleDelete = (id) => {
    // Code pour gérer la suppression d'une réservation
    console.log(`Delete reservation with id ${id}`);
  };

  return (
    <article className='Activity_table'>
      <h3>Activités programmées </h3>
      <table>
        <thead>
          <tr>
            <th>Activité</th>
            <th>Date</th>
            <th>Spot</th>
            <th>User Max</th>
            <th>Places Reserved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.activity}</td>
              <td>{formatDate(reservation.date)}</td>
              <td>{reservation.spot}</td>
              <td>{reservation.userMax}</td>
              <td>{reservation.placesReserved}</td>
              <td>
                <button onClick={() => handleEdit(reservation._id)}>Modifier</button>
                <button onClick={() => handleDelete(reservation._id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}



export default AllReservations;