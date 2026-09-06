import SecondaryConsoleMotion from "@/components/dashboard/SecondaryConsoleMotion";
import "../secondary-console.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <SecondaryConsoleMotion variant="admin">{children}</SecondaryConsoleMotion>;
}
