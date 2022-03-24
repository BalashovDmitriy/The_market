import React, { useState } from "react";
import UserForm from "../userForm/UserForm";
import useFormValidation from "../../utils/hooks/useFormValidation";

function EditCommentPopup({isOpen, onClose, getComment, id, editComment}) {
  const [input, setInput] = useState("");
  const { values, handleChange, errors, isValid } = useFormValidation();

  function handleChangeInput(e) {
    handleChange(e);
    if (input.length > 0) {
      setInput("");
    }
  }

  return (
    <div
      className={`popup editPopup ${isOpen ? "popup_is-opened" : ""}`}
    >
      <div className="popup__container-comment">
        <button
          onClick={onClose}
          className="close-button close-button_form"
        ></button>
        <UserForm
          id={id}
          onSubmit={editComment}
          title="Изменить"
          buttonText="Изменить"
          errors={!isValid}
          disabled={!isValid}
        >
          <label className="userForm__label userForm__label-comment">
            <h2 className="userForm__subtitle">Комментарий</h2>
            <input
              className="userForm__input"
              required
              value={values.text || ""}
              placeholder={getComment.text}
              title="Название"
              name="text"
              type="text"
              minLength="3"
              maxLength="100"
              onChange={handleChangeInput}
            />
            <div
              className={`Form__input-hidden ${
                errors.title ? "Form__input-error" : ""
              }`}
            >
              {errors.title}
            </div>
          </label>
        </UserForm>
      </div>
    </div>
  );
}

export default EditCommentPopup;
