"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Captcha code generator
const generateCaptcha = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid ambiguous O, 0, I, 1
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export default function RegisterPage() {
  const [role, setRole] = useState<'candidate' | 'employer'>('candidate');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [gender, setGender] = useState('');
  const [genderOpen, setGenderOpen] = useState(false);
  const genderRef = useRef<HTMLDivElement>(null);

  // Close gender dropdown on outside click
  useEffect(() => {
    if (!genderOpen) return;
    const handler = (e: MouseEvent) => {
      if (genderRef.current && !genderRef.current.contains(e.target as Node)) {
        setGenderOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [genderOpen]);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Captcha states
  const [captchaCode, setCaptchaCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCaptchaCode(generateCaptcha());
  }, []);

  const handleRefreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
    setCaptchaInput('');
  };

  const playCaptchaAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const spelledCode = captchaCode.split('').join(', ');
      const utterance = new SpeechSynthesisUtterance(`Security code is: ${spelledCode}`);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Audio text-to-speech is not supported in this browser.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate captcha
      if (captchaInput.trim().toUpperCase() !== captchaCode) {
        setError('Incorrect security code. Please try again.');
        setLoading(false);
        setCaptchaCode(generateCaptcha());
        setCaptchaInput('');
        return;
      }

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role, name, company, gender })
      });
      const data = await res.json();

      if (data.status === 'success') {
        alert('Registration successful! Redirecting to login page.');
        window.location.href = '/login';
      } else {
        setError(data.message || 'Registration failed.');
        setLoading(false);
      }
    } catch (err: any) {
      setError('System connection error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.05) 0%, rgba(255, 255, 255, 1) 80%)',
      padding: '20px',
      fontFamily: "'Nunito', sans-serif",
      boxSizing: 'border-box'
    }}>
      
      <div className="auth-card" style={{ maxWidth: '460px' }}>
        
        {/* Brand logo */}
        <Link href="/" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none' }}>
          <div style={{
            background: '#ffffff',
            padding: '6px 12px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '36px',
            boxSizing: 'border-box',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <img src="/logo.png" alt="Apply4Jobs" style={{ height: '24px', width: 'auto', objectFit: 'contain' }} />
          </div>
        </Link>

        {error && (
          <div style={{
            padding: '12px',
            background: 'rgba(239, 68, 68, 0.05)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: '8px',
            fontSize: '12.5px',
            color: '#ef4444',
            textAlign: 'center'
          }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>Create Account</h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>Join the AI-powered job marketplace</p>
        </div>

        {/* Role Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          background: 'rgba(0,0,0,0.03)',
          border: '1px solid rgba(0,0,0,0.05)',
          borderRadius: '10px',
          padding: '4px'
        }}>
          {(['candidate', 'employer'] as const).map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              style={{
                padding: '8px',
                border: 'none',
                background: role === r ? '#7c3aed' : 'transparent',
                color: role === r ? '#ffffff' : '#64748b',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textTransform: 'capitalize',
                outline: 'none'
              }}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#475569', marginBottom: '6px', fontWeight: 600 }}>Full Name</label>
            <input
              type="text"
              placeholder="Alex Johnson"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#0f172a',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Gender — candidates only */}
          {role === 'candidate' && (
            <div ref={genderRef} style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#475569', marginBottom: '6px', fontWeight: 600 }}>Gender</label>
              {/* Hidden native input for form validation */}
              <input type="hidden" name="gender" value={gender} required={role === 'candidate'} />
              {/* Custom trigger */}
              <div
                onClick={() => setGenderOpen(o => !o)}
                style={{
                  width: '100%',
                  padding: '12px',
                  paddingRight: '36px',
                  borderRadius: '8px',
                  border: `1px solid ${genderOpen ? '#7c3aed' : '#cbd5e1'}`,
                  background: '#ffffff',
                  color: gender ? '#0f172a' : '#64748b',
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  userSelect: 'none',
                  transition: 'border-color 0.2s',
                }}
              >
                <span>{gender || 'Select gender...'}</span>
                <svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5"
                  style={{ transform: genderOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {/* Custom dropdown options */}
              {genderOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 4px)',
                    left: 0,
                    right: 0,
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    zIndex: 50,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                  }}
                >
                  {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map(opt => (
                    <div
                      key={opt}
                      onClick={() => { setGender(opt); setGenderOpen(false); }}
                      style={{
                        padding: '11px 14px',
                        fontSize: '13px',
                        color: gender === opt ? '#7c3aed' : '#334155',
                        background: gender === opt ? 'rgba(124,58,237,0.05)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'background 0.15s, color 0.15s',
                        borderBottom: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.background = 'rgba(124,58,237,0.05)';
                        (e.currentTarget as HTMLDivElement).style.color = '#7c3aed';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.background = gender === opt ? 'rgba(124,58,237,0.05)' : 'transparent';
                        (e.currentTarget as HTMLDivElement).style.color = gender === opt ? '#7c3aed' : '#334155';
                      }}
                    >
                      {gender === opt && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                      {gender !== opt && <span style={{ width: '12px', display: 'inline-block' }} />}
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#475569', marginBottom: '6px', fontWeight: 600 }}>Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#0f172a',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {role === 'employer' && (
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#475569', marginBottom: '6px', fontWeight: 600 }}>Company Name</label>
              <input
                type="text"
                placeholder="TechCorp Solutions"
                value={company}
                onChange={e => setCompany(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  color: '#0f172a',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#475569', marginBottom: '6px', fontWeight: 600 }}>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#0f172a',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {/* Show Password Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
              <input
                type="checkbox"
                id="show-password"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer', accentColor: '#7c3aed' }}
              />
              <label htmlFor="show-password" style={{ fontSize: '11.5px', color: '#64748b', cursor: 'pointer', userSelect: 'none', fontWeight: 600 }}>
                Show Password
              </label>
            </div>
          </div>

          {/* Captcha Section */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '4px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#475569', fontWeight: 600 }}>Security Verification</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {/* Audio Button */}
                <button
                  type="button"
                  onClick={playCaptchaAudio}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    color: '#7c3aed',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    outline: 'none'
                  }}
                  title="Play Audio Code"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                  </svg>
                  Audio
                </button>
                {/* Refresh Button */}
                <button
                  type="button"
                  onClick={handleRefreshCaptcha}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    color: '#64748b',
                    fontSize: '11px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    outline: 'none'
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                  </svg>
                  Refresh
                </button>
              </div>
            </div>

            {/* Visual Captcha Box */}
            <div style={{
              position: 'relative',
              height: '56px',
              background: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              userSelect: 'none'
            }}>
              {/* Noise Grid / Zigzag Lines */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'linear-gradient(45deg, transparent 45%, rgba(124, 58, 237, 0.04) 48%, rgba(124, 58, 237, 0.04) 52%, transparent 55%), linear-gradient(-45deg, transparent 45%, rgba(124, 58, 237, 0.04) 48%, rgba(124, 58, 237, 0.04) 52%, transparent 55%)',
                backgroundSize: '24px 24px',
                pointerEvents: 'none'
              }} />

              {/* Dynamic Zigzag Characters */}
              <div style={{ display: 'flex', gap: '14px', position: 'relative', zIndex: 2 }}>
                {mounted ? (
                  captchaCode.split('').map((char, index) => {
                    const rot = ((char.charCodeAt(0) * (index + 1)) % 30) - 15;
                    const transY = ((char.charCodeAt(0) * (index + 2)) % 16) - 8;
                    const skew = ((char.charCodeAt(0) * (index + 3)) % 20) - 10;
                    return (
                      <span
                        key={index}
                        style={{
                          fontSize: '22px',
                          fontWeight: 800,
                          fontFamily: "'Courier New', monospace",
                          color: index % 2 === 0 ? '#0284c7' : '#7c3aed',
                          display: 'inline-block',
                          transform: `translateY(${transY}px) rotate(${rot}deg) skewX(${skew}deg)`,
                        }}
                      >
                        {char}
                      </span>
                    );
                  })
                ) : (
                  <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>
                    Initializing security...
                  </span>
                )}
              </div>
            </div>

            {/* Input text */}
            <input
              type="text"
              placeholder="Enter security code"
              value={captchaInput}
              onChange={e => setCaptchaInput(e.target.value.toUpperCase())}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#0f172a',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
                textAlign: 'center',
                letterSpacing: '3px',
                fontWeight: 700
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px',
              fontSize: '13.5px',
              fontWeight: 700,
              width: '100%',
              marginTop: '8px',
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(124,58,237,0.3)',
              fontFamily: 'inherit'
            }}
          >
            {loading ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '13px', color: '#64748b' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: 600 }}>
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
