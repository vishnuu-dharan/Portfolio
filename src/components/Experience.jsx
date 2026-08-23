import React, { memo } from 'react';
import { experienceData } from '../data/portfolioData';

const Experience = memo(function Experience() {
  return (
    <section id="experience" aria-label="Experience and Milestones">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">04 // MILESTONES &amp; ACADEMICS</div>
          <h2 className="section-title">
            Engineering <span className="highlight">Journey</span>
          </h2>
          <p className="section-sub">
            My academic foundation and technical development milestones.
          </p>
        </div>

        <div className="timeline">
          {experienceData.map((item, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-node"></div>
              <div className="timeline-content">
                <div className="timeline-date">{item.date}</div>
                <h3 className="timeline-role">{item.role}</h3>
                <div className="timeline-org">{item.org}</div>
                <p className="timeline-details">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Experience;
