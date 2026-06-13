"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function CandidateCareerCoach() {
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: 'yo! I am your AI career coach. Ask me anything about transitioning roles, preparing for interviews, or technical roadmaps.' }
  ]);
  const [inputText, setInputText] = useState<string>('');

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
      activeItem="Career Coach"
      headerTitle="AI Career Coach"
      headerSubtitle="Get automated recommendations, career path advice, and resume optimizations."
      planOrNodeName="Pro Match"
    >
      <div className="glass-panel" style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: '520px' }}>
        <h3 className="brand-title" style={{ margin: '0 0 15px', fontSize: '18px', textTransform: 'none' }}>Active Career Coach Session</h3>
        
        {/* Chat Body */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px', paddingRight: '5px' }}>
          {chatMessages.map((msg, idx) => (
            <div key={idx} style={{
              padding: '12px 16px',
              borderRadius: '12px',
              fontSize: '13.5px',
              lineHeight: '1.5',
              maxWidth: '80%',
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              background: msg.sender === 'user' ? '#0969da' : '#f6f8fa',
              color: msg.sender === 'user' ? '#ffffff' : '#1f2328',
              border: msg.sender === 'user' ? 'none' : '1px solid #d0d7de',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}>
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input form */}
        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Ask about transition, resume advice, or interview prep..."
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #d0d7de',
              background: '#ffffff',
              color: '#1f2328',
              fontSize: '13.5px'
            }}
          />
          <button type="submit" className="glow-btn" style={{ padding: '12px 24px', fontSize: '13.5px' }}>Send Message</button>
        </form>
      </div>
    </DashboardLayout>
  );
}
