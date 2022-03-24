import React from "react";

function Card(card) {
  return (
    <li className="card" key={card.id}>
      {card.image === null ? (
        <div className="card-img_null" />
      ) : (
        <img src={card.image} className="card-img" alt="product img" />
      )}
      <div className="card__description">
        <h2 className="card__title">{card.title}</h2>
        <p className="card__price">{card.price} &#8381;</p>
      </div>
    </li>
  );
}

export default Card;
