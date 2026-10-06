import { ShieldCheck } from "lucide-react";
export default function Disclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <p className={compact ? "disclaimer compact" : "disclaimer"}>
      <ShieldCheck size={15} aria-hidden="true" />
      <span>
        Las respuestas son orientativas y no reemplazan a un contador o asesor
        tributario.
      </span>
    </p>
  );
}
