"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function EmployerInterviews() {
  const [companyName, setCompanyName] = useState('Employer');

  React.useEffect(() => {
    fetch('/api/employer/dashboard')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') {
          setCompanyName(res.data.companyName);
        }
      });
  }, []);

  return (
    <DashboardLayout
      role="employer"
      activeItem="Interviews"
      headerTitle="Interviews"
      headerSubtitle="Manage interview schedules and candidate feedback reviews."
      planOrNodeName="Enterprise AI"
    >
      <div className="glass-panel" style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
        <h3 className="brand-title" style={{ margin: '0 0 20px', fontSize: '18px', textTransform: 'none' }}>Scheduled Interviews</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="glass-card" style={{ padding: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ padding: '10px 14px', background: 'rgba(111, 66, 193, 0.1)', color: '#6f42c1', borderRadius: '10px', textAlign: 'center', width: '50px', border: '1px solid rgba(111, 66, 193, 0.2)' }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold' }}>15</div>
              <div style={{ fontSize: '11px', fontWeight: 600 }}>JUN</div>
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Alice Johnson</h4>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#57606a' }}>
                Role: **Senior TypeScript Developer** &bull; Time: 10:30 AM EST
              </p>
              <a href="https://meet.google.com/abc-defg-hij" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: '#0969da', textDecoration: 'none', display: 'block', marginTop: '6px' }}>
                🔗 Join Google Meet Video Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
