import type { ReactNode } from "react";

import ClimatePlatformShell from "@/components/platform/ClimatePlatformShell";

export default function ClimatePlatformLayout({ children }: { children: ReactNode }) {
  return <ClimatePlatformShell>{children}</ClimatePlatformShell>;
}
