import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (token) {
      // Delete session from database
      await prisma.session.deleteMany({
        where: { token }
      });
    }

    // Clear session cookie
    cookieStore.set('session_token', '', {
      httpOnly: true,
      expires: new Date(0),
      path: '/'
    });

    return NextResponse.json({
      status: 'success',
      message: 'Logged out successfully'
    });
  } catch (err: any) {
    console.error('Error during logout:', err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
