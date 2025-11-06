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
  const [showInput, setShowInput] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!deck) nav("/404");
    if (cards.length === 0) nav(`/decks/${deckId}`);
  }, []);

  if (!deck) return null;

  const card = cards[i];

  function next() {
    setShowAnswer(false);
    setShowInput(false);
    setUserAnswer("");
    setFeedback("");
    setI((prev) => (prev + 1) % cards.length);
  }

  function checkAnswer() {
    if (userAnswer.trim().toLowerCase() === card.answer.toLowerCase()) {
      setFeedback("Correct!");
    } else {
      setFeedback(`Incorrect. The correct answer is: ${card.answer}`);
    }
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
        <button className="btn ok" onClick={() => setShowInput(!showInput)}>
          {showInput ? "Hide Answer Input" : "I knew this"}
        </button>
        <button className="btn primary" onClick={next}>Next</button>
      </div>

      {showInput && (
        <div className="grid" style={{ gap: 12 }}>
          <div className="form-group">
            <label htmlFor="answer-input" className="form-label">Your Answer</label>
            <input
              id="answer-input"
              className="input"
              placeholder="Type your answer here..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
          </div>
          <div className="actions">
            <button className="btn primary" onClick={checkAnswer} disabled={!userAnswer.trim()}>
              Check Answer
            </button>
          </div>
          {feedback && (
            <div className={`feedback ${feedback.startsWith("Correct") ? "correct" : "incorrect"}`}>
              {feedback}
            </div>
          )}
        </div>
      )}

      <div className="meta">Card {i + 1} of {cards.length}</div>
    </div>
  );
}
