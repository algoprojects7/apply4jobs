"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function EmployerSettings() {
  const [companyName, setCompanyName] = useState<string>('TechCorp Solutions');
  const [website, setWebsite] = useState<string>('https://techcorp.com');
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch('/api/employer/dashboard')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') {
          setCompanyName(res.data.companyName);
          setWebsite(res.data.website || 'https://company.com');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching settings:', err);
        setLoading(false);
      });
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Company configurations successfully saved!');
  };

  return (
    <DashboardLayout
      role="employer"
      activeItem="Settings"
      headerTitle="Settings"
      headerSubtitle="Manage employer profile configurations and corporate settings."
      planOrNodeName="Enterprise AI"
    >
      <div className="glass-panel" style={{ padding: '30px', maxWidth: '700px', margin: '0 auto' }}>
        <h3 className="brand-title" style={{ margin: '0 0 20px', fontSize: '18px', textTransform: 'none' }}>Company Profile</h3>
        
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#57606a', marginBottom: '6px', fontWeight: 600 }}>Company Name</label>
            <input 
              type="text" 
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              style={{ width: '100%', padding: '10px', fontSize: '14px' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#57606a', marginBottom: '6px', fontWeight: 600 }}>Corporate Domain / Website</label>
            <input 
              type="text" 
              value={website}
              onChange={e => setWebsite(e.target.value)}
              style={{ width: '100%', padding: '10px', fontSize: '14px' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#57606a', marginBottom: '6px', fontWeight: 600 }}>Billing Subscription Plan</label>
            <input 
              type="text" 
              value="Enterprise AI SaaS Matcher ($499/mo)"
              disabled
              style={{ width: '100%', padding: '10px', fontSize: '14px', background: '#f6f8fa', cursor: 'not-allowed' }}
            />
          </div>
          <button type="submit" className="glow-btn" style={{ padding: '12px 20px', fontSize: '13.5px', alignSelf: 'flex-start', marginTop: '10px' }}>
            Save Settings
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
