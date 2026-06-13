# Software Requirements Specification (SRS)
## Project: Apply4Jobs – Intelligent AI-Powered Job Marketplace Platform

---

## 1. Introduction
### 1.1 Purpose
This document specifies the software requirements for Apply4Jobs, a multi-tenant SaaS, AI-driven job marketplace platform. Apply4Jobs matches candidate profiles to recruiter job openings using semantic vectors, performs real-time resume parsing and ATS grading, provides personalized skill gap reviews, and suggests next-step career paths.

### 1.2 Scope
The system comprises:
- Candidate portal for profile creation, resume uploading, search, and job application.
- Employer/Recruiter portal for company branding, team collaboration, job configuration, candidate ranking, and applicant pipeline management.
- Super Admin console for moderation, subscription tiers, SaaS tenant monitoring, and overall system metrics.
- AI engine managing embedding generation, similarity search, resume evaluation, and career growth roadmap suggestions.
- Real-time notification services across Email, SMS, WhatsApp, and Web Push channels.

---

## 2. System Overview & User Roles
The platform defines 7 distinct roles:
1. **Super Admin**: Manages multi-tenant configuration, global settings, platform-level subscriptions, system audit logs, and fraud metrics.
2. **Tenant Admin**: Manages a company's registration, billing plan, and custom branding profiles.
3. **Recruiter**: Post jobs, views candidate matches, schedules interviews, and updates candidate status.
4. **Employer**: Main tenant owner, configures company parameters, reviews analytics, and controls recruiter access.
5. **Candidate**: Uploads resumes, fills profile metrics, performs semantic/filtered searches, tracks applications, and reviews AI career advice.
6. **Moderator**: Curates job listings, reviews reported jobs/profiles, and controls platform quality.
7. **Support Executive**: Handles customer issues, views basic audit logs, and manages tickets.

---

## 3. Detailed Functional Modules

### Module 1: Authentication & User Management
- **Local Login & Multi-Factor Auth (MFA)**: Secure JWT session issuance, refresh flow, and TOTP/SMS MFA.
- **Social OAuth**: Integrated support for Google Login and LinkedIn Login.
- **Verification flows**: E-mail validation triggers and phone verification via OTP SMS.
- **Role-Based Access Control (RBAC)**: Fine-grained permissions matching roles to resources.

### Module 2: Employer & Tenant Management
- **Multi-Tenant Isolation**: Database-level tenant queries ensuring data safety.
- **Branding & Profile**: Custom logos, themes, video introductions, and office locations.
- **Team Management**: Recruiter dashboard where admins invite and manage recruiters.
- **Subscription Billing**: Integration with stripe/payment packages matching active jobs limits.

### Module 3: Job Management
- **Workflow**: `Draft` → `Review` (Moderator approval check) → `Published` → `Closed` → `Archived`.
- **Attributes**: Job title, department, employment/remote status, experience, salaries, skills list, location.
- **Features**: Single-click clone job, automated expiration schedulers, and featured/urgent flags.

### Module 4: Advanced Job Search Engine
- **Text & Structured Filtering**: Combine experience, location, remote options, and salary ranges.
- **Semantic Search**: Text embedding translations querying similarity vectors.
- **Auto-Suggestions**: Autocomplete queries based on search trending topics and index.

### Module 5: Candidate Profile Management
- **Builder**: Structured sections for work history, education, portfolio links, and certifications.
- **Profile Score**: Calculated dynamically from 0% (incomplete) to 100% (fully complete).

### Module 6: AI Resume Analyzer
- **ATS Rating**: Grades format, keyword density, and match percentages for target industries.
- **Gap Identification**: Identifies missing skills relative to the target role.

### Module 7: AI Job Recommendation Engine
- **Behavioral Pipeline**: Captures candidate bookmarks, search histories, and applied listings to re-rank recommendations daily.

### Module 8: AI Candidate Recommendation
- **Recruiter Matches**: Ranks applicants based on resume similarity, skills, and past performance.

### Module 9: Application Management
- **Pipeline Workflow**: `Applied` → `Shortlisted` → `Assessment` → `Interview` → `Selected` → `Offered` → `Hired` / `Rejected`.
- **Bulk Actions**: Move multiple applicants simultaneously through steps.

### Module 10: Interview Management
- **Integration**: Supports calendar event creation, Zoom, and Google Meet integration.

### Module 11: Skill Gap Analysis & Module 12: Career Coach
- **Learning Roadmap**: Generates markdown pathways outlining courses and skills to reach target roles.
- **Prediction**: Offers salary expectations based on regional averages and role definitions.

### Module 13: Notification Center
- **Multiplex Channels**: Webhooks sending updates over Email, SMS, WhatsApp, and in-app socket push.

### Module 14: Admin Panel
- **Dashboard**: Global analytics, SaaS performance stats, and moderation metrics.

---

## 4. Non-Functional Requirements

### 4.1 Performance & Latency
- Job searches must complete in `< 100ms`.
- High caching hits (over 85%) for landing/trending pages.

### 4.2 Security
- OWASP Top 10 mitigation (XSS, CSRF, Injection).
- GDPR & DPDPA compliant storage: candidate-initiated profile deletion (Right to be Forgotten).

### 4.3 Scalability & High Availability
- Target 10 Million Users with auto-scaling infrastructure.
- 99.99% system availability target.
