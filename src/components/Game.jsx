import Card from './Card';
import './Game.css';

// Implement API JSON processing.
function processJSON() {
  const data = ['red', 'blue', 'yellow', 'green', 'orange'];
  return data;
}

const data = processJSON();

export default function Gameboard() {
  const Cards = data.map((colour) => (
    <Card key={colour}>
      <span>{colour}</span>
    </Card>
  ));

  return (
    <div className="game">
      <h1 className="title">Memory Game</h1>
      <div className="scoreboard">
        <h3 className="scoreboard__best"><i>Best Score: 3</i></h3>
        <h2 className="scoreboard__current">Score: 5</h2>
      </div>
      <div className="gameboard">
        {Cards}
      </div>
    </div>
  );
}
