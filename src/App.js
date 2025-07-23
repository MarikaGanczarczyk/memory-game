import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/helmet-1.png", matched: false },
  { src: "/potion-1.png" , matched: false },
  { src: "/ring-1.png", matched: false  },
  { src: "/scroll-1.png", matched: false  },
  { src: "/shield-1.png" , matched: false },
  { src: "/sword-1.png", matched: false  },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoicetwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };
  // handle a choice
 const handleChoice = (card) =>{
  choiceOne ? setChoicetwo(card) : setChoiceOne(card)
 }

 // compare 2 selected card
 useEffect(()=>{
  
  if(choiceOne && choiceTwo){
    setDisabled(true)
    if(choiceOne.src === choiceTwo.src){
    setCards(prevCards => {
      return prevCards.map(card =>{
        if(card.src === choiceOne.src) {
          return {...card, matched: true}
      }else{
        return card
      }
      })
    })
      resetTurn()
    }else{
      
     setTimeout(()=> resetTurn(), 1000)
    }
  }
 },[choiceOne, choiceTwo])


//reset choices & increase turn
const resetTurn = () =>{
  setChoiceOne(null)
  setChoicetwo(null)
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false)
}



  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled}/>
        ))}
      </div>
    </div>
  );
}

export default App;
