import { redirect } from "next/navigation";

export default function LegacyPlatformRedirect() {
  redirect("/products");
}
