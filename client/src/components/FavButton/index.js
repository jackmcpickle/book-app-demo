import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function FavButton({
  onClick,
  active
}) {
  return (
    <span className={`${active ? 'active' : ''} fav-btn`} onClick={onClick} role="button" tabIndex="0">
      {active ? '-' : '+'}
    </span>
  );
}

export default FavButton;
