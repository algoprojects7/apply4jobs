import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json({ status: 'unauthenticated' }, { status: 401 });
    }

    const roleName = user.role.name;
    let name = 'System User';

    if (roleName === 'candidate' && user.candidateProfile) {
      name = user.candidateProfile.fullName;
    } else if (roleName === 'employer' && user.companyUsers.length > 0) {
      name = user.companyUsers[0].company.name;
    } else if (roleName === 'admin') {
      name = 'System Admin';
    }

    return NextResponse.json({
      status: 'authenticated',
      user: {
        id: user.id,
        email: user.email,
        role: roleName,
        name,
      }
    });
  } catch (err: any) {
    console.error('Error in /api/auth/me:', err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
