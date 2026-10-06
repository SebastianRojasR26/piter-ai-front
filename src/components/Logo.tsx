import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
export default function Logo({
  onClick,
  tone,
}: {
  onClick?: () => void;
  tone?: "on-dark" | "on-light";
}) {
  const { theme } = useTheme();
  return (
    <Link
      className="logo"
      to="/"
      aria-label="PiterAi, asistente tributario"
      onClick={onClick}
    >
      <img
        src={
          (tone ? tone === "on-dark" : theme === "dark")
            ? "/brand/logo-horizontal-white.png"
            : "/brand/logo-horizontal.png"
        }
        alt="PiterAi · Tu impulso Tributario"
      />
    </Link>
  );
}
