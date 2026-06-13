# Low-Level Design (LLD) Document
## Apply4Jobs Platform

---

## 1. Class & Module Interfaces (NestJS Nest Modules)

The NestJS backend `/apps/api` contains four primary controllers and services supporting database integration via Prisma.

### 1.1 Authentication Module (`AuthModule`)
- **`AuthController`**:
  - `register(dto: RegisterDto): Promise<TokenResponse>`
  - `login(dto: LoginDto): Promise<TokenResponse>`
  - `verifyEmail(token: string): Promise<StatusResponse>`
  - `mfaSetup(userId: string): Promise<MfaSetupResponse>`
- **`AuthService`**:
  - `generateTokens(user: User): Promise<TokenResponse>`
  - `validateUser(email: string, pass: string): Promise<User>`
  - `processOAuthToken(provider: string, token: string): Promise<User>`

### 1.2 Jobs Module (`JobsModule`)
- **`JobsController`**:
  - `createJob(dto: CreateJobDto, tenantId: string): Promise<Job>`
  - `updateJob(id: string, dto: UpdateJobDto, tenantId: string): Promise<Job>`
  - `searchJobs(query: SearchQueryDto): Promise<PaginatedJobs>`
- **`JobsService`**:
  - `saveToDb(job: Job): Promise<Job>`
  - `syncToOpenSearch(job: Job): Promise<void>`
  - `findCachedJob(id: string): Promise<Job>`

### 1.3 AI Services Module (`AIModule`)
- **`AIController`**:
  - `analyzeResume(file: Express.Multer.File): Promise<ResumeAnalysisResult>`
  - `recommendJobs(candidateId: string): Promise<JobRecommendationList>`
  - `analyzeSkillGap(candidateId: string, jobId: string): Promise<SkillGapResult>`
- **`AIService`**:
  - `generateEmbeddings(text: string): Promise<number[]>`
  - `parseResumePdf(buffer: Buffer): Promise<string>`
  - `evaluateMatchScore(candidateProfile: Profile, jobRequirements: Job): Promise<MatchScoreResult>`

---

## 2. API Contract Specifications

### 2.1 Resume Parsing Endpoint (`POST /ai/resume-analysis`)
- **Headers**: `Content-Type: multipart/form-data`
- **Request Body**:
  - `file`: Resume file (PDF or DOCX, Max 10MB)
- **Response Format (`200 OK`)**:
  ```json
  {
    "atsScore": 82,
    "qualityScore": 88,
    "extractedSkills": ["TypeScript", "NestJS", "PostgreSQL", "Docker"],
    "experienceYears": 4,
    "improvements": [
      {
        "category": "Skills",
        "description": "Add evidence of cloud deployments (e.g. AWS or Azure)."
      }
    ],
    "suggestedRoles": ["Senior Full-Stack Engineer", "Backend Developer"]
  }
  ```

### 2.2 Skill Gap Analysis Endpoint (`POST /ai/skill-gap`)
- **Request Body**:
  ```json
  {
    "candidateId": "cand-0982-uuid",
    "jobId": "job-4412-uuid"
  }
  ```
- **Response Format (`200 OK`)**:
  ```json
  {
    "matchPercentage": 75,
    "missingSkills": ["AWS Bedrock", "OpenSearch"],
    "learningRoadmap": [
      {
        "step": 1,
        "skill": "AWS Bedrock",
        "action": "Complete the 'Building GenAI Apps on AWS' training guide.",
        "estimatedDays": 14
      }
    ],
    "suggestedCertifications": ["AWS Certified Machine Learning - Specialty"]
  }
  ```

---

## 3. UI App State Store (Next.js - Zustand Client Store)

The candidate workspace uses a Zustand store to handle resume state and job lists locally.
```typescript
interface CandidateStore {
  resumeUrl: string | null;
  atsScore: number | null;
  skills: string[];
  recommendedJobs: Job[];
  loading: boolean;
  setResumeData: (url: string, score: number, skills: string[]) => void;
  fetchRecommendations: (candidateId: string) => Promise<void>;
}
```
Similarly, the recruiter workspace maintains candidates pipelines in an employer store.
```typescript
interface EmployerStore {
  activeJobs: Job[];
  applicants: Record<string, Candidate[]>; // Keyed by Job ID
  loading: boolean;
  updateApplicationStatus: (applicationId: string, status: string) => Promise<void>;
}
```
All state transitions are synced to Postgres using React Query hooks for automated retry and caching support.
