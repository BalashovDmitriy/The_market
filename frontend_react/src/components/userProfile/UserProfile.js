import React, { useContext, useEffect } from "react";
import MainContext from "../../context/MainContext";
import Profile from "../profile/Profile";
import Cards from "../cards/Cards";

function UserProfile() {
  const { userInfo, setUserInfo, userAds, getUsersAds } =
    useContext(MainContext);

  useEffect(() => {
    getUsersAds();
  }, []);

  return (
    <main className="userProfile">
      <Profile user={userInfo} setUser={setUserInfo} />
      <h2 className="userCards__title">Мои товары</h2>
      <Cards ads={userAds} />
    </main>
  );
}

export default UserProfile;
