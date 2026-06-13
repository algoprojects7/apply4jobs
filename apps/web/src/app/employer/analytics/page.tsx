"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function EmployerAnalytics() {
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
      activeItem="Funnel Analytics"
      headerTitle="Hiring Analytics"
      headerSubtitle="Analyze pipeline yield and candidate conversion metrics."
      planOrNodeName="Enterprise AI"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', maxWidth: '900px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ padding: '25px' }}>
          <h3 className="brand-title" style={{ margin: '0 0 20px', fontSize: '18px', textTransform: 'none' }}>Funnel Ratios</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '5px' }}>
                <span>Application Screening</span>
                <span style={{ fontWeight: 600 }}>100% (16 Candidates)</span>
              </div>
              <div className="volumetric-bar" style={{ width: '100%', height: '8px' }}>
                <div style={{ width: '100%', height: '100%', background: '#7c3aed' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '5px' }}>
                <span>Shortlist/Assessment</span>
                <span style={{ fontWeight: 600 }}>50% (8 Candidates)</span>
              </div>
              <div className="volumetric-bar" style={{ width: '100%', height: '8px' }}>
                <div style={{ width: '50%', height: '100%', background: '#3b82f6' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '5px' }}>
                <span>Interviews Conducted</span>
                <span style={{ fontWeight: 600 }}>25% (4 Candidates)</span>
              </div>
              <div className="volumetric-bar" style={{ width: '100%', height: '8px' }}>
                <div style={{ width: '25%', height: '100%', background: '#ff007f' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 10px' }}>Average Fill Time</h3>
          <div style={{ fontSize: '48px', fontWeight: 800, color: '#0969da', margin: '15px 0' }}>14 Days</div>
          <p style={{ margin: 0, fontSize: '12.5px', color: '#57606a' }}>
            Hiring velocity is **40% faster** than the marketplace average due to automated AI screening ranking.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
