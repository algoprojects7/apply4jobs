"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const featuresList = [
  { name: 'Active Job Postings', starter: '3 Posts', pro: 'Unlimited', enterprise: 'Unlimited' },
  { name: 'AI Match Analysis Depth', starter: 'Basic Match', pro: 'Full Semantic Score + Explanations', enterprise: 'Full Semantic Score + Custom Criteria matching' },
  { name: 'Candidate Search Pipeline', starter: 'No Search Access', pro: 'Up to 500 searches/mo', enterprise: 'Unlimited API + pipeline integration' },
  { name: 'Applicant Exports', starter: 'Manual web view', pro: 'ZIP, CSV/Excel downloads', enterprise: 'Direct integration with custom ATS' },
  { name: 'Employer Branding', starter: 'Standard profile', pro: 'Enhanced + Verfied Badge', enterprise: 'Custom white-label candidate experience' },
  { name: 'Customer Support Response', starter: 'Standard email', pro: '24hr response SLA', enterprise: 'Dedicated account engineer + Live slack channel' }
];

const pricingFaqs = [
  { q: 'Can I change plans later?', a: 'Yes. You can upgrade, downgrade, or cancel your plan at any time directly through your dashboard settings. If you downgrade, your current level of access will remain active until the end of your billing cycle.' },
  { q: 'Is there a free trial for the Pro plan?', a: 'Yes. Every new employer account gets a 14-day free trial of the Pro plan with full search and matching features. No credit card is required to start.' },
  { q: 'What counts as an "Active Job Posting"?', a: 'An active job posting is a published vacancy open to applications. Drafts or closed listings do not count toward your limit.' }
];

export default function PricingPage() {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('yearly');

  const proPrice = billingInterval === 'monthly' ? 149 : 119;
  const savingAmount = (149 - 119) * 12;

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
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px', fontSize: '13px', color: '#7c3aed', fontWeight: 600 }}>
          <span>💳</span> Plans & Pricing
        </div>
        <h1 style={{ margin: '0 0 20px', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-1px', color: '#0f172a' }}>
          Hire smarter, hire faster
        </h1>
        <p style={{ maxWidth: '580px', margin: '0 auto 40px', fontSize: '17px', color: '#475569', lineHeight: 1.6 }}>
          Choose the billing plan that matches your recruitment scale. Start posting vacancies immediately.
        </p>

        {/* Toggle */}
        <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '100px', padding: '4px', position: 'relative' }}>
          <button
            onClick={() => setBillingInterval('monthly')}
            style={{
              background: billingInterval === 'monthly' ? '#7c3aed' : 'none',
              border: 'none',
              color: billingInterval === 'monthly' ? '#ffffff' : '#64748b',
              borderRadius: '100px',
              padding: '10px 24px',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.2s',
              fontFamily: 'inherit'
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingInterval('yearly')}
            style={{
              background: billingInterval === 'yearly' ? '#7c3aed' : 'none',
              border: 'none',
              color: billingInterval === 'yearly' ? '#ffffff' : '#64748b',
              borderRadius: '100px',
              padding: '10px 24px',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.2s',
              fontFamily: 'inherit'
            }}
          >
            Yearly <span style={{ fontSize: '11px', background: billingInterval === 'yearly' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)', padding: '2px 8px', borderRadius: '100px', marginLeft: '4px' }}>Save 20%</span>
          </button>
        </div>
      </section>

      {/* Main Pricing Cards */}
      <section style={{ padding: '20px 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', marginBottom: '80px', alignItems: 'stretch' }}>
          
          {/* Plan 1 */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '40px 32px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px', color: '#0f172a' }}>Starter</h3>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 24px', lineHeight: 1.5 }}>Perfect for startups or single-role hiring campaigns.</p>
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '32px' }}>
              <span style={{ fontSize: '48px', fontWeight: 900, color: '#0f172a' }}>$0</span>
              <span style={{ color: '#64748b', fontSize: '14px', marginLeft: '8px' }}>/ month</span>
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: '#475569' }}>
              <li>✓ Post up to 3 vacancies</li>
              <li>✓ AI Match percentage scores</li>
              <li>✓ Standard candidates dashboard</li>
              <li style={{ color: '#94a3b8' }}>✗ Advanced Candidate Search</li>
              <li style={{ color: '#94a3b8' }}>✗ Bulk resume exports</li>
            </ul>

            <Link href="/register" style={{ display: 'block', textAlign: 'center', padding: '14px 24px', borderRadius: '12px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', textDecoration: 'none', fontWeight: 700, fontSize: '14px', transition: 'background-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff'}>
              Get Started Free
            </Link>
          </div>

          {/* Plan 2 - Featured */}
          <div style={{ background: 'rgba(124,58,237,0.01)', border: '2px solid #7c3aed', borderRadius: '24px', padding: '40px 32px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', position: 'relative', boxShadow: '0 10px 30px rgba(124,58,237,0.05)' }}>
            <span style={{ position: 'absolute', top: '16px', right: '16px', background: '#7c3aed', color: '#ffffff', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', padding: '4px 12px', borderRadius: '100px' }}>RECOMMENDED</span>
            
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px', color: '#0f172a' }}>Pro Plan</h3>
            <p style={{ color: '#475569', fontSize: '14px', margin: '0 0 24px', lineHeight: 1.5 }}>For fast-growing squads requiring advanced AI sourcing pipelines.</p>
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '32px' }}>
              <span style={{ fontSize: '48px', fontWeight: 900, color: '#0f172a' }}>${proPrice}</span>
              <span style={{ color: '#64748b', fontSize: '14px', marginLeft: '8px' }}>/ month</span>
            </div>

            {billingInterval === 'yearly' && (
              <div style={{ color: '#10b981', fontSize: '13px', fontWeight: 600, marginTop: '-24px', marginBottom: '20px' }}>
                Billed annually (${proPrice * 12}/yr) — Saves ${savingAmount}/yr
              </div>
            )}
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: '#475569' }}>
              <li>✓ <strong>Unlimited</strong> job postings</li>
              <li>✓ Deep Semantic AI explanations</li>
              <li>✓ Advanced 500 filters Candidate search</li>
              <li>✓ Verified Employer Badge</li>
              <li>✓ CSV, ZIP exports</li>
            </ul>

            <Link href="/register" style={{ display: 'block', textAlign: 'center', padding: '14px 24px', borderRadius: '12px', background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: '#ffffff', textDecoration: 'none', fontWeight: 700, fontSize: '14px', boxShadow: '0 4px 15px rgba(124,58,237,0.3)' }}>
              Start 14-Day Free Trial
            </Link>
          </div>

          {/* Plan 3 */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '40px 32px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px', color: '#0f172a' }}>Enterprise</h3>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 24px', lineHeight: 1.5 }}>Custom integrations and compliance for large scale orgs.</p>
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '32px' }}>
              <span style={{ fontSize: '40px', fontWeight: 900, color: '#0f172a' }}>Custom</span>
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: '#475569' }}>
              <li>✓ API & custom ATS integration hooks</li>
              <li>✓ Fully white-labeled portals</li>
              <li>✓ Custom AI matching scoring models</li>
              <li>✓ Dedicated technical Account manager</li>
              <li>✓ SSO, SAML, compliance audit tools</li>
            </ul>

            <Link href="/contact" style={{ display: 'block', textAlign: 'center', padding: '14px 24px', borderRadius: '12px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', textDecoration: 'none', fontWeight: 700, fontSize: '14px', transition: 'background-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff'}>
              Contact Sales
            </Link>
          </div>

        </div>

        {/* Detailed Comparison Table */}
        <div style={{ marginBottom: '80px', overflowX: 'auto' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '32px', textAlign: 'center', color: '#0f172a' }}>Features Matrix</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' }}>Feature</th>
                <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' }}>Starter</th>
                <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' }}>Pro</th>
                <th style={{ padding: '16px 20px', color: '#64748b', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' }}>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {featuresList.map((f, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '20px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{f.name}</td>
                  <td style={{ padding: '20px', fontSize: '14px', color: '#475569' }}>{f.starter}</td>
                  <td style={{ padding: '20px', fontSize: '14px', color: '#475569' }}>{f.pro}</td>
                  <td style={{ padding: '20px', fontSize: '14px', color: '#475569' }}>{f.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQs */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '32px', textAlign: 'center', color: '#0f172a' }}>Pricing FAQs</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {pricingFaqs.map((faq, idx) => (
              <div key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px 28px', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
                <h4 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{faq.q}</h4>
                <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>{faq.a}</p>
              </div>
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
