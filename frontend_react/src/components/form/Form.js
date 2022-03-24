import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

function Form(props) {
  let location = useLocation().pathname;
  return (
    <main className="Form">
      <h1 className="Form__title">{props.header}</h1>
      <div className="Form__container">
        <form className="Form__box" onSubmit={props.onSubmit}>
          {props.children}
          <button
            type="submit"
            className={`Form__button Form__button-text ${
              props.errors ? "Form__button_disabled" : null
            }`}
          >
            {props.btn}
          </button>
        </form>
        <div className="Form__route-container">
          <h2 className="Form__question">
            {props.text}&nbsp;
            <Link to={props.link} className={location === "/sign-in" ? "Form__link_purple" : "Form__link"}>
              {props.linkTitle}
            </Link>
          </h2>
          { location === "/sign-in" ? (
          <Link to="/sign-in/email" className="Form__link">
          <p className="Form__question Form__link Form__margin">{props.newPassword}</p>
          <div className="Form__input-error Form__input-hidden"></div>
          </Link>
           ) : ("")
          }
        </div>
      </div>
    </main>
  );
}

export default Form;
