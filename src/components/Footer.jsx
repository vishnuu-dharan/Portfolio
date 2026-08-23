import React, { memo } from 'react';

const Footer = memo(function Footer() {
  return (
    <footer role="contentinfo">
      <div className="container footer-inner">
        <p className="footer-copy">
          © 2025 <span>Vishnu Dharan K</span>. Engineered with curiosity &amp; precision.
        </p>
      </div>
    </footer>
  );
});

export default Footer;
