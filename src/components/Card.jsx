import './Card.css';

export default function Card({ children }) {
  return (
    <button type="button" className="card">
      {children}
    </button>
  );
}
