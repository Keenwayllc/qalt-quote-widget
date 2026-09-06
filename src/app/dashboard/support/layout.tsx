import SecondaryConsoleMotion from "@/components/dashboard/SecondaryConsoleMotion";
import "../secondary-console.css";

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return <SecondaryConsoleMotion variant="support">{children}</SecondaryConsoleMotion>;
}
