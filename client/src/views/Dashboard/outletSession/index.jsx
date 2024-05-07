import { useState } from "react";
import GetActiveSessions from "../../../features/Session/getActiveSession";
import CreateSession from "../../../features/Session/createSession";

/*styles*/
import "./outletSession.scss";
import GetArchiveSession from "../../../features/Session/getArchiveSession";

function OutletSession() {
  const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);
  const handleCreate = () => setModalCreateIsOpen(true);

  return (
    <>
      <article className="session">
        <div className="session_header">
          <h2>Gestion des sessions</h2>
          <div className="action">
            <button className="btn-secondary xl" onClick={handleCreate}>
              Ajouter une session
            </button>
          </div>
        </div>
        <div className="session_body">
          <h3> Session en cours </h3>
          <GetActiveSessions  />
          <h3>Sessions archivées</h3>
          <GetArchiveSession  />
        </div>
      </article>

      <CreateSession
        isOpened={modalCreateIsOpen}
        modalClosed={() => setModalCreateIsOpen(false)}
      />
    </>
  );
}

export default OutletSession;
