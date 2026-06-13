"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const contactReasons = [
  { value: '', label: 'Select a topic...' },
  { value: 'general', label: 'General Enquiry' },
  { value: 'demo', label: 'Request a Demo' },
  { value: 'support', label: 'Technical Support' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'press', label: 'Press / Media' },
  { value: 'billing', label: 'Billing & Payments' },
  { value: 'feedback', label: 'Product Feedback' },
];

const offices = [
  { city: 'San Francisco', country: 'USA', address: '100 Market Street, Suite 800\nSan Francisco, CA 94105', phone: '+1 (415) 555-0190', flag: '🇺🇸' },
  { city: 'London', country: 'UK', address: '1 Canada Square, Canary Wharf\nLondon E14 5AB', phone: '+44 20 7946 0958', flag: '🇬🇧' },
  { city: 'Dubai', country: 'UAE', address: 'DIFC Gate Avenue, Level 5\nDubai, UAE 00000', phone: '+971 4 555 0122', flag: '🇦🇪' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', reason: '', message: '' });
  const [reasonOpen, setReasonOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#0f172a', fontFamily: 'var(--font-nunito), Nunito, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: '140px 24px 60px', textAlign: 'center', background: 'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.06) 0%, rgba(255,255,255,1) 85%)' }}>
        <h1 style={{ margin: '0 0 16px', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, letterSpacing: '-0.5px', color: '#0f172a' }}>
          Get in Touch
        </h1>
        <p style={{ maxWidth: '480px', margin: '0 auto', fontSize: '17px', color: '#475569', lineHeight: 1.7 }}>
          Whether you're a job seeker, employer, or journalist — we'd love to hear from you.
        </p>
      </section>

      {/* Main Grid */}
      <section style={{ padding: '60px 24px 80px', maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '56px', alignItems: 'start' }}>

        {/* Left — Info */}
        <div>
          <h2 style={{ margin: '0 0 32px', fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>Contact Information</h2>

          {/* Contact cards */}
          {[
            { icon: '📧', label: 'General', value: 'hello@apply4jobs.com', href: 'mailto:hello@apply4jobs.com' },
            { icon: '🤝', label: 'Sales & Demos', value: 'sales@apply4jobs.com', href: 'mailto:sales@apply4jobs.com' },
            { icon: '📰', label: 'Press', value: 'press@apply4jobs.com', href: 'mailto:press@apply4jobs.com' },
            { icon: '🛠️', label: 'Support', value: 'support@apply4jobs.com', href: 'mailto:support@apply4jobs.com' },
          ].map(c => (
            <a key={c.label} href={c.href} style={{ textDecoration: 'none', display: 'block', marginBottom: '12px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                background: '#ffffff', border: '1px solid #e2e8f0',
                borderRadius: '12px', padding: '16px 20px',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.01)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
                e.currentTarget.style.background = 'rgba(124,58,237,0.01)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <span style={{ fontSize: '22px' }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{c.label}</div>
                  <div style={{ fontSize: '14px', color: '#7c3aed', fontWeight: 600 }}>{c.value}</div>
                </div>
              </div>
            </a>
          ))}

          {/* Offices */}
          <h2 style={{ margin: '40px 0 20px', fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>Our Offices</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {offices.map(o => (
              <div key={o.city} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '18px' }}>{o.flag}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{o.city}, {o.country}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', whiteSpace: 'pre-line', lineHeight: 1.6, marginTop: '2px' }}>{o.address}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '56px', marginBottom: '20px' }}>✅</div>
              <h3 style={{ margin: '0 0 12px', fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>Message Received!</h3>
              <p style={{ color: '#475569', lineHeight: 1.7 }}>
                Thanks for reaching out. Our team will get back to you within 1 business day.
              </p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', reason: '', message: '' }); }} style={{ marginTop: '24px', padding: '10px 24px', borderRadius: '10px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)', color: '#7c3aed', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px' }}>
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <h2 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>Send us a message</h2>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>We typically respond within 24 hours.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px' }}>
                {[
                  { label: 'Full Name', name: 'name', placeholder: 'Alex Johnson', type: 'text' },
                  { label: 'Email', name: 'email', placeholder: 'alex@company.com', type: 'email' },
                ].map(f => (
                  <div key={f.name}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#475569', fontWeight: 600, marginBottom: '6px' }}>{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.name as keyof typeof form]}
                      onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                      required
                      style={{ width: '100%', padding: '11px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', color: '#0f172a', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.6)'}
                      onBlur={e => e.target.style.borderColor = '#cbd5e1'}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#475569', fontWeight: 600, marginBottom: '6px' }}>Company (optional)</label>
                <input
                  type="text"
                  placeholder="Your company name"
                  value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })}
                  style={{ width: '100%', padding: '11px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', color: '#0f172a', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.6)'}
                  onBlur={e => e.target.style.borderColor = '#cbd5e1'}
                />
              </div>

              {/* Custom topic dropdown */}
              <div style={{ position: 'relative' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#475569', fontWeight: 600, marginBottom: '6px' }}>Topic</label>
                <div onClick={() => setReasonOpen(o => !o)} style={{
                  padding: '11px 14px', background: '#ffffff', border: `1px solid ${reasonOpen ? 'rgba(124,58,237,0.6)' : '#cbd5e1'}`,
                  borderRadius: '8px', color: form.reason ? '#0f172a' : '#64748b', fontSize: '14px',
                  cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', userSelect: 'none',
                }}>
                  <span>{contactReasons.find(r => r.value === form.reason)?.label || 'Select a topic...'}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" style={{ transform: reasonOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
                {reasonOpen && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', zIndex: 50, boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
                    {contactReasons.slice(1).map(r => (
                      <div key={r.value} onClick={() => { setForm({ ...form, reason: r.value }); setReasonOpen(false); }}
                        style={{ padding: '11px 14px', fontSize: '14px', color: form.reason === r.value ? '#7c3aed' : '#334155', background: form.reason === r.value ? 'rgba(124,58,237,0.05)' : 'transparent', cursor: 'pointer', transition: 'background 0.15s', borderBottom: '1px solid #e2e8f0' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.05)'}
                        onMouseLeave={e => e.currentTarget.style.background = form.reason === r.value ? 'rgba(124,58,237,0.05)' : 'transparent'}
                      >
                        {r.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#475569', fontWeight: 600, marginBottom: '6px' }}>Message</label>
                <textarea
                  placeholder="How can we help?"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  style={{ width: '100%', padding: '11px 14px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', color: '#0f172a', fontSize: '14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(124,58,237,0.6)'}
                  onBlur={e => e.target.style.borderColor = '#cbd5e1'}
                />
              </div>

              <button type="submit" disabled={loading} style={{
                padding: '13px', borderRadius: '10px', border: 'none',
                background: loading ? 'rgba(124,58,237,0.4)' : 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                color: '#fff', fontWeight: 700, fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 16px rgba(124,58,237,0.3)', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {loading ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Sending...
                  </>
                ) : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '32px 24px', textAlign: 'center', color: '#64748b', fontSize: '13px', backgroundColor: '#f8fafc' }}>
        © 2026 Apply4Jobs · <Link href="/privacy" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy</Link> · <Link href="/terms" style={{ color: '#64748b', textDecoration: 'none' }}>Terms</Link>
      </footer>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
