import React from "react";
import { IoWarningOutline } from "react-icons/io5";
import "./feedback.scss";

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

export default Feedback;
