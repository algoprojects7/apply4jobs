import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      include: {
        jobs: {
          where: { status: 'Published' }
        }
      }
    });

    const formattedCompanies = companies.map((comp: any, idx: number) => {
      // Map company to frontend format
      const initials = comp.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
      const colorPalette = ['#7c3aed', '#3b82f6', '#10b981', '#ea4335', '#00a4ef', '#1db954'];
      const logoBg = colorPalette[idx % colorPalette.length];
      
      return {
        id: comp.id,
        name: comp.name,
        domain: comp.website ? comp.website.replace('https://', '').replace('http://', '') : 'company.com',
        sector: comp.description || 'Technology',
        openJobs: comp.jobs.length,
        matchedRate: Math.floor(Math.random() * (95 - 75 + 1)) + 75,
        logoBg,
        initial: initials || 'CO'
      };
    });

    return NextResponse.json({ status: 'success', data: formattedCompanies });
  } catch (err: any) {
    console.error('Error fetching companies:', err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
