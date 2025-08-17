import { useEffect, useState } from "react";
import { store } from "../store";
import DeckCard from "../components/DeckCard";

export default function Home() {
  const [decks, setDecks] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  function refresh() {
    setDecks(store.getDecks());
  }

  useEffect(() => {
    refresh();
  }, []);

  function createDeck(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    store.addDeck({ name: form.name.trim(), description: form.description.trim() });
    setForm({ name: "", description: "" });
    refresh();
  }

  function deleteDeck(id) {
    if (confirm("Delete this deck and its cards?")) {
      store.deleteDeck(id);
      refresh();
    }
  }

  return (
    <div className="grid" style={{ gap: 24 }}>
      <section className="panel">
        <h1 className="h1">Create a new deck</h1>
        <form onSubmit={createDeck} className="grid" style={{ gap: 12 }}>
          <input
            className="input"
            placeholder="Deck name (e.g., Python, Biology)"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <textarea
            className="textarea"
            placeholder="Short description (optional)"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
          <div className="actions">
            <button className="btn primary" type="submit" disabled={!form.name.trim()}>
              Create Deck
            </button>
            <button className="btn" type="button" onClick={() => store.clearAll() || refresh()}>
              Reset Demo Data
            </button>
          </div>
        </form>
      </section>

      <section>
        <h2 className="h1">Your decks</h2>
        {decks.length === 0 ? (
          <div className="empty">No decks yet. Create one above.</div>
        ) : (
          <div className="grid decks">
            {decks.map((d) => (
              <DeckCard
                key={d.id}
                deck={d}
                cardCount={store.getCards(d.id).length}
                onDelete={deleteDeck}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
