import React from "react";

function LinkForm(props) {
  console.log(props.onSubmit);
  return (
    <main className="LinkForm">
      <form className="LinkForm__form" onSubmit={props.onSubmit}>
        {props.children}
      </form>
      <button
        className={`LinkForm__button ${
          props.error ? "Comment__button_disabled" : ""
        }`}
        disabled={props.disabled}
        type="submit"
      >
        {props.buttonName}
      </button>
      <div className="LinkForm__inputHidden LinkForm__inputError"></div>
    </main>
  );
}

export default LinkForm;
