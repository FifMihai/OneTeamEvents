import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import ClientPage from '../../components/ClientPage';

// --- LINIE NOUĂ OBLIGATORIE ---
// Asta forțează serverul să verifice cookie-ul la fiecare refresh, fără excepție.
export const dynamic = 'force-dynamic'; 

async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");
  
  if (!token) return null;

  try {
    return jwt.verify(token.value, process.env.JWT_SECRET || "secret");
  } catch {
    return null;
  }
}

export default async function Dashboard() {
  const userToken: any = await getUser();

  // Dacă userul e null, Redirect IMEDIAT
  if (!userToken) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({ where: { id: userToken.userId }, select: { id: true, name: true, email: true } });
  
  if (!user) {
    redirect('/login');
  }
  
  
  // Am adăugat "include" ca să tragem și numele organizatorului din baza de date
  const events = await prisma.event.findMany({ 
    orderBy: { createdAt: 'desc' },
    include: {
      organizer: {
        select: {
          name: true // Luăm doar numele
        }
      }
    }
  });

  // "safeEvents" va conține acum și obiectul "organizer" datorită lui "...ev"
  const safeEvents = events.map(ev => ({ 
    ...ev, 
    date: ev.date.toISOString(), 
    createdAt: ev.createdAt.toISOString(), 
    creatorId: ev.organizerId 
  }));

  return <ClientPage initialEvents={safeEvents} currentUser={user} />;
}