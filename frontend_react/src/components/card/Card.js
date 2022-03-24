import React from "react";

function Card(card) {
  return (
    <li className="Card" key={card.id}>
        <img src={card.image} className="Card-img" alt="product img" />
        <div className="Card__description">
          <h2 className="Card__title">{card.title}</h2>
          <p className="Card__price">{card.price} &#8381;</p>
        </div>
    </li>
  );
}

export default Card;
