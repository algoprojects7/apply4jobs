"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { JobDescriptionEditor } from '@/components/editors/JobDescriptionEditor';

export default function PostJobPage() {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [bannerUrl, setBannerUrl] = useState<string>('');
  const [uploadingBanner, setUploadingBanner] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>('Employer');
  const [loading, setLoading] = useState(true);

  const demoHtml = `
    <h1>Senior Software Engineer</h1>
    <p><strong>Company:</strong> ABC Technologies Pvt. Ltd.<br>
    <strong>Location:</strong> Guwahati, Assam, India<br>
    <strong>Employment Type:</strong> Full-Time<br>
    <strong>Experience:</strong> 3–5 Years<br>
    <strong>Salary:</strong> ₹8,00,000 – ₹12,00,000 per annum</p>
    <hr>
    <h2>About the Role</h2>
    <p>We are seeking a talented and motivated Senior Software Engineer to join our growing technology team. The ideal candidate will be responsible for designing, developing, and maintaining scalable web applications while collaborating with cross-functional teams to deliver high-quality software solutions.</p>
    <hr>
    <h2>Key Responsibilities</h2>
    <ul>
    <li>Design, develop, and maintain web applications.</li>
    <li>Build scalable REST APIs and backend services.</li>
    <li>Collaborate with product managers, designers, and developers.</li>
    <li>Optimize application performance and database queries.</li>
    <li>Write clean, maintainable, and well-documented code.</li>
    <li>Participate in code reviews and technical discussions.</li>
    <li>Troubleshoot and resolve production issues.</li>
    </ul>
    <hr>
    <h2>Required Skills & Qualifications</h2>
    <ul>
    <li>Bachelor's degree in Computer Science, Engineering, or related field.</li>
    <li>Strong proficiency in JavaScript and TypeScript.</li>
    <li>Experience with Next.js and React.</li>
    <li>Experience with Node.js or NestJS.</li>
    <li>Knowledge of PostgreSQL or other relational databases.</li>
    <li>Understanding of RESTful API development.</li>
    <li>Familiarity with Git version control.</li>
    </ul>
    <hr>
    <h2>Preferred Skills</h2>
    <ul>
    <li>Experience with Redis and caching strategies.</li>
    <li>Knowledge of Docker and containerized deployments.</li>
    <li>Familiarity with cloud platforms such as AWS, Azure, or Google Cloud.</li>
    <li>Understanding of CI/CD pipelines.</li>
    <li>Experience working in Agile environments.</li>
    </ul>
    <hr>
    <h2>Experience Requirements</h2>
    <ul>
    <li>Minimum 3 years of professional software development experience.</li>
    <li>Experience building enterprise-grade applications is preferred.</li>
    </ul>
    <hr>
    <h2>Benefits</h2>
    <ul>
    <li>Competitive salary package.</li>
    <li>Performance-based incentives.</li>
    <li>Health insurance coverage.</li>
    <li>Flexible working hours.</li>
    <li>Hybrid/Remote work opportunities.</li>
    <li>Professional training and certification support.</li>
    <li>Career growth opportunities.</li>
    </ul>
    <hr>
    <h2>Workplace Type</h2>
    <ul>
    <li>Hybrid</li>
    <li>Remote</li>
    <li>On-site</li>
    </ul>
    <hr>
    <h2>Application Process</h2>
    <ol>
    <li>Application Submission</li>
    <li>Resume Screening</li>
    <li>Technical Assessment</li>
    <li>Technical Interview</li>
    <li>HR Discussion</li>
    <li>Offer Release</li>
    </ol>
    <hr>
    <h2>Equal Opportunity Employer</h2>
    <p>We are committed to creating an inclusive workplace. We welcome applications from qualified candidates regardless of gender, race, religion, disability, age, or background.</p>
    <hr>
    <h3>Apply Now</h3>
    <p>Interested candidates are encouraged to submit their application along with an updated resume. Shortlisted candidates will be contacted for the next stage of the selection process.</p>
  `;

  useEffect(() => {
    setDescription(demoHtml);
    fetch('/api/employer/dashboard')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') {
          setCompanyName(res.data.companyName);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching employer info:', err);
        setLoading(false);
      });
  }, []);

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingBanner(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.status === 'success') {
        setBannerUrl(data.data.url);
      } else {
        alert(data.message || 'Failed to upload banner image');
      }
    } catch (err) {
      console.error('Error uploading banner:', err);
      alert('Error uploading banner image');
    } finally {
      setUploadingBanner(false);
    }
  };

  const extractTitle = (html: string) => {
    if (!html) return 'Untitled Job Position';
    const h1Match = html.match(/<h1>(.*?)<\/h1>/);
    if (h1Match && h1Match[1]) {
      return h1Match[1].replace(/<[^>]+>/g, '').trim() || 'Untitled Job Position';
    }
    const h2Match = html.match(/<h2>(.*?)<\/h2>/);
    if (h2Match && h2Match[1]) {
      return h2Match[1].replace(/<[^>]+>/g, '').trim() || 'Untitled Job Position';
    }
    const textContent = html.replace(/<[^>]+>/g, '\n').split('\n').map(s => s.trim()).filter(s => s.length > 0);
    return textContent.length > 0 ? textContent[0] : 'Untitled Job Position';
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();

    const dynamicTitle = extractTitle(description);

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: dynamicTitle,
          location: 'Guwahati, Assam, India',
          companyName: companyName,
          employmentType: 'Full-time',
          remoteType: 'Hybrid',
          salaryMin: 800000,
          salaryMax: 1200000,
          experienceMin: 3,
          experienceMax: 5,
          vacancyCount: 1,
          description: description || '',
          bannerUrl: bannerUrl || null,
          skillsRequired: ['TypeScript', 'React', 'Node.js']
        })
      });
      const data = await res.json();
      if (data.status === 'success') {
        router.push('/employer/jobs?posted=success');
      }
    } catch (err) {
      console.error('Error posting new job:', err);
    }
  };

  return (
    <DashboardLayout
      role="employer"
      activeItem="Post Job"
      headerTitle="Post a New Job"
      headerSubtitle={`${companyName} Workspace`}
      planOrNodeName="Enterprise AI"
    >
      <div className="glass-panel" style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <div>
            <h2 className="brand-title" style={{ margin: '0 0 5px', fontSize: '22px', textTransform: 'none' }}>Create Job Listing</h2>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px' }}>Fill out the details below to publish a new job opening.</p>
          </div>
          <button 
            onClick={() => router.push('/employer/dashboard')}
            style={{ padding: '8px 16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}
          >
            Back to Dashboard
          </button>
        </div>

        <form onSubmit={handleCreateJob} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px' }}>
            <h3 style={{ margin: '0 0 15px', fontSize: '15px', color: '#e2e8f0', fontWeight: 600 }}>Job Description Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
              {/* Banner Upload Section */}
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', fontWeight: 500, marginBottom: '8px' }}>
                  Job Banner Image
                </label>
                
                {bannerUrl ? (
                  <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', marginBottom: '15px' }}>
                    <img src={bannerUrl} alt="Job Banner Preview" style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', display: 'block' }} />
                    <button
                      type="button"
                      onClick={() => setBannerUrl('')}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(239, 68, 68, 0.9)',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: 600,
                        backdropFilter: 'blur(4px)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      Remove Banner
                    </button>
                  </div>
                ) : (
                  <div style={{
                    border: '2px dashed rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '20px',
                    textAlign: 'center',
                    background: 'rgba(255,255,255,0.01)',
                    marginBottom: '15px',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(109, 40, 217, 0.5)'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBannerUpload}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer'
                      }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                        <circle cx="9" cy="9" r="2"/>
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                      </svg>
                      <span style={{ fontSize: '13px', color: '#cbd5e1' }}>
                        {uploadingBanner ? 'Uploading image...' : 'Click or drag image here to upload a banner'}
                      </span>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Supports PNG, JPG, JPEG, WEBP</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <JobDescriptionEditor value={description} onChange={setDescription} />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button 
              type="button" 
              onClick={() => router.push('/employer/jobs')} 
              style={{ padding: '10px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
            >
              Cancel
            </button>
            <button type="submit" className="glow-btn" style={{ padding: '10px 24px', fontSize: '13px', fontWeight: 600, border: 'none' }}>
              Publish Job Listing
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
