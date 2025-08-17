import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { store } from "../store";

export default function Study() {
  const { deckId } = useParams();
  const nav = useNavigate();
  const deck = store.getDeck(deckId);
  const [cards, setCards] = useState(store.getCards(deckId));
  const [i, setI] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (!deck) nav("/404");
    if (cards.length === 0) nav(`/decks/${deckId}`);
  }, []);

  if (!deck) return null;

  const card = cards[i];

  function next() {
    setShowAnswer(false);
    setI((prev) => (prev + 1) % cards.length);
  }

  return (
    <div className="grid" style={{ gap: 20 }}>
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div className="meta">Studying</div>
          <h1 className="h1">{deck.name}</h1>
        </div>
        <div className="actions">
          <Link to={`/decks/${deckId}`} className="btn">Back to Deck</Link>
        </div>
      </div>

      <div className="flashcard" onClick={() => setShowAnswer((s) => !s)} title="Click to flip">
        <div className="side">
          {showAnswer ? card.answer : card.question}
        </div>
      </div>

      <div className="actions">
        <button className="btn" onClick={() => setShowAnswer((s) => !s)}>
          {showAnswer ? "Show Question" : "Show Answer"}
        </button>
        <button className="btn ok" onClick={next}>I knew this</button>
        <button className="btn primary" onClick={next}>Next</button>
      </div>

      <div className="meta">Card {i + 1} of {cards.length}</div>
    </div>
  );
}
