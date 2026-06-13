"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function CandidateApplications() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch('/api/candidate/dashboard')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') {
          setApplications(res.data.applications);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching applications:', err);
        setLoading(false);
      });
  }, []);

  return (
    <DashboardLayout
      role="candidate"
      activeItem="Applications"
      headerTitle="My Applications"
      headerSubtitle="Track the status of your active job submissions."
      planOrNodeName="Pro Match"
    >
      <div className="glass-panel" style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
        <h3 className="brand-title" style={{ margin: '0 0 20px', fontSize: '18px', textTransform: 'none' }}>Applications Tracker</h3>
        {loading ? (
          <div style={{ padding: '30px', textAlign: 'center', color: '#57606a' }}>Loading submissions...</div>
        ) : (
          <div className="table-responsive">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #d0d7de' }}>
                  <th style={{ padding: '12px 8px', color: '#57606a', fontWeight: 600, fontSize: '13.5px' }}>Position</th>
                  <th style={{ padding: '12px 8px', color: '#57606a', fontWeight: 600, fontSize: '13.5px' }}>Company</th>
                  <th style={{ padding: '12px 8px', color: '#57606a', fontWeight: 600, fontSize: '13.5px' }}>Status</th>
                  <th style={{ padding: '12px 8px', color: '#57606a', fontWeight: 600, fontSize: '13.5px' }}>Applied Date</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app.id} style={{ borderBottom: '1px solid #eaeef2' }}>
                    <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: 600 }}>{app.job}</td>
                    <td style={{ padding: '16px 8px', fontSize: '14px', color: '#57606a' }}>{app.company}</td>
                    <td style={{ padding: '16px 8px', fontSize: '14px' }}>
                      <span style={{
                        padding: '3px 8px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 600,
                        backgroundColor: app.status === 'Interview' ? 'rgba(26, 127, 55, 0.15)' : 'rgba(9, 105, 218, 0.15)',
                        color: app.status === 'Interview' ? '#1a7f37' : '#0969da'
                      }}>{app.status}</span>
                    </td>
                    <td style={{ padding: '16px 8px', fontSize: '14px', color: '#656d76' }}>{app.date}</td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ padding: '30px', textAlign: 'center', color: '#57606a', fontSize: '13.5px' }}>
                      No active applications found. Explore jobs and apply to see them here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
