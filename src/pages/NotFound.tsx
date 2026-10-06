import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "../components/Header";
export default function NotFound() {
  useEffect(() => {
    document.title = "Página no encontrada · PiterAi";
  }, []);
  return (
    <>
      <Header />
      <main className="not-found container">
        <h1>No encontramos esta página.</h1>
        <p>Podemos empezar con una conversación.</p>
        <Link className="button" to="/">
          Ir al asistente <ArrowRight size={18} />
        </Link>
      </main>
    </>
  );
}
