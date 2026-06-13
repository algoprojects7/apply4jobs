"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function ResourcesPage() {
  const allArticles = [
    { id: '1', title: 'Cracking the AI Resume Screen: 5 Core Rules', readTime: '5 min read', category: 'ATS Optimization', desc: 'Discover how modern ATS score models parse PDF files and what keywords you need to guarantee high matching scores.' },
    { id: '2', title: 'Transitioning to Generative AI Roles', readTime: '8 min read', category: 'Career Strategy', desc: 'A step-by-step roadmap to upgrading your developer profile with vector databases, agentic workflows, and LLM orchestration.' },
    { id: '3', title: 'Designing Clean Systems with NestJS and Prisma', readTime: '12 min read', category: 'Tech Tutorials', desc: 'Deep dive into setting up clean API endpoints, database schemas, and seed hooks in modern backend monorepos.' }
  ];

  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = allArticles.filter(art =>
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#0f172a', fontFamily: 'var(--font-nunito), Nunito, sans-serif' }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        paddingTop: '140px',
        paddingBottom: '60px',
        background: 'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.06) 0%, rgba(255,255,255,1) 85%)',
        textAlign: 'center',
        paddingLeft: '24px',
        paddingRight: '24px',
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '100px', padding: '6px 16px', marginBottom: '24px', fontSize: '13px', color: '#7c3aed', fontWeight: 600 }}>
          <span>📚</span> Knowledge Center
        </div>
        <h1 style={{ margin: '0 0 20px', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-1px', color: '#0f172a' }}>
          Career & AI Resources
        </h1>
        <p style={{ maxWidth: '580px', margin: '0 auto 40px', fontSize: '17px', color: '#475569', lineHeight: 1.6 }}>
          Upgrade your professional skills, optimize your resume for AI parsers, and read the latest technical hiring guides.
        </p>

        {/* Search Bar */}
        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
          <span style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', color: '#64748b' }}>🔍</span>
          <input
            type="text"
            placeholder="Search articles, categories, and tutorials..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
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

      {/* Main Content Section */}
      <section style={{ padding: '40px 24px 80px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {filteredArticles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
              <p style={{ margin: 0, fontSize: '16px' }}>No articles matched your search. Try searching another topic.</p>
            </div>
          ) : (
            filteredArticles.map(art => (
              <div key={art.id} style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#7c3aed',
                    background: 'rgba(124, 58, 237, 0.06)',
                    border: '1px solid rgba(124, 58, 237, 0.15)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                  }}>
                    {art.category}
                  </span>
                  <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{art.readTime}</span>
                </div>

                <h2 style={{ margin: '6px 0 0', fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{art.title}</h2>
                <p style={{ margin: 0, fontSize: '14.5px', color: '#475569', lineHeight: '1.6' }}>{art.desc}</p>

                <div style={{ marginTop: '10px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                  <a href="#" style={{ fontSize: '14px', color: '#0284c7', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    Read Article &rarr;
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '32px 24px', textAlign: 'center', color: '#64748b', fontSize: '13px', backgroundColor: '#f8fafc' }}>
        © 2026 Apply4Jobs · <Link href="/privacy" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy</Link> · <Link href="/terms" style={{ color: '#64748b', textDecoration: 'none' }}>Terms</Link>
      </footer>
    </div>
  );
}
