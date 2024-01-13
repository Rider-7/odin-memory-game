import { useState, useRef } from 'react';

import Card from './Card';
import './Game.css';

const coloursJSON = {
  red: false,
  blue: false,
  yellow: false,
  green: false,
};

// Durstenfeld Shuffle. Mutates.
function shuffle(array) {
  const ptr = array;
  for (let i = ptr.length - 1; i > 0; i -= 1) {
    const random = Math.floor(Math.random() * (i - 1));
    const temp = ptr[i];
    ptr[i] = ptr[random];
    ptr[random] = temp;
  }
}

// Implement API JSON processing.
// function processJSON(json) {
// }

export default function Gameboard() {
  const [current, setCurrent] = useState(0);
  const [best, setBest] = useState(0);
  const coloursObj = useRef({ ...coloursJSON });
  const coloursArr = useRef(Object.keys(coloursJSON));

  function handleOnClick(e) {
    const colour = e.currentTarget.value;

    if (coloursObj.current[colour] === false) {
      coloursObj.current[colour] = true;
      setCurrent(current + 1);
    } else {
      setBest(current);
      setCurrent(0);
      coloursObj.current = { ...coloursJSON };
    }
  }
  // Implement victory screen.
  if (current === coloursArr.current.length) console.log('You Win!');


  shuffle(coloursArr.current);
  const Cards = coloursArr.current.map((colour) => (
    <Card key={colour} onClick={handleOnClick} value={colour}>
      <span>{colour}</span>
    </Card>
  ));

  return (
    <div className="game">
      <h1 className="title">Memory Game</h1>
      <div className="scoreboard">
        <h3 className="scoreboard__best"><i>{`Best Score: ${best}`}</i></h3>
        <h2 className="scoreboard__current">{`Score: ${current}`}</h2>
      </div>
      <div className="gameboard">
        {Cards}
      </div>
    </div>
  );
}
