import react from "react";
import "./Card.css";

const Card = ({ card, handleClick }) => {
  return (
    <div className="card" onClick={() => handleClick(card)}>
      <img src={card.sprites.front_default} alt={card.name} />
      <p>{card.name.charAt(0).toUpperCase() + card.name.slice(1)}</p>
    </div>
  );
};
export default Card;
