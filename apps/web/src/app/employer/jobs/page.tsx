"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import DOMPurify from 'dompurify';
import { Info } from 'lucide-react';

function EmployerJobsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeJobs, setActiveJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState('Employer');
  const [previewJobId, setPreviewJobId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string>('');
  const msgRef = useRef<HTMLDivElement>(null);

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
    if (searchParams.get('posted') === 'success') {
      setSuccessMsg('Job posting has been done successfully');
      setTimeout(() => setSuccessMsg(''), 5000);
      router.replace('/employer/jobs');
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (successMsg && msgRef.current) {
      msgRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [successMsg]);

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
            onClick={() => router.push('/employer/post-job')}
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
                    {job.bannerUrl && (
                      <div style={{ width: '100%', maxHeight: '200px', borderRadius: '8px', overflow: 'hidden', marginBottom: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <img src={job.bannerUrl} alt="Job Banner" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', display: 'block' }} />
                      </div>
                    )}
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

    </DashboardLayout>
  );
}

export default function EmployerJobs() {
  return (
    <Suspense fallback={<div style={{ padding: '20px', color: 'white' }}>Loading Workspace...</div>}>
      <EmployerJobsContent />
    </Suspense>
  );
}
