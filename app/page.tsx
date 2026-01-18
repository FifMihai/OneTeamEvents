import { redirect } from "next/navigation";

export default function Home() {
  // Această linie te trimite direct la pagina de login
  redirect('/login');

  // Returnăm null pentru că oricum nu se va ajunge la acest cod
  return null;
}