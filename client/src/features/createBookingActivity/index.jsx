import useToken from "../../hooks/useToken";
import "./createBooking.scss"

function CreateBookingActivity() {
  const  token  = useToken();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Array.from(formData.entries()).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

    console.log("handlesoumit", data);
    //CreateReserve(data, token);
  };

  return (
    <div className="reservation_creat">
      <h3>Ajouter une activité</h3>
      <form onSubmit={handleSubmit}>
        <div className="group-form">
          <label htmlFor="date">Date </label>
          <input type="date" id="date" name="date" required />
        </div>
        <div className="group-form">
          <label htmlFor="activity">Activité</label>
          <input type="text" id="activity" name="activity" required />
        </div>
        <div className="group-form">
          <label htmlFor="spot">Nombre de places</label>
          <input type="number" id="spot" name="spot" required />
        </div>
        <div className="group-form">
          <label htmlFor="userMax">Nombre de participants maximum</label>
          <input type="number" id="userMax" name="userMax" required />
        </div>
        <div className="group-form">
          {" "}
          <label htmlFor="placesReserved">Nombre de places réservées</label>
          <input
            type="number"
            id="placesReserved"
            name="placesReserved"
            required
          />
        </div>
        <button type="submit"> Enregistrer </button>
      </form>
    </div>
  );
}

export default CreateBookingActivity;
