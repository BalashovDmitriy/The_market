import React, { useState } from "react";
import MediaQuery from "react-responsive";

function SearchForm({ ad, setAd, onChange }) {
  const [validationErrors, setValidationErrors] = useState(""); //state of input validation

  function handleChangeProduct(e) {
    const { value } = e.target;
    setAd(value);

    if (!value.length) {
      setValidationErrors("Нужно ввести ключевое слово");
    } else {
      return setValidationErrors("");
    }
  }

  function onFilter() {
    onChange(ad)
  }

  return (
    <section className="SearchForm">
      <form className="SearchForm__container" onSubmit={onFilter}>
        <>
          <MediaQuery minWidth={501}>
            <div className="SearchForm__box">
              <input
                className="SearchForm__input"
                placeholder="Введите название"
                type="text"
                name="text"
                minLength="1"
                required
                value={ad || ""}
                onChange={handleChangeProduct}
              />
              <button
                type="submit"
                className={`SearchForm__btn ${
                  !ad.length ? "SearchForm__btn-disabled" : null
                }`}
              >
                Найти
              </button>
            </div>
            <div
              className={`Form__input-hidden ${
                validationErrors ? "Form__input-error" : ""
              }`}
            >
              {validationErrors}
            </div>
          </MediaQuery>
          <MediaQuery maxWidth={500}>
            <input
              className="SearchForm__input"
              placeholder="Введите название"
              type="text"
              name="text"
              value={ad}
              minLength="1"
              required
              onChange={handleChangeProduct}
            />
            <div
              className={`Form__input-hidden ${
                validationErrors ? "Form__input-error" : ""
              }`}
            >
              {validationErrors}
            </div>
            <button
              type="submit"
              className={`SearchForm__btn ${
                !ad.length ? "SearchForm__btn-disabled" : null
              }`}
            >
              Найти
            </button>
          </MediaQuery>
        </>
      </form>
    </section>
  );
}

export default SearchForm;
