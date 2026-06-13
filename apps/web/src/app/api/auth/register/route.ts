import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, role, name, company, gender } = body;

    // Validate inputs
    if (!email || !password || !role) {
      return NextResponse.json({ status: 'error', message: 'Email, password, and role are required.' }, { status: 400 });
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ status: 'error', message: 'Email already registered.' }, { status: 400 });
    }

    // Resolve Role
    let roleObj = await prisma.role.findFirst({ where: { name: role.toLowerCase() } });
    if (!roleObj) {
      roleObj = await prisma.role.create({ data: { name: role.toLowerCase() } });
    }

    // Hash password with bcrypt (salt rounds = 12)
    const passwordHash = await bcrypt.hash(password, 12);

    let user = null;

    if (role.toLowerCase() === 'employer') {
      // Create Tenant & Company
      const tenantName = company || `${name}'s Company`;
      const domain = email.split('@')[1] || 'company.com';

      const tenant = await prisma.tenant.create({
        data: { name: tenantName, domain }
      });

      user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          roleId: roleObj.id,
          tenantId: tenant.id,
          isVerified: true
        }
      });

      const dbCompany = await prisma.company.create({
        data: {
          tenantId: tenant.id,
          name: tenantName,
          website: `https://${domain}`,
          description: 'Employer workspace registered tenant.',
          isVerified: true
        }
      });

      await prisma.companyUser.create({
        data: { companyId: dbCompany.id, userId: user.id }
      });

    } else {
      // Candidate
      user = await prisma.user.create({
        data: {
          email,
          passwordHash,
          roleId: roleObj.id,
          isVerified: true
        }
      });

      await prisma.candidateProfile.create({
        data: {
          userId: user.id,
          fullName: name || email.split('@')[0],
          gender: gender || null,
          profileScore: 40,
          skills: []
        }
      });
    }

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'USER_REGISTER',
        details: `User registered successfully with email: ${email} and role: ${role}.`
      }
    });

    return NextResponse.json({ status: 'success', message: 'Account registered successfully.' });
  } catch (err: any) {
    console.error('Error during registration:', err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
