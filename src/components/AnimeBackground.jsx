import React, { useEffect, useRef } from 'react';

// Syntax colors matching a professional dark IDE theme
const SYNTAX_COLORS = {
  keyword: '#c084fc',    // Soft purple for keywords
  function: '#38edf8',   // Neon cyan for function names
  string: '#10b981',     // Emerald green for strings
  operator: '#ff2da0',   // Rose pink for operators
  punctuation: '#94a3b8',// Slate gray for brackets and semicolons
  comment: '#64748b',    // Muted slate for comments and shell instructions
  default: '#f8fafc'     // Off-white for general variables and text
};

// Monospace code snippets tokenized for custom canvas syntax highlighting
const CODE_SNIPPETS = [
  // React Hook useEffect
  [
    [
      { text: "useEffect", color: "function" },
      { text: "(() => {", color: "punctuation" }
    ],
    [
      { text: "  const ", color: "keyword" },
      { text: "loadData = ", color: "default" },
      { text: "async", color: "keyword" },
      { text: " () => {", color: "punctuation" }
    ],
    [
      { text: "    const ", color: "keyword" },
      { text: "res = ", color: "default" },
      { text: "await ", color: "keyword" },
      { text: "fetch", color: "function" },
      { text: "(", color: "punctuation" },
      { text: "url", color: "default" },
      { text: ");", color: "punctuation" }
    ],
    [
      { text: "    const ", color: "keyword" },
      { text: "json = ", color: "default" },
      { text: "await ", color: "keyword" },
      { text: "res.json();", color: "function" }
    ],
    [
      { text: "    setData(json);", color: "default" }
    ],
    [
      { text: "  };", color: "punctuation" }
    ],
    [
      { text: "  loadData();", color: "function" }
    ],
    [
      { text: "}, [url]);", color: "punctuation" }
    ]
  ],
  // API Class definition
  [
    [
      { text: "class ", color: "keyword" },
      { text: "ApiService ", color: "function" },
      { text: "{", color: "punctuation" }
    ],
    [
      { text: "  constructor(base) {", color: "punctuation" }
    ],
    [
      { text: "    this.url = base;", color: "default" }
    ],
    [
      { text: "  }", color: "punctuation" }
    ],
    [
      { text: "  async ", color: "keyword" },
      { text: "get(path) {", color: "punctuation" }
    ],
    [
      { text: "    return ", color: "keyword" },
      { text: "(", color: "punctuation" },
      { text: "await ", color: "keyword" },
      { text: "fetch(this.url + path)", color: "default" },
      { text: ").json();", color: "function" }
    ],
    [
      { text: "  }", color: "punctuation" }
    ],
    [
      { text: "}", color: "punctuation" }
    ]
  ],
  // Binary Search Algorithm
  [
    [
      { text: "function ", color: "keyword" },
      { text: "binarySearch", color: "function" },
      { text: "(arr, x) {", color: "punctuation" }
    ],
    [
      { text: "  let ", color: "keyword" },
      { text: "l = 0, r = arr.length - 1;", color: "default" }
    ],
    [
      { text: "  while ", color: "keyword" },
      { text: "(l <= r) {", color: "punctuation" }
    ],
    [
      { text: "    const ", color: "keyword" },
      { text: "m = Math.floor((l + r) / 2);", color: "default" }
    ],
    [
      { text: "    if ", color: "keyword" },
      { text: "(arr[m] === x) ", color: "default" },
      { text: "return ", color: "keyword" },
      { text: "m;", color: "default" }
    ],
    [
      { text: "    if ", color: "keyword" },
      { text: "(arr[m] < x) l = m + 1;", color: "default" }
    ],
    [
      { text: "    else r = m - 1;", color: "default" }
    ],
    [
      { text: "  }", color: "punctuation" }
    ],
    [
      { text: "  return ", color: "keyword" },
      { text: "-1;", color: "operator" }
    ],
    [
      { text: "}", color: "punctuation" }
    ]
  ],
  // Node Express server setup
  [
    [
      { text: "const ", color: "keyword" },
      { text: "express = ", color: "default" },
      { text: "require", color: "function" },
      { text: "(", color: "punctuation" },
      { text: "'express'", color: "string" },
      { text: ");", color: "punctuation" }
    ],
    [
      { text: "const ", color: "keyword" },
      { text: "app = express();", color: "default" }
    ],
    [
      { text: "app.use(express.json());", color: "default" }
    ],
    [
      { text: "app.get(", color: "default" },
      { text: "'/api/status'", color: "string" },
      { text: ", (req, res) => {", color: "punctuation" }
    ],
    [
      { text: "  res.status(200).json({ status: ", color: "default" },
      { text: "'OK'", color: "string" },
      { text: " });", color: "punctuation" }
    ],
    [
      { text: "});", color: "punctuation" }
    ],
    [
      { text: "app.listen(port, () => {", color: "punctuation" }
    ],
    [
      { text: "  console.log(", color: "function" },
      { text: "`Server running on ${port}`", color: "string" },
      { text: ");", color: "punctuation" }
    ],
    [
      { text: "});", color: "punctuation" }
    ]
  ],
  // Glassmorphic CSS Styling
  [
    [
      { text: ".card-container ", color: "function" },
      { text: "{", color: "punctuation" }
    ],
    [
      { text: "  display: ", color: "keyword" },
      { text: "grid;", color: "default" }
    ],
    [
      { text: "  grid-template-columns: ", color: "keyword" },
      { text: "repeat(auto-fit, minmax(300px, 1fr));", color: "default" }
    ],
    [
      { text: "  gap: ", color: "keyword" },
      { text: "24px;", color: "default" }
    ],
    [
      { text: "  background: ", color: "keyword" },
      { text: "rgba(8, 16, 36, 0.75);", color: "default" }
    ],
    [
      { text: "  backdrop-filter: ", color: "keyword" },
      { text: "blur(12px);", color: "default" }
    ],
    [
      { text: "  border: ", color: "keyword" },
      { text: "1px solid rgba(0, 240, 255, 0.2);", color: "default" }
    ],
    [
      { text: "}", color: "punctuation" }
    ]
  ],
  // Git Command shell snippet
  [
    [
      { text: "$ git checkout -b ", color: "comment" },
      { text: "feature/ai-integration", color: "string" }
    ],
    [
      { text: "$ git add ", color: "comment" },
      { text: "src/components/Background.jsx", color: "default" }
    ],
    [
      { text: "$ git commit -m ", color: "comment" },
      { text: "\"feat: redesign bg layout\"", color: "string" }
    ],
    [
      { text: "$ git push origin main", color: "comment" }
    ]
  ],
  // Python PyTorch model implementation
  [
    [
      { text: "import ", color: "keyword" },
      { text: "numpy ", color: "default" },
      { text: "as ", color: "keyword" },
      { text: "np", color: "default" }
    ],
    [
      { text: "import ", color: "keyword" },
      { text: "torch", color: "default" }
    ],
    [
      { text: "class ", color: "keyword" },
      { text: "NeuralNetwork", color: "function" },
      { text: "(torch.nn.Module):", color: "punctuation" }
    ],
    [
      { text: "    def ", color: "keyword" },
      { text: "__init__", color: "function" },
      { text: "(self):", color: "punctuation" }
    ],
    [
      { text: "        super().__init__()", color: "default" }
    ],
    [
      { text: "        self.linear = torch.nn.Linear(128, 64)", color: "default" }
    ],
    [
      { text: "    def ", color: "keyword" },
      { text: "forward", color: "function" },
      { text: "(self, x):", color: "punctuation" }
    ],
    [
      { text: "        return torch.relu(self.linear(x))", color: "default" }
    ]
  ]
];

const SNIPPET_FILENAMES = [
  "useLoadData.js",
  "api.service.ts",
  "binary_search.cpp",
  "server.js",
  "card.module.css",
  "git_push.sh",
  "model.py"
];

export default function AnimeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    let width = window.innerWidth;
    let height = window.innerHeight;

    let mouse = { x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 };
    let time = 0;
    let lastTimestamp = performance.now();
    let animationFrameId;
    let isTabVisible = true;

    /* ── Scroll-Reactive State ── */
    let targetScrollY = window.scrollY || 0;
    let currentScrollY = targetScrollY;
    let lastScrollY = targetScrollY;
    let scrollVelocity = 0;
    let smoothVelocity = 0;

    /* ── State Lists ── */
    let nodes = [];
    let snippets = [];
    let binaryParticles = [];
    let pulses = [];
    let ripples = [];

    // Interactive connection settings
    const nodeMaxConnection = 120;
    const mouseMaxConnection = 145;
    const gridSpacing = 85;

    /* ── Network Node Class ── */
    class TechNode {
      constructor(isInitial) {
        this.reset(isInitial);
      }

      reset(isInitial) {
        this.baseX = Math.random() * width;
        this.baseY = isInitial ? Math.random() * height : height + 20;
        this.vx = (Math.random() - 0.5) * 0.16;
        this.vy = (Math.random() - 0.5) * 0.16;
        this.radius = 1.3 + Math.random() * 2.2; // Slightly larger, more visible
        this.depth = 0.2 + Math.random() * 0.7; // parallax factor
        this.baseAlpha = 0.35 + Math.random() * 0.35; // Bright, solid nodes
        this.pulseSpeed = 0.005 + Math.random() * 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update(dt) {
        this.baseX += this.vx * dt;
        this.baseY += this.vy * dt;

        // Warp bounds check
        if (this.baseX < 0) this.baseX += width;
        if (this.baseX > width) this.baseX -= width;
        if (this.baseY < 0) this.baseY += height;
        if (this.baseY > height) this.baseY -= height;
      }

      getRenderCoordinates() {
        let drawX = this.baseX;
        let drawY = (this.baseY - currentScrollY * 0.022 * this.depth + height) % height;

        // Warped coordinates due to expanding shockwaves (ripples)
        ripples.forEach((ripple) => {
          const dx = drawX - ripple.x;
          const dy = drawY - ripple.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);

          const waveWidth = 80;
          const distFromWave = Math.abs(dist - ripple.radius);
          if (distFromWave < waveWidth) {
            const factor = (1 - distFromWave / waveWidth);
            // Push outward from ripple center
            const force = factor * factor * 16 * (1.2 - ripple.radius / ripple.maxRadius) * ripple.opacity;
            if (dist > 0) {
              drawX += (dx / dist) * force;
              drawY += (dy / dist) * force;
            }
          }
        });

        return { x: drawX, y: drawY };
      }
    }

    /* ── Floating Holographic Console Panel Class ── */
    class FloatingSnippet {
      constructor(isInitial) {
        this.reset(isInitial);
      }

      reset(isInitial) {
        this.snippetIdx = Math.floor(Math.random() * CODE_SNIPPETS.length);
        this.fileName = SNIPPET_FILENAMES[this.snippetIdx] || "terminal.js";
        const lines = CODE_SNIPPETS[this.snippetIdx];
        this.height = lines.length * 15;
        
        // Measure exact width of the longest line
        ctx.save();
        ctx.font = '10px "Space Mono", "Consolas", monospace';
        let maxWidth = 100;
        lines.forEach((line) => {
          const lineText = line.map(token => token.text).join('');
          const w = ctx.measureText(lineText).width;
          if (w > maxWidth) maxWidth = w;
        });
        ctx.restore();
        this.width = Math.ceil(maxWidth) + 16;

        this.x = Math.random() * (width - this.width - 60) + 30;
        this.y = isInitial
          ? Math.random() * (height - this.height - 120) + 60
          : height + 40; // spawn below viewport

        this.vy = -(0.11 + Math.random() * 0.12); // slow upward float
        this.vx = (Math.random() - 0.5) * 0.04;
        this.depth = 0.25 + Math.random() * 0.45; // parallax factor
        this.baseAlpha = 0.28 + Math.random() * 0.12; // Clearly visible idle panels
        this.targetAlpha = this.baseAlpha;
        this.alpha = 0;
        this.fadeInSpeed = 0.003 + Math.random() * 0.003;
        this.age = 0;
        this.lifeSpan = 2000 + Math.random() * 1200; // frame cycles
        this.isHovered = false;
      }

      update(dt, scrollWindY) {
        const px = this.x - 10;
        const py = this.y - 25;
        const pw = this.width + 20;
        const ph = this.height + 35;

        // Bounding box collision checking for cursor hover focus
        this.isHovered = false;
        if (mouse.x >= px && mouse.x <= px + pw && mouse.y >= py && mouse.y <= py + ph) {
          this.isHovered = true;
        }

        this.age += dt;

        if (this.isHovered) {
          // Slow down float and pull upward focus
          this.y += (this.vy * 0.22 - scrollWindY * 0.05 * this.depth) * dt;
          // Fade to bright glowing state
          this.targetAlpha = Math.min(this.targetAlpha + 0.03 * dt, 0.78);
        } else {
          this.y += (this.vy - scrollWindY * 0.15 * this.depth) * dt;
          // Decay back to base opacity state
          if (this.targetAlpha > this.baseAlpha) {
            this.targetAlpha = Math.max(this.targetAlpha - 0.01 * dt, this.baseAlpha);
          }
        }

        // Fade in
        if (this.alpha < this.targetAlpha) {
          this.alpha += this.fadeInSpeed * dt;
          if (this.alpha > this.targetAlpha) this.alpha = this.targetAlpha;
        } else if (this.alpha > this.targetAlpha) {
          this.alpha -= 0.01 * dt;
        }

        // Fade out near top boundaries or expiry
        if (this.y < 80) {
          this.alpha -= 0.008 * dt;
        } else if (this.age > this.lifeSpan - 120) {
          this.alpha -= 0.008 * dt;
        }

        // Reset if drifted completely off screen or fully transparent
        if (
          this.y < -this.height ||
          this.alpha <= 0 ||
          this.x < -200 ||
          this.x > width + 50
        ) {
          this.reset(false);
        }
      }

      draw() {
        if (this.alpha <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.alpha;

        const px = this.x - 10;
        const py = this.y - 25;
        const pw = this.width + 20;
        const ph = this.height + 35;

        // Dynamic terminal dropshadow on hover
        if (this.isHovered) {
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 10;
        }

        // Glass background panel
        ctx.fillStyle = 'rgba(8, 16, 36, 0.72)'; // High-visibility panel background
        ctx.fillRect(px, py, pw, ph);

        // Holographic Terminal Header
        ctx.fillStyle = this.isHovered ? 'rgba(0, 240, 255, 0.22)' : 'rgba(0, 240, 255, 0.12)';
        ctx.fillRect(px, py, pw, 18);

        // Border Panel Lines
        ctx.strokeStyle = this.isHovered ? 'rgba(0, 240, 255, 0.65)' : 'rgba(0, 240, 255, 0.22)';
        ctx.lineWidth = 0.8;
        ctx.strokeRect(px, py, pw, ph);

        // Faint bracket design corner accents
        ctx.strokeStyle = this.isHovered ? 'rgba(0, 240, 255, 0.85)' : 'rgba(0, 240, 255, 0.38)';
        ctx.lineWidth = 1.2;
        const cs = 5; // corner length
        // Top left
        ctx.beginPath(); ctx.moveTo(px + cs, py); ctx.lineTo(px, py); ctx.lineTo(px, py + cs); ctx.stroke();
        // Top right
        ctx.beginPath(); ctx.moveTo(px + pw - cs, py); ctx.lineTo(px + pw, py); ctx.lineTo(px + pw, py + cs); ctx.stroke();
        // Bottom left
        ctx.beginPath(); ctx.moveTo(px, py + ph - cs); ctx.lineTo(px, py + ph); ctx.lineTo(px + cs, py + ph); ctx.stroke();
        // Bottom right
        ctx.beginPath(); ctx.moveTo(px + pw - cs, py + ph); ctx.lineTo(px + pw, py + ph); ctx.lineTo(px + pw, py + ph - cs); ctx.stroke();

        // 3 Window Dot Buttons (Red/Yellow/Green Cyber Style)
        const dotRadius = 2.2;
        const dotY = py + 9;
        ctx.fillStyle = 'rgba(239, 68, 68, 0.75)'; // red
        ctx.beginPath(); ctx.arc(px + 10, dotY, dotRadius, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(245, 158, 11, 0.75)'; // yellow
        ctx.beginPath(); ctx.arc(px + 17, dotY, dotRadius, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(16, 185, 129, 0.75)'; // green
        ctx.beginPath(); ctx.arc(px + 24, dotY, dotRadius, 0, Math.PI * 2); ctx.fill();

        // File Title Text
        ctx.fillStyle = this.isHovered ? '#00f0ff' : 'rgba(0, 240, 255, 0.7)';
        ctx.font = '8px "Space Mono", monospace';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.fileName, px + 36, py + 9);

        // Reset shadow settings for text drawing to avoid blurry font rendering
        ctx.shadowBlur = 0;

        // Rendering inner code tokens
        ctx.font = '10px "Space Mono", "Consolas", monospace';
        ctx.textBaseline = 'top';
        const lines = CODE_SNIPPETS[this.snippetIdx];
        let currentY = this.y;
        const lineHeight = 15;

        lines.forEach((line) => {
          let currentX = this.x;
          line.forEach((token) => {
            ctx.fillStyle = SYNTAX_COLORS[token.color] || '#f8fafc';
            ctx.fillText(token.text, currentX, currentY);
            currentX += ctx.measureText(token.text).width;
          });
          currentY += lineHeight;
        });

        ctx.restore();
      }
    }

    /* ── Floating Binary particles trail class ── */
    class BinaryParticle {
      constructor(x, y, vx, vy) {
        this.x = x + (Math.random() - 0.5) * 14;
        this.y = y + (Math.random() - 0.5) * 14;
        this.vx = (vx || 0) * 0.15 + (Math.random() - 0.5) * 0.35;
        this.vy = (vy || 0) * 0.15 - (0.35 + Math.random() * 0.35); // slow float up
        this.char = Math.random() < 0.65 ? (Math.random() < 0.5 ? '0' : '1') : (Math.random() < 0.5 ? '<>' : '{}');
        this.life = 1.0;
        this.decay = 0.016 + Math.random() * 0.016;
        this.color = Math.random() < 0.7 ? '#00f0ff' : '#a855f7';
        this.scale = 0.75 + Math.random() * 0.45;
      }

      update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.life -= this.decay * dt;
      }

      draw() {
        if (this.life <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.life * 0.55; // Highly visible trail
        ctx.fillStyle = this.color;
        ctx.font = `${Math.floor(10 * this.scale)}px "Space Mono", monospace`;
        ctx.fillText(this.char, this.x, this.y);
        ctx.restore();
      }
    }

    /* ── Glowing Data Flow Pulse Class ── */
    class DataPulse {
      constructor(startIdx, endIdx, color) {
        this.startIdx = startIdx;
        this.endIdx = endIdx;
        this.progress = 0;
        this.speed = 0.007 + Math.random() * 0.011; // speed factor
        this.color = color || (Math.random() < 0.7 ? '#00f0ff' : '#ff2da0');
      }

      update(dt) {
        this.progress += this.speed * dt;
      }

      draw(coords) {
        const c1 = coords[this.startIdx];
        const c2 = coords[this.endIdx];
        if (!c1 || !c2) return;

        const px = c1.x + (c2.x - c1.x) * this.progress;
        const py = c1.y + (c2.y - c1.y) * this.progress;

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        // Neon pulse glow
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 8); // Larger glow radius
        grad.addColorStop(0, this.color);
        grad.addColorStop(0.35, this.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();

        // White core dot
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2); // Larger core dot
        ctx.fill();
        ctx.restore();
      }
    }

    function initNodes() {
      nodes = [];
      const count = Math.min(Math.floor((width * height) / 38000), 45);
      for (let i = 0; i < count; i++) {
        nodes.push(new TechNode(true));
      }
    }

    function initSnippets() {
      snippets = [];
      const count = Math.min(Math.floor(width / 320), 6);
      for (let i = 0; i < count; i++) {
        snippets.push(new FloatingSnippet(true));
      }
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      initNodes();
      initSnippets();
    }

    const handleScroll = () => {
      targetScrollY = window.scrollY || 0;
    };

    let mouseThrottle = 0;
    const handleMouseMove = (e) => {
      const now = performance.now();
      if (now - mouseThrottle < 20) return;
      mouseThrottle = now;

      mouse.vx = (e.clientX - mouse.lastX) * 0.1;
      mouse.vy = (e.clientY - mouse.lastY) * 0.1;
      mouse.lastX = mouse.x = e.clientX;
      mouse.lastY = mouse.y = e.clientY;

      if (binaryParticles.length < 40) {
        binaryParticles.push(new BinaryParticle(mouse.x, mouse.y, mouse.vx, mouse.vy));
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleCanvasClick = (e) => {
      // Trigger propagating grid ripples
      if (ripples.length < 4) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 0,
          maxRadius: Math.max(width, height) * 0.55,
          speed: 5.5, // radius expand per frame
          opacity: 1.0
        });
      }
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        lastTimestamp = performance.now();
      }
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('click', handleCanvasClick, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    /* ── Render Warped Grid Layer ── */
    function drawWarpedGrid() {
      const scrollOffsetY = (currentScrollY * 0.04) % gridSpacing;
      const cols = Math.ceil(width / gridSpacing) + 1;
      const rows = Math.ceil(height / gridSpacing) + 2;

      let gridPoints = [];

      // 1. Calculate warped junction vertex coordinates
      for (let c = 0; c < cols; c++) {
        gridPoints[c] = [];
        for (let r = 0; r < rows; r++) {
          const baseX = c * gridSpacing;
          const baseY = (r - 1) * gridSpacing - scrollOffsetY;

          let x = baseX;
          let y = baseY;

          // Interactive Mouse Gravitational Lens warp
          if (mouse.x > -500) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const distSq = dx * dx + dy * dy;
            const maxWarpDist = 180;
            if (distSq < maxWarpDist * maxWarpDist) {
              const dist = Math.sqrt(distSq);
              const force = (1 - dist / maxWarpDist) * 22; // pull towards cursor
              x -= (dx / dist) * force;
              y -= (dy / dist) * force;
            }
          }

          // Active Click Ripple shockwave warp
          ripples.forEach((ripple) => {
            const dx = x - ripple.x;
            const dy = y - ripple.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            const waveWidth = 90;
            const distFromWave = Math.abs(dist - ripple.radius);
            if (distFromWave < waveWidth) {
              const factor = (1 - distFromWave / waveWidth);
              // Push outward at shockwave front boundary
              const force = factor * factor * 25 * (1.2 - ripple.radius / ripple.maxRadius) * ripple.opacity;
              if (dist > 0) {
                x += (dx / dist) * force;
                y += (dy / dist) * force;
              }
            }
          });

          gridPoints[c][r] = { x, y };
        }
      }

      // 2. Draw connecting warped lines
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.045)'; // High-visibility coordinates grid
      ctx.lineWidth = 0.55;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const p = gridPoints[c][r];

          // Horizontal segments
          if (c < cols - 1) {
            const pRight = gridPoints[c + 1][r];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pRight.x, pRight.y);
            ctx.stroke();
          }

          // Vertical segments
          if (r < rows - 1) {
            const pDown = gridPoints[c][r + 1];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pDown.x, pDown.y);
            ctx.stroke();
          }
        }
      }

      // 3. Draw cross junctions and active highlights
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const p = gridPoints[c][r];
          if (p.y < -10 || p.y > height + 10) continue;

          // Junction glow from click ripple shockwave front
          let waveGlow = 0;
          ripples.forEach((ripple) => {
            const dx = p.x - ripple.x;
            const dy = p.y - ripple.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const waveWidth = 50;
            const distFromWave = Math.abs(dist - ripple.radius);
            if (distFromWave < waveWidth) {
              waveGlow = Math.max(waveGlow, (1 - distFromWave / waveWidth) * ripple.opacity);
            }
          });

          // Junction glow from mouse cursor proximity
          let cursorGlow = 0;
          if (mouse.x > -500) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 75) {
              cursorGlow = (1 - dist / 75);
            }
          }

          const totalHighlight = Math.max(waveGlow * 0.95, cursorGlow * 0.75); // Scaled highlights

          if (totalHighlight > 0) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.09 + totalHighlight * 0.58})`; // Enhanced neon stroke alpha
            ctx.fillStyle = `rgba(0, 240, 255, ${totalHighlight * 0.22})`; // Enhanced fill alpha
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.5 + totalHighlight * 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          } else {
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.09)'; // High-visibility crosses
          }

          // Draw coordinates '+' marker
          const crossSize = 4 + totalHighlight * 2.5; // Larger markers
          ctx.beginPath();
          ctx.moveTo(p.x - crossSize, p.y);
          ctx.lineTo(p.x + crossSize, p.y);
          ctx.moveTo(p.x, p.y - crossSize);
          ctx.lineTo(p.x, p.y + crossSize);
          ctx.stroke();
        }
      }

      ctx.restore();
    }

    /* ── Render Loop ── */
    function animate(timestamp) {
      if (!isTabVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      const dt = Math.min(Math.max(elapsed / 16.667, 0.5), 2.0);

      currentScrollY += (targetScrollY - currentScrollY) * 0.06;
      scrollVelocity = targetScrollY - lastScrollY;
      lastScrollY = targetScrollY;
      smoothVelocity += (scrollVelocity - smoothVelocity) * 0.08;

      const scrollWindY = Math.max(Math.min(smoothVelocity * 0.012, 0.8), -0.6);
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1000);
      const scrollProgress = Math.min(Math.max(currentScrollY / maxScroll, 0), 1);

      time += dt;

      // 1. Dynamic Dark Void Background
      const skyGrad = ctx.createLinearGradient(0, 0, width * 0.5, height);
      if (scrollProgress < 0.35) {
        skyGrad.addColorStop(0, '#02040a');
        skyGrad.addColorStop(0.4, '#050a16');
        skyGrad.addColorStop(1, '#0e0820');
      } else if (scrollProgress < 0.7) {
        skyGrad.addColorStop(0, '#030510');
        skyGrad.addColorStop(0.45, '#0c0722');
        skyGrad.addColorStop(1, '#050c22');
      } else {
        skyGrad.addColorStop(0, '#01060e');
        skyGrad.addColorStop(0.4, '#040d1e');
        skyGrad.addColorStop(1, '#0c081e');
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Faint radial cyber lighting (depth)
      const lightX = width * 0.75 + Math.sin(time * 0.002) * 20 - scrollProgress * 40;
      const lightY = height * 0.25 + Math.cos(time * 0.001) * 15 - currentScrollY * 0.02;
      const lightGrad = ctx.createRadialGradient(lightX, lightY, 40, lightX, lightY, width * 0.5);
      lightGrad.addColorStop(0, scrollProgress > 0.5 ? 'rgba(124, 58, 237, 0.20)' : 'rgba(0, 240, 255, 0.24)');
      lightGrad.addColorStop(0.5, 'rgba(0, 240, 255, 0.08)');
      lightGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = lightGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Blueprint Warped Grid Layer
      drawWarpedGrid();

      // 3. Update & Draw Tech Node Graph
      const coords = nodes.map(n => n.getRenderCoordinates());

      // Draw connection lines
      ctx.save();
      for (let i = 0; i < nodes.length; i++) {
        const c1 = coords[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const c2 = coords[j];
          const dx = c1.x - c2.x;
          const dy = c1.y - c2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < nodeMaxConnection * nodeMaxConnection) {
            const dist = Math.sqrt(distSq);
            // Depth visual difference
            const depthDiff = Math.abs(nodes[i].depth - nodes[j].depth);
            const baseConnAlpha = (1 - dist / nodeMaxConnection) * 0.28; // Enhanced connection line opacity
            const finalAlpha = Math.max(0, baseConnAlpha * (1 - depthDiff * 0.6));

            ctx.strokeStyle = `rgba(0, 240, 255, ${finalAlpha})`;
            ctx.lineWidth = 0.8; // Thicker lines
            ctx.beginPath();
            ctx.moveTo(c1.x, c1.y);
            ctx.lineTo(c2.x, c2.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // Draw node connection links to cursor
      if (mouse.x > -500) {
        ctx.save();
        for (let i = 0; i < nodes.length; i++) {
          const c = coords[i];
          const dx = c.x - mouse.x;
          const dy = c.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseMaxConnection * mouseMaxConnection) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / mouseMaxConnection) * 0.45; // Enhanced thread brightness
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 1.1; // Thicker threads
            ctx.beginPath();
            ctx.moveTo(c.x, c.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // Draw individual node points and halo hub orbits
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const c = coords[i];
        n.update(dt);

        const pulse = Math.sin(time * n.pulseSpeed + n.pulseOffset);
        const alpha = n.baseAlpha * (0.6 + 0.4 * pulse);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#00f0ff';
        ctx.beginPath();
        ctx.arc(c.x, c.y, n.radius, 0, Math.PI * 2);
        ctx.fill();

        // Hub Orbit rings (much more visible)
        if (n.radius > 1.8) {
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.42)';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.arc(c.x, c.y, n.radius * 3.6, 0, Math.PI * 2);
          ctx.stroke();

          // Orbiting data point
          const orbitAngle = time * 0.015 + n.pulseOffset;
          const ox = c.x + Math.cos(orbitAngle) * n.radius * 3.6;
          const oy = c.y + Math.sin(orbitAngle) * n.radius * 3.6;
          ctx.fillStyle = 'rgba(0, 240, 255, 0.9)'; // Brighter orbiting dot
          ctx.beginPath();
          ctx.arc(ox, oy, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Spawn connecting network data pulses
      if (pulses.length < 16 && Math.random() < 0.038) {
        let activePairs = [];
        for (let i = 0; i < nodes.length; i++) {
          const c1 = coords[i];
          for (let j = i + 1; j < nodes.length; j++) {
            const c2 = coords[j];
            const dx = c1.x - c2.x;
            const dy = c1.y - c2.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < nodeMaxConnection * nodeMaxConnection) {
              activePairs.push({ from: i, to: j });
            }
          }
        }

        if (activePairs.length > 0) {
          const pair = activePairs[Math.floor(Math.random() * activePairs.length)];
          const pulseColor = Math.random() < 0.72 ? '#00f0ff' : (Math.random() < 0.5 ? '#ff2da0' : '#a855f7');
          if (Math.random() < 0.5) {
            pulses.push(new DataPulse(pair.from, pair.to, pulseColor));
          } else {
            pulses.push(new DataPulse(pair.to, pair.from, pulseColor));
          }
        }
      }

      // Update & Draw Data Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].update(dt);
        pulses[i].draw(coords);
        if (pulses[i].progress >= 1) {
          pulses.splice(i, 1);
        }
      }

      // 4. Floating Holographic Console Panels
      for (let i = 0; i < snippets.length; i++) {
        snippets[i].update(dt, scrollWindY);
        snippets[i].draw();
      }

      // 5. Interactive Mouse Binary Particles trail
      for (let i = binaryParticles.length - 1; i >= 0; i--) {
        binaryParticles[i].update(dt);
        binaryParticles[i].draw();
        if (binaryParticles[i].life <= 0) {
          binaryParticles.splice(i, 1);
        }
      }

      // 6. Draw click ripples (shockwave fronts - much brighter)
      ctx.save();
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed * dt;
        r.opacity = 1 - r.radius / r.maxRadius;

        if (r.radius >= r.maxRadius || r.opacity <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        // Expanded sonar ripple design
        const waveGrad = ctx.createRadialGradient(r.x, r.y, Math.max(0, r.radius - 24), r.x, r.y, r.radius + 10);
        waveGrad.addColorStop(0, 'rgba(0, 240, 255, 0)');
        waveGrad.addColorStop(0.5, `rgba(0, 240, 255, ${r.opacity * 0.62})`); // Brighter wave border
        waveGrad.addColorStop(0.85, `rgba(168, 85, 247, ${r.opacity * 0.35})`); // Brighter purple core
        waveGrad.addColorStop(1, 'rgba(0, 240, 255, 0)');

        ctx.strokeStyle = waveGrad;
        ctx.lineWidth = 18 * r.opacity; // Thicker wavefront
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(animate);
    }

    resize();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleCanvasClick);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="anime-canvas"
      className="anime-bg-canvas"
      aria-hidden="true"
    />
  );
}
