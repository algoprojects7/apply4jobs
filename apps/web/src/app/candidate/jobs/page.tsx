"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function CandidateJobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') {
          setJobs(res.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching jobs:', err);
        setLoading(false);
      });
  }, []);

  const handleApply = (title: string) => {
    alert(`Application successfully submitted for: ${title}!`);
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.tags.some((t: string) => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout
      role="candidate"
      activeItem="Find Jobs"
      headerTitle="Find Jobs"
      headerSubtitle="Explore AI-matched opportunities based on your skills profile."
      planOrNodeName="Pro Match"
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Search Bar Widget */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          border: '1px solid #d0d7de',
          gap: '8px',
          marginBottom: '40px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1.2, paddingLeft: '12px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#57606a" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="text" 
              placeholder="Filter by title, company or skill tag..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', border: 'none', outline: 'none', color: '#1f2328', fontSize: '14px', background: 'transparent' }}
            />
          </div>

          <div style={{ width: '1px', height: '28px', backgroundColor: '#d0d7de' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 0.8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#57606a" strokeWidth="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <input 
              type="text" 
              placeholder="Any Location / Remote" 
              value={locationTerm}
              onChange={e => setLocationTerm(e.target.value)}
              style={{ width: '100%', border: 'none', outline: 'none', color: '#1f2328', fontSize: '14px', background: 'transparent' }}
            />
          </div>

          <button className="glow-btn" style={{ padding: '12px 24px', fontSize: '14px' }}>Search</button>
        </div>

        {/* Jobs Listing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#0969da', fontSize: '15px', fontWeight: 600 }}>
              Searching database matching engine...
            </div>
          ) : (
            filteredJobs.map(job => (
              <div key={job.id} className="glass-panel" style={{
                padding: '24px 30px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px',
                background: '#ffffff',
                border: '1px solid #d0d7de',
                borderRadius: '16px'
              }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2328' }}>{job.title}</h3>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(26, 127, 55, 0.15)',
                      color: '#1a7f37'
                    }}>
                      {job.match || 90}% Match Rating
                    </span>
                  </div>
                  
                  <p style={{ margin: '6px 0 12px', color: '#57606a', fontSize: '13.5px' }}>
                    <strong>{job.company}</strong> &bull; {job.location} &bull; {job.salary}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {job.tags.map((tag: string, idx: number) => (
                      <span key={idx} style={{
                        padding: '4px 10px',
                        background: '#f6f8fa',
                        border: '1px solid #d0d7de',
                        borderRadius: '20px',
                        fontSize: '11.5px',
                        color: '#24292f'
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <button 
                    onClick={() => handleApply(job.title)}
                    className="glow-btn" 
                    style={{ padding: '10px 20px', fontSize: '13px' }}
                  >
                    Quick Apply
                  </button>
                </div>

              </div>
            ))
          )}
          {!loading && filteredJobs.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#57606a' }}>No jobs match your search queries.</div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
