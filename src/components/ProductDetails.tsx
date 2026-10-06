import {
  BookOpen,
  Clock3,
  History,
  Layers3,
  ListChecks,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { isMock } from "../services/chat";

const capabilities = [
  {
    icon: BookOpen,
    title: "Citas para revisar",
    text: "Una orientación tributaria debe acompañarse del artículo aplicable y su vigencia para que puedas revisar el respaldo de cada respuesta.",
  },
  {
    icon: Layers3,
    title: "Fuentes con un orden",
    text: "Estatuto Tributario, DUR 1625, jurisprudencia y doctrina DIAN, siguiendo su jerarquía normativa.",
  },
  {
    icon: ListChecks,
    title: "Más temas en una conversación",
    text: "Renta, IVA, retenciones y Régimen Simple de Tributación, entre otros temas.",
  },
  {
    icon: Clock3,
    title: "Consultas a tu ritmo",
    text: "Un asistente digital para plantear tus dudas cuando lo necesites, sin depender de un horario de atención.",
  },
  {
    icon: History,
    title: "Retoma tus consultas",
    text: "Mantén el contexto de tu conversación y vuelve a los mensajes anteriores para entender mejor cada paso.",
  },
  {
    icon: ShieldCheck,
    title: "Claridad sobre los límites",
    text: "Cuando las fuentes no ofrecen suficiente respaldo, es importante señalar la incertidumbre y revisar el caso con un profesional.",
  },
];

export default function ProductDetails() {
  return (
    <section
      className="product-details container"
      aria-labelledby="product-details-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">CONOCE LA PROPUESTA COMPLETA</p>
          <h2 id="product-details-title">
            Una orientación que
            <br />
            puedes contrastar.
          </h2>
        </div>
        <p>
          Conoce los temas que puedes explorar y cómo revisar una orientación
          tributaria antes de tomar decisiones.
        </p>
      </div>
      <div className="product-details-grid">
        {capabilities.map(({ icon: Icon, title, text }) => (
          <article className="feature-card" key={title}>
            <div className="feature-top">
              <Icon size={24} aria-hidden="true" />
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <div className="product-reference">
        <div>
          <h3>Empieza con una duda de tu día a día</h3>
          <p>
            ¿Qué diferencia hay entre declarar y pagar renta? ¿Cómo funciona una
            retención? ¿Qué es el Régimen Simple? Plantea tu pregunta y añade el
            contexto de tu situación para continuar la conversación.
          </p>
        </div>
        <Link className="button small" to="/">
          Preguntar a PiterAi <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
      {isMock && (
        <p className="product-demo-note">
          <ShieldCheck size={17} aria-hidden="true" />
          <span>
            Esta vista funciona en demostración. El chat local no consulta
            fuentes normativas en tiempo real y su historial se reinicia al
            recargar.
          </span>
        </p>
      )}
    </section>
  );
}
