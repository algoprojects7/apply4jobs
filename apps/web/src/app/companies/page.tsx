"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch('/api/companies')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') {
          setCompanies(res.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching companies:', err);
        setLoading(false);
      });
  }, []);

  const filteredCompanies = companies.filter(comp =>
    comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comp.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#0f172a', fontFamily: 'var(--font-nunito), Nunito, sans-serif' }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        paddingTop: '140px',
        paddingBottom: '60px',
        background: 'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.06) 0%, rgba(255,255,255,1) 85%)',
        textAlign: 'center',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px', fontSize: '13px', color: '#7c3aed', fontWeight: 600 }}>
          <span>🏢</span> Partner Directory
        </div>
        <h1 style={{ margin: '0 0 20px', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-1px', color: '#0f172a' }}>
          Explore Top Companies
        </h1>
        <p style={{ maxWidth: '580px', margin: '0 auto 40px', fontSize: '17px', color: '#475569', lineHeight: 1.6 }}>
          Discover multi-tenant organizations, tech startups, and local businesses recruiting candidates with Apply4Jobs AI engine.
        </p>

        {/* Search Bar */}
        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
          <span style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', color: '#64748b' }}>🔍</span>
          <input
            type="text"
            placeholder="Search companies by name or industry sector..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 20px 16px 52px',
              borderRadius: '16px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              color: '#0f172a',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              fontFamily: 'inherit',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(124,58,237,0.5)';
              e.target.style.boxShadow = '0 0 15px rgba(124,58,237,0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#cbd5e1';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      </section>

      {/* Main Content Section */}
      <section style={{ padding: '40px 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {loading ? (
            <div style={{ gridColumn: '1 / -1', padding: '80px 0', textAlign: 'center', color: '#7c3aed', fontSize: '15px', fontWeight: 600 }}>
              Retrieving companies from directory...
            </div>
          ) : (
            filteredCompanies.map(comp => (
              <div key={comp.id} style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                position: 'relative'
              }}>
                {/* Header block with Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: comp.logoBg || '#7c3aed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '18px',
                    color: '#ffffff'
                  }}>
                    {comp.initial}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>{comp.name}</h3>
                    <span style={{ fontSize: '13px', color: '#64748b' }}>{comp.domain}</span>
                  </div>
                </div>

                {/* Info Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px' }}>
                    <span style={{ color: '#475569', fontWeight: 500 }}>Industry Sector</span>
                    <span style={{ color: '#0f172a', fontWeight: 700 }}>{comp.sector}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px' }}>
                    <span style={{ color: '#475569', fontWeight: 500 }}>Open Positions</span>
                    <span style={{ color: '#7c3aed', fontWeight: 800 }}>{comp.openJobs} jobs</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px' }}>
                    <span style={{ color: '#475569', fontWeight: 500 }}>AI Match Rating</span>
                    <span style={{ color: '#10b981', fontWeight: 800 }}>{comp.matchedRate}%</span>
                  </div>
                </div>

                <div style={{ marginTop: '10px' }}>
                  <Link href="/jobs" style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '12px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    boxShadow: '0 4px 15px rgba(124,58,237,0.15)',
                    transition: 'all 0.2s ease'
                  }}>
                    View Open Openings
                  </Link>
                </div>
              </div>
            ))
          )}
          {!loading && filteredCompanies.length === 0 && (
            <div style={{ gridColumn: '1 / -1', padding: '60px 0', textAlign: 'center', color: '#64748b', fontSize: '15px' }}>
              No companies found matching your search.
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '32px 24px', textAlign: 'center', color: '#64748b', fontSize: '13px', backgroundColor: '#f8fafc' }}>
        © 2026 Apply4Jobs · <Link href="/privacy" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy</Link> · <Link href="/terms" style={{ color: '#64748b', textDecoration: 'none' }}>Terms</Link>
      </footer>
    </div>
  );
}
