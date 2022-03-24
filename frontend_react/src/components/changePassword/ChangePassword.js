import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

function ChangePassword() {
  const [new_password, setNew_password] = useState("")
  const [current_password, setCurrent_password] = useState("");
  const match = useParams();
  const history = useHistory();

  const handleChangePassword = (e) => {
    setNew_password(e.target.value);
  };
  const handleChangeConfirmedPassword = (e) => {
    setCurrent_password(e.target.value);
  };

  function heandlerSubmit() {
    var myHeaders = new Headers();
    debugger
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      uid: match.Ng,
      token: match.id,
      new_password: new_password
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://127.0.0.1:8000/users/reset_password_confirm/", requestOptions)
      .then(() => history.push("/sign-in"))
      .catch((error) => console.log("error", error));
  }
  
  return (
    <main className="LinkForm">
      <form className="LinkForm__form">
      <label className="LinkForm__label">
        <h2 className="LinkForm__subtitlte">Новый пороль</h2>
        <input
          className="LinkForm__input"
          required
          value={new_password || ""}
          name="current_password"
          type="password"
          minLength="8"
          onChange={handleChangePassword}
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
          value={current_password || ""}
          name="new_password"
          type="password"
          minLength="8"
          onChange={handleChangeConfirmedPassword}
        />
        <div
          className="LinkForm__inputHidden"
        />
      </label>
      </form>
      <button
        className="LinkForm__button"
        onClick={heandlerSubmit}
      >
        Сохранить
      </button>
      <div className="LinkForm__inputHidden LinkForm__inputError"></div>
    </main>
  );
}

export default ChangePassword;
