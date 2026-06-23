"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function JobApplyPage() {
  const params = useParams();
  const jobId = params?.id as string;

  const [job, setJob] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [candidateData, setCandidateData] = useState<any>(null);
  
  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  
  // Resume states
  const [useExistingResume, setUseExistingResume] = useState(true);
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Status states
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);

  useEffect(() => {
    if (!jobId) return;

    // Check authentication
    fetch('/api/auth/me')
      .then(res => {
        if (res.status === 401) {
          window.location.href = `/login?redirect=${encodeURIComponent(`/jobs/${jobId}/apply`)}`;
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (!data || data.status !== 'authenticated') return;
        setUser(data.user);
        setEmail(data.user.email);
        
        // Fetch candidate details
        return fetch('/api/candidate/dashboard');
      })
      .then(res => {
        if (!res) return null;
        return res.json();
      })
      .then(resData => {
        if (resData && resData.status === 'success') {
          const profile = resData.data;
          setCandidateData(profile);
          setFullName(profile.fullName || '');
          if (profile.resumeFile) {
            setResumeName(profile.resumeFile);
            setUseExistingResume(true);
          } else {
            setUseExistingResume(false);
          }
        }
      })
      .catch(err => {
        console.error('Error in initialization:', err);
      });

    // Fetch job details
    fetch(`/api/jobs/${jobId}`)
      .then(res => {
        if (!res.ok) throw new Error('Job not found');
        return res.json();
      })
      .then(res => {
        if (res.status === 'success') {
          setJob(res.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Could not load job details. The job might have been closed.');
        setLoading(false);
      });
  }, [jobId]);

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.status === 'success') {
        setResumeUrl(data.data.url);
        setResumeName(file.name);
        setUseExistingResume(false);
      } else {
        setError(data.message || 'Failed to upload resume.');
      }
    } catch (err) {
      console.error(err);
      setError('Connection error during upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  // AI Cover Letter Generator Mockup
  const generateAICoverLetter = () => {
    if (!job) return;
    setAiGenerating(true);
    
    setTimeout(() => {
      const skillsText = candidateData?.skills?.join(', ') || 'software development, teamwork';
      const text = `Dear Hiring Team at ${job.company?.name || 'your company'},

I am writing to express my strong interest in the ${job.title} position at your company. With my background in ${skillsText}, I am confident in my ability to contribute value immediately.

I am particularly drawn to your company's innovative projects and growth. I look forward to bringing my problem-solving skills and experience to this role.

Thank you for your time and consideration.

Sincerely,
${fullName || 'Applicant'}`;
      
      setCoverLetter(text);
      setAiGenerating(false);
    }, 1200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!useExistingResume && !resumeUrl) {
      setError('Please upload a resume to submit your application.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch(`/api/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          coverLetter,
          resumeUrl: useExistingResume ? undefined : resumeUrl
        })
      });
      const data = await res.json();
      
      if (data.status === 'success') {
        setSuccess(true);
      } else {
        setError(data.message || 'Failed to submit application.');
      }
    } catch (err) {
      console.error(err);
      setError('Connection error. Please check your internet connection.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.04) 0%, rgba(255, 255, 255, 1) 80%)',
        color: '#0f172a',
        fontFamily: "'Nunito', sans-serif"
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{
            width: '40px',
            height: '40px',
            border: '4px solid rgba(124, 58, 237, 0.1)',
            borderTopColor: '#7c3aed',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <span style={{ fontSize: '15px', fontWeight: 600, color: '#64748b' }}>Loading application checkpoint...</span>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.04) 0%, rgba(255, 255, 255, 1) 80%)',
        fontFamily: "'Nunito', sans-serif",
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        <div className="auth-card" style={{
          textAlign: 'center',
          maxWidth: '520px',
          padding: '40px 30px',
          background: '#ffffff',
          borderRadius: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          {/* Animated Success Check */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#ecfdf5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#10b981',
            boxShadow: '0 8px 20px rgba(16, 185, 129, 0.15)',
            transform: 'scale(1)',
            animation: 'pulse 2s infinite'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '10px 0 0', letterSpacing: '-1.5px' }}>
            Application Submitted!
          </h2>
          
          <p style={{ color: '#475569', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
            Congratulations! Your job application for <strong>{job?.title}</strong> at <strong>{job?.company?.name}</strong> has been submitted successfully to the employer.
          </p>

          <div style={{
            width: '100%',
            height: '1px',
            backgroundColor: '#e2e8f0',
            margin: '10px 0'
          }} />

          <div style={{ display: 'flex', gap: '12px', width: '100%', flexWrap: 'wrap' }}>
            <Link href="/candidate/applications" style={{
              flex: 1,
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              color: '#ffffff',
              borderRadius: '12px',
              padding: '14px',
              fontWeight: 700,
              fontSize: '14px',
              textDecoration: 'none',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)'
            }}>
              Track Application
            </Link>
            
            <Link href="/" style={{
              flex: 1,
              background: '#ffffff',
              color: '#475569',
              borderRadius: '12px',
              padding: '14px',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              textAlign: 'center',
              border: '1px solid #cbd5e1'
            }}>
              Browse More Jobs
            </Link>
          </div>
          
          <style>{`
            @keyframes pulse {
              0% { transform: scale(0.95); boxShadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
              70% { transform: scale(1); boxShadow: 0 0 0 10px rgba(16, 185, 129, 0); }
              100% { transform: scale(0.95); boxShadow: 0 0 0 0 rgba(16, 185, 129, 0); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.03) 0%, rgba(248, 250, 252, 1) 80%)',
      fontFamily: "'Nunito', sans-serif",
      color: '#0f172a',
      paddingBottom: '80px'
    }}>
      {/* Header */}
      <header style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)'
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            background: '#ffffff',
            padding: '4px 10px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '30px',
            border: '1px solid #cbd5e1'
          }}>
            <img src="/logo.png" alt="Apply4Jobs" style={{ height: '18px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '18px', color: '#0f172a' }}>Apply4Jobs</span>
        </Link>
        
        <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
          &larr; Back to Job Search
        </Link>
      </header>

      {/* Main Grid Layout */}
      <main style={{
        maxWidth: '1200px',
        margin: '40px auto 0',
        padding: '0 20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '30px',
        alignItems: 'start'
      }}>
        {/* Left Side: Job Card Details */}
        <section style={{
          background: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          padding: '30px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.02)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          position: 'sticky',
          top: '30px'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              background: '#eff6ff',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '12px',
              color: '#0252cc',
              fontWeight: 700,
              marginBottom: '12px'
            }}>
              Active Position
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px', color: '#0f172a', letterSpacing: '-0.5px' }}>
              {job?.title}
            </h1>
            <p style={{ fontSize: '15px', color: '#475569', fontWeight: 700, margin: 0 }}>
              {job?.company?.name}
            </p>
          </div>

          <div style={{ height: '1px', backgroundColor: '#e2e8f0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#475569' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <span>{job?.location || 'Remote'}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5">
                <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="2" y1="12" x2="22" y2="12"/>
              </svg>
              <span>{job?.salaryMin && job?.salaryMax ? `$${Math.round(job.salaryMin/1000)}k - $${Math.round(job.salaryMax/1000)}k` : 'Negotiable'} &bull; {job?.employmentType || 'Full-time'}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>Posted {new Date(job?.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#e2e8f0' }} />

          <div>
            <h4 style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Role Description</h4>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6', margin: 0, maxHeight: '200px', overflowY: 'auto' }}>
              {job?.description}
            </p>
          </div>

          {job?.skillsRequired && job.skillsRequired.length > 0 && (
            <div>
              <h4 style={{ margin: '0 0 10px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Desired Skills</h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {job.skillsRequired.map((skill: string, idx: number) => (
                  <span key={idx} style={{
                    padding: '4px 10px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '20px',
                    fontSize: '11px',
                    color: '#475569',
                    fontWeight: 600
                  }}>{skill}</span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Right Side: Apply Form */}
        <section style={{
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          padding: '40px 30px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 6px', color: '#0f172a', letterSpacing: '-0.5px' }}>
              Apply for this Position
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
              Please fill out the form below. Your credentials will be forwarded directly to the employer.
            </p>
          </div>

          {error && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fca5a5',
              borderRadius: '8px',
              color: '#b91c1c',
              fontSize: '13px',
              fontWeight: 600
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Full Name */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Full Name</label>
              <input
                type="text"
                placeholder="Alex Johnson"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#0f172a',
                  fontSize: '13.5px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Email & Phone */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Email Address</label>
                <input
                  type="email"
                  value={email}
                  disabled
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    color: '#64748b',
                    fontSize: '13.5px',
                    boxSizing: 'border-box',
                    cursor: 'not-allowed'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#0f172a',
                    fontSize: '13.5px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Resume Upload / Use Existing */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>Upload Resume</label>
              
              {candidateData?.resumeFile && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  marginBottom: '10px'
                }}>
                  <input
                    type="checkbox"
                    id="use-existing"
                    checked={useExistingResume}
                    onChange={() => setUseExistingResume(!useExistingResume)}
                    style={{ accentColor: '#7c3aed', cursor: 'pointer' }}
                  />
                  <label htmlFor="use-existing" style={{ fontSize: '13px', color: '#0f172a', cursor: 'pointer', flex: 1, fontWeight: 600 }}>
                    Use saved resume: <span style={{ color: '#7c3aed' }}>{resumeName}</span>
                  </label>
                  <span style={{ fontSize: '11px', background: '#ecfdf5', color: '#10b981', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>Stored CV</span>
                </div>
              )}

              {(!useExistingResume || !candidateData?.resumeFile) && (
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  style={{
                    border: dragOver ? '2px dashed #7c3aed' : '2px dashed #cbd5e1',
                    borderRadius: '12px',
                    padding: '30px 20px',
                    textAlign: 'center',
                    background: dragOver ? 'rgba(124, 58, 237, 0.02)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                  onClick={() => document.getElementById('resume-file-input')?.click()}
                >
                  <input
                    type="file"
                    id="resume-file-input"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  
                  {uploading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <div className="spinner" style={{
                        width: '24px',
                        height: '24px',
                        border: '3px solid rgba(124, 58, 237, 0.1)',
                        borderTopColor: '#7c3aed',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      <span style={{ fontSize: '13px', color: '#64748b' }}>Uploading to database...</span>
                    </div>
                  ) : resumeUrl ? (
                    <div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" style={{ marginBottom: '8px' }}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                      </svg>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#10b981' }}>{resumeName} uploaded!</div>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Click or drag a new file to change</div>
                    </div>
                  ) : (
                    <div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" style={{ marginBottom: '8px' }}>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Drag and drop your CV here</div>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Supports PDF, DOCX up to 5MB</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cover Letter */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>Cover Letter</label>
                <button
                  type="button"
                  onClick={generateAICoverLetter}
                  disabled={aiGenerating}
                  style={{
                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(109, 40, 217, 0.08))',
                    border: '1px solid rgba(124, 58, 237, 0.25)',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    color: '#7c3aed',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    outline: 'none'
                  }}
                >
                  {aiGenerating ? 'Writing Cover Letter...' : '✨ AI Write Cover Letter'}
                </button>
              </div>
              <textarea
                placeholder="Share why you are the best fit for this role..."
                value={coverLetter}
                onChange={e => setCoverLetter(e.target.value)}
                style={{
                  width: '100%',
                  height: '140px',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#0f172a',
                  fontSize: '13.5px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                  lineHeight: '1.5',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '14px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'center',
                width: '100%',
                boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)',
                fontFamily: 'inherit',
                marginTop: '10px'
              }}
            >
              {submitting ? 'Submitting Application...' : 'Submit Application'}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
