"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function CandidateSettings() {
  const [email, setEmail] = useState<string>('candidate@apply4jobs.com');
  const [fullName, setFullName] = useState<string>('Alex Johnson');
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch('/api/candidate/dashboard')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') {
          setFullName(res.data.fullName);
          setSkills(res.data.skills || []);
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
    alert('Settings successfully updated in profile!');
  };

  return (
    <DashboardLayout
      role="candidate"
      activeItem="Settings"
      headerTitle="Settings"
      headerSubtitle="Manage your profile information and platform preferences."
      planOrNodeName="Pro Match"
    >
      <div className="glass-panel" style={{ padding: '30px', maxWidth: '700px', margin: '0 auto' }}>
        <h3 className="brand-title" style={{ margin: '0 0 20px', fontSize: '18px', textTransform: 'none' }}>Profile Settings</h3>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#57606a', marginBottom: '6px', fontWeight: 600 }}>Full Name</label>
            <input 
              type="text" 
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              style={{ width: '100%', padding: '10px', fontSize: '14px' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#57606a', marginBottom: '6px', fontWeight: 600 }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              disabled
              style={{ width: '100%', padding: '10px', fontSize: '14px', background: '#f6f8fa', cursor: 'not-allowed' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#57606a', marginBottom: '6px', fontWeight: 600 }}>Skills Matrix</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
              {skills.map((skill, idx) => (
                <span key={idx} style={{ padding: '4px 10px', background: 'rgba(9, 105, 218, 0.1)', color: '#0969da', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
                  {skill}
                </span>
              ))}
            </div>
            <p style={{ margin: 0, fontSize: '11px', color: '#656d76' }}>
              Skills are analyzed and updated automatically using the **AI Resume Parser** on the main workspace.
            </p>
          </div>
          <button type="submit" className="glow-btn" style={{ padding: '12px 20px', fontSize: '13.5px', alignSelf: 'flex-start', marginTop: '10px' }}>
            Save Changes
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
