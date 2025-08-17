import { Link } from "react-router-dom";

export default function DeckCard({ deck, cardCount, onDelete }) {
  return (
    <div className="card">
      <div className="meta">{new Date(deck.createdAt).toLocaleString()}</div>
      <h3 className="h2" style={{ margin: "4px 0 8px" }}>{deck.name}</h3>
      <p style={{ minHeight: 36, color: "#cbd5e1" }}>{deck.description || "No description."}</p>
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
        <div className="meta">{cardCount} cards</div>
        <div className="actions">
          <Link to={`/decks/${deck.id}`} className="btn">Open</Link>
          <button className="btn danger" onClick={() => onDelete(deck.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
