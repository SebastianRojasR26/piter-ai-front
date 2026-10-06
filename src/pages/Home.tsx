import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  BookOpen,
  Layers3,
  Clock3,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Plus,
  Menu,
  X,
} from "lucide-react";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import "../styles/editorial.css";
const benefits = [
  {
    icon: BookOpen,
    title: "El respaldo importa.",
    text: "Una orientación se entiende mejor con el artículo aplicable y su vigencia. Revisa las fuentes antes de tomar una decisión.",
  },
  {
    icon: Layers3,
    title: "Contexto colombiano.",
    text: "Estatuto Tributario, DUR 1625, jurisprudencia y doctrina DIAN: conoce las fuentes que orientan una consulta tributaria.",
  },
  {
    icon: Clock3,
    title: "A tu propio ritmo.",
    text: "Plantea una duda, añade contexto y vuelve a los mensajes anteriores. Una conversación que avanza contigo.",
  },
];
const plans = [
  {
    name: "Gratis",
    price: "$0",
    quota: "5 consultas / mes",
    description: "Para dar el primer paso.",
    features: [
      "Estatuto Tributario completo",
      "Historial de conversaciones",
      "Citas de artículo y vigencia",
    ],
    recommended: false,
  },
  {
    name: "Lite",
    price: "$29.900",
    quota: "10 consultas / mes",
    description: "Para dudas puntuales.",
    features: ["Todo lo incluido en Gratis", "Más consultas cada mes"],
    recommended: false,
  },
  {
    name: "Standard",
    price: "$49.900",
    quota: "100 consultas / mes",
    description: "Para tu práctica cotidiana.",
    features: ["Todo lo incluido en Lite", "Mayor capacidad mensual"],
    recommended: true,
  },
  {
    name: "Power",
    price: "$99.900",
    quota: "Consultas ilimitadas",
    description: "Para un uso intensivo.",
    features: ["Todo lo incluido en Standard", "Sin límite de consultas"],
    recommended: false,
  },
];
const questions = [
  {
    title: "¿Sobre qué puedo preguntar?",
    text: "Puedes explorar renta, IVA, retenciones, RUT y Régimen Simple de Tributación. Añade el contexto de tu situación para que la conversación sea más útil.",
  },
  {
    title: "¿Qué significan las fuentes normativas?",
    text: "Son el respaldo de una orientación: normas, artículos, jurisprudencia y doctrina. Revisa su vigencia y cómo aplican a tu caso con un profesional.",
  },
  {
    title: "¿Puedo contratar un plan aquí?",
    text: "Esta página muestra los planes publicados como información. Esta demostración no permite contratar, pagar ni activar suscripciones. Los precios y límites no se aplican al chat de prueba.",
  },
  {
    title: "¿Las respuestas reemplazan a un contador?",
    text: "No. La orientación ayuda a entender conceptos y preparar preguntas. Un contador o asesor tributario debe revisar las decisiones de tu caso particular.",
  },
];
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    document.title = "PiterAi · Claridad para tus impuestos";
  }, []);
  return (
    <div className="editorial">
      <header
        className="ed-header"
        onKeyDown={(event) => {
          if (event.key === "Escape" && menuOpen) {
            setMenuOpen(false);
            menuButton.current?.focus();
          }
        }}
      >
        <div className="ed-wrap ed-nav">
          <Logo />
          <nav
            className={menuOpen ? "ed-links is-open" : "ed-links"}
            id="ed-navigation"
            aria-label="Navegación principal"
          >
            <a href="#funciones" onClick={() => setMenuOpen(false)}>
              Cómo te ayuda
            </a>
            <a href="#planes" onClick={() => setMenuOpen(false)}>
              Planes
            </a>
            <a href="#preguntas" onClick={() => setMenuOpen(false)}>
              Preguntas
            </a>
          </nav>
          <div className="ed-nav-actions">
            <ThemeToggle />
            <Link className="ed-link-chat" to="/">
              Abrir chat <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <button
              ref={menuButton}
              className="icon-button ed-menu"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              aria-controls="ed-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main>
        <section className="ed-hero ed-wrap">
          <div className="ed-hero-copy">
            <p className="ed-kicker">
              <span /> TU IMPULSO TRIBUTARIO
            </p>
            <h1>
              Tus impuestos.
              <br />
              Más claros.
              <br />
              <em>Más cerca.</em>
            </h1>
            <p className="ed-intro">
              Una pregunta puede cambiar la forma en que entiendes tus
              impuestos. Empieza una conversación con PiterAi.
            </p>
            <div className="ed-hero-actions">
              <Link className="ed-button" to="/">
                Hablemos de tu duda <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <a className="ed-text-link" href="#planes">
                Conoce los planes
              </a>
            </div>
            <p className="ed-small">
              <ShieldCheck size={15} aria-hidden="true" /> Prueba en modo
              demostración. Sin pagos.
            </p>
          </div>
          <div className="ed-demo">
            <div className="ed-demo-label">
              <Sparkles size={17} aria-hidden="true" /> DE LA DUDA A LA CLARIDAD{" "}
              <span>01 / 03</span>
            </div>
            <div className="ed-demo-chat">
              <div className="ed-demo-heading">
                <div className="ed-avatar">
                  <MessageSquare size={24} aria-hidden="true" />
                </div>
                <div>
                  <strong>PiterAi</strong>
                  <p>Tu aliado para entender</p>
                </div>
                <span className="ed-status">Demo</span>
              </div>
              <div className="ed-question">
                ¿Declarar renta significa que debo pagar?
              </div>
              <div className="ed-answer">
                <Sparkles size={19} aria-hidden="true" />
                <div>
                  <strong>Son dos cosas distintas.</strong>
                  <p>
                    Presentar una declaración no significa necesariamente que
                    tengas un impuesto a pagar.
                  </p>
                  <p>
                    El resultado depende de tu situación. Vamos paso a paso.
                  </p>
                </div>
              </div>
              <div className="ed-example-source">
                <BookOpen size={15} aria-hidden="true" /> Ejemplo ilustrativo de
                conversación
              </div>
              <Link to="/" className="ed-demo-input">
                Escribe tu primera pregunta{" "}
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            </div>
            <div className="ed-demo-foot">
              <span>Lenguaje cercano.</span>
              <span>Contexto colombiano.</span>
            </div>
          </div>
        </section>
        <div className="ed-topics">
          <div className="ed-wrap">
            <span>CONVERSEMOS SOBRE</span>
            {["Renta", "IVA", "Retenciones", "RUT", "Régimen Simple"].map(
              (topic) => (
                <span key={topic}>
                  {topic}
                  <Plus size={14} aria-hidden="true" />
                </span>
              ),
            )}
          </div>
        </div>
        <section className="ed-section ed-wrap" id="funciones">
          <div className="ed-section-heading">
            <p className="ed-kicker">01 — UNA MEJOR CONVERSACIÓN</p>
            <h2>
              Menos vueltas.
              <br />
              Más contexto.
            </h2>
            <p>
              No necesitas dominar el lenguaje tributario para empezar. Trae tu
              pregunta; avancemos desde ahí.
            </p>
          </div>
          <div className="ed-benefits">
            {benefits.map(({ icon: Icon, title, text }, index) => (
              <article key={title}>
                <div className="ed-benefit-top">
                  <Icon size={27} aria-hidden="true" />
                  <span>0{index + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="ed-process">
            <h3>Así de sencillo.</h3>
            {[
              "Pregunta con tus palabras",
              "Añade el contexto de tu caso",
              "Revisa la orientación con un profesional",
            ].map((step, index) => (
              <div key={step}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="ed-pricing" id="planes">
          <div className="ed-wrap">
            <div className="ed-section-heading">
              <p className="ed-kicker">02 — UN PLAN PARA CADA RITMO</p>
              <h2>
                Empieza pequeño.
                <br />
                Crece con tus preguntas.
              </h2>
              <p>
                Cuatro opciones, desde la primera duda hasta el uso intensivo.
                Precios publicados en pesos colombianos.
              </p>
            </div>
            <div className="ed-plans">
              {plans.map((plan) => (
                <article
                  className={
                    plan.recommended ? "ed-plan ed-plan-featured" : "ed-plan"
                  }
                  key={plan.name}
                >
                  <div className="ed-plan-label">
                    <h3>{plan.name}</h3>
                    {plan.recommended && <span>Recomendado</span>}
                  </div>
                  <p className="ed-plan-description">{plan.description}</p>
                  <p className="ed-price">
                    {plan.price}
                    <span>
                      {plan.name === "Gratis" ? "sin compromiso" : "COP / mes"}
                    </span>
                  </p>
                  <p className="ed-quota">{plan.quota}</p>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Check size={17} aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p className="ed-pricing-note">
              Información consultada el 6 de octubre de 2026. Los planes
              incluyen historial y citas normativas en el producto completo.
              Esta demostración no activa planes ni procesa pagos.
            </p>
            <div className="ed-pricing-action">
              <span>Primero, conoce la conversación.</span>
              <Link className="ed-button" to="/">
                Probar la demostración{" "}
                <ArrowRight size={19} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        <section className="ed-section ed-wrap ed-faq" id="preguntas">
          <div>
            <p className="ed-kicker">03 — ANTES DE EMPEZAR</p>
            <h2>
              También hay
              <br />
              buenas preguntas
              <br />
              <em>por aquí.</em>
            </h2>
          </div>
          <div className="ed-faq-list">
            {questions.map((question) => (
              <details key={question.title}>
                <summary>
                  {question.title}
                  <Plus size={20} aria-hidden="true" />
                </summary>
                <p>{question.text}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="ed-closing ed-wrap">
          <Sparkles size={32} aria-hidden="true" />
          <h2>
            Tu próxima claridad
            <br />
            empieza con una pregunta.
          </h2>
          <Link className="ed-button" to="/">
            Conversar con PiterAi <ArrowRight size={20} aria-hidden="true" />
          </Link>
          <p>
            Las respuestas son orientativas y no reemplazan a un contador o
            asesor tributario.
          </p>
        </section>
        <p className="ed-demo-notice ed-wrap">
          <ShieldCheck size={18} aria-hidden="true" /> El chat de prueba utiliza
          respuestas simuladas, no consulta fuentes en tiempo real y su
          historial se reinicia al recargar.
        </p>
      </main>
      <footer className="ed-footer ed-wrap">
        <Logo />
        <p>Hecho para entender. Pensado para Colombia.</p>
        <span>© {new Date().getFullYear()} PiterAi</span>
      </footer>
    </div>
  );
}
