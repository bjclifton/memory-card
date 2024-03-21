import { useState, useEffect } from "react";
import "./App.css";

// It is a free API and the key is a public key so it is okay to be here kind of
const API_URL = "https://gateway.marvel.com:443/v1/public/characters?limit=1&offset=";
const API_KEY = "&apikey=f5f5600e245728eadb27b1c944ee8385";

function App() {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const randomCharacters = [];
      for (let i = 0; i < 12; i++) {
        const randomOffset = Math.floor(Math.random() * 1000);
        const response = await fetch(API_URL + randomOffset + API_KEY);
        const data = await response.json();
        randomCharacters.push(data.data.results[0]);
      }
      setCards(randomCharacters);
    };
    fetchData();
  }, []);

  // get image from each card
  const getCardImage = (card) => {
    return card.thumbnail.path + "/standard_xlarge." + card.thumbnail.extension;
  };

  

  return (
    <>
      <h1>MEMORY</h1>
    </>
  );
}

export default App;
