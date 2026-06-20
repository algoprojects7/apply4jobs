import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { calculateMatchScore, expandSearchQuery } from '@/lib/bedrock';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    
    // AI Advanced Search Query Expansion
    let searchTerms = [search];
    if (search.trim()) {
      searchTerms = await expandSearchQuery(search);
    }
    
    // Build query conditions
    const orConditions: any[] = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { company: { name: { contains: search, mode: 'insensitive' } } }
    ];
    
    // Add expanded search terms if available
    for (const term of searchTerms) {
      if (term.trim()) {
        orConditions.push({ title: { contains: term, mode: 'insensitive' } });
        orConditions.push({ description: { contains: term, mode: 'insensitive' } });
        orConditions.push({ skillsRequired: { hasSome: [term] } });
      }
    }

    // Fetch jobs from database
    const jobs = await prisma.job.findMany({
      where: {
        status: 'Published',
        OR: orConditions
      },
      include: {
        company: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Resolve logged in candidate
    const sessionUser = await getSessionUser();
    const candidateUser = sessionUser && sessionUser.role.name === 'candidate'
      ? sessionUser
      : null;

    const profile = candidateUser?.candidateProfile;

    // Format for frontend and run AI Re-Ranking algorithm dynamically
    const formattedJobs = await Promise.all(jobs.map(async (job: any) => {
      let matchScore = 80;
      if (profile) {
        try {
          const matchResult = await calculateMatchScore(profile.id, job.id);
          matchScore = matchResult.score;
        } catch (e) {
          console.warn('Error calculating match score, using default:', e);
        }
      }

      return {
        id: job.id,
        title: job.title,
        company: job.company.name,
        location: job.location || 'Remote',
        match: matchScore,
        tags: job.skillsRequired,
        salary: job.salaryMin && job.salaryMax 
          ? `$${Math.round(job.salaryMin / 1000)}k - $${Math.round(job.salaryMax / 1000)}k` 
          : 'Negotiable'
      };
    }));

    // Sort by match score descending to present the best matches first!
    formattedJobs.sort((a:any, b:any) => b.match - a.match);

    return NextResponse.json({ status: 'success', data: formattedJobs });
  } catch (err: any) {
    console.error('Error fetching jobs:', err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      title, description, companyName, location, 
      salaryMin, salaryMax, skillsRequired, remoteType,
      employmentType, experienceMin, experienceMax, vacancyCount 
    } = body;

    // Resolve or create company
    let company = await prisma.company.findFirst({
      where: { name: companyName }
    });

    if (!company) {
      // Find default tenant or create one
      let tenant = await prisma.tenant.findFirst();
      if (!tenant) {
        tenant = await prisma.tenant.create({
          data: { name: 'Default Tenant', domain: 'default.com' }
        });
      }
      company = await prisma.company.create({
        data: {
          tenantId: tenant.id,
          name: companyName,
          website: 'https://example.com',
          description: 'Company created automatically.',
          isVerified: true
        }
      });
    }

    const job = await prisma.job.create({
      data: {
        companyId: company.id,
        title,
        description: description || 'No description provided.',
        location,
        salaryMin: salaryMin ? parseInt(salaryMin) : null,
        salaryMax: salaryMax ? parseInt(salaryMax) : null,
        skillsRequired: skillsRequired || [],
        remoteType: remoteType || 'Remote',
        employmentType: employmentType || 'Full-time',
        experienceMin: experienceMin ? parseInt(experienceMin) : null,
        experienceMax: experienceMax ? parseInt(experienceMax) : null,
        vacancyCount: vacancyCount ? parseInt(vacancyCount) : 1,
        status: 'Published'
      }
    });

    // Create Audit Log
    await prisma.auditLog.create({
      data: {
        action: 'JOB_POSTED',
        details: `Job listing "${title}" posted for ${companyName}`
      }
    });

    return NextResponse.json({ status: 'success', data: job });
  } catch (err: any) {
    console.error('Error creating job:', err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
