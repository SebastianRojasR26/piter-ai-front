import {
  ArrowRight,
  BookOpen,
  CircleHelp,
  FileText,
  ShieldCheck,
} from "lucide-react";
const suggestions = [
  {
    icon: FileText,
    label: "Declaración de renta",
    question: "¿Cómo preparo mi declaración de renta?",
  },
  {
    icon: BookOpen,
    label: "RUT y responsabilidades",
    question: "¿Qué es el RUT y para qué sirve?",
  },
  {
    icon: CircleHelp,
    label: "IVA sin complicaciones",
    question: "¿Cómo sé si debo cobrar IVA?",
  },
  {
    icon: ShieldCheck,
    label: "Retención en la fuente",
    question: "¿Qué es la retención en la fuente?",
  },
];

export default function ChatWelcome({
  busy,
  submit,
}: {
  busy: boolean;
  submit: (question: string) => Promise<void>;
}) {
  return (
    <div className="welcome">
      <div className="welcome-icon">
        <img src="/brand/icon-light.png" alt="" />
      </div>
      <p className="eyebrow">TU IMPULSO TRIBUTARIO</p>
      <h1>
        Hola, soy PiterAi.
        <br />
        <span>¿Qué duda resolvemos hoy?</span>
      </h1>
      <p className="welcome-description">
        Hablemos de tus impuestos, sin enredos.
        <br />
        Elige una idea o escribe tu propia pregunta.
      </p>
      <div className="suggestions">
        {suggestions.map(({ icon: Icon, label, question }) => (
          <button
            key={label}
            onClick={() => void submit(question)}
            disabled={busy}
          >
            <Icon size={20} />
            <strong>{label}</strong>
            <span>{question}</span>
            <ArrowRight size={16} />
          </button>
        ))}
      </div>
      <p className="welcome-footnote">
        <ShieldCheck size={14} /> Evita compartir documentos, contraseñas o
        datos sensibles.
      </p>
    </div>
  );
}
