import { redirect } from "next/navigation";

export default function LegacyMiniAuditRedirect() {
  redirect("/products");
}
