import React, { useState, useContext } from "react";
import axios from "axios";
import MainContext from "../../context/MainContext";
import AuthContext from "../../context/AuthContext";
import UserForm from "../userForm/UserForm";

function AddCard() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  let { setAds, ads } = useContext(MainContext);
  let { authTokens } = useContext(AuthContext);

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

  const addCard = async (e) => {
    e.preventDefault();
    const url = "http://127.0.0.1:8000/ads/";
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", `${title}`);
    formData.append("price", `${price}`);
    formData.append("description", `${description}`);

    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let newAd = await response.data;

    if (response.status === 201) {
      setAds([newAd.data, ...ads]);
      window.location.reload();
    }
  };
  return (
    <UserForm
      title="Добавить новый товар"
      buttonText="Добавать"
      onSubmit={addCard}
    >
      <div className="userForm__form-container userForm__form-box">
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
  );
}

export default AddCard;
