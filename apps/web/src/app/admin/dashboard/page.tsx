"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function AdminDashboard() {
  // Database States
  const [tenants, setTenants] = useState<any[]>([]);
  const [flaggedJobs, setFlaggedJobs] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [kpis, setKpis] = useState({
    activeTenants: 0,
    totalJobSeekers: 0,
    activeListings: 0,
    matchingQueue: 0
  });
  const [loading, setLoading] = useState(true);

  // AI Configuration State
  const [aiModel, setAiModel] = useState<string>('gemini-2.5-pro');
  const [matchThreshold, setMatchThreshold] = useState<number>(75);
  const [queueLength, setQueueLength] = useState<number>(14);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/admin/dashboard');
      const data = await res.json();
      if (data.status === 'success') {
        setKpis(data.data.kpis);
        setTenants(data.data.tenants);
        setFlaggedJobs(data.data.flaggedJobs);
        setAuditLogs(data.data.auditLogs);
        setQueueLength(data.data.kpis.matchingQueue);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching admin dashboard:', err);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDashboardData();
  }, []);

  // Toggle tenant status
  const handleToggleTenant = async (id: string, currentStatus: string) => {
    const action = currentStatus === 'Active' ? 'suspend' : 'activate';
    try {
      const res = await fetch('/api/admin/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'tenant', targetId: id, action })
      });
      const data = await res.json();
      if (data.status === 'success') {
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Error toggling tenant status:', err);
    }
  };

  // Approve a pending tenant
  const handleApproveTenant = async (id: string) => {
    try {
      const res = await fetch('/api/admin/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'tenant', targetId: id, action: 'approve' })
      });
      const data = await res.json();
      if (data.status === 'success') {
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Error approving tenant:', err);
    }
  };

  // Handle moderation action
  const handleResolveFlag = async (id: string, action: 'keep' | 'delete') => {
    try {
      const res = await fetch('/api/admin/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'job', targetId: id, action })
      });
      const data = await res.json();
      if (data.status === 'success') {
        fetchDashboardData();
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
      activeItem="System Overview"
      headerTitle="Admin Systems Hub"
      headerSubtitle="Apply4Jobs SaaS System Oversight"
      planOrNodeName="Active"
    >
      {/* Row 1: KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {/* Stat 1 */}
        <div className="glass-panel" style={{ padding: '20px 25px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>Active Tenants</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#a78bfa', margin: '8px 0 0' }}>{kpis.activeTenants}</div>
        </div>
        {/* Stat 2 */}
        <div className="glass-panel" style={{ padding: '20px 25px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>Total Job Seekers</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#38bdf8', margin: '8px 0 0' }}>{kpis.totalJobSeekers}</div>
        </div>
        {/* Stat 3 */}
        <div className="glass-panel" style={{ padding: '20px 25px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>Active Listings</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#10b981', margin: '8px 0 0' }}>{kpis.activeListings}</div>
        </div>
        {/* Stat 4 */}
        <div className="glass-panel" style={{ padding: '20px 25px' }}>
          <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>Matching Queue</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#ff007f', margin: '8px 0 0' }}>{kpis.matchingQueue} jobs</div>
        </div>
      </div>

      {/* Primary Admin Grid Layout */}
      <div className="responsive-grid-2-1-2">
        
        {/* Left Column: Management Tables */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Widget 1: Tenant Management Table */}
          <div className="glass-panel" style={{ padding: '25px' }}>
            <h3 className="brand-title" style={{ margin: '0 0 16px', fontSize: '18px', textTransform: 'none' }}>Employer Tenants (Companies)</h3>
            <div className="table-responsive">
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #d0d7de' }}>
                    <th style={{ paddingBottom: '12px', color: '#94a3b8', fontWeight: 500, fontSize: '13px' }}>Company</th>
                    <th style={{ paddingBottom: '12px', color: '#94a3b8', fontWeight: 500, fontSize: '13px' }}>Domain</th>
                    <th style={{ paddingBottom: '12px', color: '#94a3b8', fontWeight: 500, fontSize: '13px' }}>Listings</th>
                    <th style={{ paddingBottom: '12px', color: '#94a3b8', fontWeight: 500, fontSize: '13px' }}>Status</th>
                    <th style={{ paddingBottom: '12px', color: '#94a3b8', fontWeight: 500, fontSize: '13px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tenants.map(t => (
                    <tr key={t.id} style={{ borderBottom: '1px solid #eaeef2' }}>
                      <td style={{ padding: '14px 0', fontSize: '13.5px', fontWeight: 600 }}>{t.name}</td>
                      <td style={{ padding: '14px 0', fontSize: '13.5px', color: '#94a3b8' }}>{t.domain}</td>
                      <td style={{ padding: '14px 0', fontSize: '13.5px' }}>{t.jobs}</td>
                      <td style={{ padding: '14px 0', fontSize: '13.5px' }}>
                        <span style={{
                          padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                          backgroundColor: t.status === 'Active' ? 'rgba(16, 185, 129, 0.15)' : t.status === 'Suspended' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                          color: t.status === 'Active' ? '#10b981' : t.status === 'Suspended' ? '#ef4444' : '#f59e0b'
                        }}>{t.status}</span>
                      </td>
                      <td style={{ padding: '14px 0', fontSize: '13.5px', textAlign: 'right' }}>
                        {t.status === 'Pending Approval' ? (
                          <button onClick={() => handleApproveTenant(t.id)} className="glow-btn" style={{ padding: '5px 10px', fontSize: '11px' }}>Approve</button>
                        ) : (
                          <button onClick={() => handleToggleTenant(t.id, t.status)} style={{
                            padding: '5px 10px', fontSize: '11px', borderRadius: '8px', border: '1px solid #d0d7de',
                            background: t.status === 'Active' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                            color: t.status === 'Active' ? '#ef4444' : '#10b981', cursor: 'pointer'
                          }}>
                            {t.status === 'Active' ? 'Suspend' : 'Activate'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Widget 2: Job Postings Moderation */}
          <div className="glass-panel" style={{ padding: '25px' }}>
            <h3 className="brand-title" style={{ margin: '0 0 16px', fontSize: '18px', textTransform: 'none' }}>Flagged Listings Console</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {flaggedJobs.map(job => (
                <div key={job.id} className="glass-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1, paddingRight: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>{job.title}</h4>
                      <span style={{ fontSize: '10px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>{job.flags} Flags</span>
                    </div>
                    <p style={{ margin: '5px 0 0', color: '#94a3b8', fontSize: '12px' }}>{job.company} &bull; <strong style={{ color: '#ff007f' }}>Reason: {job.reason}</strong></p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    <button onClick={() => handleResolveFlag(job.id, 'keep')} className="glow-btn" style={{ padding: '6px 12px', fontSize: '11px', background: '#10b981', boxShadow: 'none' }}>Keep</button>
                    <button onClick={() => handleResolveFlag(job.id, 'delete')} style={{ padding: '6px 12px', fontSize: '11px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', cursor: 'pointer' }}>Delete</button>
                  </div>
                </div>
              ))}
              {flaggedJobs.length === 0 && (
                <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>All flagged postings cleared! Clean queue.</div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: AI Engine Metrics & Audit Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Widget 3: AI Configuration */}
          <div className="glass-panel" style={{ padding: '25px' }}>
            <h3 className="brand-title" style={{ margin: '0 0 16px', fontSize: '18px', textTransform: 'none' }}>AI Core Configuration</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>Active LLM Classifier</label>
                <select 
                  value={aiModel} 
                  onChange={e => setAiModel(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d0d7de', background: '#ffffff', color: '#1f2328', fontSize: '13px', outline: 'none' }}
                >
                  <option value="gemini-2.5-pro">Gemini 2.5 Pro (Precision)</option>
                  <option value="gemini-2.5-flash">Gemini 2.5 Flash (Speed)</option>
                  <option value="custom-embedding">Custom Embeddings Server</option>
                </select>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>
                  <span>Min Match Threshold</span>
                  <span style={{ color: '#a78bfa', fontWeight: 600 }}>{matchThreshold}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="95" 
                  value={matchThreshold} 
                  onChange={e => setMatchThreshold(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#7c3aed', cursor: 'pointer' }}
                />
              </div>

              <button 
                onClick={() => { setQueueLength(0); alert('AI Job matching pipeline processed.'); }}
                className="glow-btn" 
                style={{ width: '100%', padding: '10px', fontSize: '13px' }}
              >
                Force Sync Match Queue
              </button>
            </div>
          </div>

          {/* Widget 4: System Audit Logs */}
          <div className="glass-panel" style={{ padding: '25px', display: 'flex', flexDirection: 'column', height: '320px' }}>
            <h3 className="brand-title" style={{ margin: '0 0 16px', fontSize: '18px', textTransform: 'none' }}>System Audit Logs</h3>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '11px', fontFamily: 'monospace', color: '#94a3b8' }}>
              {auditLogs.map((log) => (
                <div key={log.id} style={{ borderBottom: '1px solid #eaeef2', paddingBottom: '6px' }}>
                  <span style={{ color: '#a78bfa' }}>[{log.timestamp}]</span> {log.action}: {log.details}
                </div>
              ))}
              {auditLogs.length === 0 && (
                <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>No audit logs found.</div>
              )}
            </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
