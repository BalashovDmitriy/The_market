import React, { useState, useContext } from "react";
import axios from "axios";
import MainContext from "../../context/MainContext";
import AuthContext from "../../context/AuthContext";
import UserForm from "../userForm/UserForm";

function EditPopup({ isEditPopupOpen, onClose, id , product}) {
  let { setAds } = useContext(MainContext);
  let { authTokens } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const editAdd = async (e) => {
    e.preventDefault();
    const url = `http://127.0.0.1:8000/ads/${id}/`;
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", `${title}`);
    formData.append("price", `${price}`);
    formData.append("description", `${description}`);

    let response = await axios.patch(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + String(authTokens.access),
      },

    });
    let data = await response.data;

    if (response.status === 200) {
      setAds((ads) => ads.filter((ad) => (ad.is === product.id ? data : null)));
      window.location.reload();
    } else if (response.statusText === "Unauthorized") {
      console.log("error!");
    }
  };

  return (
    <div
      className={`popup editPopup ${isEditPopupOpen ? "popup_is-opened" : ""}`}
    >
      <div className="popup__container">
        <button
          onClick={onClose}
          className="close-button close-button_form"
        ></button>
        <UserForm
          id={id}
          title="Изменить товар"
          onSubmit={editAdd}
          buttonText="Изменить"
        >
          <div className="userForm__form-container">
            <label className="userForm__label">
              <h2 className="userForm__subtitle">Название</h2>
              <input
                className="userForm__input"
                required
                name="title"
                type="text"
                minLength="3"
                maxLength="30"
                onChange={handleTitleChange}
              />
            </label>
            <label className="userForm__label">
              <h2 className="userForm__subtitle">Изображение</h2>
              <input
                name="image"
                title="Картинка"
                className="userForm__input"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />
            </label>
          </div>
          <div className="userForm__form-container">
            <label className="userForm__label">
              <h2 className="userForm__subtitle">Цена</h2>
              <input
                className="userForm__input"
                type="number"
                required
                valur={price || ""}
                name="price"
                minLength="1"
                maxLength="30"
                onChange={handlePriceChange}
              />
            </label>
            <label className="userForm__label">
              <h2 className="userForm__subtitle">Описание</h2>
              <input
                className="userForm__input"
                required
                name="description"
                type="text"
                minLength="8"
                maxLength="30"
                onChange={handleDescriptionChange}
              />
            </label>
          </div>
        </UserForm>
      </div>
    </div>
  );
}

export default EditPopup;
