"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

interface AlertItem {
  id: string;
  name: string;
  keywords: string;
  location: string;
  frequency: 'daily' | 'weekly';
  channels: string[];
}

const mockJobsDb = [
  { id: '1', title: 'React Frontend Developer', company: 'Google', location: 'Remote', salary: '$16k - $22k', category: 'Engineering' },
  { id: '2', title: 'Senior Product Designer', company: 'Spotify', location: 'Mumbai', salary: '$20k - $28k', category: 'Design' },
  { id: '3', title: 'Product Owner - AI Team', company: 'Microsoft', location: 'Bangalore', salary: '$25k - $35k', category: 'Product' },
  { id: '4', title: 'Fullstack NextJS Architect', company: 'Netflix', location: 'Remote', salary: '$28k - $36k', category: 'Engineering' },
  { id: '5', title: 'Lead UX Researcher', company: 'Airbnb', location: 'London', salary: '$18k - $24k', category: 'Design' }
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>([
    { id: 'alert-1', name: 'Engineering Remote Roles', keywords: 'React, NextJS', location: 'Remote', frequency: 'daily', channels: ['Email'] },
    { id: 'alert-2', name: 'Design in Bangalore', keywords: 'UX, Product Designer', location: 'Bangalore', frequency: 'weekly', channels: ['Email', 'Slack'] }
  ]);

  // Form states
  const [alertName, setAlertName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [channels, setChannels] = useState<string[]>(['Email']);

  // Match Preview
  const [previewJobs, setPreviewJobs] = useState<typeof mockJobsDb>([]);

  useEffect(() => {
    // Dynamically filter mock db based on keywords and location inputs
    const kw = keywords.toLowerCase().trim();
    const loc = location.toLowerCase().trim();

    if (kw === '' && loc === '') {
      setPreviewJobs(mockJobsDb.slice(0, 3));
    } else {
      const filtered = mockJobsDb.filter(job => {
        const matchesKw = kw === '' || job.title.toLowerCase().includes(kw) || job.category.toLowerCase().includes(kw);
        const matchesLoc = loc === '' || job.location.toLowerCase().includes(loc);
        return matchesKw && matchesLoc;
      });
      setPreviewJobs(filtered);
    }
  }, [keywords, location]);

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertName.trim()) {
      alert("Please enter a name for your job alert.");
      return;
    }

    const newAlert: AlertItem = {
      id: `alert-${Date.now()}`,
      name: alertName,
      keywords: keywords || 'Any keyword',
      location: location || 'Any location',
      frequency,
      channels
    };

    setAlerts(prev => [newAlert, ...prev]);
    // Reset inputs
    setAlertName('');
    setKeywords('');
    setLocation('');
    alert("Success! Your job alert has been successfully created and activated.");
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const toggleChannel = (chan: string) => {
    setChannels(prev => 
      prev.includes(chan) 
        ? prev.filter(c => c !== chan)
        : [...prev, chan]
    );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#0f172a', fontFamily: 'var(--font-nunito), Nunito, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        paddingTop: '140px',
        paddingBottom: '60px',
        background: 'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.06) 0%, rgba(255,255,255,1) 85%)',
        textAlign: 'center',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px', fontSize: '13px', color: '#0284c7', fontWeight: 600 }}>
          <span>🔔</span> Smart Alerts
        </div>
        <h1 style={{ margin: '0 0 20px', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-1px', color: '#0f172a' }}>
          Never miss an opportunity
        </h1>
        <p style={{ maxWidth: '580px', margin: '0 auto 40px', fontSize: '17px', color: '#475569', lineHeight: 1.6 }}>
          Configure custom search rules. Our AI filters incoming job posts and pings you the moment a verified match hits the criteria.
        </p>
      </section>

      {/* Dashboard Section */}
      <section style={{ padding: '20px 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'flex-start' }}>
          
          {/* Left Panel: Creator Form */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
            <h3 style={{ margin: '0 0 24px', fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>Create New Alert</h3>
            
            <form onSubmit={handleCreateAlert} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Alert Name</label>
                <input
                  type="text"
                  placeholder="e.g. Remote Frontend Jobs"
                  value={alertName}
                  onChange={(e) => setAlertName(e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Keywords / Skills</label>
                  <input
                    type="text"
                    placeholder="e.g. React, Python"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Location Preference</label>
                  <input
                    type="text"
                    placeholder="e.g. Remote, Mumbai"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Frequency</label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  {['daily', 'weekly'].map(freq => (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => setFrequency(freq as any)}
                      style={{
                        flex: 1,
                        background: frequency === freq ? 'rgba(124,58,237,0.08)' : '#ffffff',
                        border: `1px solid ${frequency === freq ? '#7c3aed' : '#cbd5e1'}`,
                        borderRadius: '10px',
                        padding: '12px',
                        color: frequency === freq ? '#7c3aed' : '#64748b',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                        outline: 'none',
                        fontFamily: 'inherit',
                        transition: 'all 0.2s'
                      }}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Notification Channels</label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {['Email', 'Slack', 'WhatsApp'].map(chan => {
                    const isChecked = channels.includes(chan);
                    return (
                      <button
                        key={chan}
                        type="button"
                        onClick={() => toggleChannel(chan)}
                        style={{
                          background: isChecked ? 'rgba(56,189,248,0.08)' : '#ffffff',
                          border: `1px solid ${isChecked ? '#0284c7' : '#cbd5e1'}`,
                          borderRadius: '10px',
                          padding: '10px 20px',
                          color: isChecked ? '#0284c7' : '#64748b',
                          fontWeight: 600,
                          fontSize: '13px',
                          cursor: 'pointer',
                          outline: 'none',
                          fontFamily: 'inherit',
                          transition: 'all 0.2s'
                        }}
                      >
                        {isChecked ? '✓ ' : ''}{chan}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(124,58,237,0.3)',
                  marginTop: '10px',
                  fontFamily: 'inherit'
                }}
              >
                Create Alert
              </button>
            </form>

            {/* Match Preview Box */}
            <div style={{ marginTop: '32px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                🟢 Real-Time Matches Simulator ({previewJobs.length})
              </div>
              
              {previewJobs.length === 0 ? (
                <div style={{ fontSize: '13px', color: '#64748b' }}>No current jobs match these filters. We will alert you when one is posted.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {previewJobs.map(job => (
                    <div key={job.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', border: '1px solid #e2e8f0', padding: '10px 14px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.01)' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{job.title}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{job.company} • {job.location}</div>
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981' }}>{job.salary}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Active Alerts List */}
          <div>
            <h3 style={{ margin: '0 0 24px', fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>Your Active Alerts ({alerts.length})</h3>
            
            {alerts.length === 0 ? (
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '40px', textAlign: 'center', color: '#64748b', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔔</div>
                <p style={{ margin: 0 }}>You have no configured job alerts.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {alerts.map(a => (
                  <div key={a.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>{a.name}</h4>
                      
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        <span style={{ fontSize: '12px', background: '#f1f5f9', padding: '3px 10px', borderRadius: '100px', color: '#64748b', fontWeight: 600 }}>
                          🔑 {a.keywords}
                        </span>
                        <span style={{ fontSize: '12px', background: '#f1f5f9', padding: '3px 10px', borderRadius: '100px', color: '#64748b', fontWeight: 600 }}>
                          📍 {a.location}
                        </span>
                        <span style={{ fontSize: '12px', background: '#f1f5f9', padding: '3px 10px', borderRadius: '100px', color: '#64748b', fontWeight: 600, textTransform: 'capitalize' }}>
                          ⏱️ {a.frequency}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>Channels:</span>
                        {a.channels.map(chan => (
                          <span key={chan} style={{ fontSize: '11px', background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.25)', padding: '2px 8px', borderRadius: '100px', color: '#0284c7', fontWeight: 600 }}>
                            {chan}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteAlert(a.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontSize: '18px',
                        padding: '4px',
                        outline: 'none',
                        fontFamily: 'inherit'
                      }}
                      title="Delete alert rule"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '32px 24px', textAlign: 'center', color: '#64748b', fontSize: '13px', backgroundColor: '#f8fafc' }}>
        © 2026 Apply4Jobs · <Link href="/privacy" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy</Link> · <Link href="/terms" style={{ color: '#64748b', textDecoration: 'none' }}>Terms</Link>
      </footer>
    </div>
  );
}
