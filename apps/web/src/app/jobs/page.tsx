"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function JobsPage() {
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
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#02050e',
      color: '#ffffff',
      fontFamily: "'Nunito', sans-serif",
      background: 'radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.15) 0%, rgba(2, 5, 14, 1) 70%)',
      paddingBottom: '80px'
    }}>
      
      {/* Header */}
      <header style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '24px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <div style={{
            background: '#ffffff',
            padding: '4px 10px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '30px',
            boxSizing: 'border-box',
            boxShadow: '0 0 8px rgba(255,255,255,0.05)'
          }}>
            <img src="/logo.png" alt="Apply4Jobs" style={{ height: '18px', width: 'auto', objectFit: 'contain' }} />
          </div>
        </Link>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link href="/login" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>Sign In</Link>
          <Link href="/register" className="glow-btn" style={{ padding: '8px 16px', fontSize: '13px', textDecoration: 'none' }}>Sign Up</Link>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1000px', margin: '40px auto 0', padding: '0 20px' }}>
        
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '0 0 10px', letterSpacing: '-1px' }}>Explore AI-Matched Jobs</h1>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '15px' }}>Our matching algorithms rank openings based on your skills automatically.</p>
        </div>

        {/* Search Bar Widget */}
        <div className="hero-search-widget">
          <div className="search-field" style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1.2, paddingLeft: '12px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="text" 
              placeholder="Filter by title, company or skill tag..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', border: 'none', outline: 'none', color: '#1e293b', fontSize: '14px', background: 'transparent' }}
            />
          </div>

          <div className="search-divider" style={{ width: '1px', height: '28px', backgroundColor: '#e2e8f0' }} />

          <div className="search-field search-field-last" style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 0.8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <input 
              type="text" 
              placeholder="Any Location / Remote" 
              value={locationTerm}
              onChange={e => setLocationTerm(e.target.value)}
              style={{ width: '100%', border: 'none', outline: 'none', color: '#1e293b', fontSize: '14px', background: 'transparent' }}
            />
          </div>

          <button className="glow-btn" style={{ padding: '12px 24px', fontSize: '14px' }}>Search</button>
        </div>

        {/* Jobs Listing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#a78bfa', fontSize: '15px', fontWeight: 600 }}>
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
                transition: 'transform 0.2s',
                background: 'rgba(9, 14, 32, 0.75)'
              }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>{job.title}</h3>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '20px',
                      backgroundColor: job.match >= 85 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      color: job.match >= 85 ? '#10b981' : '#f59e0b'
                    }}>
                      {job.match}% Match Rating
                    </span>
                  </div>
                  
                  <p style={{ margin: '6px 0 12px', color: '#94a3b8', fontSize: '13.5px' }}>
                    <strong>{job.company}</strong> &bull; {job.location} &bull; {job.salary}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {job.tags.map((tag: string, idx: number) => (
                      <span key={idx} style={{
                        padding: '4px 10px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '20px',
                        fontSize: '11.5px',
                        color: '#cbd5e1'
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
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>No jobs match your search queries. Try checking spelling or details.</div>
          )}
        </div>

      </main>
    </div>
  );
}
