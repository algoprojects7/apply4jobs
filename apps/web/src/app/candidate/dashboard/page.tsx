"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function CandidateDashboard() {
  const [fullName, setFullName] = useState<string>('Candidate');
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [profileScore, setProfileScore] = useState<number>(65);
  const [showSkillGap, setShowSkillGap] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: 'yo! I am your AI career coach. Ask me anything about transitioning roles or preparing for interviews!' }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [applications, setApplications] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/candidate/dashboard')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') {
          const { profileScore, atsScore, recommendations, applications, fullName } = res.data;
          setProfileScore(profileScore);
          setAtsScore(atsScore);
          setRecommendations(recommendations);
          setApplications(applications);
          setFullName(fullName);
        }
      })
      .catch(err => console.error('Error fetching candidate dashboard data:', err));
  }, []);

  const handleSimulateUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setAtsScore(84);
      setProfileScore(95);
      setUploading(false);
      setChatMessages(prev => [
        ...prev,
        { sender: 'ai', text: 'Your resume is analyzed! I found missing skills: NestJS and PostgreSQL. Click "Analyze Skill Gap" to view your customized path.' }
      ]);
    }, 1500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputText('');

    setTimeout(() => {
      let aiResponse = 'That is a great question. Developing your backend skills with TypeScript and cloud architectures is highly valued in the current job marketplace.';
      if (userMsg.toLowerCase().includes('nest') || userMsg.toLowerCase().includes('prisma')) {
        aiResponse = 'To learn NestJS and Prisma, check out the NestJS documentation and practice building REST APIs. I also recommend checking the course suggestions in the Skill Gap widget!';
      }
      setChatMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 1000);
  };

  return (
    <DashboardLayout
      role="candidate"
      activeItem="Workspace"
      headerTitle="Candidate Workspace"
      headerSubtitle={`Welcome back, ${fullName}!`}
      planOrNodeName="Pro Match"
    >
      {/* Grid Dashboard Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        
        {/* Left Column: Stats & Recommendations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Row 1: Profile score & ATS Resume Upload */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Widget 1: Profile Completion Score */}
            <div className="glass-panel" style={{ padding: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ margin: '0 0 10px', fontSize: '14px', color: '#94a3b8' }}>Profile Completion Score</h3>
                <div className="brand-title" style={{ fontSize: '48px', fontWeight: 800, color: '#6d28d9', margin: '10px 0', textTransform: 'none' }}>
                  {profileScore}%
                </div>
              </div>
              <div className="volumetric-bar" style={{ width: '100%', height: '12px' }}>
                <div className="volumetric-bar-fill" style={{ width: `${profileScore}%`, transition: 'width 0.5s ease' }} />
              </div>
            </div>

            {/* Widget 2: ATS Score Checker */}
            <div className="glass-panel" style={{ padding: '25px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <h3 style={{ margin: '0 0 15px', fontSize: '14px', color: '#94a3b8' }}>AI ATS Resume Parser</h3>
              {atsScore !== null ? (
                <div>
                  <div style={{ display: 'inline-flex', width: '80px', height: '80px', borderRadius: '50%', border: '4px solid #10b981', justifyContent: 'center', alignItems: 'center', fontSize: '24px', fontWeight: 'bold', color: '#10b981', marginBottom: '10px', boxShadow: '0 0 15px rgba(16, 185, 129, 0.2)' }}>
                    {atsScore}
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>ATS Rating: Ready for submissions</p>
                </div>
              ) : (
                <div>
                  <button 
                    onClick={handleSimulateUpload} 
                    disabled={uploading} 
                    className="glow-btn" 
                    style={{ padding: '10px 20px', fontSize: '13px', width: '200px' }}
                  >
                    {uploading ? 'Analyzing PDF...' : 'Upload PDF Resume'}
                  </button>
                  <p style={{ margin: '10px 0 0', fontSize: '12px', color: '#64748b' }}>Simulate AI parsing of skills & work history</p>
                </div>
              )}
            </div>
          </div>

          {/* Widget 3: AI Recommended Jobs */}
          <div className="glass-panel" style={{ padding: '25px' }}>
            <h3 className="brand-title" style={{ margin: '0 0 20px', fontSize: '18px', textTransform: 'none' }}>AI Recommended Openings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {recommendations.map(rec => (
                <div key={rec.id} className="glass-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>{rec.title}</h4>
                      <span style={{ fontSize: '11px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '2px 8px', borderRadius: '20px' }}>{rec.match}% Match</span>
                    </div>
                    <p style={{ margin: '5px 0 0', color: '#94a3b8', fontSize: '12.5px' }}>{rec.company} &bull; {rec.location} &bull; {rec.salary}</p>
                  </div>
                  <button className="glow-btn" style={{ padding: '8px 16px', fontSize: '12px' }}>Apply Instantly</button>
                </div>
              ))}
              {recommendations.length === 0 && (
                <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>No recommendations generated. Optimize profile to trigger matching rules.</div>
              )}
            </div>
          </div>

          {/* Widget 4: Applied Jobs Tracker */}
          <div className="glass-panel" style={{ padding: '25px' }}>
            <h3 className="brand-title" style={{ margin: '0 0 20px', fontSize: '18px', textTransform: 'none' }}>Active Applications</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ paddingBottom: '12px', color: '#94a3b8', fontWeight: 500, fontSize: '13px' }}>Position</th>
                  <th style={{ paddingBottom: '12px', color: '#94a3b8', fontWeight: 500, fontSize: '13px' }}>Company</th>
                  <th style={{ paddingBottom: '12px', color: '#94a3b8', fontWeight: 500, fontSize: '13px' }}>Status</th>
                  <th style={{ paddingBottom: '12px', color: '#94a3b8', fontWeight: 500, fontSize: '13px' }}>Applied Date</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '12px 0', fontSize: '13.5px' }}>{app.job}</td>
                    <td style={{ padding: '12px 0', fontSize: '13.5px', color: '#94a3b8' }}>{app.company}</td>
                    <td style={{ padding: '12px 0', fontSize: '13.5px' }}>
                      <span style={{
                        padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                        backgroundColor: app.status === 'Interview' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(124, 58, 237, 0.15)',
                        color: app.status === 'Interview' ? '#10b981' : '#7c3aed'
                      }}>{app.status}</span>
                    </td>
                    <td style={{ padding: '12px 0', fontSize: '13.5px', color: '#64748b' }}>{app.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: AI Guidance & Coach */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Widget 5: Skill Gap Analyzer */}
          <div className="glass-panel" style={{ padding: '25px' }}>
            <h3 className="brand-title" style={{ margin: '0 0 15px', fontSize: '18px', textTransform: 'none' }}>Skill Gap Analysis</h3>
            <p style={{ fontSize: '12.5px', color: '#94a3b8', margin: '0 0 20px', lineHeight: '1.5' }}>
              Compare your profile details with requirements for <strong>Senior TypeScript Developer</strong> roles.
            </p>
            {showSkillGap ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#ff007f', fontWeight: 600, marginBottom: '5px', letterSpacing: '0.5px' }}>MISSING SKILLS</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ padding: '3px 8px', background: 'rgba(255, 0, 127, 0.1)', color: '#ff007f', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>NestJS</span>
                    <span style={{ padding: '3px 8px', background: 'rgba(255, 0, 127, 0.1)', color: '#ff007f', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>PostgreSQL</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600, marginBottom: '5px', letterSpacing: '0.5px' }}>LEARNING ROADMAP</div>
                  <ol style={{ paddingLeft: '15px', margin: 0, fontSize: '12px', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <li>Read NestJS Docs &bull; Duration: 5 days</li>
                    <li>Configure Prisma Client seeds &bull; Duration: 3 days</li>
                  </ol>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setShowSkillGap(true)}
                style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: 'white', cursor: 'pointer', fontSize: '13px' }}
              >
                Analyze Skill Gap
              </button>
            )}
          </div>

          {/* Widget 6: AI Career Coach Chat */}
          <div className="glass-panel" style={{ padding: '25px', display: 'flex', flexDirection: 'column', height: '420px' }}>
            <h3 className="brand-title" style={{ margin: '0 0 15px', fontSize: '18px', textTransform: 'none' }}>AI Career Coach</h3>
            
            {/* Chat Body */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '15px', paddingRight: '5px' }}>
              {chatMessages.map((msg, idx) => (
                <div key={idx} style={{
                  padding: '10px 14px', borderRadius: '12px', fontSize: '12.5px', lineHeight: '1.5', maxWidth: '85%',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'user' ? '#7c3aed' : 'rgba(255,255,255,0.03)',
                  color: '#ffffff',
                  border: msg.sender === 'user' ? 'none' : '1px solid rgba(255,255,255,0.04)'
                }}>
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input form */}
            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Ask about transition/interview preparation..."
                style={{
                  flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: '12.5px'
                }}
              />
              <button type="submit" className="glow-btn" style={{ padding: '10px 15px', fontSize: '13px' }}>Send</button>
            </form>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
