import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Card from "../card/Card";

function Cards({ ads }) {
  let { user } = useContext(AuthContext);
  let location = useLocation().pathname;
  return (
    <section className="Cards">
      <ul
        className={`Cards__container ${
          location === "/profile"
            ? "Cards__container-profile"
            : "Cards__container"
        }`}
      >
        {ads.map((card) => {
          return (
            <Link
              key={card.pk}
              to={user ? `ads/${card.pk}` : "/"}
              className="Cards__link"
            >
              <Card
                key={card.pk}
                pk={card.pk}
                title={card.title}
                image={card.image}
                price={card.price}
                description={card.description}
              />
            </Link>
          );
        })}
      </ul>
    </section>
  );
}

export default Cards;
