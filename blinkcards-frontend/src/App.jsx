import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Deck from "./pages/Deck.jsx";
import Study from "./pages/Study.jsx";
import CreateDeck from "./pages/CreateDeck.jsx";
import StudyHome from "./pages/StudyHome.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateDeck />} />
          <Route path="/study" element={<StudyHome />} />
          <Route path="/decks/:deckId" element={<Deck />} />
          <Route path="/decks/:deckId/study" element={<Study />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
    </div>
  );
}

