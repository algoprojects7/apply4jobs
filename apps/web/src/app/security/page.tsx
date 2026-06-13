"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const pillars = [
  { icon: '🔒', title: 'Data Encryption', desc: 'All personal profiles, CV files, and chats are encrypted in transit using TLS 1.3 and at rest using AES-256 standard key management.' },
  { icon: '🛡️', title: 'Employer Verification', desc: 'Every registered hiring organization undergoes strict business registry audit and domain validation checks before they are permitted to post active vacancies.' },
  { icon: '⚖️', title: 'AI Bias Audits', desc: 'Our machine learning matching algorithms undergo quarterly third-party bias audits to ensure fair, candidate-first recommendations without demographic preference.' },
  { icon: '🔑', title: 'Secure Authentication', desc: 'We support Multi-Factor Authentication (MFA), passwordless sign-ins, and Single Sign-On (SSO) systems to secure corporate and applicant profiles.' }
];

const safetyTips = [
  { q: '⚠️ Apply4Jobs is 100% Free for Seekers', a: 'We never charge candidates for job listings, applications, or matching scores. If an employer or agent asks for payment to process an application or resume review under our brand, report them immediately.' },
  { q: '💬 Keep Communications in the App', a: 'We strongly recommend utilizing our built-in messenger to chat with recruiters. Be extremely cautious if requested to move to external platforms like Telegram or WhatsApp immediately.' },
  { q: '⛔ Guard Sensitive Personal Data', a: 'Do not supply bank routing details, passport scans, tax numbers, or driver\'s license files during early-stage interviews. Verification documents should only be processed after formal contracts are issued.' }
];

export default function SecurityPage() {
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
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px', fontSize: '13px', color: '#059669', fontWeight: 600 }}>
          <span>🛡️</span> Security Center
        </div>
        <h1 style={{ margin: '0 0 20px', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-1px', color: '#0f172a' }}>
          Trust & Safety at Apply4Jobs
        </h1>
        <p style={{ maxWidth: '580px', margin: '0 auto 40px', fontSize: '17px', color: '#475569', lineHeight: 1.6 }}>
          We employ state-of-the-art technical protections and strict operational policies to keep your professional database and hiring secure.
        </p>
      </section>

      {/* Security Pillars Grid */}
      <section style={{ padding: '40px 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {pillars.map((p, idx) => (
            <div key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{p.icon}</div>
              <h3 style={{ margin: '0 0 10px', fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>{p.title}</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Safe Searching Guide */}
      <section style={{ padding: '80px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>For Candidates</div>
            <h2 style={{ margin: 0, fontSize: '32px', fontWeight: 900, color: '#0f172a' }}>Safe Job Searching Guide</h2>
            <p style={{ color: '#64748b', fontSize: '15px', marginTop: '10px' }}>Keep these essential warning signs in mind during your job search process.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {safetyTips.map((tip, idx) => (
              <div key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px 32px', boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }}>
                <h4 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{tip.q}</h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>{tip.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bug Bounty Program / Contact */}
      <section style={{ padding: '80px 24px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🐛</div>
        <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px', color: '#0f172a' }}>Vulnerability Disclosure</h2>
        <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>
          Are you a security researcher? We believe in responsible disclosure. If you spot a vulnerability on our domains, please contact our cybersecurity response desk first. We review submissions and reward eligible findings.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => alert("Redirecting you to our disclosure guidelines at security@apply4jobs.ai...")} style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', border: 'none', padding: '12px 28px', borderRadius: '10px', color: '#ffffff', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(124,58,237,0.3)', fontFamily: 'inherit', outline: 'none' }}>
            Read Disclosure Guidelines
          </button>
          <Link href="/contact" style={{ padding: '12px 28px', borderRadius: '10px', border: '1px solid #cbd5e1', color: '#0f172a', textDecoration: 'none', fontWeight: 600, fontSize: '14px', background: '#ffffff', transition: 'background-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff'}>
            Contact Security Team
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
