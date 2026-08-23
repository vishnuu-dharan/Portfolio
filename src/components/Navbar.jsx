import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''} role="navigation" aria-label="Main navigation">
        <div className="container nav-inner">
          <a href="#hero" className="nav-logo" aria-label="Vishnu Dharan - Home">
            <span className="nav-logo-dot" aria-hidden="true"></span>
            Vishnu Dharan
          </a>

          <div className="nav-right">
            <div className="status-pill">
              <span className="status-dot"></span>
              <span>OPEN TO OPPORTUNITIES</span>
            </div>

            <ul className="nav-links" role="list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    id={`nav-${link.id}`}
                    className={activeSection === link.id ? 'active' : ''}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <button
              className="nav-mobile-toggle"
              id="mobile-toggle-btn"
              aria-label="Toggle Navigation Menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Overlay */}
      <div className={`mobile-nav-overlay ${mobileOpen ? 'open' : ''}`} id="mobile-nav-overlay" aria-hidden="true">
        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className="mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
