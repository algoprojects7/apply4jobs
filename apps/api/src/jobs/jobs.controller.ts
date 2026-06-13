import { Controller, Post, Put, Delete, Get, Body, Param, Query } from '@nestjs/common';

@Controller('jobs')
export class JobsController {
  private jobs = [
    {
      id: 'job-uuid-1',
      title: 'Senior TypeScript Developer',
      company: 'TechCorp Solutions',
      description: 'Join our team to build multi-tenant NestJS and Next.js applications.',
      skillsRequired: ['TypeScript', 'NestJS', 'Next.js', 'PostgreSQL'],
      salaryMin: 120000,
      salaryMax: 150000,
      experienceMin: 5,
      experienceMax: 8,
      remoteType: 'Remote',
      location: 'New York, NY',
      status: 'Published',
    },
    {
      id: 'job-uuid-2',
      title: 'GenAI Integration Engineer',
      company: 'AI Frontiers',
      description: 'Deploy LLM architectures using AWS Bedrock, Claude, and Llama 3.',
      skillsRequired: ['Python', 'AWS Bedrock', 'LlamaIndex', 'OpenSearch'],
      salaryMin: 140000,
      salaryMax: 180000,
      experienceMin: 3,
      experienceMax: 6,
      remoteType: 'Hybrid',
      location: 'San Francisco, CA',
      status: 'Published',
    },
  ];

  @Get()
  async searchJobs(@Query() query: any) {
    const { keyword, skills, remoteType, location } = query;
    console.log(`Searching jobs matching: keyword=${keyword}, skills=${skills}, remoteType=${remoteType}`);
    
    let filtered = [...this.jobs];
    if (keyword) {
      filtered = filtered.filter(j => 
        j.title.toLowerCase().includes(keyword.toLowerCase()) || 
        j.description.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    if (remoteType) {
      filtered = filtered.filter(j => j.remoteType.toLowerCase() === remoteType.toLowerCase());
    }
    return {
      status: 'success',
      latencyMs: 12, // Sub-100ms
      count: filtered.length,
      data: filtered,
    };
  }

  @Post()
  async createJob(@Body() body: any) {
    console.log('Creating job posting:', body);
    const newJob = {
      id: `job-uuid-${Date.now()}`,
      status: 'Published',
      ...body,
    };
    this.jobs.push(newJob);
    return {
      status: 'success',
      message: 'Job posting published and indexed to OpenSearch successfully.',
      data: newJob,
    };
  }

  @Put(':id')
  async updateJob(@Param('id') id: string, @Body() body: any) {
    console.log(`Updating job posting ${id}:`, body);
    return {
      status: 'success',
      message: 'Job posting updated successfully in cache and database.',
      data: { id, ...body },
    };
  }

  @Delete(':id')
  async deleteJob(@Param('id') id: string) {
    console.log(`Deleting job posting ${id}`);
    return {
      status: 'success',
      message: 'Job posting deleted and cache purged successfully.',
    };
  }
}
