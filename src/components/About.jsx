import React, { useState, useEffect, useRef, memo } from 'react';
import { aboutData } from '../data/portfolioData';

const StatCard = memo(function StatCard({ stat }) {
  const [count, setCount] = useState(0);
  const cardRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    let timer;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            let start = 0;
            const end = stat.count;
            const duration = 1400;
            const stepTime = 20;
            const totalSteps = duration / stepTime;
            const increment = end / totalSteps;

            timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                setCount(end);
                clearInterval(timer);
              } else {
                setCount(Math.ceil(start));
              }
            }, stepTime);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (timer) clearInterval(timer);
      observer.disconnect();
    };
  }, [stat.count]);

  return (
    <div className="stat-card" ref={cardRef}>
      <div className="stat-num">
        {count}{stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
});

const About = memo(function About() {
  const getFocusIcon = (iconName) => {
    switch (iconName) {
      case 'layers':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        );
      case 'search':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        );
      case 'mic':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          </svg>
        );
      case 'cpu':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="about" aria-label="About Vishnu Dharan">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{aboutData.tag}</div>
          <h2 className="section-title">
            Building Scalable <span className="highlight">{aboutData.highlight}</span>
          </h2>
          <p className="section-sub">
            {aboutData.description}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="about-stats">
          {aboutData.stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} />
          ))}
        </div>

        {/* Focus Nodes Grid */}
        <div className="focus-nodes-grid">
          {aboutData.focusNodes.map((node, idx) => (
            <div className="focus-node-card" key={idx}>
              <div className="focus-node-icon">
                {getFocusIcon(node.icon)}
              </div>
              <h3 className="focus-node-title">{node.title}</h3>
              <p className="focus-node-desc">{node.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default About;
