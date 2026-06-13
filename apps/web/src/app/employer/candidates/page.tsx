"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function EmployerCandidates() {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState('Employer');

  React.useEffect(() => {
    fetch('/api/employer/dashboard')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') {
          setApplicants(res.data.applicants);
          setCompanyName(res.data.companyName);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching candidates:', err);
        setLoading(false);
      });
  }, []);

  return (
    <DashboardLayout
      role="employer"
      activeItem="Candidate Matches"
      headerTitle="Candidate Matches"
      headerSubtitle="Review automated talent recommendations and application statuses."
      planOrNodeName="Enterprise AI"
    >
      <div className="glass-panel" style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
        <h3 className="brand-title" style={{ margin: '0 0 20px', fontSize: '18px', textTransform: 'none' }}>AI Recommended Talent</h3>
        
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#57606a' }}>Querying candidate matches...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {applicants.map(app => (
              <div key={app.id} className="glass-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>{app.fullName}</h4>
                    <span style={{ fontSize: '11px', background: 'rgba(26, 127, 55, 0.15)', color: '#1a7f37', padding: '2px 8px', borderRadius: '20px', fontWeight: 600 }}>
                      {app.matchScore}% Match
                    </span>
                  </div>
                  <p style={{ margin: '6px 0 0', color: '#57606a', fontSize: '13px' }}>
                    Applied For: <strong style={{ color: '#1f2328' }}>{app.jobTitle}</strong> &bull; Status: <span style={{ color: '#0969da', fontWeight: 600 }}>{app.status}</span>
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="glow-btn" style={{ padding: '8px 16px', fontSize: '12px' }}>Accept Application</button>
                  <button style={{ padding: '8px 16px', fontSize: '12px', background: 'transparent', border: '1px solid #d0d7de', color: '#1f2328', borderRadius: '12px', cursor: 'pointer' }}>View Resume</button>
                </div>
              </div>
            ))}
            {applicants.length === 0 && (
              <div style={{ padding: '30px', textAlign: 'center', color: '#656d76' }}>No matches found yet. Candidates will be listed once matching is completed.</div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
