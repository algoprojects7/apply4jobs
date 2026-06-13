"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function CandidateResumeReview() {
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [resumeFile, setResumeFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch('/api/candidate/dashboard')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') {
          setAtsScore(res.data.atsScore);
          setResumeFile(res.data.resumeFile);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, []);

  return (
    <DashboardLayout
      role="candidate"
      activeItem="Resume Review"
      headerTitle="AI Resume Review"
      headerSubtitle="ATS parser analytics and resume optimization feedback."
      planOrNodeName="Pro Match"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '800px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ padding: '30px', display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '6px solid #1a7f37',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1a7f37',
            boxShadow: '0 4px 15px rgba(26,127,55,0.1)'
          }}>
            {atsScore || 84}%
          </div>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <h3 style={{ margin: '0 0 5px' }}>ATS Compatibility Index</h3>
            <p style={{ margin: '0 0 15px', color: '#57606a', fontSize: '13px' }}>
              Active Resume: <strong style={{ color: '#1f2328' }}>{resumeFile || 'alex_johnson_cv.pdf'}</strong>
            </p>
            <div className="volumetric-bar" style={{ width: '100%', height: '12px' }}>
              <div className="volumetric-bar-fill" style={{ width: `${atsScore || 84}%` }} />
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '30px' }}>
          <h3 style={{ margin: '0 0 15px' }}>Detailed Recommendations</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ borderBottom: '1px solid #eaeef2', paddingBottom: '15px' }}>
              <strong style={{ display: 'block', fontSize: '14.5px', marginBottom: '5px', color: '#1a7f37' }}>✓ Highly Cohesive Sections</strong>
              <span style={{ fontSize: '13px', color: '#57606a' }}>
                Your work experience at StackFlow Systems has a clean timeline structure and maps directly to modern Frontend Roles.
              </span>
            </div>
            <div style={{ borderBottom: '1px solid #eaeef2', paddingBottom: '15px' }}>
              <strong style={{ display: 'block', fontSize: '14.5px', marginBottom: '5px', color: '#0969da' }}>ℹ Missing Keyword Alignment</strong>
              <span style={{ fontSize: '13px', color: '#57606a' }}>
                Adding direct skills like **NestJS**, **PostgreSQL**, and **Prisma** will boost matches by up to **15%** for senior backend listings.
              </span>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '14.5px', marginBottom: '5px', color: '#ff007f' }}>⚠ Format Warn</strong>
              <span style={{ fontSize: '13px', color: '#57606a' }}>
                Avoid using custom multi-column layout templates that cause legacy ATS parsers to skip sidebar items.
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
