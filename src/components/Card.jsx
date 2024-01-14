import './Card.css';

export default function Card(props) {
  const {
    children,
    onClick,
    value,
    dataKey,
  } = props;

  return (
    <button
      type="button"
      className="card"
      onClick={onClick}
      value={value}
      data-key={dataKey}
      style={{ backgroundColor: value }}
    >
      {children}
    </button>
  );
}
