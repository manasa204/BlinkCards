import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { store } from "../store";

export default function Deck() {
  const { deckId } = useParams();
  const nav = useNavigate();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [form, setForm] = useState({ q: "", a: "" });

  function refresh() {
    const d = store.getDeck(deckId);
    if (!d) return nav("/404");
    setDeck(d);
    setCards(store.getCards(deckId));
  }

  useEffect(() => { refresh(); }, [deckId]);

  function addCard(e) {
    e.preventDefault();
    if (!form.q.trim() || !form.a.trim()) return;
    store.addCard(deckId, { question: form.q.trim(), answer: form.a.trim() });
    setForm({ q: "", a: "" });
    refresh();
  }

  function remove(cardId) {
    if (confirm("Delete this card?")) {
      store.deleteCard(cardId);
      refresh();
    }
  }

  const count = useMemo(() => cards.length, [cards]);

  return (
    <div className="grid" style={{ gap: 24 }}>
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div className="meta">Deck</div>
          <h1 className="h1" style={{ marginTop: 6 }}>{deck?.name}</h1>
          <div className="meta">{deck?.description}</div>
        </div>
        <div className="actions">
          <Link to={`/decks/${deckId}/study`} className="btn ok" disabled={count === 0}>
            Study ({count})
          </Link>
          <Link to="/" className="btn">Back</Link>
        </div>
      </div>

      <section className="panel">
        <h2 className="h2">Add a flashcard</h2>
        <form onSubmit={addCard} className="grid" style={{ gap: 10 }}>
          <textarea
            className="textarea"
            placeholder="Question"
            value={form.q}
            onChange={(e) => setForm((f) => ({ ...f, q: e.target.value }))}
          />
          <textarea
            className="textarea"
            placeholder="Answer"
            value={form.a}
            onChange={(e) => setForm((f) => ({ ...f, a: e.target.value }))}
          />
          <div className="actions">
            <button className="btn primary" type="submit" disabled={!form.q.trim() || !form.a.trim()}>
              Add Card
            </button>
          </div>
        </form>
      </section>

      <section>
        <h2 className="h1">Cards</h2>
        {cards.length === 0 ? (
          <div className="empty">No cards yet.</div>
        ) : (
          <div className="grid">
            {cards.map((c) => (
              <div key={c.id} className="card">
                <div className="meta">{new Date(c.createdAt).toLocaleString()}</div>
                <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
                  <div><strong>Q:</strong> {c.question}</div>
                  <div><strong>A:</strong> {c.answer}</div>
                </div>
                <div className="actions" style={{ marginTop: 10 }}>
                  <button className="btn danger" onClick={() => remove(c.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
