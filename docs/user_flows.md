# User Flow Diagrams

This document contains step-by-step user interaction pipelines for both Candidates and Recruiters.

---

## 1. Candidate Interactive Journey

The diagram below maps the candidate's lifecycle from signing up to receiving a job offer.

```mermaid
graph TD
    Start([Candidate Signup / Registration]) --> OAuth{Choose Identity?}
    OAuth -->|Google/LinkedIn| VerifySocial[Fetch profile details]
    OAuth -->|Local Email| VerifyEmail[Trigger Verification E-mail]
    
    VerifySocial --> ProfileInit[Initialize profile]
    VerifyEmail -->|Click link| ProfileInit
    
    ProfileInit --> FillDetails[Complete work history / Education]
    FillDetails --> UploadResume[Upload PDF Resume]
    
    UploadResume --> AIParse[AI Parse & ATS Review Engine]
    AIParse --> ReviewScore{ATS Score >= 70?}
    
    ReviewScore -->|No| FixResume[Review suggestions & Re-upload]
    FixResume --> UploadResume
    
    ReviewScore -->|Yes| RecJobs[Render AI Job Recommendations]
    RecJobs --> FilterSearch[Search & Filter jobs]
    
    FilterSearch --> ApplyJob[Apply to Job]
    ApplyJob --> ScheduleInt[Schedule & sync interview calendar]
    ScheduleInt --> RecvOffer[Receive Offer Letter]
```

---

## 2. Employer & Recruiter Journey

The diagram below maps the employer's interaction flow from registering their company to hiring.

```mermaid
graph TD
    EmpStart([Employer Registration]) --> CompanySetup[Create Company Profile]
    CompanySetup --> Verification{Domain verified?}
    
    Verification -->|No| ModReview[Moderator manual audit]
    Verification -->|Yes| AccessGranted[SaaS Workspace Access]
    ModReview -->|Approved| AccessGranted
    
    AccessGranted --> InviteTeam[Invite Recruiters]
    AccessGranted --> ChooseSubscription[Choose Stripe Tier Plan]
    
    InviteTeam --> PostJob[Post Job Details]
    ChooseSubscription --> PostJob
    
    PostJob --> IndexSearch[Automatic indexing in OpenSearch]
    IndexSearch --> AutoMatch[System generates candidate recommendations]
    
    AutoMatch --> ScreenCandidates[Review list sorted by match percentage]
    ScreenCandidates --> MovePipeline[Move applicant: Shortlist -> Interview]
    MovePipeline --> Feedback[Submit interviewer reviews]
    Feedback --> Hire[Send hire proposal/offer]
```
