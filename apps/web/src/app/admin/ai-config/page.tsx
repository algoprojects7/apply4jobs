"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function AdminAiConfig() {
  const [aiModel, setAiModel] = useState<string>('gemini-2.5-pro');
  const [matchThreshold, setMatchThreshold] = useState<number>(75);

  const handleForceSync = () => {
    alert('AI matching pipeline sync completed successfully.');
  };

  return (
    <DashboardLayout
      role="admin"
      activeItem="AI Engine Config"
      headerTitle="AI Core Configuration"
      headerSubtitle="Configure matching engine thresholds and primary model definitions."
      planOrNodeName="Active"
    >
      <div className="glass-panel" style={{ padding: '30px', maxWidth: '650px', margin: '0 auto' }}>
        <h3 className="brand-title" style={{ margin: '0 0 20px', fontSize: '18px', textTransform: 'none' }}>AI Engine Settings</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#57606a', marginBottom: '6px', fontWeight: 600 }}>Active LLM Classifier</label>
            <select 
              value={aiModel} 
              onChange={e => setAiModel(e.target.value)}
              style={{ width: '100%', padding: '10px', fontSize: '14px' }}
            >
              <option value="gemini-2.5-pro">Gemini 2.5 Pro (Precision)</option>
              <option value="gemini-2.5-flash">Gemini 2.5 Flash (Speed)</option>
              <option value="custom-embedding">Custom Embeddings Server</option>
            </select>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#57606a', marginBottom: '6px', fontWeight: 600 }}>
              <span>Min Match Threshold</span>
              <span style={{ color: '#0969da', fontWeight: 600 }}>{matchThreshold}%</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="95" 
              value={matchThreshold} 
              onChange={e => setMatchThreshold(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#0969da', cursor: 'pointer' }}
            />
          </div>

          <button 
            onClick={handleForceSync}
            className="glow-btn" 
            style={{ width: '150px', padding: '10px', fontSize: '13px', marginTop: '10px' }}
          >
            Force Sync Queue
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
