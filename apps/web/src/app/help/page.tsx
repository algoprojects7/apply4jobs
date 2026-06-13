"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const faqCategories = [
  {
    id: 'seekers',
    name: 'Job Seekers',
    icon: '👤',
    faqs: [
      { q: 'How does the AI matchmaking score work?', a: 'Our AI analyzes the skills, experience, and certifications listed in your profile and compares them with the requirements outlined by employers. The result is a percentage match score showing how well you fit the role.' },
      { q: 'Can I apply for jobs without an AI-reviewed resume?', a: 'Yes! While having an AI-reviewed resume helps boost your score and match accuracy, you can apply using any standard uploaded PDF resume.' },
      { q: 'Is there a limit to how many jobs I can apply to?', a: 'No, there are no limits on applications. However, our smart filters will suggest focusing on matches above 75% for the best success rate.' }
    ]
  },
  {
    id: 'employers',
    name: 'Employers',
    icon: '🏢',
    faqs: [
      { q: 'How do I post a job vacancy?', a: 'Log in to your Employer Dashboard, click "Post a New Job", fill in details, set target skills, and publish. Our AI automatically parses your text to recommend matching candidates.' },
      { q: 'What is a Verified Employer badge?', a: 'It is a badge granted after our trust team verifies your business registration and domain authority. It helps build candidate confidence and boosts application rates by 35%.' },
      { q: 'Can I export applicant resumes in bulk?', a: 'Yes. Pro and Enterprise tier employers can download applicants\' resumes as ZIP files or export candidate profiles as CSV/Excel files directly.' }
    ]
  },
  {
    id: 'billing',
    name: 'Billing & Pricing',
    icon: '💳',
    faqs: [
      { q: 'Do you charge job seekers for using Apply4Jobs?', a: 'No. Job searching, resume matching, and candidate profiles are 100% free for job seekers.' },
      { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, MasterCard, Amex) and bank transfers for Enterprise subscriptions.' },
      { q: 'Can I cancel my Employer subscription at any time?', a: 'Absolutely. You can upgrade, downgrade, or cancel your Pro/Enterprise plans directly from the Billing tab in your Employer Dashboard.' }
    ]
  },
  {
    id: 'security',
    name: 'Account & Security',
    icon: '🔒',
    faqs: [
      { q: 'How is my private data protected?', a: 'We encrypt all data in transit using TLS 1.3 and at rest using AES-256. Resumes are stored in secure buckets accessible only to verified hiring managers.' },
      { q: 'Can I hide my profile from my current employer?', a: 'Yes. In your Candidate Settings, you can set your profile privacy to "Anonymous" or explicitly block specific company domains from seeing you.' },
      { q: 'How do I enable Two-Factor Authentication (2FA)?', a: 'Go to Settings > Account Security in your dashboard, click "Enable 2FA", and scan the QR code with any authenticator app.' }
    ]
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('seekers');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filter FAQs based on search query
  const filteredCategories = searchQuery.trim() === ''
    ? faqCategories
    : faqCategories.map(cat => ({
        ...cat,
        faqs: cat.faqs.filter(
          f => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
               f.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => cat.faqs.length > 0);

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
          <span>💡</span> Help Center
        </div>
        <h1 style={{ margin: '0 0 20px', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-1px', color: '#0f172a' }}>
          How can we help you?
        </h1>
        <p style={{ maxWidth: '580px', margin: '0 auto 40px', fontSize: '17px', color: '#475569', lineHeight: 1.6 }}>
          Find answers, read documentation, and get back to finding opportunities or hiring top talent.
        </p>

        {/* Search Bar */}
        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
          <span style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', color: '#64748b' }}>🔍</span>
          <input
            type="text"
            placeholder="Search FAQs, features, and topics..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenFaqIndex(0); // auto-open first result
            }}
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

      {/* Main Content */}
      <section style={{ padding: '40px 24px 80px', maxWidth: '1000px', margin: '0 auto' }}>
        {searchQuery.trim() === '' ? (
          <>
            {/* Category selection */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
              {faqCategories.map(cat => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setOpenFaqIndex(0);
                    }}
                    style={{
                      background: isActive ? 'rgba(124,58,237,0.06)' : '#ffffff',
                      border: `1px solid ${isActive ? '#7c3aed' : '#e2e8f0'}`,
                      borderRadius: '16px',
                      padding: '20px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      color: '#0f172a',
                      fontFamily: 'inherit',
                      outline: 'none',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.01)'
                    }}
                  >
                    <div style={{ fontSize: '28px', marginBottom: '12px' }}>{cat.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: '16px', color: isActive ? '#7c3aed' : '#0f172a' }}>{cat.name}</div>
                    <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{cat.faqs.length} articles</div>
                  </button>
                );
              })}
            </div>

            {/* Accordion container */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <h3 style={{ margin: '0 0 24px', fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>
                {faqCategories.find(c => c.id === activeCategory)?.name} FAQs
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {faqCategories.find(c => c.id === activeCategory)?.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        style={{
                          width: '100%',
                          background: 'none',
                          border: 'none',
                          color: '#0f172a',
                          textAlign: 'left',
                          fontSize: '16px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px 0',
                          outline: 'none',
                          fontFamily: 'inherit'
                        }}
                      >
                        <span style={{ color: isOpen ? '#7c3aed' : '#0f172a', transition: 'color 0.2s' }}>{faq.q}</span>
                        <span style={{ fontSize: '20px', color: '#64748b' }}>{isOpen ? '−' : '+'}</span>
                      </button>
                      <div style={{
                        maxHeight: isOpen ? '200px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.3s cubic-bezier(0,1,0,1)',
                        fontSize: '15px',
                        color: '#475569',
                        lineHeight: 1.6,
                        marginTop: isOpen ? '8px' : '0',
                        paddingRight: '24px'
                      }}>
                        {faq.a}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          /* Search Results Display */
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            <h3 style={{ margin: '0 0 24px', fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>
              Search Results for "{searchQuery}"
            </h3>

            {filteredCategories.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
                <p style={{ margin: 0, fontSize: '16px' }}>No answers matched your search terms. Try searching something else.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {filteredCategories.map(cat => (
                  <div key={cat.id}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                      {cat.icon} {cat.name}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                      {cat.faqs.map((faq, idx) => (
                        <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 20px' }}>
                          <div style={{ fontWeight: 700, fontSize: '15px', color: '#0f172a', marginBottom: '8px' }}>{faq.q}</div>
                          <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>{faq.a}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Support Options Grid */}
        <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px', color: '#0f172a' }}>Still need support?</h2>
          <p style={{ color: '#475569', fontSize: '16px', marginBottom: '40px' }}>Our dedicated response team is available 24/7 to assist you.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '32px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>✉️</div>
              <h4 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Email Ticket Support</h4>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, marginBottom: '24px' }}>Submit a ticket and our engineers will get back to you within 2 hours.</p>
              <Link href="/contact" style={{ display: 'inline-block', padding: '12px 24px', borderRadius: '10px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', textDecoration: 'none', fontWeight: 600, fontSize: '14px', transition: 'background-color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff'}>
                Open a Ticket
              </Link>
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '32px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>💬</div>
              <h4 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Instant Live Chat</h4>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, marginBottom: '24px' }}>Chat with our automated assistant and connect to human agents if needed.</p>
              <button onClick={() => alert("Live Chat: Connecting you to our agent...")} style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', border: 'none', padding: '12px 24px', borderRadius: '10px', color: '#ffffff', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(124,58,237,0.3)', fontFamily: 'inherit', outline: 'none' }}>
                Start Live Chat
              </button>
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
