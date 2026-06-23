"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Fetch current user and database jobs on mount
  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => {
        if (res.status === 200) return res.json();
        return null;
      })
      .then(data => {
        if (data && data.status === 'authenticated') {
          setCurrentUser(data.user);
        }
      })
      .catch(err => console.error('Error fetching auth:', err));

    fetchJobs();
  }, []);

  const fetchJobs = (search = '', location = '') => {
    setLoading(true);
    const query = new URLSearchParams();
    if (search.trim()) query.set('search', search);
    if (location.trim()) query.set('location', location);

    fetch(`/api/jobs?${query.toString()}`)
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
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs(searchQuery, locationQuery);
    setTimeout(() => {
      document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleApplyJob = (jobId: string) => {
    if (currentUser && currentUser.role === 'candidate') {
      window.location.href = `/jobs/${jobId}/apply`;
    } else {
      window.location.href = `/login?redirect=${encodeURIComponent(`/jobs/${jobId}/apply`)}`;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#0f172a', overflowX: 'hidden', fontFamily: "'Nunito', sans-serif" }}>
      
      <Navbar />

      {/* SECTION 1: HERO (Light Mockup Style) */}
      <div style={{
        position: 'relative',
        background: 'radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.06) 0%, rgba(255, 255, 255, 1) 75%)',
        paddingBottom: '80px',
        paddingTop: '120px',
        overflow: 'hidden',
      }}>
        {/* Centered Brand & Heading Area */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '8px',
          padding: '0 20px',
          position: 'relative',
          zIndex: 5
        }}>
          {/* Logo Name in Italic Red */}
          <h2 style={{
            fontSize: '48px',
            fontWeight: 800,
            fontStyle: 'italic',
            fontFamily: 'Georgia, serif',
            color: '#e11d48',
            margin: 0,
            letterSpacing: '-1.5px'
          }}>
            Apply4Job
          </h2>
          
          {/* Main Heading */}
          <h1 style={{
            fontSize: '32px',
            fontWeight: 800,
            color: '#0f172a',
            margin: '8px 0 0',
            letterSpacing: '-1px'
          }}>
            Your next job starts here
          </h1>
          
          {/* Subheading description */}
          <p style={{
            color: '#475569',
            fontSize: '15px',
            margin: '4px 0 0',
            maxWidth: '560px',
            lineHeight: 1.5
          }}>
            Create an account or sign in to see your personalised job recommendations.
          </p>
        </div>

        {/* Floating Search Console widget */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '32px 0 20px',
          width: '100%',
          padding: '0 20px',
          boxSizing: 'border-box'
        }}>
          <form onSubmit={handleSearch} className="hero-search-widget" style={{
            background: '#ffffff',
            borderRadius: '100px',
            padding: '6px 6px 6px 18px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
            border: '1px solid #cbd5e1',
            gap: '8px',
            width: '100%',
            maxWidth: '780px',
            boxSizing: 'border-box'
          }}>
            {/* Field 1: Search */}
            <div className="search-field" style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1.2 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input 
                type="text" 
                placeholder="Job title, keywords, or company" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ width: '100%', border: 'none', outline: 'none', color: '#1e293b', fontSize: '14px', background: 'transparent' }}
              />
            </div>

            <div className="search-divider" style={{ width: '1px', height: '24px', backgroundColor: '#e2e8f0' }} />

            {/* Field 2: Location */}
            <div className="search-field search-field-last" style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 0.8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <input 
                type="text" 
                placeholder="Guwahati, Assam" 
                value={locationQuery}
                onChange={e => setLocationQuery(e.target.value)}
                style={{ width: '100%', border: 'none', outline: 'none', color: '#1e293b', fontSize: '14px', background: 'transparent' }}
              />
            </div>

            {/* Find Jobs Button */}
            <button type="submit" className="glow-btn" style={{
              background: '#0252cc',
              color: '#ffffff',
              border: 'none',
              borderRadius: '100px',
              padding: '10px 28px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              boxShadow: 'none',
              fontFamily: 'inherit'
            }}>
              Find jobs
            </button>
          </form>
        </div>

        {/* Center Get Started Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <Link href="/register" className="glow-btn" style={{
            background: '#0252cc',
            color: '#ffffff',
            borderRadius: '8px',
            padding: '12px 32px',
            fontSize: '15px',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(2, 82, 204, 0.25)'
          }}>
            Get Started &rarr;
          </Link>
        </div>

        {/* Centered Popular Searches Strip */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', width: '100%', padding: '0 20px', boxSizing: 'border-box' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: '#0a0f1d',
            borderRadius: '8px',
            padding: '10px 20px',
            flexWrap: 'wrap',
            maxWidth: '780px',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Popular Searches:</span>
            {['UI/UX Designer', 'Data Analyst', 'Full Stack Developer', 'Marketing', 'Product Manager'].map((tag, idx) => (
              <button 
                type="button"
                onClick={() => {
                  setSearchQuery(tag);
                  fetchJobs(tag, locationQuery);
                  setTimeout(() => {
                    document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                key={idx} 
                style={{
                  fontSize: '11px',
                  color: '#cbd5e1',
                  background: 'rgba(255, 255, 255, 0.08)',
                  padding: '4px 12px',
                  borderRadius: '100px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'all 0.2s',
                  fontWeight: 500
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Job Cards Grid */}
        <div id="jobs-section" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          padding: '0 20px',
          boxSizing: 'border-box'
        }}>
          {loading ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#0252cc', fontSize: '16px', fontWeight: 700 }}>
              Searching database matching engine...
            </div>
          ) : jobs.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#64748b', fontSize: '15px' }}>
              No active jobs found matching your criteria.{' '}
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setLocationQuery('');
                  fetchJobs('', '');
                }}
                style={{ background: 'transparent', border: 'none', color: '#0252cc', textDecoration: 'underline', fontWeight: 600, cursor: 'pointer', fontSize: '15px' }}
              >
                Show all jobs
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              width: '100%'
            }}>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    border: '1.5px solid #e2e8f0',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.01)',
                    position: 'relative',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.04)';
                    e.currentTarget.style.borderColor = '#0252cc';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.01)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  {/* Bookmark Button */}
                  <button 
                    aria-label="Bookmark job"
                    style={{
                      position: 'absolute',
                      top: '24px',
                      right: '24px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#64748b',
                      padding: 0
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                  </button>

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {/* Easily Apply Badge */}
                    <div style={{
                      alignSelf: 'flex-start',
                      background: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontSize: '11px',
                      color: '#0252cc',
                      fontWeight: 700
                    }}>
                      Easily apply
                    </div>
                    {/* Match Rating */}
                    <div style={{
                      alignSelf: 'flex-start',
                      background: job.match >= 85 ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                      border: job.match >= 85 ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(245, 158, 11, 0.2)',
                      borderRadius: '4px',
                      padding: '2px 8px',
                      fontSize: '11px',
                      color: job.match >= 85 ? '#10b981' : '#f59e0b',
                      fontWeight: 700
                    }}>
                      {job.match || 80}% Match
                    </div>
                  </div>

                  {/* Job Title */}
                  <h3
                    onClick={() => handleApplyJob(job.id)}
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#0f172a',
                      textDecoration: 'none',
                      margin: '4px 0 0',
                      lineHeight: '1.4',
                      cursor: 'pointer',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#0252cc'}
                    onMouseLeave={e => e.currentTarget.style.color = '#0f172a'}
                  >
                    {job.title}
                  </h3>

                  {/* Company & Location Info */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>
                      {job.company}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      {job.location}
                    </div>
                  </div>

                  {/* Tags */}
                  {job.tags && job.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                      {job.tags.slice(0, 3).map((tag: string, tIdx: number) => (
                        <span key={tIdx} style={{
                          padding: '3px 8px',
                          background: '#f1f5f9',
                          border: '1px solid #e2e8f0',
                          borderRadius: '20px',
                          fontSize: '11px',
                          color: '#475569'
                        }}>{tag}</span>
                      ))}
                    </div>
                  )}

                  {/* Salary Pill */}
                  <div style={{
                    alignSelf: 'flex-start',
                    background: '#f1f5f9',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    fontSize: '11px',
                    color: '#475569',
                    fontWeight: 700,
                    marginTop: 'auto'
                  }}>
                    {job.salary}
                  </div>

                  {/* Easy Apply Button */}
                  <button
                    onClick={() => handleApplyJob(job.id)}
                    className="glow-btn"
                    style={{
                      background: '#0252cc',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 16px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'center',
                      width: '100%',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit',
                      marginTop: '6px'
                    }}
                  >
                    Easy Apply
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* SECTION 2 & 3: CORE FEATURES FLOATING CARD & SHOWCASE PORTALS PREVIEW (Light Grey Background) */}
      <div style={{
        backgroundColor: '#f8fafc',
        padding: '0 20px 80px',
        position: 'relative',
        zIndex: 5
      }}>
        {/* Floating Feature Card Container */}
        <div className="floating-features-card">
          {/* Feature 1 */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '10px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%', background: '#f5f3ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6d28d9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
                <circle cx="12" cy="12" r="5"/>
                <circle cx="12" cy="12" r="1.5" fill="#6d28d9"/>
              </svg>
            </div>
            <div>
              <h4 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 700 }}>AI-Powered Matching</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
                Get personalized job recommendations based on your skills, goals & behavior.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '10px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%', background: '#eff6ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div>
              <h4 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 700 }}>AI Resume Review</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
                Get instant feedback and improve your resume to stand out.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '10px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%', background: '#f5f3ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6d28d9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
              </svg>
            </div>
            <div>
              <h4 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 700 }}>Smart Career Coach</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
                AI tools to guide your career path and upskill for future opportunities.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '10px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%', background: '#f5f3ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6d28d9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </div>
            <div>
              <h4 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 700 }}>Apply in One Click</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
                Apply to jobs quickly and track your applications in real-time.
              </p>
            </div>
          </div>
        </div>

        {/* Showcase Portals Section */}
        <div className="responsive-showcase-grid" style={{
          maxWidth: '1200px',
          margin: '80px auto 0',
          color: '#0f172a'
        }}>
          {/* Stats & App Download info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 800, lineHeight: '1.25', margin: 0, letterSpacing: '-1.2px', color: '#1e293b' }}>
              <span style={{ background: 'linear-gradient(90deg, #6d28d9, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Next Gen</span> Platform for<br />
              <span style={{ background: 'linear-gradient(90deg, #6d28d9, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Next Gen</span> Talent
            </h2>
            
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6', margin: 0, maxWidth: '480px' }}>
              We combine AI technology with human opportunities to help you achieve your dream career.
            </p>

            {/* Row stats */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              borderTop: '1px solid #e2e8f0',
              borderBottom: '1px solid #e2e8f0',
              padding: '24px 0',
              margin: '12px 0'
            }}>
              <div>
                <span style={{ display: 'block', fontSize: '30px', fontWeight: 800, color: '#6d28d9', letterSpacing: '-1px' }}>10M+</span>
                <span style={{ display: 'block', fontSize: '12px', color: '#64748b', fontWeight: 500, marginTop: '2px' }}>Jobs Listed</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '30px', fontWeight: 800, color: '#6d28d9', letterSpacing: '-1px' }}>500K+</span>
                <span style={{ display: 'block', fontSize: '12px', color: '#64748b', fontWeight: 500, marginTop: '2px' }}>Companies</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '30px', fontWeight: 800, color: '#6d28d9', letterSpacing: '-1px' }}>2M+</span>
                <span style={{ display: 'block', fontSize: '12px', color: '#64748b', fontWeight: 500, marginTop: '2px' }}>Active Users</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '30px', fontWeight: 800, color: '#6d28d9', letterSpacing: '-1px' }}>100+</span>
                <span style={{ display: 'block', fontSize: '12px', color: '#64748b', fontWeight: 500, marginTop: '2px' }}>Countries</span>
              </div>
            </div>

            {/* App Store QR code */}
            <div>
              <span style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '12px', color: '#0f172a' }}>Get the app</span>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <a href="https://apple.com" target="_blank" rel="noopener noreferrer" style={{
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    borderRadius: '8px',
                    padding: '6px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    textDecoration: 'none',
                    border: '1px solid #1e293b',
                    width: '150px',
                    transition: 'transform 0.2s',
                    boxSizing: 'border-box'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.1.09 2.23-.57 2.95-1.39z"/>
                    </svg>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '8px', textTransform: 'uppercase', color: '#94a3b8', lineHeight: '1' }}>Download on the</span>
                      <span style={{ fontSize: '12px', fontWeight: 600, fontFamily: 'sans-serif', lineHeight: '1.2' }}>App Store</span>
                    </div>
                  </a>
                  <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" style={{
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    borderRadius: '8px',
                    padding: '6px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    textDecoration: 'none',
                    border: '1px solid #1e293b',
                    width: '150px',
                    transition: 'transform 0.2s',
                    boxSizing: 'border-box'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                      <path d="M5 3.23v17.54c0 .35.15.65.41.85l9.28-9.28L5.41 2.38c-.26.2-.41.5-.41.85zM15.9 12.01L6.71 21.2c.22.06.46.06.69-.07l11.45-6.62c.62-.36.62-.94 0-1.3L15.9 12.01zm3.6-2.08L16.6 8.1l-2.02 2.02 4.92-2.84c.62-.36.62-.94 0-1.35zM6.71 2.8l9.19 9.19 2.02-2.02-11.21-6.48c-.23-.13-.47-.13-.69-.07l.69.58z"/>
                    </svg>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '8px', textTransform: 'uppercase', color: '#94a3b8', lineHeight: '1' }}>GET IT ON</span>
                      <span style={{ fontSize: '12px', fontWeight: 600, fontFamily: 'sans-serif', lineHeight: '1.2' }}>Google Play</span>
                    </div>
                  </a>
                </div>
                {/* QR Code Graphic Mockup */}
                <div style={{
                  width: '76px',
                  height: '76px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box'
                }}>
                  <svg width="60" height="60" viewBox="0 0 29 29" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="square">
                    {/* Top-Left Finder */}
                    <rect x="0.5" y="0.5" width="6" height="6" fill="#000000" />
                    <rect x="1.5" y="1.5" width="4" height="4" fill="#ffffff" />
                    <rect x="2.5" y="2.5" width="2" height="2" fill="#000000" />
                    
                    {/* Top-Right Finder */}
                    <rect x="22.5" y="0.5" width="6" height="6" fill="#000000" />
                    <rect x="23.5" y="1.5" width="4" height="4" fill="#ffffff" />
                    <rect x="24.5" y="2.5" width="2" height="2" fill="#000000" />
                    
                    {/* Bottom-Left Finder */}
                    <rect x="0.5" y="22.5" width="6" height="6" fill="#000000" />
                    <rect x="1.5" y="23.5" width="4" height="4" fill="#ffffff" />
                    <rect x="2.5" y="24.5" width="2" height="2" fill="#000000" />
                    
                    {/* Random QR code pixels/patterns */}
                    <path d="M9 1h1v1H9zm2 0h1v1h-1zm3 0h1v1h-1zm2 0h2v1h-2zm3 0h1v1h-1zm1 1h1v1h-1zm-9 1h2v1h-2zm3 0h1v1h-1zm2 0h1v1h-1zm4 0h1v1h-1zm-8 2h1v1H9zm3 0h2v1h-2zm4 0h1v1h-1zm-9 2h1v1H8zm2 0h1v1h-1zm3 0h1v1h-1zm5 0h2v1h-2zm2 0h1v1h-1zm-10 2h1v1H9zm2 0h2v1h-2zm3 0h1v1h-1zm4 0h2v1h-2zm-12 2h1v1H7zm4 0h1v1h-1zm2 0h2v1h-2zm5 0h1v1h-1zm2 0h2v1h-2zm-14 2h2v1H6zm4 0h1v1h-1zm5 0h1v1h-1zm3 0h1v1h-1zm-12 2h1v1H7zm3 0h1v1h-1zm3 0h2v1h-2zm5 0h1v1h-1zm2 0h2v1h-2z" fill="#000000" />
                    
                    {/* WeChat-like green center icon */}
                    <rect x="12" y="12" width="5" height="5" fill="#ffffff" rx="1" />
                    <circle cx="14.5" cy="14.5" r="2" fill="#10b981" />
                    <polygon points="13.5,15.5 13.5,14 14.5,14.5" fill="#10b981" />
                  </svg>
                </div>
              </div>
            </div>

          </div>

          {/* Graphical Mockups (Browser Preview & Mobile App Preview overlays) */}
          <div className="mockup-container" style={{ position: 'relative', display: 'flex', justifyContent: 'flex-start', paddingRight: '50px' }}>
            {/* Desktop Dashboard Preview Container */}
            <div style={{
              width: '520px',
              height: '340px',
              background: '#ffffff',
              borderRadius: '24px',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              boxShadow: '0 20px 50px rgba(109, 40, 217, 0.06)',
              display: 'flex',
              flexDirection: 'row',
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}>
              {/* Left Dark Sidebar Mockup */}
              <div style={{
                width: '56px',
                backgroundColor: '#0c0f1d',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 0',
                flexShrink: 0,
                position: 'relative'
              }}>
                {/* Top logo */}
                <div style={{
                  background: '#ffffff',
                  padding: '2px 4px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '24px',
                  width: '24px',
                  boxSizing: 'border-box'
                }}>
                  <img src="/logo.png" alt="Logo" style={{ height: '16px', width: 'auto', objectFit: 'contain' }} />
                </div>
                
                {/* Center icons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                  {/* Home */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" style={{ cursor: 'pointer' }}>
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  </svg>
                  {/* Briefcase */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" style={{ cursor: 'pointer' }}>
                    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                  {/* Message */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" style={{ cursor: 'pointer' }}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  {/* Profile */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" style={{ cursor: 'pointer' }}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>

                {/* Bottom Cloud Upload Badge floating over sidebar bottom corner */}
                <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <div style={{
                    position: 'absolute',
                    bottom: '-10px',
                    right: '-12px',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #e2e8f0',
                    zIndex: 12,
                    cursor: 'pointer'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6d28d9" strokeWidth="2.5">
                      <path d="M12 13v8M12 13l3 3M12 13l-3 3"/>
                      <path d="M20.85 18A5.9 5.9 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right Content Panel Mockup */}
              <div style={{
                flex: 1,
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                backgroundColor: '#ffffff'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>Good Evening, Alex! 👋</span>
                </div>

                {/* Search bar inside mockup */}
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '11px',
                  color: '#94a3b8',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="3">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  Search for jobs, skills or companies...
                </div>

                {/* Job recommendations */}
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '10px' }}>Recommended for you</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {/* Card 1 */}
                    <div style={{
                      flex: 1,
                      border: '1px solid #e2e8f0',
                      padding: '12px 10px',
                      borderRadius: '12px',
                      background: '#ffffff',
                      position: 'relative',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)'
                    }}>
                      <span style={{ position: 'absolute', top: '8px', right: '8px', color: '#94a3b8', fontSize: '10px', cursor: 'pointer' }}>&times;</span>
                      <div style={{
                        width: '20px', height: '20px', borderRadius: '50%', background: '#ea4c89',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px'
                      }}>
                        <span style={{ color: '#ffffff', fontSize: '9px', fontWeight: 'bold' }}>D</span>
                      </div>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: '#0f172a' }}>UI/UX Designer</div>
                      <div style={{ fontSize: '8px', color: '#64748b', marginTop: '2px' }}>Dribbble</div>
                      <div style={{ fontSize: '8px', color: '#64748b' }}>Bangalore, India</div>
                      <div style={{ fontSize: '8px', fontWeight: 700, color: '#64748b', marginTop: '6px' }}>$12k - $18k</div>
                    </div>
                    {/* Card 2 */}
                    <div style={{
                      flex: 1,
                      border: '1px solid #e2e8f0',
                      padding: '12px 10px',
                      borderRadius: '12px',
                      background: '#ffffff',
                      position: 'relative',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)'
                    }}>
                      <span style={{ position: 'absolute', top: '8px', right: '8px', color: '#94a3b8', fontSize: '10px', cursor: 'pointer' }}>&times;</span>
                      <div style={{
                        width: '20px', height: '20px', borderRadius: '50%', background: '#1db954',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px'
                      }}>
                        <span style={{ color: '#ffffff', fontSize: '9px', fontWeight: 'bold' }}>S</span>
                      </div>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: '#0f172a' }}>Product Manager</div>
                      <div style={{ fontSize: '8px', color: '#64748b', marginTop: '2px' }}>Spotify</div>
                      <div style={{ fontSize: '8px', color: '#64748b' }}>Mumbai, India</div>
                      <div style={{ fontSize: '8px', fontWeight: 700, color: '#64748b', marginTop: '6px' }}>$20k - $30k</div>
                    </div>
                    {/* Card 3 */}
                    <div style={{
                      flex: 1,
                      border: '1px solid #e2e8f0',
                      padding: '12px 10px',
                      borderRadius: '12px',
                      background: '#ffffff',
                      position: 'relative',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)'
                    }}>
                      <span style={{ position: 'absolute', top: '8px', right: '8px', color: '#94a3b8', fontSize: '10px', cursor: 'pointer' }}>&times;</span>
                      <div style={{
                        width: '20px', height: '20px', borderRadius: '50%', background: '#e50914',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px'
                      }}>
                        <span style={{ color: '#ffffff', fontSize: '9px', fontWeight: 'bold' }}>N</span>
                      </div>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: '#0f172a' }}>Frontend Dev</div>
                      <div style={{ fontSize: '8px', color: '#64748b', marginTop: '2px' }}>Netflix</div>
                      <div style={{ fontSize: '8px', color: '#64748b' }}>Remote</div>
                      <div style={{ fontSize: '8px', fontWeight: 700, color: '#64748b', marginTop: '6px' }}>$16k - $24k</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats Badge on Far Right */}
            <div style={{
              position: 'absolute',
              top: '30px',
              right: '25px',
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #e2e8f0',
              zIndex: 11
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6d28d9" strokeWidth="2.5">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>

            {/* Mobile App Phone Preview overlay (Right foreground) */}
            <div style={{
              position: 'absolute',
              bottom: '-30px',
              right: '-10px',
              width: '185px',
              height: '310px',
              backgroundColor: '#ffffff',
              borderRadius: '32px',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.12)',
              border: '8px solid #f1f5f9',
              padding: '16px 12px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              zIndex: 10,
              boxSizing: 'border-box'
            }}>
              {/* Phone notch */}
              <div style={{ width: '50px', height: '4px', background: '#e2e8f0', borderRadius: '4px', margin: '0 auto 4px' }} />
              
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textAlign: 'center' }}>AI Resume Review</div>
              
              {/* Circular Gauge */}
              <div style={{
                position: 'relative',
                width: '72px',
                height: '72px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="72" height="72" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="3.5"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeDasharray="85, 100"
                    strokeLinecap="round"
                  />
                </svg>
                <div style={{ position: 'absolute', fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>85</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>Great Job!</div>
                <div style={{ fontSize: '9px', color: '#64748b', margin: '4px 0 0', lineHeight: '1.4' }}>
                  Your resume is strong.<br />
                  But we found few areas<br />
                  to improve.
                </div>
              </div>

              <Link href="/candidate/dashboard" style={{
                background: '#6d28d9',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '10px',
                fontWeight: 700,
                textDecoration: 'none',
                textAlign: 'center',
                marginTop: 'auto',
                boxShadow: '0 4px 12px rgba(109, 40, 217, 0.3)'
              }}>
                Improve Resume
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* SECTION 4: CALL TO ACTION BANNER (Dark Container) */}
      <div style={{
        backgroundColor: '#f8fafc',
        padding: '0 20px 80px'
      }}>
        <div className="cta-banner" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, #090e21 0%, #03050e 100%)',
          borderRadius: '24px',
          padding: '60px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          flexWrap: 'wrap',
          gap: '30px'
        }}>
          
          <div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 12px', color: '#ffffff' }}>
              Ready to take the next step in your career?
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0, maxWidth: '580px' }}>
              Join millions of job seekers who trust Apply4Jobs to find their dream jobs.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <Link href="/candidate/dashboard" className="glow-btn" style={{
              background: '#6d28d9',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 28px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(109, 40, 217, 0.4)'
            }}>
              Get Started For Free &rarr;
            </Link>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex' }}>
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
                  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80',
                  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80'
                ].map((src, idx) => (
                  <img key={idx} src={src} alt="" style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    border: '2px solid #090e21', marginLeft: idx > 0 ? '-8px' : '0',
                    objectFit: 'cover'
                  }} />
                ))}
              </div>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>Join 2M+ happy job seekers</span>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 5: FOOTER (Light / White Background) */}
      <footer style={{
        backgroundColor: '#ffffff',
        color: '#0f172a',
        borderTop: '1px solid #e2e8f0',
        padding: '60px 20px'
      }}>
        <div className="footer-grid" style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          
          {/* Brand & Description Column */}
          <div className="footer-brand-col" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                background: '#ffffff',
                padding: '4px 10px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '32px',
                boxSizing: 'border-box',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}>
                <img src="/logo.png" alt="Apply4Jobs" style={{ height: '20px', width: 'auto', objectFit: 'contain' }} />
              </div>
            </div>
            <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.6', margin: 0, maxWidth: '280px' }}>
              AI-powered job platform that connects talent with opportunities.
            </p>
            {/* Social Icons Mockup */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              {/* LinkedIn */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{
                width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #cbd5e1',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', transition: 'color 0.2s, border-color 0.2s', textDecoration: 'none'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              {/* Twitter */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{
                width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #cbd5e1',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', transition: 'color 0.2s, border-color 0.2s', textDecoration: 'none'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
                width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #cbd5e1',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', transition: 'color 0.2s, border-color 0.2s', textDecoration: 'none'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{
                width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #cbd5e1',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', transition: 'color 0.2s, border-color 0.2s', textDecoration: 'none'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>For Job Seekers</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <Link href="/jobs" style={{ color: '#64748b', textDecoration: 'none' }}>Find Jobs</Link>
              <Link href="/candidate/dashboard" style={{ color: '#64748b', textDecoration: 'none' }}>AI Resume Review</Link>
              <Link href="/candidate/dashboard" style={{ color: '#64748b', textDecoration: 'none' }}>Career Coach</Link>
              <Link href="/alerts" style={{ color: '#64748b', textDecoration: 'none' }}>Job Alerts</Link>
              <Link href="/resources" style={{ color: '#64748b', textDecoration: 'none' }}>Resources</Link>
            </div>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>For Employers</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <Link href="/employer/dashboard" style={{ color: '#64748b', textDecoration: 'none' }}>Post a Job</Link>
              <Link href="/employer/dashboard" style={{ color: '#64748b', textDecoration: 'none' }}>Find Candidates</Link>
              <Link href="/pricing" style={{ color: '#64748b', textDecoration: 'none' }}>Pricing</Link>
              <Link href="/login" style={{ color: '#64748b', textDecoration: 'none' }}>Employer Login</Link>
              <Link href="/resources" style={{ color: '#64748b', textDecoration: 'none' }}>Resources</Link>
            </div>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <Link href="/about" style={{ color: '#64748b', textDecoration: 'none' }}>About Us</Link>
              <Link href="/careers" style={{ color: '#64748b', textDecoration: 'none' }}>Careers</Link>
              <Link href="/blog" style={{ color: '#64748b', textDecoration: 'none' }}>Blog</Link>
              <Link href="/press" style={{ color: '#64748b', textDecoration: 'none' }}>Press</Link>
              <Link href="/contact" style={{ color: '#64748b', textDecoration: 'none' }}>Contact Us</Link>
            </div>
          </div>

          {/* Links Column 4 */}
          <div>
            <h4 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <Link href="/help" style={{ color: '#64748b', textDecoration: 'none' }}>Help Center</Link>
              <Link href="/privacy" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link href="/terms" style={{ color: '#64748b', textDecoration: 'none' }}>Terms of Service</Link>
              <Link href="/community" style={{ color: '#64748b', textDecoration: 'none' }}>Community</Link>
              <Link href="/security" style={{ color: '#64748b', textDecoration: 'none' }}>Trust & Safety</Link>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div style={{
          maxWidth: '1200px',
          margin: '40px auto 0',
          paddingTop: '24px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '13px',
          color: '#64748b'
        }}>
          <div>
            &copy; 2026 Apply4Jobs. All rights reserved.
          </div>
          <div style={{ fontWeight: 500 }}>
            Powered by <span style={{ color: '#6d28d9', fontWeight: 700 }}>Algoguido Technologies</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
