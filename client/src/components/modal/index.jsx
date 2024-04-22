/* librairie */
import { Tooltip } from "antd";
import PropTypes from "prop-types";

/* styles */
import "./modal.scss";
import moduleStyle from "../../assets/sass/main.module.scss";
/* iconographie */
import { IoIosCloseCircle } from "react-icons/io";
 
/**
 * Modal component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpened - Indicates whether the modal is open or not.
 * @param {React.ReactNode} props.children - The content of the modal.
 * @param {Function} props.Closed - The function to be called when the modal is closed.
 * @returns {React.ReactNode} The modal component.
 */
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

Modal.prototype = {
  isOpened: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  Closed: PropTypes.func.isRequired,
};

export default Modal;
