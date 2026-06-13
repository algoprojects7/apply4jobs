"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const termsSections = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'registration', title: '2. Account Registration' },
  { id: 'rules', title: '3. Platform Rules & Conduct' },
  { id: 'ip', title: '4. Intellectual Property' },
  { id: 'liability', title: '5. Limitation of Liability' },
  { id: 'termination', title: '6. Termination of Service' }
];

export default function TermsPage() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.15)', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px', fontSize: '13px', color: '#7c3aed', fontWeight: 600 }}>
          <span>📜</span> Legal Documents
        </div>
        <h1 style={{ margin: '0 0 16px', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, lineHeight: 1.1, color: '#0f172a' }}>
          Terms of Service
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px', fontWeight: 600 }}>
          Last Updated: June 12, 2026
        </p>
      </section>

      {/* Main Content & Sidebar */}
      <section style={{ padding: '60px 24px 100px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Sidebar - Quick Nav */}
          <aside style={{
            position: 'sticky',
            top: '100px',
            width: '240px',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '20px',
            boxSizing: 'border-box',
            boxShadow: '0 2px 8px rgba(0,0,0,0.01)'
          }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Quick Navigation</h4>
            {termsSections.map(s => (
              <button
                key={s.id}
                onClick={() => handleScroll(s.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  textAlign: 'left',
                  fontSize: '14px',
                  cursor: 'pointer',
                  padding: '4px 0',
                  outline: 'none',
                  fontFamily: 'inherit',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#7c3aed'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
              >
                {s.title}
              </button>
            ))}
          </aside>

          {/* Legal text content */}
          <div style={{ flex: 1, minWidth: '320px', lineHeight: 1.8, fontSize: '15px', color: '#334155' }}>
            <p style={{ fontSize: '16px', color: '#475569', marginBottom: '32px' }}>
              Welcome to Apply4Jobs. Please read these Terms of Service carefully before accessing or using our AI-driven job placement website. By using our platform, you agree to comply with and be bound by these terms.
            </p>

            {/* Section 1 */}
            <div id="acceptance" style={{ marginBottom: '40px', scrollMarginTop: '100px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>1. Acceptance of Terms</h2>
              <p>
                By accessing, browsing, or utilizing the Apply4Jobs application services (including mobile wrappers, API hooks, and website dashboards), you confirm that you have read, understood, and agreed to be legally bound by these terms. If you do not agree, please discontinue use immediately.
              </p>
            </div>

            {/* Section 2 */}
            <div id="registration" style={{ marginBottom: '40px', scrollMarginTop: '100px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>2. Account Registration</h2>
              <p>
                To utilize the dashboard tools, you must register an account:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li style={{ marginBottom: '8px' }}>You must provide true, current, and complete details in the profile inputs.</li>
                <li style={{ marginBottom: '8px' }}>You are solely responsible for maintaining password confidentiality and session safety.</li>
                <li style={{ marginBottom: '8px' }}>Candidates may not create multiple profiles or impersonate other professionals.</li>
                <li style={{ marginBottom: '8px' }}>Employers must register using verified company domains. Personal email registrations (Gmail, Yahoo, etc.) are subject to review and verification deletion.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div id="rules" style={{ marginBottom: '40px', scrollMarginTop: '100px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>3. Platform Rules & Conduct</h2>
              <p>You agree not to engage in the following prohibited behaviors:</p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li style={{ marginBottom: '8px' }}>Posting false, misleading, or deceptive job vacancies or candidate backgrounds.</li>
                <li style={{ marginBottom: '8px' }}>Using automated scrapers, crawlers, or AI bots to extract database CV lists or job listings without written approval.</li>
                <li style={{ marginBottom: '8px' }}>Uploading malicious scripts, malware, or exploiting system routes (dashboard access, password resets, file upload targets).</li>
                <li style={{ marginBottom: '8px' }}>Posting offensive, discriminatory, or harassing content.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div id="ip" style={{ marginBottom: '40px', scrollMarginTop: '100px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>4. Intellectual Property</h2>
              <p>
                The Apply4Jobs branding, logo concepts, styling algorithms, matching models, code bases, and software assets are the exclusive intellectual property of Algoguido Technologies. You are granted a limited, non-transferable, revocable license to access our platform services for professional job search and matching operations.
              </p>
            </div>

            {/* Section 5 */}
            <div id="liability" style={{ marginBottom: '40px', scrollMarginTop: '100px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>5. Limitation of Liability</h2>
              <p>
                Apply4Jobs is provided "as is" and "as available". We do not guarantee job seeker hiring placement, employer hire retention, matching accuracy, or service uptime. Under no circumstances shall Algoguido Technologies be held liable for indirect, incidental, or consequential damages resulting from platform matching choices, job search outcomes, or security breaches.
              </p>
            </div>

            {/* Section 6 */}
            <div id="termination" style={{ marginBottom: '40px', scrollMarginTop: '100px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>6. Termination of Service</h2>
              <p>
                We reserve the right to suspend, terminate, or delete your account access to Apply4Jobs at our sole discretion, without notice, if we believe you are in breach of these terms, or if your platform activity poses a security threat to other members.
              </p>
            </div>

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
