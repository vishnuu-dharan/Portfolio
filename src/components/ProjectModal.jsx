import React, { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="project-modal-overlay open"
      id="project-modal-overlay"
      aria-hidden="false"
      onClick={(e) => {
        if (e.target.id === 'project-modal-overlay') onClose();
      }}
    >
      <div className="project-modal-container">
        <button
          className="modal-close-btn"
          id="modal-close-btn"
          aria-label="Close Case Study Modal"
          onClick={onClose}
        >
          &times;
        </button>

        <div id="modal-content-body">
          <div className="modal-subtitle">{project.subtitle}</div>
          <h2 className="modal-title">{project.title}</h2>

          <div className="modal-section" style={{ marginTop: '24px' }}>
            <div className="modal-section-title">PROBLEM STATEMENT</div>
            <p className="modal-text">{project.problem}</p>
          </div>

          <div className="modal-section">
            <div className="modal-section-title">ENGINEERED SOLUTION</div>
            <p className="modal-text">{project.solution}</p>
          </div>

          <div className="modal-section">
            <div className="modal-section-title">KEY TECHNICAL HIGHLIGHTS</div>
            <ul className="modal-text" style={{ paddingLeft: '20px', listStyleType: 'square' }}>
              {project.highlights.map((highlight, idx) => (
                <li key={idx} style={{ marginBottom: '6px' }}>{highlight}</li>
              ))}
            </ul>
          </div>

          <div className="modal-section">
            <div className="modal-section-title">TECHNOLOGY STACK</div>
            <div className="project-tech">
              {project.tech.map((tech, idx) => (
                <span className="tech-pill" key={idx}>{tech}</span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View Source Code on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
