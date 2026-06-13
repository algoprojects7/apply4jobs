"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function AdminSettings() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('System settings successfully committed to cluster!');
  };

  return (
    <DashboardLayout
      role="admin"
      activeItem="Settings"
      headerTitle="Settings"
      headerSubtitle="Manage system-wide admin console preferences."
      planOrNodeName="Active"
    >
      <div className="glass-panel" style={{ padding: '30px', maxWidth: '700px', margin: '0 auto' }}>
        <h3 className="brand-title" style={{ margin: '0 0 20px', fontSize: '18px', textTransform: 'none' }}>Super Console Settings</h3>
        
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#57606a', marginBottom: '6px', fontWeight: 600 }}>Admin Session Timeout</label>
            <select style={{ width: '100%', padding: '10px', fontSize: '14px' }}>
              <option>15 Minutes</option>
              <option>30 Minutes</option>
              <option>1 Hour</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#57606a', marginBottom: '6px', fontWeight: 600 }}>Audit Logs Retention Period</label>
            <select style={{ width: '100%', padding: '10px', fontSize: '14px' }}>
              <option>30 Days</option>
              <option>90 Days</option>
              <option>365 Days</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#57606a', marginBottom: '6px', fontWeight: 600 }}>System Maintenance Mode</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" id="maint-mode" style={{ width: 'auto', accentColor: '#0969da' }} />
              <label htmlFor="maint-mode" style={{ fontSize: '13px', color: '#1f2328' }}>Enable Offline Maintenance Screen</label>
            </div>
          </div>
          <button type="submit" className="glow-btn" style={{ padding: '12px 20px', fontSize: '13.5px', alignSelf: 'flex-start', marginTop: '10px' }}>
            Commit Settings
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
