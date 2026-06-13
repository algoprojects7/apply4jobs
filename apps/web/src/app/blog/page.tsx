"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const categories = ['All', 'AI & Technology', 'Career Advice', 'Product Updates', 'Industry Insights', 'Case Studies'];

const posts = [
  {
    slug: 'ai-resume-scoring',
    category: 'AI & Technology',
    title: 'How Our AI Scores Resumes: A Deep Dive into the ATS Engine',
    excerpt: 'We built our own skill-graph model that outperforms traditional keyword matching by 340%. Here\'s exactly how it works — no black boxes.',
    author: 'Sarah Chen', authorRole: 'CTO', avatar: 'SC', avatarColor: '#0ea5e9',
    date: 'Jun 10, 2026', readTime: '8 min read', featured: true,
    tags: ['AI', 'ATS', 'Engineering'],
  },
  {
    slug: 'remote-job-market-2026',
    category: 'Industry Insights',
    title: 'The Remote Job Market in 2026: What the Data Actually Shows',
    excerpt: 'We analysed 1.2M job postings from Q1 2026. Remote roles are up 34% YoY — but which skills command the highest premium?',
    author: 'David Park', authorRole: 'Head of AI', avatar: 'DP', avatarColor: '#10b981',
    date: 'Jun 7, 2026', readTime: '6 min read', featured: true,
    tags: ['Remote', 'Data', 'Trends'],
  },
  {
    slug: 'interview-prep-guide',
    category: 'Career Advice',
    title: '10 Things Top Candidates Do Before Every Interview',
    excerpt: 'Our career coaches analysed 50,000 successful placements. These are the common patterns — and how to replicate them.',
    author: 'Aisha Rahman', authorRole: 'VP of Product', avatar: 'AR', avatarColor: '#f59e0b',
    date: 'Jun 3, 2026', readTime: '5 min read', featured: false,
    tags: ['Interview', 'Tips', 'Career'],
  },
  {
    slug: 'v3-launch',
    category: 'Product Updates',
    title: 'Apply4Jobs v3.0: AI Career Coach, Skill Gap Analysis & More',
    excerpt: 'Our biggest release yet. The new Career Coach feature personalises a 90-day job search plan in under 60 seconds.',
    author: 'Hassan Mirza', authorRole: 'CEO', avatar: 'HM', avatarColor: '#7c3aed',
    date: 'May 28, 2026', readTime: '4 min read', featured: false,
    tags: ['Product', 'Launch', 'AI Coach'],
  },
  {
    slug: 'techcorp-case-study',
    category: 'Case Studies',
    title: 'How TechCorp Cut Hiring Time by 68% with Apply4Jobs',
    excerpt: 'From 47-day average to 15-day time-to-hire across 200+ roles. The full story, including what didn\'t work at first.',
    author: 'Marco Silva', authorRole: 'Head of Design', avatar: 'MS', avatarColor: '#ec4899',
    date: 'May 20, 2026', readTime: '10 min read', featured: false,
    tags: ['Case Study', 'Enterprise', 'Hiring'],
  },
  {
    slug: 'salary-negotiation',
    category: 'Career Advice',
    title: 'Salary Negotiation in 2026: Scripts That Actually Work',
    excerpt: 'Candidates who negotiate earn an average of 14.3% more. Here are the exact scripts our coaches have refined over 5,000+ sessions.',
    author: 'Lena Fischer', authorRole: 'VP Engineering', avatar: 'LF', avatarColor: '#8b5cf6',
    date: 'May 15, 2026', readTime: '7 min read', featured: false,
    tags: ['Salary', 'Negotiation', 'Career'],
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);
  const featured = posts.filter(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#0f172a', fontFamily: 'var(--font-nunito), Nunito, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: '140px 24px 60px', textAlign: 'center', background: 'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.06) 0%, rgba(255,255,255,1) 85%)' }}>
        <h1 style={{ margin: '0 0 16px', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-0.5px', color: '#0f172a' }}>
          The Apply4Jobs Blog
        </h1>
        <p style={{ maxWidth: '480px', margin: '0 auto', fontSize: '17px', color: '#475569', lineHeight: 1.7 }}>
          Insights on AI hiring, career development, and the future of work — from our team and our data.
        </p>
      </section>

      {/* Category Filter */}
      <div style={{ padding: '0 24px 32px', maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {categories.map(c => (
          <button key={c} onClick={() => setActiveCategory(c)} style={{
            padding: '7px 16px', borderRadius: '20px', border: '1px solid',
            borderColor: activeCategory === c ? '#7c3aed' : '#e2e8f0',
            background: activeCategory === c ? 'rgba(124,58,237,0.08)' : '#ffffff',
            color: activeCategory === c ? '#7c3aed' : '#64748b',
            fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            transition: 'all 0.2s', outline: 'none'
          }}>
            {c}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Featured Posts */}
        {activeCategory === 'All' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            {featured.map(post => (
              <div key={post.slug} style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.03), rgba(14,165,233,0.02))',
                border: '1px solid #e2e8f0', borderRadius: '20px', padding: '32px',
                display: 'flex', flexDirection: 'column', gap: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#7c3aed', background: 'rgba(124,58,237,0.06)', padding: '4px 10px', borderRadius: '20px' }}>
                    {post.category}
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>⭐ Featured</span>
                </div>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, lineHeight: 1.3, color: '#0f172a' }}>{post.title}</h2>
                <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: 1.7 }}>{post.excerpt}</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {post.tags.map(t => (
                    <span key={t} style={{ padding: '3px 8px', background: '#f1f5f9', borderRadius: '20px', fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: post.avatarColor, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}>
                      {post.avatar}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{post.author}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{post.date} • {post.readTime}</div>
                    </div>
                  </div>
                  <Link href={`/blog/${post.slug}`} style={{ fontSize: '13px', color: '#7c3aed', textDecoration: 'none', fontWeight: 700 }}>
                    Read →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* All Posts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {(activeCategory === 'All' ? rest : filtered).map(post => (
            <div key={post.slug} style={{
              background: '#ffffff', border: '1px solid #e2e8f0',
              borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px',
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
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#7c3aed', width: 'fit-content', background: 'rgba(124,58,237,0.05)', padding: '3px 10px', borderRadius: '20px' }}>
                {post.category}
              </span>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, lineHeight: 1.4, color: '#0f172a' }}>{post.title}</h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>{post.excerpt}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: post.avatarColor, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800 }}>
                    {post.avatar}
                  </div>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>{post.readTime}</span>
                </div>
                <Link href={`/blog/${post.slug}`} style={{ fontSize: '13px', color: '#7c3aed', textDecoration: 'none', fontWeight: 700 }}>Read →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '32px 24px', textAlign: 'center', color: '#64748b', fontSize: '13px', backgroundColor: '#f8fafc' }}>
        © 2026 Apply4Jobs · <Link href="/privacy" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy</Link> · <Link href="/terms" style={{ color: '#64748b', textDecoration: 'none' }}>Terms</Link>
      </footer>
    </div>
  );
}
