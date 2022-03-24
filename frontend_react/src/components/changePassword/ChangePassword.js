import React from "react";
//import LinkForm from "../linkForm/LinkForm";

function ChangePassword() {
  //const [current_password, setCurrent_password] = useState("");

  
  return (
    <main className="LinkForm">
      <form className="LinkForm__form" >
      <label className="LinkForm__label">
        <h2 className="LinkForm__subtitlte">Новый пороль</h2>
        <input
          className="LinkForm__input"
          required
          //value={current_password || ""}
          id="password"
          name="current_password"
          type="password"
          minLength="8"
          //onChange={handleChangeInput}
        />
        <div
          className="LinkForm__inputHidden"
        />
      </label>
      <label className="LinkForm__label">
        <h2 className="LinkForm__subtitlte">Повторить новый пороль</h2>
        <input
          className="LinkForm__input"
          required
          //value={new_password}
          id="password"
          name="new_password"
          type="password"
          minLength="8"
          //onChange={handleChangeInput}
        />
        <div
          className="LinkForm__inputHidden"
        />
      </label>
      </form>
      <button
        className="LinkForm__button"
        type="submit"
      >
        Сохранить
      </button>
      <div className="LinkForm__inputHidden LinkForm__inputError"></div>
    </main>
  );
}

export default ChangePassword;
