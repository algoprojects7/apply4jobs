const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/apply4jobs?schema=public"
    }
  }
});

async function main() {
  console.log('Seeding database "apply4jobs"...');

  // Clear existing data
  console.log('Clearing old data via TRUNCATE CASCADE...');
  const tableNames = [
    'AuditLog', 'RecommendationScore', 'BehavioralPattern', 'SearchHistory',
    'SavedJob', 'Interview', 'JobApplication', 'ResumeAnalysis', 'Resume',
    'CandidateExperience', 'CandidateEducation', 'CandidateProfile', 'Job',
    'CompanyUser', 'Company', 'Session', 'User', 'Tenant', 'Role', 'Permission'
  ];
  for (const tableName of tableNames) {
    try {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${tableName}" CASCADE;`);
    } catch (err) {
      console.log(`Warning: Could not truncate ${tableName}:`, err.message);
    }
  }

  // 1. Create Permissions
  console.log('Creating permissions...');
  const permissionsData = [
    { action: 'job:create' },
    { action: 'job:read' },
    { action: 'job:update' },
    { action: 'job:delete' },
    { action: 'job:apply' },
    { action: 'profile:create' },
    { action: 'profile:read' },
    { action: 'profile:update' },
    { action: 'profile:delete' },
    { action: 'resume:upload' },
    { action: 'resume:analyze' },
    { action: 'interview:schedule' },
    { action: 'interview:feedback' },
    { action: 'tenant:manage' },
    { action: 'audit:read' }
  ];

  const permissions = [];
  for (const perm of permissionsData) {
    const createdPerm = await prisma.permission.create({
      data: perm
    });
    permissions.push(createdPerm);
  }

  const getPerm = (action) => permissions.find(p => p.action === action);

  // 2. Create Roles
  console.log('Creating roles with mapped permissions...');
  const candidateRole = await prisma.role.create({
    data: {
      name: 'candidate',
      permissions: {
        connect: [
          { id: getPerm('job:read').id },
          { id: getPerm('job:apply').id },
          { id: getPerm('profile:create').id },
          { id: getPerm('profile:read').id },
          { id: getPerm('profile:update').id },
          { id: getPerm('profile:delete').id },
          { id: getPerm('resume:upload').id }
        ]
      }
    }
  });

  const employerRole = await prisma.role.create({
    data: {
      name: 'employer',
      permissions: {
        connect: [
          { id: getPerm('job:create').id },
          { id: getPerm('job:read').id },
          { id: getPerm('job:update').id },
          { id: getPerm('job:delete').id },
          { id: getPerm('profile:read').id },
          { id: getPerm('resume:analyze').id },
          { id: getPerm('interview:schedule').id },
          { id: getPerm('interview:feedback').id }
        ]
      }
    }
  });

  const adminRole = await prisma.role.create({
    data: {
      name: 'admin',
      permissions: {
        connect: permissions.map(p => ({ id: p.id }))
      }
    }
  });

  // 3. Create Tenants
  console.log('Creating tenants...');
  const techCorpTenant = await prisma.tenant.create({
    data: { name: 'TechCorp Solutions', domain: 'techcorp.com' }
  });
  const webflowTenant = await prisma.tenant.create({
    data: { name: 'WebFlow Studio', domain: 'webflowstudio.io' }
  });
  const aiFrontiersTenant = await prisma.tenant.create({
    data: { name: 'AI Frontiers', domain: 'aifrontiers.net' }
  });
  const googleTenant = await prisma.tenant.create({
    data: { name: 'Google', domain: 'google.com' }
  });
  const microsoftTenant = await prisma.tenant.create({
    data: { name: 'Microsoft', domain: 'microsoft.com' }
  });
  const spotifyTenant = await prisma.tenant.create({
    data: { name: 'Spotify', domain: 'spotify.com' }
  });
  const netflixTenant = await prisma.tenant.create({
    data: { name: 'Netflix', domain: 'netflix.com' }
  });
  const appleTenant = await prisma.tenant.create({
    data: { name: 'Apple', domain: 'apple.com' }
  });
  const metaTenant = await prisma.tenant.create({
    data: { name: 'Meta', domain: 'meta.com' }
  });
  const amazonTenant = await prisma.tenant.create({
    data: { name: 'Amazon', domain: 'amazon.com' }
  });

  // 4. Create Users (with bcrypt-hashed passwords)
  console.log('Creating users with bcrypt password hashes...');
  const SALT_ROUNDS = 4;
  const candidateHash  = await bcrypt.hash('Test@1234',   SALT_ROUNDS);
  const employerHash   = await bcrypt.hash('Employer@123', SALT_ROUNDS);
  const adminHash      = await bcrypt.hash('Admin@123',    SALT_ROUNDS);

  // Candidates
  const candidateUser = await prisma.user.create({
    data: {
      email: 'candidate@apply4jobs.com',
      passwordHash: candidateHash,
      roleId: candidateRole.id,
      isVerified: true
    }
  });

  const candidateUser2 = await prisma.user.create({
    data: {
      email: 'candidate2@apply4jobs.com',
      passwordHash: candidateHash,
      roleId: candidateRole.id,
      isVerified: true
    }
  });

  const candidateUser3 = await prisma.user.create({
    data: {
      email: 'candidate3@apply4jobs.com',
      passwordHash: candidateHash,
      roleId: candidateRole.id,
      isVerified: true
    }
  });

  const candidateUser4 = await prisma.user.create({
    data: {
      email: 'candidate4@apply4jobs.com',
      passwordHash: candidateHash,
      roleId: candidateRole.id,
      isVerified: true
    }
  });

  const candidateUser5 = await prisma.user.create({
    data: {
      email: 'candidate5@apply4jobs.com',
      passwordHash: candidateHash,
      roleId: candidateRole.id,
      isVerified: false
    }
  });

  // Employers
  const employerUser = await prisma.user.create({
    data: {
      email: 'employer@techcorp.com',
      passwordHash: employerHash,
      roleId: employerRole.id,
      tenantId: techCorpTenant.id,
      isVerified: true
    }
  });

  const employerUser2 = await prisma.user.create({
    data: {
      email: 'employer2@google.com',
      passwordHash: employerHash,
      roleId: employerRole.id,
      tenantId: googleTenant.id,
      isVerified: true
    }
  });

  const employerUser3 = await prisma.user.create({
    data: {
      email: 'employer3@netflix.com',
      passwordHash: employerHash,
      roleId: employerRole.id,
      tenantId: netflixTenant.id,
      isVerified: true
    }
  });

  const employerUser4 = await prisma.user.create({
    data: {
      email: 'employer4@microsoft.com',
      passwordHash: employerHash,
      roleId: employerRole.id,
      tenantId: microsoftTenant.id,
      isVerified: true
    }
  });

  const employerUser5 = await prisma.user.create({
    data: {
      email: 'employer5@spotify.com',
      passwordHash: employerHash,
      roleId: employerRole.id,
      tenantId: spotifyTenant.id,
      isVerified: true
    }
  });

  const employerUser6 = await prisma.user.create({
    data: {
      email: 'employer6@apple.com',
      passwordHash: employerHash,
      roleId: employerRole.id,
      tenantId: appleTenant.id,
      isVerified: true
    }
  });

  const employerUser7 = await prisma.user.create({
    data: {
      email: 'employer7@amazon.com',
      passwordHash: employerHash,
      roleId: employerRole.id,
      tenantId: amazonTenant.id,
      isVerified: true
    }
  });

  const employerUser8 = await prisma.user.create({
    data: {
      email: 'employer8@meta.com',
      passwordHash: employerHash,
      roleId: employerRole.id,
      tenantId: metaTenant.id,
      isVerified: true
    }
  });

  // Admin
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@apply4jobs.com',
      passwordHash: adminHash,
      roleId: adminRole.id,
      isVerified: true
    }
  });

  // 5. Create Companies
  console.log('Creating companies...');
  const techCorpCompany = await prisma.company.create({
    data: {
      tenantId: techCorpTenant.id,
      name: 'TechCorp Solutions',
      website: 'https://techcorp.com',
      description: 'Enterprise TypeScript solutions provider.',
      isVerified: true
    }
  });
  
  const webflowCompany = await prisma.company.create({
    data: {
      tenantId: webflowTenant.id,
      name: 'WebFlow Studio',
      website: 'https://webflowstudio.io',
      description: 'Creative design and UI/UX engineering studio.',
      isVerified: true
    }
  });

  const aiFrontiersCompany = await prisma.company.create({
    data: {
      tenantId: aiFrontiersTenant.id,
      name: 'AI Frontiers',
      website: 'https://aifrontiers.net',
      description: 'Pioneering generative AI and agentic research.',
      isVerified: false
    }
  });

  const googleCompany = await prisma.company.create({
    data: {
      tenantId: googleTenant.id,
      name: 'Google',
      website: 'https://google.com',
      description: 'Big Tech search and cloud service provider.',
      isVerified: true
    }
  });

  const microsoftCompany = await prisma.company.create({
    data: {
      tenantId: microsoftTenant.id,
      name: 'Microsoft',
      website: 'https://microsoft.com',
      description: 'Cloud computing and operating systems leader.',
      isVerified: true
    }
  });

  const spotifyCompany = await prisma.company.create({
    data: {
      tenantId: spotifyTenant.id,
      name: 'Spotify',
      website: 'https://spotify.com',
      description: 'Digital music, podcast, and video streaming service.',
      isVerified: true
    }
  });

  const netflixCompany = await prisma.company.create({
    data: {
      tenantId: netflixTenant.id,
      name: 'Netflix',
      website: 'https://netflix.com',
      description: 'Global entertainment streaming leader.',
      isVerified: true
    }
  });

  const appleCompany = await prisma.company.create({
    data: {
      tenantId: appleTenant.id,
      name: 'Apple',
      website: 'https://apple.com',
      description: 'Consumer electronics, software, and services company.',
      isVerified: true
    }
  });

  const metaCompany = await prisma.company.create({
    data: {
      tenantId: metaTenant.id,
      name: 'Meta',
      website: 'https://meta.com',
      description: 'Social technology and metaverse infrastructure company.',
      isVerified: true
    }
  });

  const amazonCompany = await prisma.company.create({
    data: {
      tenantId: amazonTenant.id,
      name: 'Amazon',
      website: 'https://amazon.com',
      description: 'E-commerce, cloud computing, and digital streaming powerhouse.',
      isVerified: true
    }
  });

  // 6. Create Company Link
  console.log('Linking recruiters to companies...');
  const companyUsers = [
    { companyId: techCorpCompany.id, userId: employerUser.id },
    { companyId: googleCompany.id, userId: employerUser2.id },
    { companyId: netflixCompany.id, userId: employerUser3.id },
    { companyId: microsoftCompany.id, userId: employerUser4.id },
    { companyId: spotifyCompany.id, userId: employerUser5.id },
    { companyId: appleCompany.id, userId: employerUser6.id },
    { companyId: amazonCompany.id, userId: employerUser7.id },
    { companyId: metaCompany.id, userId: employerUser8.id }
  ];

  for (const cu of companyUsers) {
    await prisma.companyUser.create({
      data: cu
    });
  }

  // 7. Create Jobs
  console.log('Creating jobs...');
  const tsJob = await prisma.job.create({
    data: {
      companyId: techCorpCompany.id,
      title: 'Senior TypeScript Developer',
      description: 'Build robust web applications using TypeScript, NestJS, and Next.js.',
      status: 'Published',
      salaryMin: 120000,
      salaryMax: 150000,
      experienceMin: 5,
      experienceMax: 8,
      remoteType: 'Remote',
      location: 'New York, NY',
      skillsRequired: ['TypeScript', 'Node.js', 'Next.js']
    }
  });

  const aiJob = await prisma.job.create({
    data: {
      companyId: aiFrontiersCompany.id,
      title: 'GenAI Integration Engineer',
      description: 'Deploy LLM architectures, vector databases, and AI agent agents.',
      status: 'Published',
      salaryMin: 140000,
      salaryMax: 180000,
      experienceMin: 3,
      experienceMax: 6,
      remoteType: 'Hybrid',
      location: 'San Francisco, CA',
      skillsRequired: ['Python', 'LLMs', 'Vector DBs']
    }
  });

  const designJob = await prisma.job.create({
    data: {
      companyId: webflowCompany.id,
      title: 'Lead UI/UX Designer',
      description: 'Lead visual interface designs, design systems, and responsive layout workflows.',
      status: 'Published',
      salaryMin: 100000,
      salaryMax: 130000,
      experienceMin: 4,
      experienceMax: 7,
      remoteType: 'Remote',
      location: 'Remote',
      skillsRequired: ['Figma', 'Design Systems', 'CSS']
    }
  });

  const fsJob = await prisma.job.create({
    data: {
      companyId: techCorpCompany.id,
      title: 'Full Stack Engineer',
      description: 'Contribute across the stack in backend APIs, databases, and visual frontend frameworks.',
      status: 'Published',
      salaryMin: 80000,
      salaryMax: 110000,
      experienceMin: 2,
      experienceMax: 5,
      remoteType: 'Hybrid',
      location: 'Bangalore, IN',
      skillsRequired: ['React', 'NestJS', 'PostgreSQL']
    }
  });

  const googleJob = await prisma.job.create({
    data: {
      companyId: googleCompany.id,
      title: 'Senior Frontend Engineer',
      description: 'Optimize user interfaces for Next-gen search systems.',
      status: 'Published',
      salaryMin: 180000,
      salaryMax: 220000,
      experienceMin: 6,
      remoteType: 'Hybrid',
      location: 'Mountain View, CA',
      skillsRequired: ['TypeScript', 'React', 'CSS']
    }
  });

  const spamJob = await prisma.job.create({
    data: {
      companyId: techCorpCompany.id,
      title: 'Get Rich Quick Content Spammer',
      description: 'Earn $10k per week sending emails automatically. Completely legal!',
      status: 'Review',
      salaryMin: 500000,
      salaryMax: 1000000,
      experienceMin: 0,
      remoteType: 'Remote',
      location: 'Remote',
      skillsRequired: ['Spamming', 'Email']
    }
  });

  const unpaidJob = await prisma.job.create({
    data: {
      companyId: webflowCompany.id,
      title: 'Crypto Dev (No Salary, Equity Only)',
      description: 'Code our new Web3 dApp. No fixed salary, 5% equity after token launch.',
      status: 'Review',
      salaryMin: 0,
      salaryMax: 0,
      experienceMin: 1,
      remoteType: 'Remote',
      location: 'Remote',
      skillsRequired: ['Solidity', 'Web3']
    }
  });

  const netflixCloudJob = await prisma.job.create({
    data: {
      companyId: netflixCompany.id,
      title: 'Senior Cloud Architect',
      description: 'Architect scalable global streaming pipelines using multi-region AWS and Kubernetes infrastructure.',
      status: 'Published',
      salaryMin: 170000,
      salaryMax: 210000,
      experienceMin: 7,
      experienceMax: 12,
      remoteType: 'Remote',
      location: 'Los Gatos, CA',
      skillsRequired: ['AWS', 'Docker', 'Kubernetes', 'Terraform']
    }
  });

  const netflixSystemsJob = await prisma.job.create({
    data: {
      companyId: netflixCompany.id,
      title: 'Staff Systems Engineer',
      description: 'Optimize low-level networking, FreeBSD kernel operations, and media delivery engines.',
      status: 'Published',
      salaryMin: 200000,
      salaryMax: 250000,
      experienceMin: 8,
      remoteType: 'Onsite',
      location: 'Los Gatos, CA',
      skillsRequired: ['C', 'Go', 'Linux', 'Systems']
    }
  });

  const googleInternJob = await prisma.job.create({
    data: {
      companyId: googleCompany.id,
      title: 'Software Engineering Intern',
      description: 'Collaborate with engineering teams on search optimization and internal tooling.',
      status: 'Published',
      salaryMin: 30000,
      salaryMax: 40000,
      experienceMin: 0,
      experienceMax: 1,
      remoteType: 'Remote',
      location: 'Mountain View, CA',
      skillsRequired: ['Python', 'Java', 'Data Structures']
    }
  });

  const googleSreJob = await prisma.job.create({
    data: {
      companyId: googleCompany.id,
      title: 'Staff Reliability Engineer',
      description: 'Keep production systems running smoothly at petabyte scale. Focus on automation and fault-tolerant patterns.',
      status: 'Draft',
      salaryMin: 210000,
      salaryMax: 260000,
      experienceMin: 8,
      remoteType: 'Hybrid',
      location: 'Mountain View, CA',
      skillsRequired: ['Linux', 'Kubernetes', 'Go', 'Python']
    }
  });

  const msPmJob = await prisma.job.create({
    data: {
      companyId: microsoftCompany.id,
      title: 'Principal Product Manager',
      description: 'Define product strategy, roadmap, and core features for Azure developer platform services.',
      status: 'Published',
      salaryMin: 180000,
      salaryMax: 230000,
      experienceMin: 6,
      experienceMax: 10,
      remoteType: 'Remote',
      location: 'Redmond, WA',
      skillsRequired: ['Product Management', 'Agile', 'Roadmapping']
    }
  });

  const msSecJob = await prisma.job.create({
    data: {
      companyId: microsoftCompany.id,
      title: 'Azure Security Specialist',
      description: 'Perform penetration testing, zero-trust cloud architecture configurations, and security audits.',
      status: 'Closed',
      salaryMin: 140000,
      salaryMax: 170000,
      experienceMin: 4,
      experienceMax: 7,
      remoteType: 'Remote',
      location: 'Redmond, WA',
      skillsRequired: ['Azure', 'Cryptography', 'Security', 'PowerShell']
    }
  });

  const spotifyRustJob = await prisma.job.create({
    data: {
      companyId: spotifyCompany.id,
      title: 'Backend Engineer (Rust/Go)',
      description: 'Design high-throughput, low-latency APIs for music discovery and streaming systems.',
      status: 'Published',
      salaryMin: 90000,
      salaryMax: 120000,
      experienceMin: 3,
      experienceMax: 6,
      remoteType: 'Remote',
      location: 'Stockholm, SE',
      skillsRequired: ['Rust', 'Go', 'gRPC', 'PostgreSQL']
    }
  });

  const spotifyDsJob = await prisma.job.create({
    data: {
      companyId: spotifyCompany.id,
      title: 'Data Scientist - Recommendation Systems',
      description: 'Research and deploy personalized collaborative filtering and reinforcement learning models.',
      status: 'Published',
      salaryMin: 130000,
      salaryMax: 160000,
      experienceMin: 3,
      experienceMax: 5,
      remoteType: 'Hybrid',
      location: 'New York, NY',
      skillsRequired: ['Python', 'PyTorch', 'SQL', 'ML']
    }
  });

  const appleIosJob = await prisma.job.create({
    data: {
      companyId: appleCompany.id,
      title: 'iOS Core Graphics Engineer',
      description: 'Build rendering pipeline modules, shaders, and metal integrations for core UI frameworks.',
      status: 'Published',
      salaryMin: 160000,
      salaryMax: 190000,
      experienceMin: 5,
      experienceMax: 8,
      remoteType: 'Onsite',
      location: 'Cupertino, CA',
      skillsRequired: ['Swift', 'Objective-C', 'Metal', 'CoreGraphics']
    }
  });

  const appleEmbeddedJob = await prisma.job.create({
    data: {
      companyId: appleCompany.id,
      title: 'Embedded Systems Developer',
      description: 'Write drivers, firmware, and bootloaders for next-generation consumer hardware chips.',
      status: 'Draft',
      salaryMin: 120000,
      salaryMax: 150000,
      experienceMin: 3,
      experienceMax: 6,
      remoteType: 'Onsite',
      location: 'Cupertino, CA',
      skillsRequired: ['C', 'C++', 'RTOS', 'Microcontrollers']
    }
  });

  const amazonAwsJob = await prisma.job.create({
    data: {
      companyId: amazonCompany.id,
      title: 'AWS Solutions Architect',
      description: 'Help customers design and implement cloud migrations and multi-tenant architectures.',
      status: 'Published',
      salaryMin: 150000,
      salaryMax: 190000,
      experienceMin: 5,
      experienceMax: 9,
      remoteType: 'Remote',
      location: 'Seattle, WA',
      skillsRequired: ['AWS', 'Architecture', 'Cloud', 'DevOps']
    }
  });

  const amazonOpsJob = await prisma.job.create({
    data: {
      companyId: amazonCompany.id,
      title: 'Operations Manager',
      description: 'Supervise logistics, fulfillment center efficiency, and local fleet scheduling.',
      status: 'Archived',
      salaryMin: 90000,
      salaryMax: 120000,
      experienceMin: 2,
      experienceMax: 5,
      remoteType: 'Onsite',
      location: 'Seattle, WA',
      skillsRequired: ['Operations', 'Leadership', 'Supply Chain']
    }
  });

  const metaMlJob = await prisma.job.create({
    data: {
      companyId: metaCompany.id,
      title: 'Research Scientist - Llama 4',
      description: 'Train large-scale multimodal models, develop synthetic data generation frameworks, and scale training clusters.',
      status: 'Published',
      salaryMin: 250000,
      salaryMax: 350000,
      experienceMin: 4,
      experienceMax: 7,
      remoteType: 'Hybrid',
      location: 'Menlo Park, CA',
      skillsRequired: ['PyTorch', 'Deep Learning', 'LLMs', 'NLP']
    }
  });

  const metaDesignJob = await prisma.job.create({
    data: {
      companyId: metaCompany.id,
      title: 'Product Designer',
      description: 'Design intuitive features and visual components for the next iteration of social applications.',
      status: 'Published',
      salaryMin: 110000,
      salaryMax: 140000,
      experienceMin: 3,
      experienceMax: 6,
      remoteType: 'Remote',
      location: 'Menlo Park, CA',
      skillsRequired: ['Figma', 'Product Design', 'Prototyping']
    }
  });

  // 8. Create Candidate Profiles
  console.log('Creating candidate profiles...');
  const alexProfile = await prisma.candidateProfile.create({
    data: {
      userId: candidateUser.id,
      fullName: 'Alex Johnson',
      gender: 'Male',
      profileScore: 85,
      skills: ['TypeScript', 'Node.js', 'Next.js', 'Figma', 'React', 'Prisma']
    }
  });

  await prisma.candidateExperience.create({
    data: {
      profileId: alexProfile.id,
      companyName: 'StackFlow Systems',
      title: 'Frontend Engineer',
      startDate: new Date('2024-01-01'),
      description: 'Designed client views and state stores.'
    }
  });

  await prisma.candidateEducation.create({
    data: {
      profileId: alexProfile.id,
      institution: 'State Engineering College',
      degree: 'Bachelor of Computer Science',
      startDate: new Date('2020-09-01'),
      endDate: new Date('2024-06-01')
    }
  });

  const sarahProfile = await prisma.candidateProfile.create({
    data: {
      userId: candidateUser2.id,
      fullName: 'Sarah Connor',
      gender: 'Female',
      profileScore: 92,
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Python', 'Linux']
    }
  });

  await prisma.candidateExperience.create({
    data: {
      profileId: sarahProfile.id,
      companyName: 'Cyberdyne Systems',
      title: 'DevOps Lead',
      startDate: new Date('2022-03-15'),
      description: 'Managed zero-downtime microservices migrations, cluster orchestration, and automated vulnerability scanning.'
    }
  });

  await prisma.candidateEducation.create({
    data: {
      profileId: sarahProfile.id,
      institution: 'Tech Institute of California',
      degree: 'Bachelor of Science in Systems Engineering',
      startDate: new Date('2018-09-01'),
      endDate: new Date('2022-06-01')
    }
  });

  const bruceProfile = await prisma.candidateProfile.create({
    data: {
      userId: candidateUser3.id,
      fullName: 'Bruce Wayne',
      gender: 'Male',
      profileScore: 98,
      skills: ['Penetration Testing', 'Cryptography', 'Network Security', 'Go', 'C++', 'Rust']
    }
  });

  await prisma.candidateExperience.create({
    data: {
      profileId: bruceProfile.id,
      companyName: 'Wayne Enterprises',
      title: 'Chief Information Security Engineer',
      startDate: new Date('2019-06-01'),
      description: 'Designed secure satellite communication nodes, conducted network penetration tests, and deployed zero-trust architectures.'
    }
  });

  await prisma.candidateEducation.create({
    data: {
      profileId: bruceProfile.id,
      institution: 'Gotham Academy',
      degree: 'Master of Science in Cybersecurity',
      startDate: new Date('2015-09-01'),
      endDate: new Date('2019-05-01')
    }
  });

  const dianaProfile = await prisma.candidateProfile.create({
    data: {
      userId: candidateUser4.id,
      fullName: 'Diana Prince',
      gender: 'Female',
      profileScore: 90,
      skills: ['Product Management', 'Agile', 'Jira', 'Roadmapping', 'User Research']
    }
  });

  await prisma.candidateExperience.create({
    data: {
      profileId: dianaProfile.id,
      companyName: 'Themyscira Solutions',
      title: 'Senior Product Manager',
      startDate: new Date('2021-01-10'),
      description: 'Led agile scrum teams of 12 engineers. Increased user engagement by 40% using behavioral analysis metrics.'
    }
  });

  await prisma.candidateEducation.create({
    data: {
      profileId: dianaProfile.id,
      institution: 'Athens University',
      degree: 'Bachelor of Arts in Sociology & Business',
      startDate: new Date('2016-09-01'),
      endDate: new Date('2020-06-01')
    }
  });

  const clarkProfile = await prisma.candidateProfile.create({
    data: {
      userId: candidateUser5.id,
      fullName: 'Clark Kent',
      gender: 'Male',
      profileScore: 78,
      skills: ['Content Writing', 'SEO', 'Copywriting', 'Public Relations']
    }
  });

  await prisma.candidateExperience.create({
    data: {
      profileId: clarkProfile.id,
      companyName: 'Daily Planet',
      title: 'Lead Investigative Journalist & Writer',
      startDate: new Date('2017-08-01'),
      description: 'Wrote compelling SEO-optimized articles, edited copy for printing, and managed public relations releases.'
    }
  });

  await prisma.candidateEducation.create({
    data: {
      profileId: clarkProfile.id,
      institution: 'Metropolis University',
      degree: 'Bachelor of Journalism',
      startDate: new Date('2013-09-01'),
      endDate: new Date('2017-06-01')
    }
  });

  // 9. Resumes and ATS Analysis
  console.log('Creating resumes and analyses...');
  const resumeAlex = await prisma.resume.create({
    data: {
      profileId: alexProfile.id,
      fileUrl: '/resumes/alex_johnson_cv.pdf',
      parsedText: 'Alex Johnson, Frontend Engineer skilled in TypeScript, React, Node.js.',
      isActive: true
    }
  });

  await prisma.resumeAnalysis.create({
    data: {
      resumeId: resumeAlex.id,
      atsScore: 84,
      qualityScore: 88,
      extractedSkills: ['TypeScript', 'React', 'Node.js', 'CSS'],
      suggestedRoles: ['Senior TypeScript Developer', 'Frontend Engineer'],
      improvements: {
        grammar: 'Looks clean.',
        suggestedSkills: ['Prisma', 'PostgreSQL', 'NestJS']
      }
    }
  });

  const resumeSarah = await prisma.resume.create({
    data: {
      profileId: sarahProfile.id,
      fileUrl: '/resumes/sarah_connor_devops.pdf',
      parsedText: 'Sarah Connor, DevOps Lead. Expert in AWS, Docker, Kubernetes, and Terraform.',
      isActive: true
    }
  });

  await prisma.resumeAnalysis.create({
    data: {
      resumeId: resumeSarah.id,
      atsScore: 91,
      qualityScore: 93,
      extractedSkills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
      suggestedRoles: ['Senior Cloud Architect', 'DevOps Engineer', 'Infrastructure Lead'],
      improvements: {
        grammar: 'Flawless.',
        suggestedSkills: ['Go', 'Helm', 'Prometheus']
      }
    }
  });

  const resumeBruce = await prisma.resume.create({
    data: {
      profileId: bruceProfile.id,
      fileUrl: '/resumes/bruce_wayne_sec.pdf',
      parsedText: 'Bruce Wayne, Security Engineer. Cryptography and penetration testing specialist. Go and C++.',
      isActive: true
    }
  });

  await prisma.resumeAnalysis.create({
    data: {
      resumeId: resumeBruce.id,
      atsScore: 96,
      qualityScore: 97,
      extractedSkills: ['Penetration Testing', 'Cryptography', 'Security', 'Go', 'C++'],
      suggestedRoles: ['Azure Security Specialist', 'Chief Information Security Engineer'],
      improvements: {
        grammar: 'Strong phrasing.',
        suggestedSkills: ['Azure Cloud', 'Rust', 'OAuth']
      }
    }
  });

  const resumeDiana = await prisma.resume.create({
    data: {
      profileId: dianaProfile.id,
      fileUrl: '/resumes/diana_prince_pm.pdf',
      parsedText: 'Diana Prince, Senior Product Manager. Specialized in Agile methodologies, roadmapping, and UX.',
      isActive: true
    }
  });

  await prisma.resumeAnalysis.create({
    data: {
      resumeId: resumeDiana.id,
      atsScore: 89,
      qualityScore: 90,
      extractedSkills: ['Product Management', 'Agile', 'Jira', 'Roadmapping'],
      suggestedRoles: ['Principal Product Manager', 'Product Manager'],
      improvements: {
        grammar: 'Good structure.',
        suggestedSkills: ['SQL', 'A/B Testing', 'Product Analytics']
      }
    }
  });

  const resumeClark = await prisma.resume.create({
    data: {
      profileId: clarkProfile.id,
      fileUrl: '/resumes/clark_kent_writer.pdf',
      parsedText: 'Clark Kent, Investigative Writer. Specializing in Content Writing, SEO, and Media Strategy.',
      isActive: true
    }
  });

  await prisma.resumeAnalysis.create({
    data: {
      resumeId: resumeClark.id,
      atsScore: 76,
      qualityScore: 82,
      extractedSkills: ['Content Writing', 'SEO', 'Copywriting'],
      suggestedRoles: ['Content Strategist', 'Technical Writer'],
      improvements: {
        grammar: 'Excellent prose.',
        suggestedSkills: ['Digital Marketing', 'HTML', 'Google Analytics']
      }
    }
  });

  // 10. Create Job Applications
  console.log('Creating applications...');
  const app1 = await prisma.jobApplication.create({
    data: {
      jobId: tsJob.id,
      candidateId: alexProfile.id,
      status: 'Interview'
    }
  });

  const app2 = await prisma.jobApplication.create({
    data: {
      jobId: aiJob.id,
      candidateId: alexProfile.id,
      status: 'Applied'
    }
  });

  const appSarah1 = await prisma.jobApplication.create({
    data: {
      jobId: netflixCloudJob.id,
      candidateId: sarahProfile.id,
      status: 'Hired'
    }
  });

  const appSarah2 = await prisma.jobApplication.create({
    data: {
      jobId: spotifyRustJob.id,
      candidateId: sarahProfile.id,
      status: 'Assessment'
    }
  });

  const appSarah3 = await prisma.jobApplication.create({
    data: {
      jobId: tsJob.id,
      candidateId: sarahProfile.id,
      status: 'Rejected'
    }
  });

  const appBruce1 = await prisma.jobApplication.create({
    data: {
      jobId: msSecJob.id,
      candidateId: bruceProfile.id,
      status: 'Offered'
    }
  });

  const appBruce2 = await prisma.jobApplication.create({
    data: {
      jobId: spotifyRustJob.id,
      candidateId: bruceProfile.id,
      status: 'Applied'
    }
  });

  const appDiana1 = await prisma.jobApplication.create({
    data: {
      jobId: msPmJob.id,
      candidateId: dianaProfile.id,
      status: 'Shortlisted'
    }
  });

  // 11. Scheduled Interviews
  console.log('Creating interviews...');
  await prisma.interview.create({
    data: {
      applicationId: app1.id,
      scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      feedback: 'Initial screen scheduled'
    }
  });

  await prisma.interview.create({
    data: {
      applicationId: appSarah2.id,
      scheduledAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      meetingLink: 'https://meet.google.com/spotify-sarah-assessment',
      feedback: 'Rust skills assessment live session'
    }
  });

  await prisma.interview.create({
    data: {
      applicationId: appDiana1.id,
      scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      meetingLink: 'https://teams.microsoft.com/diana-pm-interview',
      feedback: 'Product management core skills and roadmap alignment'
    }
  });

  // 12. Saved Jobs
  console.log('Creating saved jobs...');
  await prisma.savedJob.create({
    data: {
      candidateId: alexProfile.id,
      jobId: designJob.id
    }
  });

  await prisma.savedJob.create({
    data: {
      candidateId: sarahProfile.id,
      jobId: amazonAwsJob.id
    }
  });

  await prisma.savedJob.create({
    data: {
      candidateId: bruceProfile.id,
      jobId: netflixSystemsJob.id
    }
  });

  await prisma.savedJob.create({
    data: {
      candidateId: dianaProfile.id,
      jobId: googleJob.id
    }
  });

  // 13. Recommendation Scores
  console.log('Creating recommendation scores...');
  await prisma.recommendationScore.create({
    data: {
      candidateId: alexProfile.id,
      jobId: tsJob.id,
      score: 92.0,
      reason: 'Perfect skills alignment with TypeScript, React, and Node.js.'
    }
  });

  await prisma.recommendationScore.create({
    data: {
      candidateId: alexProfile.id,
      jobId: aiJob.id,
      score: 78.0,
      reason: 'Candidate matches modern development standards, but has gaps in LLMs/Python.'
    }
  });

  await prisma.recommendationScore.create({
    data: {
      candidateId: sarahProfile.id,
      jobId: netflixCloudJob.id,
      score: 95.0,
      reason: 'Excellent AWS and Kubernetes infrastructure design expertise matches Netflix requirement.'
    }
  });

  await prisma.recommendationScore.create({
    data: {
      candidateId: sarahProfile.id,
      jobId: spotifyRustJob.id,
      score: 82.0,
      reason: 'Strong DevOps engineering background, but lacks direct Rust backend framework experience.'
    }
  });

  await prisma.recommendationScore.create({
    data: {
      candidateId: bruceProfile.id,
      jobId: msSecJob.id,
      score: 98.0,
      reason: 'Outstanding cybersecurity background, cryptography expertise, and scripting capabilities.'
    }
  });

  await prisma.recommendationScore.create({
    data: {
      candidateId: bruceProfile.id,
      jobId: spotifyRustJob.id,
      score: 85.0,
      reason: 'Excellent systems-level capability and has Go/Rust scripting knowledge.'
    }
  });

  await prisma.recommendationScore.create({
    data: {
      candidateId: dianaProfile.id,
      jobId: msPmJob.id,
      score: 91.0,
      reason: 'Deep product management experience and agile methodologies alignment.'
    }
  });

  await prisma.recommendationScore.create({
    data: {
      candidateId: clarkProfile.id,
      jobId: googleInternJob.id,
      score: 55.0,
      reason: 'Background is content and journalism; lacks software development experience.'
    }
  });

  // 14. Search History
  console.log('Creating search histories...');
  await prisma.searchHistory.create({
    data: {
      candidateId: sarahProfile.id,
      query: 'AWS Cloud Architect',
      filters: { remote: true, minSalary: 150000 }
    }
  });

  await prisma.searchHistory.create({
    data: {
      candidateId: bruceProfile.id,
      query: 'Rust Systems Security',
      filters: { location: 'Remote' }
    }
  });

  await prisma.searchHistory.create({
    data: {
      candidateId: dianaProfile.id,
      query: 'Principal Product Manager',
      filters: { experienceMin: 5 }
    }
  });

  // 15. Behavioral Patterns
  console.log('Creating behavioral patterns...');
  await prisma.behavioralPattern.create({
    data: {
      candidateId: sarahProfile.id,
      patternType: 'Applies to Remote Only',
      confidence: 0.95
    }
  });

  await prisma.behavioralPattern.create({
    data: {
      candidateId: bruceProfile.id,
      patternType: 'High Salary Threshold Filter',
      confidence: 0.88
    }
  });

  await prisma.behavioralPattern.create({
    data: {
      candidateId: dianaProfile.id,
      patternType: 'Applies within 24 Hours of Posting',
      confidence: 0.91
    }
  });

  // 16. Audit Logs
  console.log('Creating audit logs...');
  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      action: 'TENANT_REVIEW',
      details: 'Admin reviewed and approved TechCorp Solutions tenant.'
    }
  });
  await prisma.auditLog.create({
    data: {
      userId: employerUser.id,
      action: 'JOB_POSTED',
      details: 'Employer posted job listing: "Senior TypeScript Developer"'
    }
  });
  await prisma.auditLog.create({
    data: {
      userId: candidateUser.id,
      action: 'RESUME_UPLOADED',
      details: 'Candidate uploaded resume.pdf. Parse score: 84'
    }
  });
  await prisma.auditLog.create({
    data: {
      userId: employerUser3.id,
      action: 'JOB_POSTED',
      details: 'Employer posted job listing: "Senior Cloud Architect"'
    }
  });
  await prisma.auditLog.create({
    data: {
      userId: candidateUser2.id,
      action: 'APPLICATION_SUBMITTED',
      details: 'Candidate Sarah Connor applied to Netflix: "Senior Cloud Architect"'
    }
  });

  console.log('Database successfully seeded with realistic dummy data!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
