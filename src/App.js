import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'
import "./style/style.css";

function App() {
  const [dice, setDice] = React.useState(() => newDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    if (allHeld) {
      const allSameValue = dice.every((die) => die.value === dice[0].value);
      if (allSameValue) {
        setTenzies(true);
      }
    }
  }, [dice]);

  function newDice() {
    const randomNumbers = [];
    for (let i = 0; i < 10; i++) {
      randomNumbers.push(Math.ceil(Math.random() * 6));
    }
    return randomNumbers.map((number) => ({
      value: number,
      isHeld: false,
      id: nanoid(),
    }));
  }

  function roll() {
    if (tenzies) {
      setTenzies(false);
      setDice(newDice());
    } else {
      setDice((prevDice) =>
        prevDice.map((die) =>
          die.isHeld
            ? die
            : {
                ...die,
                value: Math.ceil(Math.random() * 6),
              }
        )
      );
    }
  }

  function holdDie(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id !== id
          ? die
          : {
              ...die,
              isHeld: !die.isHeld,
            }
      )
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDie={() => holdDie(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      
      <div className="container">
      
        <div>
          <h1 className="title"> Tenzies </h1>
          <h4 className="game-discription">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </h4>
        </div>

        <div className="dice-container">{diceElements}</div>
        <button className="roll-btn" onClick={roll}>
          {" "}
          {tenzies ? "New Game" : "Roll"}{" "}
        </button>
      </div>
    </main>
  );
}

export default App;
