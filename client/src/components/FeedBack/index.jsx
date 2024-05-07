import React from "react";
import PropTypes from "prop-types";
import { IoWarningOutline } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";

import "./feedback.scss";
/**
 * Renders a feedback component.
 * @param {string} err - The error message to display.
 * @returns {JSX.Element} The rendered feedback component.
 */
function Feedback({ err, success }) {
  return (
    <div className="feedback">

      {err && (
        <p className="error">
          <IoWarningOutline /> {err}
        </p>
      )}

      {success && (
        <p className="success">
          <FaCircleCheck /> {success}
        </p>
      )}
    </div>
  );
}

Feedback.propTypes = {
  err: PropTypes.string,
};

Feedback.defaultProps = {
  err: null,
  success: null,
};

export default Feedback;
