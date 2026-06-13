"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const privacySections = [
  { id: 'collect', title: '1. Information We Collect' },
  { id: 'use', title: '2. How We Use Information' },
  { id: 'share', title: '3. Sharing Your Information' },
  { id: 'security', title: '4. Data Security & Storage' },
  { id: 'rights', title: '5. Your Rights & Choices' },
  { id: 'contact-info', title: '6. Contact Information' }
];

export default function PrivacyPage() {
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
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px', fontSize: '13px', color: '#0284c7', fontWeight: 600 }}>
          <span>🔒</span> Trust & Safety
        </div>
        <h1 style={{ margin: '0 0 16px', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, lineHeight: 1.1, color: '#0f172a' }}>
          Privacy Policy
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
            {privacySections.map(s => (
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
              At Apply4Jobs, we are dedicated to protecting your privacy. This policy explains what information we collect, how it is processed and shared, and your rights concerning your personal data.
            </p>

            {/* Section 1 */}
            <div id="collect" style={{ marginBottom: '40px', scrollMarginTop: '100px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>1. Information We Collect</h2>
              <p>We collect information you provide directly to us when creating a candidate or employer account, uploading files, or communicating with us.</p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li style={{ marginBottom: '8px' }}><strong style={{ color: '#0f172a' }}>Account Profile Information:</strong> Name, email address, password, gender, phone number, and physical address.</li>
                <li style={{ marginBottom: '8px' }}><strong style={{ color: '#0f172a' }}>Resumes & Career Documents:</strong> Uploaded PDF/DOCX resumes, past work experience details, skills list, educational background, and certifications.</li>
                <li style={{ marginBottom: '8px' }}><strong style={{ color: '#0f172a' }}>Employer Data:</strong> Business name, tax registration number, website URL, and company profile descriptions.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div id="use" style={{ marginBottom: '40px', scrollMarginTop: '100px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>2. How We Use Information</h2>
              <p>We process your personal information under the following purposes:</p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li style={{ marginBottom: '8px' }}>To generate personalized AI job matching scores based on skills analysis.</li>
                <li style={{ marginBottom: '8px' }}>To display matching candidates to prospective employers seeking specific skill sets.</li>
                <li style={{ marginBottom: '8px' }}>To send transactional emails, alerts for new job postings, and critical security alerts.</li>
                <li style={{ marginBottom: '8px' }}>To detect and prevent fraudulent account activities or job scams.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div id="share" style={{ marginBottom: '40px', scrollMarginTop: '100px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>3. Sharing Your Information</h2>
              <p>We never sell your personal information to third parties. We share your information only in the following scenarios:</p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li style={{ marginBottom: '8px' }}><strong style={{ color: '#0f172a' }}>With Employers:</strong> When you apply to a job posting, or if your candidate profile matches search parameters and your privacy setting is set to public.</li>
                <li style={{ marginBottom: '8px' }}><strong style={{ color: '#0f172a' }}>Service Providers:</strong> Third-party hosts (database providers, email delivery platforms) acting strictly under our instructions.</li>
                <li style={{ marginBottom: '8px' }}><strong style={{ color: '#0f172a' }}>Legal Requirements:</strong> If required by law, subpoena, or regulation to protect our users and rights.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div id="security" style={{ marginBottom: '40px', scrollMarginTop: '100px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>4. Data Security & Storage</h2>
              <p>
                We prioritize secure storage solutions. All candidate profiles, resumes, and corporate details are protected by advanced cryptographic measures. Password fields are hashed using high-cost algorithms (bcrypt). Sessions are managed using cryptographic tokens verifying identity securely across our API routing layer.
              </p>
              <p style={{ marginTop: '12px' }}>
                Data is stored in cloud servers located in premium secure zones. We perform continuous vulnerability testing and security Auditing.
              </p>
            </div>

            {/* Section 5 */}
            <div id="rights" style={{ marginBottom: '40px', scrollMarginTop: '100px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>5. Your Rights & Choices</h2>
              <p>Depending on your location, you may have the following data protection rights:</p>
              <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                <li style={{ marginBottom: '8px' }}>The right to access, update, or delete the personal information we hold on you.</li>
                <li style={{ marginBottom: '8px' }}>The right to object to the processing of your data, or request data portability exports.</li>
                <li style={{ marginBottom: '8px' }}>The right to opt-out of newsletter list subscriptions and job alert notifications.</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div id="contact-info" style={{ marginBottom: '40px', scrollMarginTop: '100px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>6. Contact Information</h2>
              <p>
                If you have questions, comments, or complaints about this Privacy Policy, please contact our Data Protection Officer at:
              </p>
              <div style={{ marginTop: '16px', background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <strong>Apply4Jobs Trust Team</strong><br />
                Email: privacy@apply4jobs.ai<br />
                Address: Algoguido Technologies HQ, Cyber City, Phase-II, Bangalore, India.
              </div>
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
