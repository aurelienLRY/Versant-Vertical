import React from "react";
import "./modal.scss";

function Modal({ isOpened, children , Closed }) {

const setClosed = (e) => {
Closed(e);
}

  if (isOpened) {
    return (
      <div className="modal" data-testid="modal">
       
        <div className="modal_content"> 
        <button onClick={(e) => setClosed(e)}>Fermer </button>
        {children}</div>
      </div>
    );
  }
}

export default Modal;
