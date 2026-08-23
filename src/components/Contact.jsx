import React, { memo } from 'react';
import { personalInfo } from '../data/portfolioData';

const Contact = memo(function Contact() {
  return (
    <section id="contact" aria-label="Contact Vishnu Dharan">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">05 // COMMUNICATION</div>
          <h2 className="section-title">
            Let's Build Something <span className="highlight">Intelligent</span>
          </h2>
          <p className="section-sub">
            I'm open to discussing AI research, software engineering opportunities, or collaborating on ambitious projects.
          </p>
        </div>

        <div className="contact-grid-full">
          <a href={`mailto:${personalInfo.email}`} className="contact-card" id="contact-email">
            <div className="contact-card-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="contact-icon">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div className="contact-card-info">
              <div className="contact-card-label">Direct Transmission // Email</div>
              <div className="contact-card-val">{personalInfo.email}</div>
            </div>
            <div className="contact-card-arrow">→</div>
          </a>

          <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="contact-card" id="contact-phone">
            <div className="contact-card-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="contact-icon">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div className="contact-card-info">
              <div className="contact-card-label">Voice Line // Phone</div>
              <div className="contact-card-val">{personalInfo.phone}</div>
            </div>
            <div className="contact-card-arrow">→</div>
          </a>

          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="contact-card" id="contact-github">
            <div className="contact-card-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="contact-icon">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </div>
            <div className="contact-card-info">
              <div className="contact-card-label">Source Repositories // GitHub</div>
              <div className="contact-card-val">{personalInfo.githubUsername}</div>
            </div>
            <div className="contact-card-arrow">→</div>
          </a>

          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact-card" id="contact-linkedin">
            <div className="contact-card-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="contact-icon">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </div>
            <div className="contact-card-info">
              <div className="contact-card-label">Professional Network // LinkedIn</div>
              <div className="contact-card-val">{personalInfo.linkedinName}</div>
            </div>
            <div className="contact-card-arrow">→</div>
          </a>

          <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className="contact-card contact-card-highlight" id="contact-resume">
            <div className="contact-card-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="contact-icon">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div className="contact-card-info">
              <div className="contact-card-label">Curriculum Vitae // PDF</div>
              <div className="contact-card-val">View / Download Verified Resume</div>
            </div>
            <div className="contact-card-arrow">↓</div>
          </a>
        </div>
      </div>
    </section>
  );
});

export default Contact;
