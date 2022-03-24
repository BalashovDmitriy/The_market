import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext"
import Form from "../form/Form";
import useFormValidation from "../../utils/hooks/useFormValidation";

function Login(props) {
  const [input, setInput] = useState("");
  const { values, handleChange, errors, isValid } = useFormValidation();
  let {loginUser} = useContext(AuthContext)

  function handleChangeInput(e) {
    handleChange(e);
    if (input.length > 0) {
      setInput("");
    }
  }

  return (
    <Form
      header="Рады видеть!"
      onSubmit={loginUser}
      path="/profile"
      btn="Войти"
      link="/sign-up"
      linkTitle="Создать аккаунт"
      newPassword="Восстановить пароль"
      errors={!isValid}
    >
      <>
        <label className="Form__label">
          <h2 className="Form__description">E-mail</h2>
          <input
            required
            name="email"
            type="email"
            value={values.email || ""}
            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
            autoComplete="on"
            className="Form__email Form__input"
            onChange={handleChangeInput}
          />
          <div
            className={`Form__input-hidden ${
              errors.email ? "Form__input-error" : ""
            }`}
          >
            {errors.email}
          </div>
        </label>
        <label className="Form__label">
          <h2 className="Form__description">Пароль</h2>
          <input
            required
            value={values.password || ""}
            name="password"
            type="password"
            minLength="1"
            autoComplete="on"
            className="Form__password Form__input"
            onChange={handleChangeInput}
          />
          <div
            className={`Form__input-hidden ${
              errors.password ? "Form__input-error" : ""
            }`}
          >
            {errors.password}
          </div>
        </label>
      </>
    </Form>
  );
}

export default Login;
