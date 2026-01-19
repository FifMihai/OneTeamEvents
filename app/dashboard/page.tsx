import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import ClientPage from '../../components/ClientPage';

// Funcție pentru a lua userul logat
async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");
  
  if (!token) return null;

  try {
    const decoded: any = jwt.verify(token.value, process.env.JWT_SECRET || "secret");
    return decoded; // Returnează { userId: 1, role: 'STUDENT' ... }
  } catch {
    return null;
  }
}

export default async function Dashboard() {
  // 1. Verificăm Autentificarea
  const userToken = await getUser();

  if (!userToken) {
    redirect('/login'); // Dacă nu e logat, îl trimitem la login
  }

  // 2. Luăm datele complete ale userului (Nume, Email)
  const user = await prisma.user.findUnique({
    where: { id: userToken.userId },
    select: { id: true, name: true, email: true }
  });

  if (!user) redirect('/login');

  // 3. Luăm evenimentele din baza de date (Persistență)
  const events = await prisma.event.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Convertim datele pentru a nu avea probleme cu serializarea (Date objects -> String)
  const safeEvents = events.map(ev => ({
    ...ev,
    date: ev.date.toISOString(), 
    createdAt: ev.createdAt.toISOString(),
    creatorId: ev.organizerId // Uniformizăm denumirea pentru frontend
  }));

  // 4. Trimitem totul la Frontend
  return (
    <ClientPage 
      initialEvents={safeEvents} 
      currentUser={user} // Trimitem userul real
    />
  );
}