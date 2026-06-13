import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    // Validate inputs
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { status: 'error', message: 'All fields are required.' },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { status: 'error', message: 'New password and confirmation do not match.' },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { status: 'error', message: 'New password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { status: 'error', message: 'New password must be different from your current password.' },
        { status: 400 }
      );
    }

    // Get the authenticated session user
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return NextResponse.json(
        { status: 'error', message: 'Unauthorized. Please log in again.' },
        { status: 401 }
      );
    }

    // Fetch fresh user from DB to get latest passwordHash
    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id }
    });

    if (!user) {
      return NextResponse.json(
        { status: 'error', message: 'User account not found.' },
        { status: 404 }
      );
    }

    // Verify current password against stored bcrypt hash
    const isCurrentValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isCurrentValid) {
      return NextResponse.json(
        { status: 'error', message: 'Current password is incorrect.' },
        { status: 401 }
      );
    }

    // Hash the new password
    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    // Update the password in the database
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newPasswordHash }
    });

    // Invalidate all existing sessions (force re-login for security)
    await prisma.session.deleteMany({
      where: { userId: user.id }
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'PASSWORD_CHANGED',
        details: `User ${user.email} successfully changed their password. All sessions invalidated.`
      }
    });

    return NextResponse.json({
      status: 'success',
      message: 'Password changed successfully. Please log in with your new password.'
    });
  } catch (err: any) {
    console.error('Error changing password:', err);
    return NextResponse.json(
      { status: 'error', message: err.message },
      { status: 500 }
    );
  }
}
