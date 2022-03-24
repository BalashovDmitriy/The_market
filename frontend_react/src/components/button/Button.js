import React from "react";

function Button({ logOut, text, className }) {
  return (
    <button
      className={className}
      type="button"
      onClick={logOut}
    >
      {text}
    </button>
  );
}

export default Button;
