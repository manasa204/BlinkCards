import { uid } from "./utils/id";

const STORAGE_KEY = "blinkcards:v1";

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { decks: {}, cards: {} };
    const data = JSON.parse(raw);
    return { decks: {}, cards: {}, ...data };
  } catch {
    return { decks: {}, cards: {} };
  }
}
function save(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = load();

export const store = {
  // Decks
  getDecks() {
    return Object.values(state.decks).sort((a, b) => b.createdAt - a.createdAt);
  },
  getDeck(deckId) {
    return state.decks[deckId] || null;
  },
  addDeck({ name, description }) {
    const id = uid();
    state.decks[id] = { id, name, description: description || "", createdAt: Date.now() };
    save(state);
    return state.decks[id];
  },
  deleteDeck(deckId) {
    delete state.decks[deckId];
    for (const id of Object.keys(state.cards)) {
      if (state.cards[id].deckId === deckId) delete state.cards[id];
    }
    save(state);
  },

  // Cards
  getCards(deckId) {
    return Object.values(state.cards)
      .filter((c) => c.deckId === deckId)
      .sort((a, b) => a.createdAt - b.createdAt);
  },
  addCard(deckId, { question, answer }) {
    const id = uid();
    state.cards[id] = { id, deckId, question, answer, createdAt: Date.now() };
    save(state);
    return state.cards[id];
  },
  deleteCard(cardId) {
    delete state.cards[cardId];
    save(state);
  },

  // Utils
  clearAll() {
    state = { decks: {}, cards: {} };
    save(state);
  }
};

// Seed some demo data on first run (optional)
if (!store.getDecks().length) {
  const js = store.addDeck({ name: "JavaScript Basics", description: "Core JS concepts" });
  store.addCard(js.id, { question: "What is closure?", answer: "A function with preserved access to its lexical scope." });
  store.addCard(js.id, { question: "var vs let?", answer: "`var` function-scoped; `let` block-scoped." });
}
