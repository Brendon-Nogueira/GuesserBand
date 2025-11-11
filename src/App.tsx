import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import { ThemeProvider } from "./context/ThemeContext/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Redireciona a raiz diretamente para a Home */}
          <Route path="/" element={<Navigate to="/guess-the-band" replace />} />

          {/* Home */}
          <Route path="/guess-the-band" element={<Home />} />

          {/* Modo normal */}
          <Route path="/guess-the-band/game" element={<Game />} />

          {/* Modo temático */}
          <Route
            path="/guess-the-band/modo-tematico"
            element={<Game thematic />}
          />

          {/* Caso a rota não exista */}
          <Route path="*" element={<Navigate to="/guess-the-band" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
