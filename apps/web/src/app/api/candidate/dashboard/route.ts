import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser || sessionUser.role.name !== 'candidate') {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }
    const targetUser = sessionUser;

    // Fetch the candidate user details
    const user = await prisma.user.findUnique({
      where: { id: targetUser.id },
      include: {
        candidateProfile: {
          include: {
            experiences: true,
            educations: true,
            resumes: {
              include: {
                analysis: true
              }
            },
            applications: {
              include: {
                job: {
                  include: {
                    company: true
                  }
                }
              }
            },
            recommendations: {
              include: {
                job: {
                  include: {
                    company: true
                  }
                }
              }
            }
          }
        }
      }
    });


    if (!user || !user.candidateProfile) {
      return NextResponse.json({ status: 'error', message: 'Candidate profile not found' }, { status: 404 });
    }

    const profile = user.candidateProfile;
    const activeResume = profile.resumes.find((r: any) => r.isActive) || profile.resumes[0];
    const resumeAnalysis = activeResume?.analysis;

    // Format recommendations
    const recommendations = profile.recommendations.map((rec: any) => ({
      id: rec.job.id,
      title: rec.job.title,
      company: rec.job.company.name,
      match: Math.round(rec.score),
      location: rec.job.location || 'Remote',
      salary: rec.job.salaryMin && rec.job.salaryMax 
        ? `$${Math.round(rec.job.salaryMin / 1000)}k - $${Math.round(rec.job.salaryMax / 1000)}k` 
        : 'Negotiable'
    }));

    // Format applications
    const applications = profile.applications.map((app: any) => ({
      id: app.id,
      job: app.job.title,
      company: app.job.company.name,
      status: app.status,
      date: app.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }));

    return NextResponse.json({
      status: 'success',
      data: {
        fullName: profile.fullName,
        profileScore: profile.profileScore,
        skills: profile.skills,
        atsScore: resumeAnalysis?.atsScore || null,
        resumeFile: activeResume ? 'alex_johnson_cv.pdf' : null,
        recommendations,
        applications
      }
    });
  } catch (err: any) {
    console.error('Error fetching candidate dashboard:', err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
