import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card/Card";

// It is a free API and the key is a public key so it is okay to be here kind of
const API_URL = "https://pokeapi.co/api/v2/pokemon/";

function App() {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [win, setWin] = useState(false);


  // fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      const randomCharacters = [];
      for (let i = 0; i < 12; i++) {
        // random number between [1 and 800]
        const randomId = Math.floor(Math.random() * 799) + 1;
        const response = await fetch(API_URL + randomId);
        const data = await response.json();
        randomCharacters.push(data);
      }
      setCards(randomCharacters);
      setLoading(false);
    };
    fetchData();
  }, []);

  // shuffle the cards on click
  const shuffleCards = () => {
    const shuffledCards = cards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };

  // handle click on card
  const handleClick = (card) => {
    if (win) {
      setWin(false);
      setScore(0);
      setClickedCards([]);
      shuffleCards();
    }
    if (clickedCards.includes(card)) {
      setCards([]);
      setClickedCards([]);
      setScore(0);
      shuffleCards();
      if (score >= highScore) {
        setHighScore(score + 1);
      }
    } else {
      setClickedCards([...clickedCards, card]);
      setScore(score + 1);
      shuffleCards();
      if (score >= highScore) {
        setHighScore(score + 1);
      }
      if (score === 11) {
        setWin(true);
        setScore(0);
        setClickedCards([]);
        shuffleCards();
      }
    }
  };

  // render cards
  const renderCards = () => {
    return cards.map((card, index) => {
      return <Card key={index} card={card} handleClick={handleClick} />;
    });
  };

  // if loading is true, display <h1> saying "Loading...", else display the cards
  return (
    <div className="App">
      {win ? <h1>You win!</h1> : <h1>Score: {score}</h1>}
      <h2>High Score: {highScore}</h2>
      <h3>Click on as many in a row without repeating pokemon as you can!</h3>
      <div className="cardHolder">
        <div className="cards">
          {loading ? <h1>Loading...</h1> : renderCards()}
        </div>
      </div>
    </div>
  );
}

export default App;
