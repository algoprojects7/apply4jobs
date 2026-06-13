"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DropdownItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  description: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const forCandidatesItems: DropdownItem[] = [
  {
    label: 'Find Jobs',
    href: '/jobs',
    description: 'Browse thousands of AI-matched listings',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    label: 'AI Resume Review',
    href: '/candidate/resume-review',
    description: 'Get instant AI feedback on your resume',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    label: 'Career Coach',
    href: '/candidate/career-coach',
    description: 'AI-powered career guidance & planning',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
      </svg>
    ),
  },
  {
    label: 'My Applications',
    href: '/candidate/applications',
    description: 'Track all your job applications',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
];

const forEmployersItems: DropdownItem[] = [
  {
    label: 'Post a Job',
    href: '/employer/jobs',
    description: 'Reach thousands of qualified candidates',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
  {
    label: 'Candidate Search',
    href: '/employer/candidates',
    description: 'AI-ranked talent pool at your fingertips',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: 'Analytics',
    href: '/employer/analytics',
    description: 'Funnel insights & hiring performance',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
  {
    label: 'Interviews',
    href: '/employer/interviews',
    description: 'Schedule and manage interviews with ease',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
];

const resourcesItems: DropdownItem[] = [
  {
    label: 'Browse Companies',
    href: '/companies',
    description: 'Explore top employers and their culture',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    label: 'Resources & Guides',
    href: '/resources',
    description: 'Career tips, resume guides & more',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
  },
  {
    label: 'Blog',
    href: '/blog',
    description: 'AI hiring insights & career development',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
  },
  {
    label: 'About Us',
    href: '/about',
    description: 'Our mission, story & team',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    ),
  },
  {
    label: 'Careers',
    href: '/careers',
    description: 'Join our remote-first global team',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
  {
    label: 'Contact Us',
    href: '/contact',
    description: 'Get in touch with our team',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

const NAV_ITEMS: NavItem[] = [
  { label: 'For Candidates', dropdown: forCandidatesItems },
  { label: 'For Employers', dropdown: forEmployersItems },
  { label: 'Companies', href: '/companies' },
  { label: 'Resources', dropdown: resourcesItems },
];

function DropdownMenu({ items, isOpen }: { items: DropdownItem[]; isOpen: boolean }) {
  return (
    <div style={{
      position: 'absolute',
      top: 'calc(100% + 12px)',
      left: '50%',
      background: 'rgba(9, 11, 22, 0.97)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(124, 58, 237, 0.2)',
      borderRadius: '16px',
      padding: '8px',
      minWidth: '280px',
      boxShadow: '0 24px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.1)',
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-8px)',
      pointerEvents: isOpen ? 'all' : 'none',
      transition: 'opacity 0.2s ease, transform 0.2s ease',
      zIndex: 100,
    }}>
      {/* Triangle pointer */}
      <div style={{
        position: 'absolute',
        top: '-6px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '12px',
        height: '6px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: '10px',
          height: '10px',
          background: 'rgba(124,58,237,0.3)',
          border: '1px solid rgba(124,58,237,0.2)',
          transform: 'rotate(45deg)',
          margin: '3px auto 0',
        }} />
      </div>

      {items.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          style={{ textDecoration: 'none' }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '12px 14px',
            borderRadius: '10px',
            transition: 'background 0.15s',
            cursor: 'pointer',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(124,58,237,0.12)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '9px',
              background: 'rgba(124,58,237,0.15)',
              border: '1px solid rgba(124,58,237,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#a78bfa',
              flexShrink: 0,
            }}>
              {item.icon}
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9', marginBottom: '2px' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.4 }}>
                {item.description}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Scroll detection for glassmorphism effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'background 0.3s, box-shadow 0.3s, border-color 0.3s',
          background: (scrolled || pathname !== '/')
            ? 'rgba(2, 5, 14, 0.97)'
            : 'transparent',
          backdropFilter: (scrolled || pathname !== '/') ? 'blur(20px)' : 'none',
          borderBottom: (scrolled || pathname !== '/')
            ? '1px solid rgba(124,58,237,0.15)'
            : '1px solid transparent',
          boxShadow: (scrolled || pathname !== '/')
            ? '0 4px 24px rgba(0,0,0,0.4)'
            : 'none',
        }}
      >
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px',
        }}>

          {/* ── Logo ── */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(124,58,237,0.45)',
              overflow: 'hidden'
            }}>
              <img 
                src="/logo.png" 
                alt="Apply4Jobs" 
                style={{ 
                  width: '100%', 
                  height: '150%', 
                  objectFit: 'cover', 
                  objectPosition: 'center 12%' 
                }} 
              />
            </div>
            <span style={{ fontWeight: 900, fontSize: '20px', letterSpacing: '-0.5px', color: '#ffffff' }}>
              Apply4Jobs
              <span style={{ color: '#a78bfa', fontSize: '10px', verticalAlign: 'super', marginLeft: '2px', fontWeight: 700 }}>AI</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1, justifyContent: 'center' }}>
            {NAV_ITEMS.map((item) => (
              <div key={item.label} style={{ position: 'relative' }}>
                {item.href ? (
                  <Link
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      color: '#cbd5e1',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: 600,
                      transition: 'color 0.2s, background 0.2s',
                      background: 'transparent',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = '#cbd5e1';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        color: openMenu === item.label ? '#ffffff' : '#cbd5e1',
                        background: openMenu === item.label ? 'rgba(124,58,237,0.12)' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 600,
                        transition: 'color 0.2s, background 0.2s',
                        fontFamily: 'inherit',
                      }}
                      onMouseEnter={e => {
                        if (openMenu !== item.label) {
                          e.currentTarget.style.color = '#ffffff';
                          e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                        }
                      }}
                      onMouseLeave={e => {
                        if (openMenu !== item.label) {
                          e.currentTarget.style.color = '#cbd5e1';
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      {item.label}
                      <svg
                        width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                        style={{
                          transform: openMenu === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s',
                          opacity: 0.7,
                        }}
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>
                    {item.dropdown && (
                      <DropdownMenu items={item.dropdown} isOpen={openMenu === item.label} />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* ── Right Actions ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <Link
              href="/login"
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                color: '#cbd5e1',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
                transition: 'all 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)';
                e.currentTarget.style.background = 'rgba(124,58,237,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#cbd5e1';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              }}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              style={{
                padding: '8px 20px',
                borderRadius: '8px',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                boxShadow: '0 4px 16px rgba(124,58,237,0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(124,58,237,0.55)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,58,237,0.4)';
              }}
            >
              Get Started
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle mobile menu"
              style={{
                display: 'none',
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
                color: '#ffffff',
                cursor: 'pointer',
              }}
              className="nav-hamburger"
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div style={{
          maxHeight: mobileOpen ? '600px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
          background: 'rgba(2,5,14,0.97)',
          backdropFilter: 'blur(20px)',
          borderTop: mobileOpen ? '1px solid rgba(124,58,237,0.15)' : '1px solid transparent',
        }}
        className="mobile-menu"
        >
          <div style={{ padding: '16px 24px 24px' }}>
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    style={{
                      display: 'block',
                      padding: '12px 0',
                      color: '#cbd5e1',
                      textDecoration: 'none',
                      fontSize: '15px',
                      fontWeight: 600,
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                    }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        padding: '12px 0',
                        background: 'none',
                        border: 'none',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        color: '#cbd5e1',
                        fontSize: '15px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                      }}
                    >
                      {item.label}
                      <svg
                        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                        style={{ transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>
                    {mobileExpanded === item.label && item.dropdown && (
                      <div style={{ paddingLeft: '12px', paddingBottom: '8px' }}>
                        {item.dropdown.map((sub, i) => (
                          <Link
                            key={i}
                            href={sub.href}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '10px 8px',
                              color: '#94a3b8',
                              textDecoration: 'none',
                              fontSize: '14px',
                              fontWeight: 500,
                              borderRadius: '8px',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.color = '#ffffff';
                              e.currentTarget.style.background = 'rgba(124,58,237,0.1)';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.color = '#94a3b8';
                              e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            <span style={{ color: '#7c3aed' }}>{sub.icon}</span>
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            {/* Mobile CTA buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <Link href="/login" style={{
                flex: 1, textAlign: 'center', padding: '12px',
                borderRadius: '10px', color: '#ffffff', textDecoration: 'none',
                fontSize: '14px', fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.05)',
              }}>
                Sign In
              </Link>
              <Link href="/register" style={{
                flex: 1, textAlign: 'center', padding: '12px',
                borderRadius: '10px', color: '#ffffff', textDecoration: 'none',
                fontSize: '14px', fontWeight: 700,
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                boxShadow: '0 4px 12px rgba(124,58,237,0.4)',
              }}>
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        @media (max-width: 900px) {
          .nav-hamburger { display: flex !important; }
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 901px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  );
}
