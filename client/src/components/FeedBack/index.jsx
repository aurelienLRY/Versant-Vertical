
import React from "react";
import PropTypes from "prop-types";
import { IoWarningOutline } from "react-icons/io5";
import "./feedback.scss";
/**
 * Renders a feedback component.
 * @param {string} err - The error message to display.
 * @returns {JSX.Element} The rendered feedback component.
 */
function Feedback({err}) {
  return (
   <>
      {err && (
        <p className="error">
          <IoWarningOutline /> {err}
        </p>
      )}
</>
  );
}

Feedback.propTypes = {
  err: PropTypes.string,
};

export default Feedback;
