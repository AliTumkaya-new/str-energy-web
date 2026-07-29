import { redirect } from "next/navigation";

export default function LegacyCbamProductRedirect() {
  redirect("/products");
}
