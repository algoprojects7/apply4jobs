import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, role } = body;

    if (!email || !password) {
      return NextResponse.json({ status: 'error', message: 'Email and password are required.' }, { status: 400 });
    }

    // Retrieve user from database
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true }
    });

    if (!user) {
      return NextResponse.json({ status: 'error', message: 'User not found. Please check your email.' }, { status: 404 });
    }

    // Verify password against the bcrypt hash stored in the database
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ status: 'error', message: 'Incorrect password. Please try again.' }, { status: 401 });
    }

    // Optionally validate role matches
    if (role && user.role.name !== role.toLowerCase()) {
      return NextResponse.json({
        status: 'error',
        message: `This account is registered as a ${user.role.name}. Please select the correct role.`
      }, { status: 403 });
    }

    // Create session token
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day

    await prisma.session.create({
      data: { userId: user.id, token, expiresAt }
    });

    // Set secure HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'USER_LOGIN',
        details: `User ${email} signed in successfully with role ${user.role.name}.`
      }
    });

    return NextResponse.json({
      status: 'success',
      message: 'Logged in successfully',
      user: {
        id: user.id,
        email: user.email,
        role: user.role.name,
        tenantId: user.tenantId
      }
    });
  } catch (err: any) {
    console.error('Error during login:', err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
