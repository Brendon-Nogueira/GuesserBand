import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import ThematicGame from "./pages/Game/ThematicGame";
import Musicdle from "./pages/Musicdle/Musicdle";
import { ThemeProvider } from "./context/ThemeContext/ThemeContext";
import { GameProvider } from "./context/GameContext/GameContext";

function App() {
  return (
    <ThemeProvider>
      <GameProvider>
        <Router>
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/modo-tematico" element={<ThematicGame />} />
            <Route path="/musicdle" element={<Musicdle />} />

            
            <Route path="/guess-the-band" element={<Home />} />
            <Route path="/guess-the-band/game" element={<Game />} />
            <Route
              path="/guess-the-band/modo-tematico"
              element={<ThematicGame />}
            />
            <Route path="/guess-the-band/musicdle" element={<Musicdle />} />

            {/* Caso a rota não exista */}
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </Router>
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;
