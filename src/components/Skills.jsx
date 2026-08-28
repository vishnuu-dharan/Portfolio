import React, { memo } from 'react';

const Skills = memo(function Skills() {
  return (
    <section id="skills" aria-label="Technical Skills">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">02 // TECHNICAL ARSENAL</div>
          <h2 className="section-title">
            Engineered <span className="highlight">Ecosystem</span>
          </h2>
          <p className="section-sub">
            Curated tools, frameworks, and vector engines I use to build scalable production-ready AI software.
          </p>
        </div>

        <div className="skills-categories">
          {/* Category: AI & Generative AI */}
          <div className="skill-category">
            <div className="skill-category-title">AI &amp; Generative AI Ecosystem</div>
            <div className="skill-badges">
              <div className="skill-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><circle cx="12" cy="12" r="3"/></svg>
                Prompt Engineering
              </div>
              <div className="skill-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                RAG Systems
              </div>
              <div className="skill-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
                Voice AI
              </div>
              <div className="skill-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                LangChain
              </div>
              <div className="skill-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                LangGraph
              </div>
              
            </div>
          </div>

          {/* Category: Programming Languages */}
          <div className="skill-category">
            <div className="skill-category-title">Programming Languages</div>
            <div className="skill-badges">
              <div className="skill-badge">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.25 21.75c-5.38 0-5.25-2.34-5.25-2.34l.01-2.41h5.36v.77s0 2.37-2.38 2.37h-.08zm-2.22-19.5c5.38 0 5.25 2.34 5.25 2.34l-.01 2.41h-5.36v-.77s0-2.37 2.38-2.37h.08z"/><path d="M7.44 13.91s-2.34.02-2.34-5.38c0-5.36 2.4-5.23 2.4-5.23l2.42.01v5.36h-.78s-2.36 0-2.36 2.38v.08zm9.5-2.22s2.34-.02 2.34 5.38c0 5.36-2.4 5.23-2.4 5.23l-2.42-.01v-5.36h.78s2.36 0 2.36-2.38v-.08z"/></svg>
                Python
              </div>
              <div className="skill-badge">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.87.194 4.859-.214 0 0 .452-.304-.176-.465-1.579-.404-4.526-.499-5.336-.035zm-1.077-2.327s-1.127.765.488.948c2.259.257 3.992.259 6.891-.252 0 0 .615-.357-.272-.6-2.072-.566-5.834-.694-7.107-.096zm7.25-3.411c1.071.979.231 2.229-.443 2.842-1.921 1.745-5.748 1.411-7.185.342-.511-.38.077-.732.428-.636 1.488.406 4.316.596 5.679-.508.825-.668.618-1.391-.264-1.895-1.916-1.096-4.992-.47-6.282-1.637-.621-.563-.122-1.229.479-1.246 1.639-.044 3.031.42 4.148.97.234.116.666-.341.341-.532-1.74-.997-3.921-1.042-5.46-.358-1.547.689-1.764 1.83-.497 2.68 1.693 1.134 4.793.811 6.136 1.674z"/></svg>
                Java
              </div>
              <div className="skill-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
                SQL
              </div>
              <div className="skill-badge">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.625 10.106.002.23-2.625H5.806l.696 7.875h8.212l-.337 3.75-2.41.652-2.414-.652-.154-1.742H6.77l.302 3.407 4.901 1.36 4.903-1.36.678-7.532H8.531z"/></svg>
                HTML5 / CSS3
              </div>
            </div>
          </div>

          {/* Category: Backend & Orchestration */}
          <div className="skill-category">
            <div className="skill-category-title">Backend &amp; Orchestration</div>
            <div className="skill-badges">
              <div className="skill-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                FastAPI
              </div>
              <div className="skill-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 2v7.31a5.5 5.5 0 0 1-1.33 3.55L4.4 18.27A3.5 3.5 0 0 0 7.12 24h9.76a3.5 3.5 0 0 0 2.72-5.73l-4.27-5.41A5.5 5.5 0 0 1 14 9.31V2h-4z"/><line x1="8.5" y1="2" x2="15.5" y2="2"/></svg>
                Flask
              </div>
              
              
              <div className="skill-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><line x1="12" y1="8" x2="12" y2="21"/></svg>
                SQLAlchemy
              </div>
            </div>
          </div>

          {/* Category: Frontend & Web UI */}
          <div className="skill-category">
            <div className="skill-category-title">Frontend &amp; UI Architecture</div>
            <div className="skill-badges">
              <div className="skill-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>
                React.js
              </div>
              <div className="skill-badge">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/></svg>
                Tailwind CSS
              </div>
              <div className="skill-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                Vite
              </div>
              
            </div>
          </div>

          {/* Category: Databases & Vector Stores */}
          <div className="skill-category">
            <div className="skill-category-title">Databases &amp; Vector Engines</div>
            <div className="skill-badges">
              <div className="skill-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                ChromaDB
              </div>
              <div className="skill-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M11 8v6M8 11h6"/></svg>
                FAISS
              </div>
              <div className="skill-badge">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C10.5 3 6 8.5 6 13.5A6 6 0 0 0 18 13.5C18 8.5 13.5 3 12 0zm0 17.5a4 4 0 0 1-4-4c0-2.8 2.6-6.4 4-8.2 1.4 1.8 4 5.4 4 8.2a4 4 0 0 1-4 4z"/></svg>
                MongoDB
              </div>
              <div className="skill-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/><circle cx="8" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="8" cy="18" r="2"/></svg>
                MySQL
              </div>
              <div className="skill-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/></svg>
                SQLite
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Skills;
