import React, { useState, useEffect } from "react";
import { useHistory, Switch, Route } from "react-router-dom";
import Footer from "../footer/Footer";
import PopupNavigation from "../popopNavigation/PopupNavigation";
import Header from "../header/Header";
import Registration from "../registration/Registration";
import Login from "../login/Login";
import PrivateRoute from "../privateRoute/PrivateRoute";
import Main from "../main/Main";
import UserProfile from "../userProfile/UserProfile";
import SinglePage from "../singlePage/SinglePage";
import AddCard from "../addCard/addCard";
import EmailLink from "../emailLink/EmailLink";
import ChangePassword from "../changePassword/ChangePassword";

function App() {
  const [isPopupNavigatorOpen, setIsPopupNavigatorOpen] = useState(false);
  let history = useHistory();
  const closePopup = () => {
    setIsPopupNavigatorOpen(false);
  };

  const handleOpenPopup = () => {
    setIsPopupNavigatorOpen(true);
  };

  useEffect(() => {
    //обработчик закрытия попапов по нажатия на ESC и overlay
    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    const handleCloseByOverlay = (evt) => {
      //обработчик для закртия popup по кнопке и overlay
      if (
        evt.target.classList.contains("popup_is-opened") ||
        evt.target.classList.contains("popup")
      ) {
        closePopup();
      }
    };

    document.addEventListener("click", handleCloseByOverlay);
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("click", handleCloseByOverlay);
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("authTokens");
    localStorage.removeItem("userPers");
    window.location.reload();
    history.push("/sign-in");
  };

  return (
    <div className="App">
      <Header onOpen={handleOpenPopup} logOut={logoutUser} />
      <Switch>
        <Route exact path="/sign-in" component={Login} />
        <Route exact path="/sign-up">
          <Registration />
        </Route>
        <Route exact path="/sign-in/email/" component={EmailLink} />
        <Route
          exact
          path="/password/reset/confirm/:Ng/:id/"
          component={ChangePassword}
        />
        <PrivateRoute exact path="/profile/" component={UserProfile} />
        <PrivateRoute exact path="/ads/:id" component={SinglePage} />
        <PrivateRoute exact path="/profile/ads/:id/" component={SinglePage} />
        <PrivateRoute exact path="/newAd" component={AddCard} />
        <Route exact path="/" component={Main} />
      </Switch>
      <Footer />
      <PopupNavigation
        onClose={closePopup}
        isOpen={isPopupNavigatorOpen}
        logOut={logoutUser}
      />
    </div>
  );
}

export default App;
