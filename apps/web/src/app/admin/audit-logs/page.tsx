"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function AdminAuditLogs() {
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') {
          setAuditLogs(res.data.auditLogs);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching logs:', err);
        setLoading(false);
      });
  }, []);

  return (
    <DashboardLayout
      role="admin"
      activeItem="Audit Logs"
      headerTitle="System Audit Logs"
      headerSubtitle="Security audits and multi-tenant activity transaction logs."
      planOrNodeName="Active"
    >
      <div className="glass-panel" style={{ padding: '30px', maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: '480px' }}>
        <h3 className="brand-title" style={{ margin: '0 0 15px', fontSize: '18px', textTransform: 'none' }}>System Audit Logs</h3>
        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#57606a' }}>Loading audit files...</div>
        ) : (
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px', fontFamily: 'monospace', color: '#57606a' }}>
            {auditLogs.map((log) => (
              <div key={log.id} style={{ borderBottom: '1px solid #eaeef2', paddingBottom: '8px' }}>
                <span style={{ color: '#0969da' }}>[{log.timestamp}]</span> <strong style={{ color: '#1f2328' }}>{log.action}</strong>: {log.details}
              </div>
            ))}
            {auditLogs.length === 0 && (
              <div style={{ padding: '20px', textAlign: 'center', color: '#656d76' }}>No active audit logs found.</div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
