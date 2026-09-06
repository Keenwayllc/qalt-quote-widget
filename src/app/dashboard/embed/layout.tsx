import SecondaryConsoleMotion from "@/components/dashboard/SecondaryConsoleMotion";
import "../secondary-console.css";

export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return <SecondaryConsoleMotion variant="embed">{children}</SecondaryConsoleMotion>;
}
