import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser || sessionUser.role.name !== 'employer') {
      return NextResponse.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }
    const targetUser = sessionUser;

    // Fetch the employer user and their company
    const user = await prisma.user.findUnique({
      where: { id: targetUser.id },
      include: {
        companyUsers: {
          include: {
            company: {

              include: {
                jobs: {
                  include: {
                    applications: {
                      include: {
                        candidate: {
                          include: {
                            recommendations: true
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!user || user.companyUsers.length === 0) {
      return NextResponse.json({ status: 'error', message: 'Employer company profile not found' }, { status: 404 });
    }

    const company = user.companyUsers[0].company;

    // Format jobs with applicants counts
    const activeJobs = company.jobs.map((job: any) => {
      // Find average recommendation score if candidates exist
      const matchScores = job.applications.map((app: any) => {
        const scoreObj = app.candidate.recommendations.find((rec: any) => rec.jobId === job.id);
        return scoreObj ? scoreObj.score : 85;
      });
      const avgMatch = matchScores.length > 0 
        ? Math.round(matchScores.reduce((a: number, b: number) => a + b, 0) / matchScores.length) 
        : 90;

      return {
        id: job.id,
        title: job.title,
        location: job.location || 'Remote',
        description: job.description,
        applicants: job.applications.length,
        matchRate: avgMatch
      };
    });

    // Format all applicants across all company jobs
    const allApplicants = company.jobs.flatMap((job: any) => {
      return job.applications.map((app: any) => {
        const scoreObj = app.candidate.recommendations.find((rec: any) => rec.jobId === job.id);
        const match = scoreObj ? Math.round(scoreObj.score) : 88;

        return {
          id: app.id,
          jobId: job.id,
          jobTitle: job.title,
          fullName: app.candidate.fullName,
          email: 'candidate@apply4jobs.com', // Masked email
          status: app.status,
          matchScore: match,
          date: app.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
      });
    });

    return NextResponse.json({
      status: 'success',
      data: {
        companyName: company.name,
        website: company.website,
        activeJobs,
        applicants: allApplicants
      }
    });
  } catch (err: any) {
    console.error('Error fetching employer dashboard:', err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
