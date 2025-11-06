import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { store } from "../store";
import DeckCard from "../components/DeckCard";

export default function StudyHome() {
  const [decks, setDecks] = useState([]);
  const [filteredDecks, setFilteredDecks] = useState([]);
  const [search, setSearch] = useState("");

  function refresh() {
    setDecks(store.getDecks());
  }

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    setFilteredDecks(decks.filter(d => d.name.toLowerCase().includes(search.toLowerCase())));
  }, [decks, search]);

  return (
    <div className="grid" style={{ gap: 24 }}>
      <section className="hero">
        <h1 className="hero-title">Study Your Decks</h1>
        <p className="hero-subtitle">Select a deck below to start studying your flashcards.</p>
      </section>

      <section>
        <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <h2 className="h1">Your decks</h2>
          {decks.length > 0 && (
            <input
              className="input search-input"
              placeholder="Search decks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
        </div>
        {decks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No decks yet</h3>
            <p><Link to="/create">Create your first deck</Link> to start learning!</p>
          </div>
        ) : filteredDecks.length === 0 ? (
          <div className="empty">No decks match your search.</div>
        ) : (
          <div className="grid decks">
            {filteredDecks.map((d) => (
              <DeckCard
                key={d.id}
                deck={d}
                cardCount={store.getCards(d.id).length}
                studyLink={`/decks/${d.id}/study`}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
