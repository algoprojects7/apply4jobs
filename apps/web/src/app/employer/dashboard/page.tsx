"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function EmployerDashboard() {
  const [viewMode, setViewMode] = useState<'dashboard' | 'posting'>('dashboard');

  const [selectedJob, setSelectedJob] = useState<string>('');
  const [activeJobs, setActiveJobs] = useState<any[]>([]);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState<string>('Employer');

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [employmentType, setEmploymentType] = useState('Full-time');
  const [remoteType, setRemoteType] = useState('Remote');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [experienceMin, setExperienceMin] = useState('');
  const [experienceMax, setExperienceMax] = useState('');
  const [vacancyCount, setVacancyCount] = useState('1');
  const [description, setDescription] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');

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

  const currentCandidates = applicants
    .filter(app => app.jobId === selectedJob)
    .map(app => ({
      name: app.fullName,
      match: app.matchScore,
      experience: '4 yrs',
      skills: ['TypeScript', 'Node.js', 'React', 'Prisma']
    }));

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const skillsArray = skillsRequired.split(',').map(s => s.trim()).filter(s => s.length > 0);
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          location: newLocation || 'Remote',
          companyName: companyName,
          employmentType,
          remoteType,
          salaryMin: salaryMin || null,
          salaryMax: salaryMax || null,
          experienceMin: experienceMin || null,
          experienceMax: experienceMax || null,
          vacancyCount: vacancyCount || '1',
          description: description || '',
          skillsRequired: skillsArray.length > 0 ? skillsArray : ['TypeScript', 'React', 'Node.js']
        })
      });
      const data = await res.json();
      if (data.status === 'success') {
        loadDashboardData();
        setViewMode('dashboard');
        // Reset form
        setNewTitle('');
        setNewLocation('');
        setEmploymentType('Full-time');
        setRemoteType('Remote');
        setSalaryMin('');
        setSalaryMax('');
        setExperienceMin('');
        setExperienceMax('');
        setVacancyCount('1');
        setDescription('');
        setSkillsRequired('');
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
            
            {/* Basic Info Section */}
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px' }}>
              <h3 style={{ margin: '0 0 15px', fontSize: '15px', color: '#e2e8f0', fontWeight: 600 }}>Basic Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Job Title *</label>
                  <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Senior Frontend Engineer" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: '#02040a', color: 'white', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Employment Type</label>
                  <select value={employmentType} onChange={e => setEmploymentType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: '#02040a', color: 'white', fontSize: '13px', boxSizing: 'border-box' }}>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Work Model</label>
                  <select value={remoteType} onChange={e => setRemoteType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: '#02040a', color: 'white', fontSize: '13px', boxSizing: 'border-box' }}>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">On-site</option>
                  </select>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Location</label>
                  <input type="text" value={newLocation} onChange={e => setNewLocation(e.target.value)} placeholder="e.g. San Francisco, CA or Worldwide" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: '#02040a', color: 'white', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>
              </div>
            </div>

            {/* Compensation & Requirements */}
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px' }}>
              <h3 style={{ margin: '0 0 15px', fontSize: '15px', color: '#e2e8f0', fontWeight: 600 }}>Compensation & Requirements</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Min Salary (USD)</label>
                  <input type="number" value={salaryMin} onChange={e => setSalaryMin(e.target.value)} placeholder="e.g. 100000" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: '#02040a', color: 'white', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Max Salary (USD)</label>
                  <input type="number" value={salaryMax} onChange={e => setSalaryMax(e.target.value)} placeholder="e.g. 150000" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: '#02040a', color: 'white', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Min Experience (Years)</label>
                  <input type="number" value={experienceMin} onChange={e => setExperienceMin(e.target.value)} placeholder="e.g. 3" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: '#02040a', color: 'white', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Max Experience (Years)</label>
                  <input type="number" value={experienceMax} onChange={e => setExperienceMax(e.target.value)} placeholder="e.g. 7" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: '#02040a', color: 'white', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Number of Vacancies</label>
                  <input type="number" value={vacancyCount} onChange={e => setVacancyCount(e.target.value)} placeholder="1" min="1" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: '#02040a', color: 'white', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>
              </div>
            </div>

            {/* Details */}
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px' }}>
              <h3 style={{ margin: '0 0 15px', fontSize: '15px', color: '#e2e8f0', fontWeight: 600 }}>Job Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Required Skills (comma separated)</label>
                  <input type="text" value={skillsRequired} onChange={e => setSkillsRequired(e.target.value)} placeholder="e.g. React, Node.js, TypeScript, PostgreSQL" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: '#02040a', color: 'white', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Job Description</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the responsibilities, expectations, and perks..." rows={8} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', background: '#02040a', color: 'white', fontSize: '13px', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }}></textarea>
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
