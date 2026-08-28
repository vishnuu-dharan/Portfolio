import React, { useState, useEffect, memo } from 'react';
import { personalInfo } from '../data/portfolioData';

const Hero = memo(function Hero() {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentPhrase = personalInfo.typedPhrases[phraseIdx];
    const speed = isDeleting ? 45 : 85;

    if (isDeleting) {
      if (text.length === 0) {
        setIsDeleting(false);
        setPhraseIdx((prev) => (prev + 1) % personalInfo.typedPhrases.length);
      } else {
        timer = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length - 1));
        }, speed);
      }
    } else {
      if (text.length === currentPhrase.length) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      } else {
        timer = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length + 1));
        }, speed);
      }
    }

    return () => clearTimeout(timer);
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
