import './Card.css';

export default function Card({ children, onClick, value }) {
  return (
    <button type="button" className="card" onClick={onClick} value={value}>
      {children}
    </button>
  );
}
