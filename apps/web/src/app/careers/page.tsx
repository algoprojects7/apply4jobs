"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const departments = ['All', 'Engineering', 'Product', 'Design', 'Marketing', 'Operations', 'Sales'];

const openings = [
  { title: 'Senior AI/ML Engineer', dept: 'Engineering', location: 'Remote · Worldwide', type: 'Full-time', level: 'Senior', tags: ['Python', 'PyTorch', 'LLMs'] },
  { title: 'Staff Frontend Engineer', dept: 'Engineering', location: 'Remote · Worldwide', type: 'Full-time', level: 'Staff', tags: ['Next.js', 'TypeScript', 'React'] },
  { title: 'Product Manager — Candidate Experience', dept: 'Product', location: 'Remote · EMEA', type: 'Full-time', level: 'Mid', tags: ['B2C', 'AI Products', 'Analytics'] },
  { title: 'Senior Product Designer', dept: 'Design', location: 'Remote · Worldwide', type: 'Full-time', level: 'Senior', tags: ['Figma', 'Systems Design', 'UX Research'] },
  { title: 'Growth Marketing Manager', dept: 'Marketing', location: 'Remote · Americas', type: 'Full-time', level: 'Mid', tags: ['SEO', 'Content', 'PLG'] },
  { title: 'DevOps / Platform Engineer', dept: 'Engineering', location: 'Remote · Worldwide', type: 'Full-time', level: 'Senior', tags: ['Kubernetes', 'AWS', 'Terraform'] },
  { title: 'Enterprise Account Executive', dept: 'Sales', location: 'Remote · EMEA/Americas', type: 'Full-time', level: 'Senior', tags: ['SaaS', 'B2B', 'HR Tech'] },
  { title: 'Data Analyst — Talent Insights', dept: 'Operations', location: 'Remote · Worldwide', type: 'Full-time', level: 'Mid', tags: ['SQL', 'Tableau', 'Python'] },
];

const perks = [
  { icon: '🌍', title: 'Remote-first', desc: 'Work from anywhere. We have teammates across 24 countries.' },
  { icon: '💰', title: 'Competitive equity', desc: 'Meaningful ownership with every offer. We win together.' },
  { icon: '🏥', title: 'Premium health', desc: 'Full medical, dental, and vision — you and your family.' },
  { icon: '📚', title: '$3,000 L&D budget', desc: 'Annual budget for courses, conferences, and books.' },
  { icon: '🏖️', title: 'Unlimited PTO', desc: 'With a minimum 20-day annual vacation requirement.' },
  { icon: '🖥️', title: 'Home office stipend', desc: '$2,000 to set up your perfect work environment.' },
];

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState('All');
  const filtered = activeDept === 'All' ? openings : openings.filter(j => j.dept === activeDept);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#0f172a', fontFamily: 'var(--font-nunito), Nunito, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: '140px 24px 80px', textAlign: 'center', background: 'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.06) 0%, rgba(255,255,255,1) 85%)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px', fontSize: '13px', color: '#7c3aed', fontWeight: 600 }}>
          🌟 We're hiring
        </div>
        <h1 style={{ margin: '0 0 20px', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-1px', color: '#0f172a' }}>
          Build the future of work<br />
          <span style={{ background: 'linear-gradient(135deg, #7c3aed, #0284c7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>with us</span>
        </h1>
        <p style={{ maxWidth: '520px', margin: '0 auto', fontSize: '18px', color: '#475569', lineHeight: 1.7 }}>
          We're a remote-first team redefining how people find meaningful work. Join us in building AI that actually gets people.
        </p>
      </section>

      {/* Perks */}
      <section style={{ padding: '60px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ margin: 0, fontSize: '32px', fontWeight: 900, color: '#0f172a' }}>Why Apply4Jobs?</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {perks.map(p => (
            <div key={p.title} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{p.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '8px', color: '#0f172a' }}>{p.title}</div>
              <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Job Listings */}
      <section style={{ padding: '60px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 900, color: '#0f172a' }}>Open Roles <span style={{ color: '#7c3aed' }}>({filtered.length})</span></h2>
          {/* Department filter */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {departments.map(d => (
              <button key={d} onClick={() => setActiveDept(d)} style={{
                padding: '6px 14px', borderRadius: '20px', border: '1px solid',
                borderColor: activeDept === d ? '#7c3aed' : '#e2e8f0',
                background: activeDept === d ? 'rgba(124,58,237,0.08)' : '#ffffff',
                color: activeDept === d ? '#7c3aed' : '#64748b',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                outline: 'none', transition: 'all 0.2s'
              }}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((job, i) => (
            <div key={i} style={{
              background: '#ffffff', border: '1px solid #e2e8f0',
              borderRadius: '14px', padding: '20px 24px', display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
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
              <div>
                <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '6px', color: '#0f172a' }}>{job.title}</div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '13px', color: '#64748b', marginBottom: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {job.location}
                  </span>
                  <span>{job.type}</span>
                  <span style={{ color: '#7c3aed', fontWeight: 600 }}>{job.level}</span>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {job.tags.map(t => (
                    <span key={t} style={{ padding: '3px 10px', background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '20px', fontSize: '11px', color: '#7c3aed', fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
              </div>
              <Link href="/contact" style={{ padding: '10px 22px', borderRadius: '8px', background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '14px', whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(124,58,237,0.3)' }}>
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '32px 24px', textAlign: 'center', color: '#64748b', fontSize: '13px', backgroundColor: '#f8fafc' }}>
        © 2026 Apply4Jobs · <Link href="/privacy" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy</Link> · <Link href="/terms" style={{ color: '#64748b', textDecoration: 'none' }}>Terms</Link>
      </footer>
    </div>
  );
}
