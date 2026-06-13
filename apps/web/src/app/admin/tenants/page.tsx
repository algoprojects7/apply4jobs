"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function AdminTenants() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTenants = async () => {
    try {
      const res = await fetch('/api/admin/dashboard');
      const data = await res.json();
      if (data.status === 'success') {
        setTenants(data.data.tenants);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tenants:', err);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchTenants();
  }, []);

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
        fetchTenants();
      }
    } catch (err) {
      console.error('Error toggling tenant status:', err);
    }
  };

  const handleApproveTenant = async (id: string) => {
    try {
      const res = await fetch('/api/admin/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'tenant', targetId: id, action: 'approve' })
      });
      const data = await res.json();
      if (data.status === 'success') {
        fetchTenants();
      }
    } catch (err) {
      console.error('Error approving tenant:', err);
    }
  };

  return (
    <DashboardLayout
      role="admin"
      activeItem="Tenant Management"
      headerTitle="Tenant Management"
      headerSubtitle="Verify and review multi-tenant corporate employer spaces."
      planOrNodeName="Active"
    >
      <div className="glass-panel" style={{ padding: '30px', maxWidth: '950px', margin: '0 auto' }}>
        <h3 className="brand-title" style={{ margin: '0 0 20px', fontSize: '18px', textTransform: 'none' }}>Registered Employer Spaces</h3>
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#57606a' }}>Loading tenants records...</div>
        ) : (
          <div className="table-responsive">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #d0d7de' }}>
                  <th style={{ padding: '0 8px 12px', color: '#57606a', fontWeight: 600, fontSize: '13.5px' }}>Company</th>
                  <th style={{ padding: '0 8px 12px', color: '#57606a', fontWeight: 600, fontSize: '13.5px' }}>Domain</th>
                  <th style={{ padding: '0 8px 12px', color: '#57606a', fontWeight: 600, fontSize: '13.5px' }}>Listings Count</th>
                  <th style={{ padding: '0 8px 12px', color: '#57606a', fontWeight: 600, fontSize: '13.5px' }}>Status</th>
                  <th style={{ padding: '0 8px 12px', color: '#57606a', fontWeight: 600, fontSize: '13.5px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map(t => (
                  <tr key={t.id} style={{ borderBottom: '1px solid #eaeef2' }}>
                    <td style={{ padding: '14px 8px', fontSize: '14px', fontWeight: 600 }}>{t.name}</td>
                    <td style={{ padding: '14px 8px', fontSize: '14px', color: '#57606a' }}>{t.domain}</td>
                    <td style={{ padding: '14px 8px', fontSize: '14px' }}>{t.jobs}</td>
                    <td style={{ padding: '14px 8px', fontSize: '14px' }}>
                      <span style={{
                        padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                        backgroundColor: t.status === 'Active' ? 'rgba(26, 127, 55, 0.15)' : t.status === 'Suspended' ? 'rgba(209, 26, 26, 0.15)' : 'rgba(217, 119, 6, 0.15)',
                        color: t.status === 'Active' ? '#1a7f37' : t.status === 'Suspended' ? '#d11a1a' : '#d97706'
                      }}>{t.status}</span>
                    </td>
                    <td style={{ padding: '14px 8px', fontSize: '14px', textAlign: 'right' }}>
                      {t.status === 'Pending Approval' ? (
                        <button onClick={() => handleApproveTenant(t.id)} className="glow-btn" style={{ padding: '6px 12px', fontSize: '11.5px' }}>Approve</button>
                      ) : (
                        <button onClick={() => handleToggleTenant(t.id, t.status)} style={{
                          padding: '6px 12px', fontSize: '11.5px', borderRadius: '8px', border: '1px solid #d0d7de',
                          background: t.status === 'Active' ? 'rgba(209, 26, 26, 0.1)' : 'rgba(26, 127, 55, 0.1)',
                          color: t.status === 'Active' ? '#d11a1a' : '#1a7f37', cursor: 'pointer'
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
        )}
      </div>
    </DashboardLayout>
  );
}
