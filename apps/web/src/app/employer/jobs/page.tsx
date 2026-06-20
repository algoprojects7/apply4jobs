"use client";

import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import DOMPurify from 'dompurify';
import { Info } from 'lucide-react';

export default function EmployerJobs() {
  const [activeJobs, setActiveJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState('Employer');
  const [showAddJobModal, setShowAddJobModal] = useState<boolean>(false);
  const [previewJobId, setPreviewJobId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const msgRef = useRef<HTMLDivElement>(null);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newLocation, setNewLocation] = useState<string>('');

  const loadData = () => {
    fetch('/api/employer/dashboard')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') {
          setActiveJobs(res.data.activeJobs);
          setCompanyName(res.data.companyName);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading jobs:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (successMsg && msgRef.current) {
      msgRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [successMsg]);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          location: newLocation || 'Remote',
          companyName: companyName,
          skillsRequired: ['TypeScript', 'React', 'Node.js']
        })
      });
      const data = await res.json();
      if (data.status === 'success') {
        loadData();
        setSuccessMsg('Job posting has been done successfully');
        setTimeout(() => setSuccessMsg(''), 5000);
      }
    } catch (err) {
      console.error('Error posting new job:', err);
    }

    setNewTitle('');
    setNewLocation('');
    setShowAddJobModal(false);
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to remove this job listing?')) return;
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.status === 'success') {
        loadData();
        setSuccessMsg('Job has been successfully removed');
        setTimeout(() => setSuccessMsg(''), 5000);
      }
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  return (
    <DashboardLayout
      role="employer"
      activeItem="Job Listings"
      headerTitle="Job Listings"
      headerSubtitle={`Active job openings managed by ${companyName}.`}
      planOrNodeName="Enterprise AI"
    >
      {successMsg && (
        <div ref={msgRef} style={{ padding: '12px 16px', background: '#ecfdf5', color: '#065f46', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', maxWidth: '900px', margin: '0 auto 20px', border: '1px solid #a7f3d0' }}>
          <Info size={18} />
          <span style={{ fontSize: '13.5px', fontWeight: 500 }}>{successMsg}</span>
        </div>
      )}
      <div className="glass-panel" style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 className="brand-title" style={{ margin: 0, fontSize: '18px', textTransform: 'none' }}>Active Openings</h3>
          <button 
            onClick={() => setShowAddJobModal(true)}
            className="glow-btn" 
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            + Post New Job
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#57606a' }}>Loading job records...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {activeJobs.map(job => (
              <div key={job.id} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="responsive-flex-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px', fontSize: '16px', fontWeight: 600 }}>{job.title}</h4>
                    <div style={{ fontSize: '13px', color: '#57606a' }}>
                      <span>📍 {job.location}</span> &bull; <span>👥 {job.applicants} Applicants</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button 
                      onClick={() => setPreviewJobId(previewJobId === job.id ? null : job.id)}
                      style={{ padding: '8px 16px', fontSize: '12px', background: 'transparent', border: '1px solid #d0d7de', color: '#1f2328', borderRadius: '12px', cursor: 'pointer' }}
                    >
                      {previewJobId === job.id ? 'Close Preview' : 'Preview Posting'}
                    </button>
                    <button className="glow-btn" style={{ padding: '8px 16px', fontSize: '12px' }}>View Applicants</button>
                    <button style={{ padding: '8px 16px', fontSize: '12px', background: 'transparent', border: '1px solid #d0d7de', color: '#1f2328', borderRadius: '12px', cursor: 'pointer' }}>Edit</button>
                    <button 
                      onClick={() => handleDeleteJob(job.id)}
                      style={{ padding: '8px 16px', fontSize: '12px', background: '#ffebe9', border: '1px solid #ff8182', color: '#cf222e', borderRadius: '12px', cursor: 'pointer', fontWeight: 500 }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                {previewJobId === job.id && (
                  <div style={{ 
                    marginTop: '5px', 
                    paddingTop: '15px', 
                    borderTop: '1px solid #d0d7de',
                    color: '#1f2328',
                    fontSize: '14px' 
                  }}>
                    <div 
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: typeof window !== 'undefined' ? DOMPurify.sanitize(job.description || '<p>No description provided.</p>') : (job.description || '') 
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
            {activeJobs.length === 0 && (
              <div style={{ padding: '40px', textAlign: 'center', color: '#656d76' }}>No job listings created. Click Post New Job to publish one.</div>
            )}
          </div>
        )}
      </div>

      {showAddJobModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100
        }}>
          <div className="glass-panel" style={{ padding: '30px', width: '400px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3 className="brand-title" style={{ margin: '0 0 10px', textTransform: 'none' }}>Post New Opening</h3>
            <form onSubmit={handleCreateJob} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#57606a', marginBottom: '5px' }}>Job Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Senior Node Developer"
                  style={{ width: '100%', padding: '10px' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#57606a', marginBottom: '5px' }}>Location/Remote Option</label>
                <input 
                  type="text" 
                  value={newLocation}
                  onChange={e => setNewLocation(e.target.value)}
                  placeholder="e.g. Remote, San Francisco"
                  style={{ width: '100%', padding: '10px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="glow-btn" style={{ flex: 1, padding: '10px', fontSize: '13px' }}>Publish Job</button>
                <button 
                  type="button" 
                  onClick={() => setShowAddJobModal(false)}
                  style={{ flex: 1, padding: '10px', borderRadius: '12px', border: '1px solid #d0d7de', background: 'transparent', color: '#1f2328', cursor: 'pointer', fontSize: '13px' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
