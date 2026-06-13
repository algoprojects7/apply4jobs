"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const pressReleases = [
  {
    date: 'Jun 10, 2026',
    title: 'Apply4Jobs Raises $42M Series B to Accelerate AI Hiring Platform Globally',
    summary: 'Funding led by Andreessen Horowitz, with participation from Sequoia Capital. Proceeds will fund expansion into APAC and MENA markets.',
    source: 'TechCrunch',
    sourceColor: '#00a35c',
    href: '#',
  },
  {
    date: 'Apr 22, 2026',
    title: 'Apply4Jobs Surpasses 2 Million Active Job Seekers Milestone',
    summary: 'Platform growth accelerated 3x year-over-year following launch of AI Career Coach and real-time job matching features.',
    source: 'VentureBeat',
    sourceColor: '#0066cc',
    href: '#',
  },
  {
    date: 'Mar 5, 2026',
    title: 'Apply4Jobs Named One of Fast Company\'s Most Innovative Companies 2026',
    summary: 'Recognised in the AI & Machine Learning category for pioneering skill-graph-based candidate matching.',
    source: 'Fast Company',
    sourceColor: '#cc4400',
    href: '#',
  },
  {
    date: 'Jan 18, 2026',
    title: 'Apply4Jobs Partners with 50 Fortune 500 Companies for Enterprise Hiring',
    summary: 'New enterprise tier rolls out to global companies including major tech, finance, and healthcare organisations.',
    source: 'Reuters',
    sourceColor: '#cc6600',
    href: '#',
  },
];

const mediaMentions = [
  { outlet: 'Forbes', logo: 'F', quote: '"The most sophisticated AI hiring platform we\'ve seen in a decade."' },
  { outlet: 'Wired', logo: 'W', quote: '"Apply4Jobs is doing for hiring what Google did for search."' },
  { outlet: 'The Verge', logo: 'V', quote: '"Finally, an ATS that actually works for candidates."' },
  { outlet: 'Bloomberg', logo: 'B', quote: '"The HR Tech disruptor to watch in 2026."' },
];

export default function PressPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#0f172a', fontFamily: 'var(--font-nunito), Nunito, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: '140px 24px 80px', textAlign: 'center', background: 'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.06) 0%, rgba(255,255,255,1) 85%)' }}>
        <h1 style={{ margin: '0 0 16px', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, letterSpacing: '-0.5px', color: '#0f172a' }}>
          Press & Media
        </h1>
        <p style={{ maxWidth: '520px', margin: '0 auto 40px', fontSize: '17px', color: '#475569', lineHeight: 1.7 }}>
          News, press releases, and media resources for journalists and analysts covering Apply4Jobs.
        </p>
        <Link href="mailto:press@apply4jobs.com" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '12px 28px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
          color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '15px',
          boxShadow: '0 4px 20px rgba(124,58,237,0.3)',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          press@apply4jobs.com
        </Link>
      </section>

      {/* Media Logos */}
      <section style={{ padding: '0 24px 60px', maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', fontSize: '13px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '32px' }}>
          As seen in
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {mediaMentions.map(m => (
            <div key={m.outlet} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#64748b', marginBottom: '12px' }}>{m.outlet}</div>
              <p style={{ margin: 0, fontSize: '12px', color: '#475569', lineHeight: 1.6, fontStyle: 'italic' }}>{m.quote}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Press Releases */}
      <section style={{ padding: '60px 24px 80px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ margin: '0 0 40px', fontSize: '28px', fontWeight: 900, color: '#0f172a' }}>Press Releases</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {pressReleases.map((pr, i) => (
            <a key={i} href={pr.href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#ffffff', border: '1px solid #e2e8f0',
                borderRadius: '16px', padding: '28px',
                transition: 'all 0.2s', cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.01)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
                e.currentTarget.style.background = 'rgba(124,58,237,0.01)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.03)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.01)';
              }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: pr.sourceColor }}>{pr.source}</span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>{pr.date}</span>
                </div>
                <h3 style={{ margin: '0 0 10px', fontSize: '18px', fontWeight: 700, lineHeight: 1.4, color: '#0f172a' }}>{pr.title}</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>{pr.summary}</p>
                <div style={{ marginTop: '16px', fontSize: '13px', color: '#7c3aed', fontWeight: 700 }}>Read full release →</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Media Kit */}
      <section style={{ padding: '60px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: '28px', fontWeight: 900, color: '#0f172a' }}>Media Kit</h2>
          <p style={{ color: '#475569', marginBottom: '32px', fontSize: '15px', lineHeight: 1.7 }}>
            Download our logos, brand guidelines, product screenshots, and executive headshots for publication.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Brand Assets (.zip)', 'Logo Pack (.svg)', 'Executive Bios'].map(item => (
              <button key={item} style={{
                padding: '10px 22px', borderRadius: '10px', border: '1px solid #cbd5e1',
                background: '#ffffff', color: '#0f172a', fontWeight: 600, fontSize: '14px',
                cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px',
                outline: 'none', transition: 'background-color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff'}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                {item}
              </button>
            ))}
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
