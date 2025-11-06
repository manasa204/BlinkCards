import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../store";

export default function CreateDeck() {
  const [form, setForm] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  function createDeck(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    store.addDeck({ name: form.name.trim(), description: form.description.trim() });
    setForm({ name: "", description: "" });
    navigate("/");
  }

  return (
    <div className="grid" style={{ gap: 24 }}>
      <section className="panel">
        <h1 className="h1">Create a new deck</h1>
        <form onSubmit={createDeck} className="grid" style={{ gap: 12 }}>
          <div className="form-group">
            <label htmlFor="deck-name" className="form-label">Deck Name</label>
            <input
              id="deck-name"
              className="input"
              placeholder="e.g., Python, Biology"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="deck-description" className="form-label">Description (optional)</label>
            <textarea
              id="deck-description"
              className="textarea"
              placeholder="Short description"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>
          <div className="actions">
            <button className="btn primary" type="submit" disabled={!form.name.trim()}>
              Create Deck
            </button>
            <button className="btn" type="button" onClick={() => store.clearAll()}>
              Reset Demo Data
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
