import { cookies } from 'next/headers';
import { prisma } from './prisma';

export async function getSessionUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;
    if (!token) return null;

    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: {
          include: {
            role: true,
            candidateProfile: true,
            companyUsers: {
              include: {
                company: true
              }
            }
          }
        }
      }
    });

    if (!session) return null;

    // If session expired, delete it
    if (session.expiresAt < new Date()) {
      await prisma.session.delete({ where: { id: session.id } });
      return null;
    }

    return session.user;
  } catch (e) {
    console.error('Error in getSessionUser:', e);
    return null;
  }
}
