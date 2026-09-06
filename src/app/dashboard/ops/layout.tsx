import "./ops.css";
import OpsMotionShell from "./OpsMotionShell";

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  return <OpsMotionShell>{children}</OpsMotionShell>;
}
