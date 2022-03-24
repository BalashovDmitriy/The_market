import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import AuthContext from "../../context/AuthContext";
import MainContext from "../../context/MainContext";
import CommentContainer from "../commentContainer/CommentContainer";
import EditPopup from "../editAdPopup/EditAdPopup";
import Buttons from "../buttons/Buttons";

function SinglePage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const api = useAxios();
  let ad_pk = id;
  let { authTokens } = useContext(AuthContext);
  const { userInfo, isEditPopupOpen, closePopup, setAds, handleOpenEditPopup } =
    useContext(MainContext);
  let history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      Promise.all([getComments(), getProduct()])
    }, 700)
  }, []);

  const getProduct = async () => {
    const response = await api.get(`/ads/${id}/`);

    if (response.status === 200) {
      setProduct(response.data);
    }
  };

  const getComments = async () => {
    const response = await api.get(`/ads/${ad_pk}/comments/`);

    if (response.status === 200) {
      setComments(response.data.results);
    }
  };

  const deleteAdd = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:8000/ads/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    if (response.status === 204) {
      setAds((ads) => ads.filter((ad) => ad.id !== product.id));
      history.push("/");
    } else if (response.statusText === "Unauthorized") {
      console.log("error!");
    }
  };

  const addComment = async (e) => {
    let response = await fetch(`http://127.0.0.1:8000/ads/${id}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        text: e.target.text.value,
      }),
    });
    let newComment = await response.json();

    if (response.status === 201) {
      setComments([newComment, ...comments]);
      window.location.reload();
    } else if (response.statusText === "Unauthorized") {
      console.log("error!");
    }
  };

  return (
    <main className="CardInformation">
      {product && (
        <>
          <h1 className="CardInformation__title">{product.title}</h1>
          <div className="CardInformation__container">
            {userInfo.id !== product.author_id ? null : (
              <Buttons
                onOpen={handleOpenEditPopup}
                className="buttons"
                classButton="buttons-item"
                onSubmit={deleteAdd}
              />
            )}
            <img
              src={product.image}
              alt="img"
              className="CardInformation__img"
            />
            <div className="CardInformation__box">
              <p className="CardInformation__price">{product.price} &#8381;</p>
              <p className="CardInformation__description">
                {product.description}
              </p>
            </div>
            <div className="CardInformation__box box-2">
              <div className="CardInformation__box_second">
                <p className="CardInformation__tel">{product.phone}</p>
                <p className="CardInformation__tel">
                  {product.author_first_name}
                </p>
              </div>
            </div>
            <CommentContainer comments={comments} addComment={addComment} setComments={setComments}/>
          </div>
          <EditPopup
            isEditPopupOpen={isEditPopupOpen}
            onClose={closePopup}
            id={id}
            product={product}
          />
        </>
      )}
    </main>
  );
}

export default SinglePage;
