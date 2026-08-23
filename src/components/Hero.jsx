import React, { useState, useEffect, memo } from 'react';
import { personalInfo } from '../data/portfolioData';

const Hero = memo(function Hero() {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = personalInfo.typedPhrases[phraseIdx];
    const speed = isDeleting ? 45 : 85;
    let holdTimer;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentPhrase.slice(0, text.length + 1));
        if (text.length + 1 === currentPhrase.length) {
          holdTimer = setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setText(currentPhrase.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setPhraseIdx((prev) => (prev + 1) % personalInfo.typedPhrases.length);
        }
      }
    }, speed);

    return () => {
      clearTimeout(timer);
      if (holdTimer) clearTimeout(holdTimer);
    };
  }, [text, isDeleting, phraseIdx]);

  return (
    <section id="hero" aria-label="Hero — AI Developer Laboratory">
      <div className="hero-tag">{personalInfo.tag}</div>

      <h1 className="hero-name">
        VISHNU <span className="accent">DHARAN</span>
      </h1>

      <div className="hero-headline">
        {personalInfo.title} <span id="typed-title">{text}</span>
      </div>

      <p className="hero-bio">
        {personalInfo.bio}
      </p>
    </section>
  );
});

export default Hero;
