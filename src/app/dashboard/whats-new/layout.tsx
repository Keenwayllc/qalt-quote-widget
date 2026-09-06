import SecondaryConsoleMotion from "@/components/dashboard/SecondaryConsoleMotion";
import "../secondary-console.css";

export default function WhatsNewLayout({ children }: { children: React.ReactNode }) {
  return <SecondaryConsoleMotion variant="whatsnew">{children}</SecondaryConsoleMotion>;
}
