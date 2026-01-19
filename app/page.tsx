import { redirect } from "next/navigation";

export default function Home() {
  // Dacă middleware-ul a lăsat userul să ajungă aici, înseamnă că e logat.
  // Deci îl trimitem direct la Dashboard.
  redirect("/dashboard");
}