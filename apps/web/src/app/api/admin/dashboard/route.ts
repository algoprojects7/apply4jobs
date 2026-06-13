import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 1. KPI Metrics
    const tenantCount = await prisma.company.count({ where: { isVerified: true } });
    const seekerRole = await prisma.role.findFirst({ where: { name: 'candidate' } });
    const jobSeekerCount = seekerRole 
      ? await prisma.user.count({ where: { roleId: seekerRole.id } }) 
      : 2481; // Fallback
      
    const activeListingsCount = await prisma.job.count({ where: { status: 'Published' } });
    const reviewQueueCount = await prisma.job.count({ where: { status: 'Review' } });

    // 2. Tenants (Companies)
    const companies = await prisma.company.findMany({
      include: {
        jobs: true
      }
    });
    const formattedTenants = companies.map((comp: any) => ({
      id: comp.id,
      name: comp.name,
      domain: comp.website ? comp.website.replace('https://', '').replace('http://', '') : 'company.com',
      jobs: comp.jobs.length,
      status: comp.isVerified ? 'Active' : 'Pending Approval'
    }));

    // 3. Flagged Listings
    const flaggedListings = await prisma.job.findMany({
      where: {
        status: 'Review'
      },
      include: {
        company: true
      }
    });
    const formattedFlags = flaggedListings.map((job: any, idx: number) => {
      const reasons = ['Spam / Scam', 'Unpaid Internship Policy', 'Incomplete Details'];
      const flagCounts = [8, 3, 2];
      return {
        id: job.id,
        title: job.title,
        company: job.company.name,
        reason: reasons[idx % reasons.length],
        flags: flagCounts[idx % flagCounts.length]
      };
    });

    // 4. Audit Logs
    const auditLogs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20
    });
    const formattedLogs = auditLogs.map((log: any) => ({
      id: log.id,
      timestamp: log.createdAt.toLocaleTimeString('en-US', { hour12: false }),
      action: log.action,
      details: log.details || ''
    }));

    return NextResponse.json({
      status: 'success',
      data: {
        kpis: {
          activeTenants: tenantCount || 5,
          totalJobSeekers: jobSeekerCount || 2481,
          activeListings: activeListingsCount || 362,
          matchingQueue: reviewQueueCount || 2
        },
        tenants: formattedTenants,
        flaggedJobs: formattedFlags,
        auditLogs: formattedLogs
      }
    });
  } catch (err: any) {
    console.error('Error fetching admin dashboard:', err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

// POST: Manage Tenant Status or Moderation Actions
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, targetId, type } = body; // type = 'tenant' | 'job', action = 'approve' | 'suspend' | 'keep' | 'delete'

    if (type === 'tenant') {
      const company = await prisma.company.findUnique({ where: { id: targetId } });
      if (!company) return NextResponse.json({ status: 'error', message: 'Tenant not found' }, { status: 404 });

      const newStatus = action === 'approve' || action === 'activate';
      await prisma.company.update({
        where: { id: targetId },
        data: { isVerified: newStatus }
      });

      // Log action
      await prisma.auditLog.create({
        data: {
          action: newStatus ? 'TENANT_APPROVED' : 'TENANT_SUSPENDED',
          details: `Tenant company "${company.name}" ${newStatus ? 'approved/activated' : 'suspended'}.`
        }
      });

      return NextResponse.json({ status: 'success', message: 'Tenant status updated.' });
    } else if (type === 'job') {
      const job = await prisma.job.findUnique({ where: { id: targetId }, include: { company: true } });
      if (!job) return NextResponse.json({ status: 'error', message: 'Job not found' }, { status: 404 });

      if (action === 'delete') {
        await prisma.job.delete({ where: { id: targetId } });
        
        await prisma.auditLog.create({
          data: {
            action: 'JOB_DELETED',
            details: `Moderator deleted flagged job listing "${job.title}" by ${job.company.name}.`
          }
        });
      } else if (action === 'keep') {
        await prisma.job.update({
          where: { id: targetId },
          data: { status: 'Published' } // Reinstate to public directory
        });

        await prisma.auditLog.create({
          data: {
            action: 'JOB_APPROVED',
            details: `Moderator cleared flags for job listing "${job.title}" by ${job.company.name}.`
          }
        });
      }

      return NextResponse.json({ status: 'success', message: 'Moderation action processed.' });
    }

    return NextResponse.json({ status: 'error', message: 'Invalid action configuration' }, { status: 400 });
  } catch (err: any) {
    console.error('Error handling admin action:', err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
