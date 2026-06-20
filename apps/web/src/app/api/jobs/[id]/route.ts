import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    // Check if job exists
    const existingJob = await prisma.job.findUnique({
      where: { id }
    });

    if (!existingJob) {
      return NextResponse.json({ status: 'error', message: 'Job not found' }, { status: 404 });
    }

    // Delete related applications first to avoid foreign key constraints
    await prisma.jobApplication.deleteMany({
      where: { jobId: id }
    });

    // Delete the job
    await prisma.job.delete({
      where: { id }
    });

    return NextResponse.json({ status: 'success', message: 'Job deleted successfully' });
  } catch (err: any) {
    console.error('Error deleting job:', err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
