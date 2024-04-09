import React from "react";
import moduleStyle from "../../assets/sass/main.module.scss";
import { Tooltip } from "antd";
import "./modal.scss";

/* iconographie */
import { IoIosCloseCircle } from "react-icons/io";

function Modal({ isOpened, children, Closed }) {
  const setClosed = (e) => {
    Closed(e);
  };

  if (isOpened) {
    return (
      <div className="modal" data-testid="modal">
        <div className="modal_content">
          <div className="modal_header">
          <Tooltip
                title="Fermer"
                placement="top"
                color={moduleStyle.toolTipBackground}
              >
            <IoIosCloseCircle
              onClick={(e) => setClosed(e)}
              className="modal_close"
            />
            </Tooltip>
          </div>
          <div className="modal_body">
            {children} 
          </div>   
        </div>
      </div>
    );
  }
}

export default Modal;
