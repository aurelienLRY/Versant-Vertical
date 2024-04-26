import { useEffect, useState } from "react";

/* Custom Hooks */
import useSpots from "../../hooks/useSpot";
import useActivities from "../../hooks/useActivities";
import useSessions from "../../hooks/useSessions";

/* Services */
import { formatDate } from "../../services/formatDate";

/* Styles */
import "./formBook.scss";

function FormBook() {
  const bookings = useSessions();
  const activities = useActivities();
  const spots = useSpots();
  const [selectedActivity, setSelectedActivity] = useState(false);
  const [maxOfPeople, setMaxOfPeople] = useState(null);
  const [placesReserved, setPlacesReserved] = useState(false);

  const handleSelectActivity = (event) => {
    if (event.target.value === "otherDate") {
      setSelectedActivity(true);
    } else {
      setSelectedActivity(false);
      const selectedIs = bookings.find(
        (booking) => booking._id === event.target.value
      );
      const b =
        parseInt(selectedIs.userMax) - parseInt(selectedIs.placesReserved);
      setMaxOfPeople(b);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Array.from(formData.entries()).reduce((acc, [key, value]) => {
      if (key.startsWith("size") || key.startsWith("weight")) {
        const index = key.split("-")[1];
        if (!acc.people_list) {
          acc.people_list = [];
        }
        if (!acc.people_list[index]) {
          acc.people_list[index] = {};
        }
        acc.people_list[index][key.split("-")[0]] = value;
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
    console.log("JSON du formulaire >>>> ", data);
  };

  if (bookings.length > 0 && activities.length > 0) {
    return (
      <form onSubmit={handleSubmit} className="formBook">
        <div className="information">
          <div className="group-form">
            <label htmlFor="last_name">
              Nom
              <input type="text" id="last_name" name="last_name" required />
            </label>
            <label htmlFor="first_name">
              Prénom
              <input type="text" id="first_name" name="first_name" required />
            </label>
          </div>

          <div className="group-form">
            <label htmlFor="email">
              Email
              <input type="email" id="email" name="email" required />
            </label>
            <label htmlFor="phone">
              Téléphone
              <input type="tel" id="phone" name="phone" required />
            </label>
          </div>
        </div>

        <label htmlFor="event">
          Activité
          <select id="event" name="event" onChange={handleSelectActivity}>
            {bookings.map((booking) => (
              <option value={booking._id}>
                {displayActivity(booking, activities)}
              </option>
            ))}
            <option value="otherDate">Je ne trouve pas mon bonheur</option>
          </select>
        </label>

        <div className="group-form">
          <label htmlFor="number">
            Nombre de personnes
            <input
              type="number"
              id="numberOfBooking"
              name="numberOfBooking"
              min="1"
              max={maxOfPeople} // Add this line
              required
              onInvalid={(e) => {
                e.target.setCustomValidity(
                  `Pour cette activité , il reste ${maxOfPeople} place(s)`
                );
              }}
              onInput={(e) => e.target.setCustomValidity("")}
              onChange={(e) => setPlacesReserved(e.target.value)}
            />
          </label>
        </div>

        {placesReserved && (
          <div className="placesReserved">
            {Array.from({ length: placesReserved }, (_, index) => (
              <>
                <span> Personne {index + 1} </span>
                <div key={index} className="group-form">
                  <label htmlFor={`size-${index}`}>
                    Taille en cm
                    <input
                      type="number"
                      id={`size-${index}`}
                      name={`size-${index}`}
                      min="1"
                      required
                      placeholder="Exemple: 180"
                    />
                  </label>

                  <label htmlFor={`weight-${index}`}>
                    Poids en kg
                    <input
                      type="number"
                      id={`weight-${index}`}
                      name={`weight-${index}`}
                      min="1"
                      required
                      placeholder="Exemple: 70"
                    />
                  </label>
                </div>
              </>
            ))}
          </div>
        )}

        <button type="submit" className="btn ">
          Réserver
        </button>
      </form>
    );
  }
}

export default FormBook;

function displayActivity(booking, activities) {
  const activity = activities.find(
    (activity) => activity._id === booking.activity
  );
  return `${activity.name} le ${formatDate(booking.date)} à ${
    booking.startTime
  } heures`;
}
