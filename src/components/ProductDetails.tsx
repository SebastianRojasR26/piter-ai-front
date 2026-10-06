import {
  BookOpen,
  Clock3,
  History,
  Layers3,
  ListChecks,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { isMock } from "../services/chat";

const capabilities = [
  {
    icon: BookOpen,
    title: "Citas para revisar",
    text: "La propuesta incluye el artículo aplicable y su vigencia para que puedas contrastar la orientación.",
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
    text: "La plataforma de referencia presenta un asistente disponible las 24 horas, todos los días.",
  },
  {
    icon: History,
    title: "Retoma tus consultas",
    text: "La plataforma ofrece historial para volver a conversaciones de sesiones anteriores.",
  },
  {
    icon: ShieldCheck,
    title: "Claridad sobre los límites",
    text: "Si las fuentes no ofrecen suficiente respaldo, la propuesta es comunicar esa incertidumbre.",
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
          Estas capacidades se describen en la plataforma de referencia de
          PiterAi.
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
          <h3>Explora la plataforma y sus planes</h3>
          <p>Consulta las opciones de acceso en el sitio de referencia.</p>
        </div>
        <div className="product-reference-links">
          <a
            href="https://tributaria.agenti.com.co/planes"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver planes <ArrowUpRight size={17} />
            <span className="sr-only"> (abre una pestaña nueva)</span>
          </a>
          <a
            href="https://tributaria.agenti.com.co"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visitar plataforma <ArrowUpRight size={17} />
            <span className="sr-only"> (abre una pestaña nueva)</span>
          </a>
        </div>
      </div>
      <p className="product-source">
        Fuente:{" "}
        <a
          href="https://tributaria.agenti.com.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          tributaria.agenti.com.co
          <span className="sr-only"> (abre una pestaña nueva)</span>
        </a>
        .
      </p>
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
