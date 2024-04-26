import React from "react";
import BookingActivities from "../../../features/Session/getSession";

function OutletMain() {
  return (
    <>
      <h2>Dashboard</h2>
      <div className="dashboard_body">
        <div className="dashboard_stats">
          <aside>
            <iframe
              src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FParis&bgcolor=%23ffffff&showTitle=0&showCalendars=0&showTz=0&showPrint=0&src=ZDdlNzFlMzYzMmJkZjI3Mjg2Y2UyZmY5NDE0NmY0M2E1MWE5MTA3Y2FlYTJlM2U0Y2NhNjhmZTQ2OTNkOGYzOUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23F09300"
              className="calendar"
            ></iframe>
          </aside>
          <BookingActivities />
        </div>
        <div className="dashboard_action">
          <div>Créer une session</div>
          <div>Ajouter un client sur une session</div>
          <div>Annuler une session</div>
        </div>
      </div>
    </>
  );
}

export default OutletMain;
