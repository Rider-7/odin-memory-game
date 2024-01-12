import Card from "./Card";
import "./Gameboard.css";

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
    <div className="gameboard">
      {Cards}
    </div>
  );
}
