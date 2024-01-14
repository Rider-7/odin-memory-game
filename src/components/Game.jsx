/* Possible optimisation:
    Current implementation is forced to use structuredClone() to deep copy the next scheme,
    which is an array of objects.
    Maybe re-factor to use an array of arrays instead?
*/

import { useState, useRef } from 'react';
import useColourScheme from './useColourScheme';
import Card from './Card';
import './Game.css';

function ShuffledDeck(scheme, onClick) {
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

  const Deck = [];
  const order = shuffle(Object.keys(scheme));
  order.forEach((idx) => {
    Deck.push((
      <Card key={idx} onClick={onClick} value={scheme[idx].hex} dataKey={idx}>
        <span>{scheme[idx].hex}</span>
      </Card>
    ));
  });
  return Deck;
}

function SchemeJSONProcessor(useAPI, json) {
  const arr = json.colors;
  let scheme;
  if (useAPI) {
    scheme = arr.map((colour) => (
      {
        hex: colour.hex.value,
        name: colour.name.value,
        isClicked: false,
      }
    ));
  } else {
    scheme = arr.map((colour) => (
      {
        hex: colour.hex,
        name: colour.name,
        isClicked: false,
      }
    ));
  }
  return scheme;
}

export default function Gameboard() {
  const [current, setCurrent] = useState(0);
  const [best, setBest] = useState(0);
  const scheme = useRef(null);
  const useAPI = useRef(false);

  const { nextScheme, isLoading, error } = useColourScheme(useAPI.current, '0047AB', 'quad', 22, SchemeJSONProcessor);

  function handleOnClick(e) {
    const idx = e.currentTarget.dataset.key;
    if (scheme.current[idx].isClicked === false) {
      scheme.current[idx].isClicked = true;
      setCurrent(current + 1);
    } else {
      if (current > best) setBest(current);
      setCurrent(0);
      scheme.current = structuredClone(nextScheme);
    }
  }

  let Template;
  if (error) Template = <p>An error has occured.</p>;
  if (isLoading) Template = <p>Loading...</p>;
  else {
    if (scheme.current === null) scheme.current = structuredClone(nextScheme);

    Template = ShuffledDeck(scheme.current, handleOnClick);
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
