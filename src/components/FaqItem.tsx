import { useId, useState } from "react";
import { Plus } from "lucide-react";

export default function FaqItem({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={open ? "ed-faq-item is-open" : "ed-faq-item"}>
      <h3>
        <button
          id={`${id}-trigger`}
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
        >
          {title}
          <Plus size={20} aria-hidden="true" />
        </button>
      </h3>
      <div
        className="ed-faq-answer"
        id={id}
        role="region"
        aria-labelledby={`${id}-trigger`}
        inert={!open}
        aria-hidden={!open}
      >
        <div>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
