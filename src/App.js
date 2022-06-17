import React from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Die from "./components/Die/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./style/style.css";

function App() {
  const [dice, setDice] = React.useState(() => newDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rolls, setRolls] = React.useState(1);
  const [highScore, setHighScore] = useLocalStorage('highScore', 0)  

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    if (allHeld) {
      const allSameValue = dice.every((die) => die.value === dice[0].value);
      if (allSameValue) {
        setTenzies(true);        
        setHighScore(prevScore => prevScore ? 
          (rolls < prevScore ? rolls : prevScore)
          : rolls)        
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
      setRolls(1);
    } else {
      setRolls((prevRolls) => prevRolls + 1);
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

        <div className="record-badge">🏆 High Score : {highScore ? highScore : "__"}</div>
        <div>
          {" "}
          🎲 you rolled for {rolls === 1 ? "1 time" : `${rolls} times`}{" "}
        </div>

        <div className="dice-container">{diceElements}</div>
        <button className="btn roll-btn" onClick={roll}>
          {" "}
          {tenzies ? "New Game" : "Roll"}{" "}
        </button>
      </div>
    </main>
  );
}

export default App;
