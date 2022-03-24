import React, { useState, createContext, useEffect } from "react";
import useAxios from "../utils/useAxios";

const MainContext = createContext();

export default MainContext;

export const MainContextStates = ({ children }) => {
  const [ads, setAds] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [userAds, setUserAds] = useState([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isComPopupOpen, setIsComPopupOpen] = useState(false);
  const api = useAxios();

  //Open/close navigation when page's size max-width 840px

  const handleOpenEditPopup = () => {
    setIsEditPopupOpen(true);
  };

  const handleEditCommPopupOpen = () => {
    setIsComPopupOpen(true);
  };

  const closePopup = () => {
    setIsComPopupOpen(false);
    setIsEditPopupOpen(false);
  };

  const getUsersAds = async () => {
    const response = await api.get("/ads/me/");

    if (response.status === 200) {
      setUserAds(response.data.results);
    }
  };

  const getUser = async () => {
    const response = await api.get("/users/me");

    if (response.status === 200) {
      setUserInfo(response.data);
      localStorage.setItem("userPers", JSON.stringify(userInfo));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const mainData = {
    userInfo: userInfo,
    ads: ads,
    userAds: userAds,
    setUserInfo: setUserInfo,
    setUserAds: setUserAds,
    setAds: setAds,
    getUser: getUser,
    getUsersAds: getUsersAds,
    isEditPopupOpen: isEditPopupOpen,
    isComPopupOpen: isComPopupOpen,
    handleOpenEditPopup: handleOpenEditPopup,
    handleEditCommPopupOpen: handleEditCommPopupOpen,
    closePopup: closePopup,
  };

  return (
    <MainContext.Provider value={mainData}>{children}</MainContext.Provider>
  );
};
