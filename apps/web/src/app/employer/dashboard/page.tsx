"use client";

import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { JobDescriptionEditor } from '@/components/editors/JobDescriptionEditor';
import { Info } from 'lucide-react';

export default function EmployerDashboard() {
  const [viewMode, setViewMode] = useState<'dashboard' | 'posting'>('dashboard');

  const [selectedJob, setSelectedJob] = useState<string>('');
  const [activeJobs, setActiveJobs] = useState<any[]>([]);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState<string>('Employer');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const msgRef = useRef<HTMLDivElement>(null);

  const demoHtml = `
    <h1>Senior Software Engineer</h1>
    <p><strong>Company:</strong> ABC Technologies Pvt. Ltd.<br>
    <strong>Location:</strong> Guwahati, Assam, India<br>
    <strong>Employment Type:</strong> Full-Time<br>
    <strong>Experience:</strong> 3–5 Years<br>
    <strong>Salary:</strong> ₹8,00,000 – ₹12,00,000 per annum</p>
    <hr>
    <h2>About the Role</h2>
    <p>We are seeking a talented and motivated Senior Software Engineer to join our growing technology team. The ideal candidate will be responsible for designing, developing, and maintaining scalable web applications while collaborating with cross-functional teams to deliver high-quality software solutions.</p>
    <hr>
    <h2>Key Responsibilities</h2>
    <ul>
    <li>Design, develop, and maintain web applications.</li>
    <li>Build scalable REST APIs and backend services.</li>
    <li>Collaborate with product managers, designers, and developers.</li>
    <li>Optimize application performance and database queries.</li>
    <li>Write clean, maintainable, and well-documented code.</li>
    <li>Participate in code reviews and technical discussions.</li>
    <li>Troubleshoot and resolve production issues.</li>
    </ul>
    <hr>
    <h2>Required Skills & Qualifications</h2>
    <ul>
    <li>Bachelor's degree in Computer Science, Engineering, or related field.</li>
    <li>Strong proficiency in JavaScript and TypeScript.</li>
    <li>Experience with Next.js and React.</li>
    <li>Experience with Node.js or NestJS.</li>
    <li>Knowledge of PostgreSQL or other relational databases.</li>
    <li>Understanding of RESTful API development.</li>
    <li>Familiarity with Git version control.</li>
    </ul>
    <hr>
    <h2>Preferred Skills</h2>
    <ul>
    <li>Experience with Redis and caching strategies.</li>
    <li>Knowledge of Docker and containerized deployments.</li>
    <li>Familiarity with cloud platforms such as AWS, Azure, or Google Cloud.</li>
    <li>Understanding of CI/CD pipelines.</li>
    <li>Experience working in Agile environments.</li>
    </ul>
    <hr>
    <h2>Experience Requirements</h2>
    <ul>
    <li>Minimum 3 years of professional software development experience.</li>
    <li>Experience building enterprise-grade applications is preferred.</li>
    </ul>
    <hr>
    <h2>Benefits</h2>
    <ul>
    <li>Competitive salary package.</li>
    <li>Performance-based incentives.</li>
    <li>Health insurance coverage.</li>
    <li>Flexible working hours.</li>
    <li>Hybrid/Remote work opportunities.</li>
    <li>Professional training and certification support.</li>
    <li>Career growth opportunities.</li>
    </ul>
    <hr>
    <h2>Workplace Type</h2>
    <ul>
    <li>Hybrid</li>
    <li>Remote</li>
    <li>On-site</li>
    </ul>
    <hr>
    <h2>Application Process</h2>
    <ol>
    <li>Application Submission</li>
    <li>Resume Screening</li>
    <li>Technical Assessment</li>
    <li>Technical Interview</li>
    <li>HR Discussion</li>
    <li>Offer Release</li>
    </ol>
    <hr>
    <h2>Equal Opportunity Employer</h2>
    <p>We are committed to creating an inclusive workplace. We welcome applications from qualified candidates regardless of gender, race, religion, disability, age, or background.</p>
    <hr>
    <h3>Apply Now</h3>
    <p>Interested candidates are encouraged to submit their application along with an updated resume. Shortlisted candidates will be contacted for the next stage of the selection process.</p>
  `;

  const [description, setDescription] = useState(demoHtml);

  const loadDashboardData = () => {
    setLoading(true);
    fetch('/api/employer/dashboard')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') {
          setActiveJobs(res.data.activeJobs);
          setApplicants(res.data.applicants);
          setCompanyName(res.data.companyName);
          if (res.data.activeJobs.length > 0) {
            setSelectedJob(res.data.activeJobs[0].id);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading employer dashboard data:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    if (successMsg && msgRef.current) {
      msgRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [successMsg]);

  const currentCandidates = applicants
    .filter(app => app.jobId === selectedJob)
    .map(app => ({
      name: app.fullName,
      match: app.matchScore,
      experience: '4 yrs',
      skills: ['TypeScript', 'Node.js', 'React', 'Prisma']
    }));

  const extractTitle = (html: string) => {
    if (!html) return 'Untitled Job Position';
    const h1Match = html.match(/<h1>(.*?)<\/h1>/);
    if (h1Match && h1Match[1]) {
      return h1Match[1].replace(/<[^>]+>/g, '').trim() || 'Untitled Job Position';
    }
    const h2Match = html.match(/<h2>(.*?)<\/h2>/);
    if (h2Match && h2Match[1]) {
      return h2Match[1].replace(/<[^>]+>/g, '').trim() || 'Untitled Job Position';
    }
    const textContent = html.replace(/<[^>]+>/g, '\n').split('\n').map(s => s.trim()).filter(s => s.length > 0);
    return textContent.length > 0 ? textContent[0] : 'Untitled Job Position';
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();

    const dynamicTitle = extractTitle(description);

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: dynamicTitle,
          location: 'Guwahati, Assam, India',
          companyName: companyName,
          employmentType: 'Full-time',
          remoteType: 'Hybrid',
          salaryMin: 800000,
          salaryMax: 1200000,
          experienceMin: 3,
          experienceMax: 5,
          vacancyCount: 1,
          description: description || '',
          skillsRequired: ['TypeScript', 'React', 'Node.js']
        })
      });
      const data = await res.json();
      if (data.status === 'success') {
        loadDashboardData();
        setViewMode('dashboard');
        setDescription(demoHtml);
        setSuccessMsg('Job posting has been done successfully');
        setTimeout(() => setSuccessMsg(''), 5000);
      }
    } catch (err) {
      console.error('Error posting new job:', err);
    }
  };

  if (viewMode === 'posting') {
    return (
      <DashboardLayout
        role="employer"
        activeItem="Dashboard"
        headerTitle="Post a New Job"
        headerSubtitle={`${companyName} Workspace`}
        planOrNodeName="Enterprise AI"
      >
        <div className="glass-panel" style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <div>
              <h2 className="brand-title" style={{ margin: '0 0 5px', fontSize: '22px', textTransform: 'none' }}>Create Job Listing</h2>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px' }}>Fill out the details below to publish a new job opening.</p>
            </div>
            <button 
              onClick={() => setViewMode('dashboard')}
              style={{ padding: '8px 16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}
            >
              Back to Dashboard
            </button>
          </div>

          <form onSubmit={handleCreateJob} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px' }}>
              <h3 style={{ margin: '0 0 15px', fontSize: '15px', color: '#e2e8f0', fontWeight: 600 }}>Job Description Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <JobDescriptionEditor value={description} onChange={setDescription} />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button type="button" onClick={() => setViewMode('dashboard')} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>
                Cancel
              </button>
              <button type="submit" className="glow-btn" style={{ padding: '10px 24px', fontSize: '13px', fontWeight: 600, border: 'none' }}>
                Publish Job Listing
              </button>
            </div>
          </form>
        </div>
      </DashboardLayout>
    );
  }

  // Regular Dashboard view
  return (
    <DashboardLayout
      role="employer"
      activeItem="Dashboard"
      headerTitle="Employer Workspace"
      headerSubtitle={`${companyName} (Tenant Hub)`}
      planOrNodeName="Enterprise AI"
    >
      {successMsg && (
        <div ref={msgRef} style={{ padding: '12px 16px', background: '#ecfdf5', color: '#065f46', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', border: '1px solid #a7f3d0' }}>
          <Info size={18} />
          <span style={{ fontSize: '13.5px', fontWeight: 500 }}>{successMsg}</span>
        </div>
      )}
      <div className="responsive-grid-1-2">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          <div className="glass-panel" style={{ padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="brand-title" style={{ margin: 0, fontSize: '18px', textTransform: 'none' }}>Active Job Listings</h3>
              <button 
                onClick={() => setViewMode('posting')}
                className="glow-btn" 
                style={{ padding: '6px 12px', fontSize: '12px' }}
              >
                + Post Job
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activeJobs.map(job => (
                <div 
                  key={job.id} 
                  onClick={() => setSelectedJob(job.id)}
                  className="glass-card" 
                  style={{
                    padding: '16px', cursor: 'pointer',
                    borderColor: selectedJob === job.id ? '#6d28d9' : 'rgba(255,255,255,0.04)',
                    background: selectedJob === job.id ? 'rgba(255,255,255,0.03)' : ''
                  }}
                >
                  <h4 style={{ margin: '0 0 5px', fontSize: '14.5px', fontWeight: 600 }}>{job.title}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8' }}>
                    <span>{job.location}</span>
                    <span>{job.applicants} Applicants</span>
                  </div>
                </div>
              ))}
              {!loading && activeJobs.length === 0 && (
                <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>No active job listings found.</div>
              )}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '25px' }}>
            <h3 className="brand-title" style={{ margin: '0 0 20px', fontSize: '18px', textTransform: 'none' }}>Hiring Funnel Analytics</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span>Applied</span>
                <span style={{ fontWeight: 600 }}>100% (16 Candidates)</span>
              </div>
              <div className="volumetric-bar" style={{ width: '100%', height: '8px' }}>
                <div style={{ width: '100%', height: '100%', background: '#7c3aed' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '10px' }}>
                <span>Shortlisted</span>
                <span style={{ fontWeight: 600 }}>50% (8 Candidates)</span>
              </div>
              <div className="volumetric-bar" style={{ width: '100%', height: '8px' }}>
                <div style={{ width: '50%', height: '100%', background: '#3b82f6' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '10px' }}>
                <span>Interviews scheduled</span>
                <span style={{ fontWeight: 600 }}>25% (4 Candidates)</span>
              </div>
              <div className="volumetric-bar" style={{ width: '100%', height: '8px' }}>
                <div style={{ width: '25%', height: '100%', background: '#ff007f' }} />
              </div>
            </div>
          </div>

        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          <div className="glass-panel" style={{ padding: '25px' }}>
            <h3 className="brand-title" style={{ margin: '0 0 10px', fontSize: '18px', textTransform: 'none' }}>AI Match Recommendations</h3>
            <p style={{ margin: '0 0 20px', fontSize: '12.5px', color: '#94a3b8', lineHeight: '1.5' }}>
              Apply4Jobs AI checks skills, education profiles, and experience algorithms to sort top matches.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {currentCandidates.map((cand, idx) => (
                <div key={idx} className="glass-card responsive-flex-card" style={{ padding: '20px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>{cand.name}</h4>
                      <span style={{ fontSize: '11px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '2px 8px', borderRadius: '20px', fontWeight: 600 }}>
                        {cand.match}% Match
                      </span>
                    </div>
                    <p style={{ margin: '5px 0 10px', color: '#94a3b8', fontSize: '12.5px' }}>Experience: {cand.experience}</p>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      {cand.skills.map((s, sIdx) => (
                        <span key={sIdx} style={{ padding: '2px 6px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', fontSize: '11px', color: '#cbd5e1' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button className="glow-btn" style={{ padding: '8px 16px', fontSize: '11px' }}>Schedule Interview</button>
                    <button style={{ padding: '7px 15px', fontSize: '11px', background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', color: 'white', borderRadius: '12px', cursor: 'pointer' }}>View Resume</button>
                  </div>
                </div>
              ))}
              {currentCandidates.length === 0 && (
                <div style={{ padding: '30px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>No active applicants yet. AI will suggest candidates once they apply.</div>
              )}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '25px' }}>
            <h3 className="brand-title" style={{ margin: '0 0 15px', fontSize: '18px', textTransform: 'none' }}>Upcoming Interviews</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="glass-card" style={{ padding: '15px', display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ padding: '8px', background: 'rgba(109, 40, 217, 0.1)', color: '#a78bfa', borderRadius: '10px', textAlign: 'center', width: '45px', border: '1px solid rgba(109, 40, 217, 0.2)' }}>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>15</div>
                  <div style={{ fontSize: '10px' }}>JUN</div>
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '13.5px', fontWeight: 600 }}>Alice Johnson</h4>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94a3b8' }}>10:30 AM &bull; Google Meet Integration</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
