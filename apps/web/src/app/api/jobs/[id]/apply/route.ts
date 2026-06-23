import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: jobId } = await params;
    const sessionUser = await getSessionUser();

    if (!sessionUser || sessionUser.role.name !== 'candidate') {
      return NextResponse.json({ status: 'error', message: 'Unauthorized. Candidates only.' }, { status: 401 });
    }

    // Check if job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId }
    });

    if (!job) {
      return NextResponse.json({ status: 'error', message: 'Job not found' }, { status: 404 });
    }

    // Resolve or create CandidateProfile
    let profile = await prisma.candidateProfile.findUnique({
      where: { userId: sessionUser.id }
    });

    if (!profile) {
      profile = await prisma.candidateProfile.create({
        data: {
          userId: sessionUser.id,
          fullName: sessionUser.email.split('@')[0],
          profileScore: 40,
          skills: []
        }
      });
    }

    const body = await request.json();
    const { fullName, phone, resumeUrl } = body;

    // Update profile full name if changed
    if (fullName && fullName !== profile.fullName) {
      await prisma.candidateProfile.update({
        where: { id: profile.id },
        data: { fullName }
      });
    }

    // Update phone number on User model if changed
    if (phone && phone !== sessionUser.phoneNumber) {
      await prisma.user.update({
        where: { id: sessionUser.id },
        data: { phoneNumber: phone }
      });
    }

    // If new resume uploaded, create Resume record
    if (resumeUrl) {
      // Set all other resumes to inactive
      await prisma.resume.updateMany({
        where: { profileId: profile.id },
        data: { isActive: false }
      });

      await prisma.resume.create({
        data: {
          profileId: profile.id,
          fileUrl: resumeUrl,
          isActive: true
        }
      });
    }

    // Check if they already applied to avoid duplicate applications
    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        jobId,
        candidateId: profile.id
      }
    });

    if (existingApplication) {
      return NextResponse.json({ status: 'error', message: 'You have already applied for this job.' }, { status: 400 });
    }

    // Create JobApplication
    const application = await prisma.jobApplication.create({
      data: {
        jobId,
        candidateId: profile.id,
        status: 'Applied'
      }
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: sessionUser.id,
        action: 'JOB_APPLIED',
        details: `Candidate applied to job "${job.title}" (Application ID: ${application.id})`
      }
    });

    return NextResponse.json({ status: 'success', data: application });
  } catch (err: any) {
    console.error('Error submitting application:', err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
