import { Navigate, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido
      </a>
      <div id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/chat" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
