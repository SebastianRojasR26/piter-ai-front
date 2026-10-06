export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};
export type ChatStatus = "idle" | "loading" | "typing" | "error";
