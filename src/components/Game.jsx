import { useState, useRef } from 'react';
import useColourScheme from './useColourScheme';
import Card from './Card';
import './Game.css';

function shuffle(array) {
  const ptr = [...array];
  for (let i = ptr.length - 1; i > 0; i -= 1) {
    const random = Math.floor(Math.random() * (i - 1));
    const temp = ptr[i];
    ptr[i] = ptr[random];
    ptr[random] = temp;
  }
  return ptr;
}

function Deck(scheme, order, onClick) {
  return order.map((hex) => (
    <Card key={scheme[hex].hex} onClick={onClick} value={scheme[hex].hex}>
      <span>{scheme[hex].name}</span>
    </Card>
  ));
}

export default function Gameboard() {
  const [current, setCurrent] = useState(0);
  const [best, setBest] = useState(0);
  const currentScheme = useRef(null);

  const { scheme, isLoading, error } = useColourScheme();

  function handleOnClick(e) {
    const hex = e.currentTarget.value;
    console.log(hex);
    if (currentScheme.current[hex].isClicked === false) {
      currentScheme.current[hex].isClicked = true;
      setCurrent(current + 1);
    } else {
      if (current > best) setBest(current);
      setCurrent(0);
      currentScheme.current = { ...scheme };
    }
  }

  let Template;
  if (error) Template = <p>An error has occured.</p>;
  if (isLoading) Template = <p>Loading...</p>;
  else {
    if (currentScheme.current === null) currentScheme.current = scheme;
    const order = shuffle(Object.keys(currentScheme.current));

    Template = Deck(currentScheme.current, order, handleOnClick);
  }

  return (
    <div className="game">
      <h1 className="title">Memory Game</h1>
      <div className="scoreboard">
        <h3 className="scoreboard__best"><i>{`Best Score: ${best}`}</i></h3>
        <h2 className="scoreboard__current">{`Score: ${current}`}</h2>
      </div>
      <div className="gameboard">
        {Template}
      </div>
    </div>
  );
}
