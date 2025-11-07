import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/guess-the-band" element={<Home />} />
        <Route path="/guess-the-band/game" element={<Game />} />
        <Route path="/guess-the-band/modo-tematico" element={<Game thematic />} />
      </Routes>
    </Router>
  );
}

export default App;