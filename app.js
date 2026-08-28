/**
 * app.js — Cybernetic Command Matrix Application Logic
 * 3D Tilt Glare Physics, Cyber Matrix Text Decoders, Custom Reticle Cursor,
 * Case Study Modal System, Scroll Reveal & Counters
 */

(function () {
  'use strict';

  // ── 1. Loader Screen ─────────────────────────────────────────
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 600);
      }
    }, 1200);
  });

  // ── 2. Card Glow & Glare Coordinates ───
  const interactiveCards = document.querySelectorAll('.project-card, .focus-node-card, .stat-card, .skill-category');
  interactiveCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      card.style.setProperty('--glare-x', `${glareX}%`);
      card.style.setProperty('--glare-y', `${glareY}%`);
    });
  });

  // ── 4. Cyber Matrix Text Scramble / Decoder Effect ─────────
  const chars = '01#$@!%&*AX-9Z_<>[]/{}';
  function scrambleText(element) {
    const originalText = element.dataset.original || element.textContent;
    element.dataset.original = originalText;

    let iteration = 0;
    const interval = setInterval(() => {
      element.textContent = originalText
        .split('')
        .map((char, index) => {
          if (index < iteration) return originalText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 30);
  }

  // ── 5. Navbar Scroll & Mobile Overlay ───────────────────────
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle-btn');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      mobileOverlay.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileOverlay.classList.remove('open');
      });
    });
  }

  // ── 6. Typing Subtitle Loop ────────────────────────────────
  const typedEl = document.getElementById('typed-title');
  if (typedEl) {
    const phrases = [
      'Software Architecture.',
      'Autonomous AI Agents.',
      'Multimodal RAG Systems.',
      'Voice AI & Speech Analytics.',
    
      
    ];
    let phraseIdx = 0;
    let charIdx   = 0;
    let deleting  = false;

    function typeLoop() {
      const phrase = phrases[phraseIdx];
      if (!deleting) {
        typedEl.textContent = phrase.slice(0, ++charIdx);
        if (charIdx === phrase.length) {
          deleting = true;
          setTimeout(typeLoop, 2200);
          return;
        }
      } else {
        typedEl.textContent = phrase.slice(0, --charIdx);
        if (charIdx === 0) {
          deleting  = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
        }
      }
      setTimeout(typeLoop, deleting ? 45 : 85);
    }
    setTimeout(typeLoop, 1500);
  }

  // ── 7. Scroll Reveal & Intersection Observers ──────────────
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const sectionTag = entry.target.querySelector('.section-tag');
          if (sectionTag) scrambleText(sectionTag);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  // Metric Counter
  const statNums = document.querySelectorAll('.stat-num[data-count]');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const end = parseInt(el.dataset.count, 10);
          const suf = el.dataset.suffix || '';
          const dur = 1400;
          let current = 0;

          const tick = () => {
            current = Math.min(current + Math.ceil(end / (dur / 16)), end);
            el.textContent = current + suf;
            if (current < end) requestAnimationFrame(tick);
          };
          tick();
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  statNums.forEach((el) => counterObserver.observe(el));

  // Active section navbar highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let currentId = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // ── 8. Project Case Study Modal System ──────────────────────
  const modalOverlay = document.getElementById('project-modal-overlay');
  const modalBody    = document.getElementById('modal-content-body');
  const modalClose   = document.getElementById('modal-close-btn');

  const projectData = {
    'voice-ai': {
      title: 'AI-Powered Interactive Voice Lab Assistant',
      subtitle: 'VOICE AI & SPEECH ANALYTICS // GEMINI & FASTER-WHISPER',
      problem: 'Traditional lab viva evaluations require high manual effort, suffer from subjective scoring inconsistencies, and lack automated real-time speech analytics.',
      solution: 'Engineered an autonomous voice platform using Faster-Whisper for low-latency Speech-to-Text, Gemini 2.5 Flash for dynamic question generation, Edge-TTS for audio synthesis, and JWT authenticated React 19 dashboards.',
      highlights: [
        'Real-Time Speech Pipeline: Sub-second audio transcription & evaluation.',
        'Dynamic Viva Generation: Contextual AI questions generated on-the-fly.',
        'Educator Dashboard: Comprehensive scoring metrics, student logs, and performance trends.',
      ],
      tech: ['FastAPI', 'Gemini 2.5 Flash', 'Faster-Whisper', 'Edge-TTS', 'React 19', 'SQLAlchemy'],
      github: 'https://github.com/vishnuu-dharan/VoiceAI'
    },
    'agenthire': {
      title: 'Multi-Agent AI Recruitment & Talent Platform',
      subtitle: 'AUTONOMOUS MULTI-AGENT ARCHITECTURE // LANGGRAPH & CHROMADB',
      problem: 'Recruitment teams spend hundreds of hours manually screening resumes, scheduling candidate interviews, and writing evaluation notes.',
      solution: 'Built an autonomous multi-agent recruitment system powered by LangGraph, ChromaDB vector store, PyMuPDF resume parser, and React + Vite UI. Agents handle parsing, semantic matching, live interviewing, and predictive scoring.',
      highlights: [
        'LangGraph Orchestration: Multi-state autonomous agent workflows.',
        'Vector Semantic Search: High-precision ChromaDB candidate retrieval.',
        'Automated Interviews: Real-time AI interview evaluations with instant report generation.',
      ],
      tech: ['FastAPI', 'LangGraph', 'LangChain', 'ChromaDB', 'React + Vite', 'SpaCy'],
      github: 'https://github.com/vishnuu-dharan/AgentHire'
    },
    'jewellery-rag': {
      title: 'Jewellery Multimodal AI Retrieval System',
      subtitle: 'MULTIMODAL RAG PIPELINE // FAISS + CLIP + BM25',
      problem: 'Traditional text search fails when customers search for visually intricate jewellery using imprecise natural language queries or handwritten tags.',
      solution: 'Architected a multimodal retrieval system combining CLIP image embeddings, LLM query rewriting, handwritten OCR extraction, hybrid FAISS vector search + BM25 lexical search, and cross-encoder reranking over 490 inventory items.',
      highlights: [
        'CLIP Multimodal Embeddings: Search jewellery via visual similarity or natural text.',
        'Hybrid Retrieval: Merges dense vector representations with sparse BM25 scores.',
        'OCR & Reranking: Processes handwritten tag images and ranks candidates with precision.',
      ],
      tech: ['FastAPI', 'FAISS', 'CLIP', 'BM25', 'React + Vite', 'OpenCV'],
      github: 'https://github.com/vishnuu-dharan/Jewellery_Multimodal_RAG'
    }
  };

  document.querySelectorAll('.open-modal-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.dataset.modal;
      const data = projectData[key];
      if (!data || !modalOverlay || !modalBody) return;

      modalBody.innerHTML = `
        <div class="modal-subtitle">${data.subtitle}</div>
        <h2 class="modal-title">${data.title}</h2>

        <div class="modal-section" style="margin-top: 24px;">
          <div class="modal-section-title">PROBLEM STATEMENT</div>
          <p class="modal-text">${data.problem}</p>
        </div>

        <div class="modal-section">
          <div class="modal-section-title">ENGINEERED SOLUTION</div>
          <p class="modal-text">${data.solution}</p>
        </div>

        <div class="modal-section">
          <div class="modal-section-title">KEY TECHNICAL HIGHLIGHTS</div>
          <ul class="modal-text" style="padding-left: 20px; list-style-type: square;">
            ${data.highlights.map(h => `<li style="margin-bottom: 6px;">${h}</li>`).join('')}
          </ul>
        </div>

        <div class="modal-section">
          <div class="modal-section-title">TECHNOLOGY STACK</div>
          <div class="project-tech">
            ${data.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
          </div>
        </div>

        <div style="margin-top: 32px; display: flex; gap: 16px;">
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            View Source Code on GitHub
          </a>
        </div>
      `;

      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
        closeModal();
      }
    });
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

})();
