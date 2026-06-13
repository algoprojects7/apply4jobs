"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function AdminModeration() {
  const [flaggedJobs, setFlaggedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFlaggedJobs = async () => {
    try {
      const res = await fetch('/api/admin/dashboard');
      const data = await res.json();
      if (data.status === 'success') {
        setFlaggedJobs(data.data.flaggedJobs);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching flagged jobs:', err);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchFlaggedJobs();
  }, []);

  const handleResolveFlag = async (id: string, action: 'keep' | 'delete') => {
    try {
      const res = await fetch('/api/admin/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'job', targetId: id, action })
      });
      const data = await res.json();
      if (data.status === 'success') {
        fetchFlaggedJobs();
        if (action === 'delete') {
          alert('Job listing has been removed from the platform.');
        } else {
          alert('Flags cleared for this job listing.');
        }
      }
    } catch (err) {
      console.error('Error resolving flagged job:', err);
    }
  };

  return (
    <DashboardLayout
      role="admin"
      activeItem="Jobs Moderation"
      headerTitle="Jobs Moderation"
      headerSubtitle="Review policy compliance flags and reports on job openings."
      planOrNodeName="Active"
    >
      <div className="glass-panel" style={{ padding: '30px', maxWidth: '850px', margin: '0 auto' }}>
        <h3 className="brand-title" style={{ margin: '0 0 20px', fontSize: '18px', textTransform: 'none' }}>Reported / Flagged Postings</h3>
        
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#57606a' }}>Loading queue...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {flaggedJobs.map(job => (
              <div key={job.id} className="glass-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1, paddingRight: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>{job.title}</h4>
                    <span style={{ fontSize: '11px', background: 'rgba(209, 26, 26, 0.15)', color: '#d11a1a', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>{job.flags} Flags</span>
                  </div>
                  <p style={{ margin: '6px 0 0', color: '#57606a', fontSize: '13px' }}>{job.company} &bull; <strong style={{ color: '#ff007f' }}>Reason: {job.reason}</strong></p>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button onClick={() => handleResolveFlag(job.id, 'keep')} className="glow-btn" style={{ padding: '6px 12px', fontSize: '12px', background: '#1a7f37', boxShadow: 'none' }}>Clear Flags</button>
                  <button onClick={() => handleResolveFlag(job.id, 'delete')} style={{ padding: '6px 12px', fontSize: '12px', background: 'rgba(209,26,26,0.1)', color: '#d11a1a', border: '1px solid rgba(209,26,26,0.2)', borderRadius: '12px', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            ))}
            {flaggedJobs.length === 0 && (
              <div style={{ padding: '30px', textAlign: 'center', color: '#656d76' }}>All listings are currently compliant! Queue clean.</div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
