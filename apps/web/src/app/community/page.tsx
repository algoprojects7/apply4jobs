"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const groupCategories = [
  { name: '📝 Resume Reviews', desc: 'Share your CV and get constructive feedback from professional recruiters and peers.', members: '14.2K', posts: '3.4K' },
  { name: '💻 Developer Arena', desc: 'Discuss frontend architectures, backend scale challenges, AI integrations, and LeetCode tips.', members: '28.5K', posts: '9.2K' },
  { name: '🎨 UI/UX & Design', desc: 'Showcase design portfolios, critique layout wireframes, and talk user testing methodologies.', members: '10.8K', posts: '2.1K' },
  { name: '🤝 Mock Interviews', desc: 'Find pairing partners for behavioral prep, live whiteboarding practice, and case studies.', members: '8.4K', posts: '1.8K' }
];

const events = [
  { title: 'AI Matching: How to Optimize Your Profile', host: 'David Park (Head of AI)', date: 'June 18, 2026', time: '6:00 PM IST', desc: 'Get insider tips on how our deep neural matching system analyzes your skills, and how to improve your match score.' },
  { title: 'Vanguard Job Fair - Tech & Product', host: '50+ Verified Employers', date: 'June 25, 2026', time: '10:00 AM IST', desc: 'Connect directly with engineering managers hiring remotely. Live virtual interview rooms will be open.' },
  { title: 'Salary Negotiation: Know Your Value', host: 'Aisha Rahman (VP Product)', date: 'July 02, 2026', time: '7:30 PM IST', desc: 'A hands-on workshop covering data-backed negotiation techniques, counter-offers, and compensation packages.' }
];

const leaders = [
  { name: 'Rahul Sharma', title: 'Staff Engineer @ Razorpay', badge: 'MVP', color: '#7c3aed' },
  { name: 'Emily Watts', title: 'Sr. Product Designer @ Spotify', badge: 'Creator', color: '#0ea5e9' },
  { name: 'Arjun Mehta', title: 'Engineering Manager @ Groww', badge: 'Mentor', color: '#10b981' },
  { name: 'Sophia Chen', title: 'AI Researcher @ Google', badge: 'Moderator', color: '#ec4899' }
];

export default function CommunityPage() {
  const [rsvpStates, setRsvpStates] = useState<Record<number, boolean>>({});

  const toggleRsvp = (idx: number) => {
    setRsvpStates(prev => {
      const isRsvped = !prev[idx];
      alert(isRsvped 
        ? "RSVP Confirmed! We have sent a calendar invite to your registered email."
        : "RSVP Cancelled."
      );
      return { ...prev, [idx]: isRsvped };
    });
  };

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
          <span>🌐</span> Apply4Jobs Hub
        </div>
        <h1 style={{ margin: '0 0 20px', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-1px', color: '#0f172a' }}>
          Connect, share, and grow<br />
          <span style={{ background: 'linear-gradient(135deg, #7c3aed, #0284c7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            with global talent
          </span>
        </h1>
        <p style={{ maxWidth: '580px', margin: '0 auto 40px', fontSize: '18px', color: '#475569', lineHeight: 1.7 }}>
          Join peer groups, attend recruiter panels, practice technical interviews, and boost your professional circle.
        </p>
      </section>

      {/* Discussion Circles */}
      <section style={{ padding: '40px 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>Discussion Circles</div>
          <h2 style={{ margin: 0, fontSize: '32px', fontWeight: 900, color: '#0f172a' }}>Popular Guilds & Communities</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {groupCategories.map((g, idx) => (
            <div key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '28px', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box', boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.transform = 'translateY(-4px)';
                   e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
                   e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.03)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = 'translateY(0)';
                   e.currentTarget.style.borderColor = '#e2e8f0';
                   e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.01)';
                 }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>{g.name}</h3>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, flex: 1, marginBottom: '24px' }}>{g.desc}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                <span style={{ fontSize: '13px', color: '#64748b' }}><strong>{g.members}</strong> members</span>
                <button 
                  onClick={() => alert(`Joined ${g.name}! Check your dashboard feed for new discussions.`)}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(124,58,237,0.3)',
                    color: '#7c3aed',
                    padding: '6px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    outline: 'none',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#7c3aed';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none';
                    e.currentTarget.style.color = '#7c3aed';
                  }}
                >
                  Join Circle
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section style={{ padding: '80px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>Live Learning</div>
              <h2 style={{ margin: 0, fontSize: '32px', fontWeight: 900, color: '#0f172a' }}>Upcoming Events & Webinars</h2>
            </div>
            <button onClick={() => alert("Calendar syncing setup...")} style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '10px 20px', borderRadius: '10px', color: '#0f172a', fontWeight: 600, fontSize: '14px', cursor: 'pointer', outline: 'none', fontFamily: 'inherit', transition: 'background-color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ffffff'}>
              🗓️ Add all to calendar
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {events.map((e, idx) => {
              const isRsvped = !!rsvpStates[idx];
              return (
                <div key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', fontSize: '13px', color: '#0284c7', fontWeight: 600 }}>
                    <span>{e.date}</span>
                    <span>•</span>
                    <span>{e.time}</span>
                  </div>
                  <h3 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{e.title}</h3>
                  <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px', fontWeight: 600 }}>Hosted by {e.host}</div>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, flex: 1, marginBottom: '24px' }}>{e.desc}</p>
                  
                  <button 
                    onClick={() => toggleRsvp(idx)}
                    style={{
                      width: '100%',
                      background: isRsvped ? 'rgba(16,185,129,0.08)' : 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                      border: isRsvped ? '1px solid rgba(16,185,129,0.3)' : 'none',
                      color: isRsvped ? '#10b981' : '#ffffff',
                      padding: '12px 24px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '14px',
                      cursor: 'pointer',
                      boxShadow: isRsvped ? 'none' : '0 4px 15px rgba(124,58,237,0.3)',
                      fontFamily: 'inherit',
                      outline: 'none'
                    }}
                  >
                    {isRsvped ? '✓ RSVP Registered' : 'Reserve Spot'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Members */}
      <section style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>Spotlight</div>
          <h2 style={{ margin: 0, fontSize: '32px', fontWeight: 900, color: '#0f172a' }}>Community Champions</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          {leaders.map((m, idx) => (
            <div key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '24px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
              <div style={{
                width: '60px', height: '60px', borderRadius: '50%', background: m.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '20px',
                margin: '0 auto 16px', boxShadow: `0 4px 14px ${m.color}25`, color: '#ffffff'
              }}>
                {m.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px', color: '#0f172a' }}>{m.name}</div>
              <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>{m.title}</div>
              <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: m.color, background: `${m.color}08`, border: `1px solid ${m.color}20`, borderRadius: '100px', padding: '2px 10px' }}>
                {m.badge}
              </span>
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
