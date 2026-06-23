"use client";

import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Info } from 'lucide-react';

export default function EmployerDashboard() {
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [activeJobs, setActiveJobs] = useState<any[]>([]);
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState<string>('Employer');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const msgRef = useRef<HTMLDivElement>(null);

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
