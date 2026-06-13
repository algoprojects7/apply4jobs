"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const stats = [
  { value: '2.4M+', label: 'Job Seekers' },
  { value: '48K+', label: 'Companies' },
  { value: '1.2M+', label: 'Jobs Posted' },
  { value: '97%', label: 'Match Accuracy' },
];

const team = [
  { name: 'Hassan Mirza', title: 'CEO & Co-Founder', avatar: 'HM', color: '#7c3aed' },
  { name: 'Sarah Chen', title: 'CTO & Co-Founder', avatar: 'SC', color: '#0ea5e9' },
  { name: 'David Park', title: 'Head of AI/ML', avatar: 'DP', color: '#10b981' },
  { name: 'Aisha Rahman', title: 'VP of Product', avatar: 'AR', color: '#f59e0b' },
  { name: 'Marco Silva', title: 'Head of Design', avatar: 'MS', color: '#ec4899' },
  { name: 'Lena Fischer', title: 'VP of Engineering', avatar: 'LF', color: '#8b5cf6' },
];

const values = [
  { icon: '🎯', title: 'Mission-Driven', desc: 'We believe everyone deserves access to meaningful work. Our AI closes the gap between talent and opportunity.' },
  { icon: '🤝', title: 'Radical Transparency', desc: 'No black boxes. Candidates see exactly why they matched a job. Employers see what drives every recommendation.' },
  { icon: '⚡', title: 'Speed & Precision', desc: 'Apply4Jobs reduces average time-to-hire by 68% while improving candidate quality through deep skill matching.' },
  { icon: '🌍', title: 'Inclusive by Design', desc: 'Our algorithms are bias-audited quarterly. We build for diversity, equity, and belonging from the ground up.' },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#0f172a', fontFamily: 'var(--font-nunito), Nunito, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        paddingTop: '140px',
        paddingBottom: '80px',
        background: 'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.06) 0%, rgba(255,255,255,1) 85%)',
        textAlign: 'center',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px', fontSize: '13px', color: '#7c3aed', fontWeight: 600 }}>
          <span>🚀</span> Our Story
        </div>
        <h1 style={{ margin: '0 0 20px', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-1px', color: '#0f172a' }}>
          Hiring, reimagined<br />
          <span style={{ background: 'linear-gradient(135deg, #7c3aed, #0284c7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            with the power of AI
          </span>
        </h1>
        <p style={{ maxWidth: '580px', margin: '0 auto 40px', fontSize: '18px', color: '#475569', lineHeight: 1.7 }}>
          Apply4Jobs was founded with one belief: the right job should find you — not the other way around. We build AI that understands people, not just resumes.
        </p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '24px', maxWidth: '700px', margin: '0 auto' }}>
          {stats.map(s => (
            <div key={s.value} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px 16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '32px', fontWeight: 900, background: 'linear-gradient(135deg, #7c3aed, #0284c7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>Our Mission</div>
            <h2 style={{ margin: '0 0 20px', fontSize: '36px', fontWeight: 900, lineHeight: 1.2, color: '#0f172a' }}>
              Making the world's job market work better for everyone
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
              Traditional job boards are broken. Candidates spend hours tailoring resumes for ATS filters that were never designed to understand human potential. Employers drown in irrelevant applications.
            </p>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8 }}>
              We built Apply4Jobs to fix this — using large language models and proprietary skill-graph technology to create meaningful connections between people and opportunities at scale.
            </p>
          </div>
          <div className="responsive-grid-1-1" style={{ gap: '16px' }}>
            {values.map(v => (
              <div key={v.title} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>{v.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px', color: '#0f172a' }}>{v.title}</div>
                <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '80px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>The Team</div>
            <h2 style={{ margin: 0, fontSize: '36px', fontWeight: 900, color: '#0f172a' }}>Built by people who care</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {team.map(m => (
              <div key={m.name} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '28px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: m.color, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '20px', margin: '0 auto 16px', boxShadow: `0 4px 14px ${m.color}30` }}>
                  {m.avatar}
                </div>
                <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px', color: '#0f172a' }}>{m.name}</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>{m.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 16px', fontSize: '32px', fontWeight: 900, color: '#0f172a' }}>Ready to find your next opportunity?</h2>
        <p style={{ color: '#475569', marginBottom: '32px', fontSize: '16px' }}>Join 2.4 million job seekers already using Apply4Jobs.</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/register" style={{ padding: '14px 32px', borderRadius: '10px', background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '15px', boxShadow: '0 4px 20px rgba(124,58,237,0.3)' }}>
            Get Started Free
          </Link>
          <Link href="/contact" style={{ padding: '14px 32px', borderRadius: '10px', border: '1px solid #cbd5e1', color: '#0f172a', textDecoration: 'none', fontWeight: 600, fontSize: '15px', background: '#ffffff', transition: 'background-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}>
            Contact Us
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '32px 24px', textAlign: 'center', color: '#64748b', fontSize: '13px', backgroundColor: '#f8fafc' }}>
        © 2026 Apply4Jobs · <Link href="/privacy" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy</Link> · <Link href="/terms" style={{ color: '#64748b', textDecoration: 'none' }}>Terms</Link>
      </footer>
    </div>
  );
}
