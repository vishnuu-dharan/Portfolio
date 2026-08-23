import React, { memo } from 'react';
import { projectsData } from '../data/portfolioData';

const Projects = memo(function Projects({ onOpenModal }) {
  return (
    <section id="projects" aria-label="Featured Projects">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">03 // FEATURED SHOWCASE</div>
          <h2 className="section-title">
            Selected <span className="highlight">AI Projects</span>
          </h2>
          <p className="section-sub">
            End-to-end intelligent platforms designed, engineered, and shipped from scratch.
          </p>
        </div>

        <div className="projects-grid">
          {projectsData.map((project) => (
            <article className="project-card" key={project.id}>
              <div className="project-img-wrap">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="project-img-overlay"></div>
                <div className="project-badge-tag">{project.badge}</div>
              </div>
              <div className="project-body">
                <div>
                  <div className="project-num">{project.num}</div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, idx) => (
                      <span className="tech-pill" key={idx}>{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="project-actions">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    GitHub Repo
                  </a>
                  <button
                    className="btn btn-primary"
                    onClick={() => onOpenModal(project)}
                  >
                    Case Study
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Projects;
