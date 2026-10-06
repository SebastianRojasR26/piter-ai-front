import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUp,
  BookOpen,
  Check,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Header from "../components/Header";
import Logo from "../components/Logo";
import Disclaimer from "../components/Disclaimer";
export default function Home() {
  useEffect(() => {
    document.title = "Funciones · PiterAi";
  }, []);
  return (
    <>
      <Header />
      <main className="home">
        <section className="hero container">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="dot" /> TU ALIADO TRIBUTARIO EN COLOMBIA
            </div>
            <h1>
              Menos dudas.
              <br />
              Más <span>tranquilidad.</span>
            </h1>
            <p className="hero-description">
              Tus impuestos no tienen por qué ser un enredo. Conversa con
              PiterAi y encuentra un punto de partida claro para tus decisiones
              tributarias.
            </p>
            <Link to="/" className="button">
              Resuelve tu primera duda <ArrowRight size={19} />
            </Link>
            <p className="hero-note">
              <Check size={15} /> Sin formularios complicados. A tu ritmo.
            </p>
            <div className="hero-topics">
              <span>Renta</span>
              <span>IVA</span>
              <span>RUT</span>
              <span>Retenciones</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="floating-label">
              <Sparkles size={15} /> La claridad empieza aquí
            </div>
            <div className="preview-card">
              <div className="preview-header">
                <div className="assistant-icon">
                  <img src="/brand/icon-light.png" alt="" />
                </div>
                <div>
                  <strong>PiterAi</strong>
                  <span>Tu impulso Tributario</span>
                </div>
                <span className="preview-status">
                  <span className="dot" /> Asistente
                </span>
              </div>
              <div className="preview-body">
                <p className="preview-user">
                  ¿Declarar renta significa que debo pagar?
                </p>
                <div className="preview-answer">
                  <Sparkles size={19} />
                  <div>
                    <strong>Son dos cosas distintas.</strong>
                    <p>
                      Presentar una declaración no significa necesariamente que
                      tengas un impuesto a pagar.
                    </p>
                    <p>Vamos paso a paso para entender tu situación.</p>
                    <span className="sample-tag">Ejemplo de conversación</span>
                  </div>
                </div>
                <Link to="/" className="preview-input">
                  Escribe tu pregunta…
                  <span>
                    <ArrowUp size={18} />
                  </span>
                </Link>
              </div>
            </div>
            <div className="visual-caption">
              <ShieldCheck size={18} />
              <span>
                Preguntas reales.
                <br />
                <strong>Explicaciones que entiendes.</strong>
              </span>
            </div>
          </div>
        </section>
        <div className="trust-strip">
          <div className="container">
            <span>Un impulso para cada paso</span>
            <span>
              <MessageSquare size={18} /> Lenguaje cercano
            </span>
            <span>
              <BookOpen size={18} /> Contexto colombiano
            </span>
            <span>
              <ShieldCheck size={18} /> Orientación responsable
            </span>
          </div>
        </div>
        <section className="features container" id="funciones">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CLARIDAD PARA TU DÍA A DÍA</p>
              <h2>
                Un tema complejo.
                <br />
                Una conversación sencilla.
              </h2>
            </div>
            <p>
              Desde esa primera pregunta hasta entender qué necesitas revisar
              con tu contador.
            </p>
          </div>
          <div className="feature-grid">
            {[
              {
                icon: MessageSquare,
                number: "01",
                title: "Pregunta como hablas",
                text: "No necesitas conocer el término exacto. Cuéntanos tu duda con tus propias palabras.",
              },
              {
                icon: BookOpen,
                number: "02",
                title: "Entiende el siguiente paso",
                text: "Explora conceptos tributarios y organiza la información que necesitas para tu caso.",
              },
              {
                icon: ShieldCheck,
                number: "03",
                title: "Decide con más contexto",
                text: "Llega mejor preparado a una conversación con tu contador o asesor tributario.",
              },
            ].map(({ icon: Icon, number, title, text }) => (
              <article className="feature-card" key={number}>
                <div className="feature-top">
                  <Icon size={25} />
                  <span>{number}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="how container">
          <div>
            <p className="eyebrow">ASÍ DE SENCILLO</p>
            <h2>
              Tu próxima respuesta
              <br />
              empieza con una pregunta.
            </h2>
          </div>
          <ol>
            {[
              "Abre el asistente y escribe tu duda.",
              "Añade contexto para orientar la conversación.",
              "Revisa la orientación con un profesional.",
            ].map((text, index) => (
              <li key={text}>
                <span>{index + 1}</span>
                {text}
              </li>
            ))}
          </ol>
        </section>
        <section className="cta container">
          <div>
            <span className="eyebrow">TU IMPULSO TRIBUTARIO</span>
            <h2>Hagamos más claras tus dudas.</h2>
            <p>PiterAi te acompaña a dar el primer paso.</p>
          </div>
          <Link to="/" className="button">
            Conversar con PiterAi <ArrowRight size={19} />
          </Link>
        </section>
        <div className="container home-disclaimer">
          <Disclaimer />
        </div>
      </main>
      <footer className="footer container">
        <Logo />
        <span>Hecho para conversar. Pensado para Colombia.</span>
        <span>© {new Date().getFullYear()} PiterAi</span>
      </footer>
    </>
  );
}
