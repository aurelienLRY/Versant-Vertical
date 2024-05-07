import React from "react";

function Card({ title, children, footer }) {
  return (
    <div className="card">
      <div className="card_header">
        <h3>{title}</h3>
      </div>
      <div className="card_body">{children}</div>
      <div className="card_footer">{footer}</div>
    </div>
  );
}

export default Card;
