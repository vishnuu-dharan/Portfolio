/**
 * =========================================================================
 * PURE 2D ANIME ATMOSPHERIC CELESTIAL BACKGROUND ENGINE
 * Theme: Makoto Shinkai ("Your Name" / "Suzume") & Ghibli Cosmic Sakura Night
 * 100% Pure 2D Canvas Physics Engine — Zero 3D WebGL overhead, Ultra Smooth 60 FPS
 * Features:
 * - Dynamic Twilight Cosmic Sky & Shifting Aurora Nebula
 * - Luminous Crescent Moon with Radiant Aura & Planetary Rings
 * - Twinkling Cross Stars & Constellation Vector Mesh
 * - Aerodynamic Tumbling Sakura (Cherry Blossom) Petal Storm
 * - Ethereal Glowing Spirit Fireflies & Upward Light Wisps
 * - Cinematic Shooting Star Meteors with Sparkling Stardust Trails
 * - Fluid Interactive Mouse Wind Swirl & Magical Spark Ribbon
 * =========================================================================
 */

(function () {
  'use strict';

  const canvas = document.getElementById('anime-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  let mouse = { x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0, isMoving: false };
  let mouseMoveTimeout;
  let time = 0;
  let wind = { x: 1.3, y: 1.0, targetX: 1.3, gustTimer: 0 };

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    ctx.scale(dpr, dpr);
    initStars();
  }
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', function (e) {
    mouse.vx = (e.clientX - mouse.lastX) * 0.18;
    mouse.vy = (e.clientY - mouse.lastY) * 0.18;
    mouse.lastX = mouse.x = e.clientX;
    mouse.lastY = mouse.y = e.clientY;
    mouse.isMoving = true;

    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = setTimeout(() => { mouse.isMoving = false; }, 120);

    // Spawn interactive stardust on move
    for (let i = 0; i < 3; i++) {
      if (stardustParticles.length < 120) {
        stardustParticles.push(new Stardust(mouse.x, mouse.y, mouse.vx, mouse.vy));
      }
    }
  });

  window.addEventListener('mouseleave', function () {
    mouse.x = -1000;
    mouse.y = -1000;
    mouse.isMoving = false;
  });

  /* ─────────────────────────────────────────────────────────────
     1. TWINKLING ANIME STARS & CONSTELLATION NETWORK
     ───────────────────────────────────────────────────────────── */
  let stars = [];
  function initStars() {
    stars = [];
    const count = Math.floor((width * height) / 9500);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.8 + Math.random() * 1.8,
        baseAlpha: 0.35 + Math.random() * 0.65,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        twinkleOffset: Math.random() * Math.PI * 2,
        isCrossStar: Math.random() < 0.22, // 4-point anime diffraction spike
        crossSize: 4 + Math.random() * 6,
        color: Math.random() < 0.45 ? '#00f0ff' : (Math.random() < 0.75 ? '#ffffff' : '#ffaacc'),
      });
    }
  }

  function drawSkyAndStars() {
    // A. Cosmic Twilight Sky Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, width * 0.5, height);
    skyGrad.addColorStop(0, '#020512');
    skyGrad.addColorStop(0.35, '#060d24');
    skyGrad.addColorStop(0.7, '#120b2e');
    skyGrad.addColorStop(1, '#040d20');

    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // B. Luminous Aurora & Anime Nebula Clouds
    const nebGrad1 = ctx.createRadialGradient(
      width * 0.72 + Math.sin(time * 0.007) * 70,
      height * 0.22 + Math.cos(time * 0.005) * 50,
      30,
      width * 0.72,
      height * 0.22,
      width * 0.6
    );
    nebGrad1.addColorStop(0, 'rgba(124, 58, 237, 0.25)');
    nebGrad1.addColorStop(0.45, 'rgba(233, 30, 140, 0.14)');
    nebGrad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = nebGrad1;
    ctx.fillRect(0, 0, width, height);

    const nebGrad2 = ctx.createRadialGradient(
      width * 0.25 + Math.cos(time * 0.006) * 60,
      height * 0.65 + Math.sin(time * 0.008) * 50,
      30,
      width * 0.25,
      height * 0.65,
      width * 0.55
    );
    nebGrad2.addColorStop(0, 'rgba(0, 240, 255, 0.20)');
    nebGrad2.addColorStop(0.55, 'rgba(99, 102, 241, 0.12)');
    nebGrad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = nebGrad2;
    ctx.fillRect(0, 0, width, height);

    // C. Constellation Lines between nearby stars
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
    ctx.lineWidth = 0.8;
    for (let i = 0; i < stars.length; i += 3) {
      for (let j = i + 1; j < Math.min(i + 4, stars.length); j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.stroke();
        }
      }
    }

    // D. Render Stars
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const alpha = s.baseAlpha * (0.5 + 0.5 * Math.sin(time * s.twinkleSpeed + s.twinkleOffset));
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.fillStyle = s.color;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 8;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();

      // 4-point Anime Cross Sparkle
      if (s.isCrossStar && alpha > 0.45) {
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 0.9;
        const arm = s.crossSize * (alpha * 1.3);
        ctx.beginPath();
        ctx.moveTo(s.x - arm, s.y);
        ctx.lineTo(s.x + arm, s.y);
        ctx.moveTo(s.x, s.y - arm);
        ctx.lineTo(s.x, s.y + arm);
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  /* ─────────────────────────────────────────────────────────────
     2. ETHEREAL ANIME CRESCENT MOON
     ───────────────────────────────────────────────────────────── */
  function drawAnimeMoon() {
    const moonX = width * 0.84;
    const moonY = Math.min(height * 0.16, 130);
    const moonR = 42;

    ctx.save();

    // Radiant Moon Aura Halo
    const halo = ctx.createRadialGradient(moonX, moonY, moonR * 0.5, moonX, moonY, moonR * 4.2);
    halo.addColorStop(0, 'rgba(255, 240, 250, 0.28)');
    halo.addColorStop(0.35, 'rgba(192, 132, 252, 0.16)');
    halo.addColorStop(0.7, 'rgba(0, 240, 255, 0.08)');
    halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonR * 4.2, 0, Math.PI * 2);
    ctx.fill();

    // Glowing Crescent Moon Body
    ctx.shadowColor = 'rgba(255, 245, 252, 0.9)';
    ctx.shadowBlur = 25;

    ctx.fillStyle = 'rgba(255, 250, 254, 0.96)';
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2, false);
    ctx.fill();

    // Crescent cutout
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(moonX - moonR * 0.52, moonY - moonR * 0.28, moonR * 0.92, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    // Planetary Ring Orbit
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
    ctx.lineWidth = 1.4;
    ctx.shadowColor = 'rgba(0, 240, 255, 0.6)';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.ellipse(moonX, moonY, moonR * 2.0, moonR * 0.48, -0.32, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  /* ─────────────────────────────────────────────────────────────
     3. SAKURA CHERRY BLOSSOM PETAL ENGINE (Wind Physics & Flutter)
     ───────────────────────────────────────────────────────────── */
  class SakuraPetal {
    constructor(isInitial) {
      this.reset(isInitial);
    }

    reset(isInitial) {
      this.x = Math.random() * (width + 300) - 150;
      this.y = isInitial ? Math.random() * height : -40 - Math.random() * 80;
      this.size = 11 + Math.random() * 15;
      this.speedY = 1.1 + Math.random() * 1.6;
      this.speedX = 0.7 + Math.random() * 1.5;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.04;
      this.tilt = Math.random() * Math.PI;
      this.tiltSpeed = 0.025 + Math.random() * 0.035;
      this.swayFreq = 0.015 + Math.random() * 0.02;
      this.swayAmp = 1.8 + Math.random() * 3.2;
      this.opacity = 0.7 + Math.random() * 0.3;
      this.petalStyle = Math.floor(Math.random() * 4);
    }

    update() {
      this.rotation += this.rotSpeed;
      this.tilt += this.tiltSpeed;

      // Natural atmospheric sway + wind current
      const sway = Math.sin(time * this.swayFreq) * this.swayAmp;
      this.y += this.speedY + wind.y * 0.4;
      this.x += this.speedX + wind.x * 0.8 + sway;

      // Mouse interactive wind swirl
      if (mouse.x > -500) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (1 - dist / 180) * 5.0;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
          this.rotation += force * 0.06;
        }
      }

      // Wrap boundaries
      if (this.y > height + 50 || this.x > width + 180 || this.x < -200) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      // 3D perspective fold scale
      const scaleX = Math.cos(this.tilt);
      const scaleY = Math.sin(this.tilt * 0.7) * 0.3 + 0.88;
      ctx.scale(scaleX, scaleY);

      // Petal Color Gradients
      const grad = ctx.createLinearGradient(0, -this.size, 0, this.size);
      if (this.petalStyle === 0) {
        // Classic Radiant Sakura Pink
        grad.addColorStop(0, `rgba(255, 215, 230, ${this.opacity * 0.98})`);
        grad.addColorStop(0.5, `rgba(255, 125, 175, ${this.opacity * 0.88})`);
        grad.addColorStop(1, `rgba(233, 30, 140, ${this.opacity * 0.78})`);
      } else if (this.petalStyle === 1) {
        // Pale Ethereal White-Pink
        grad.addColorStop(0, `rgba(255, 252, 254, ${this.opacity * 0.98})`);
        grad.addColorStop(0.6, `rgba(255, 180, 210, ${this.opacity * 0.90})`);
        grad.addColorStop(1, `rgba(255, 105, 180, ${this.opacity * 0.75})`);
      } else if (this.petalStyle === 2) {
        // Anime Twilight Violet Sakura
        grad.addColorStop(0, `rgba(240, 225, 255, ${this.opacity * 0.98})`);
        grad.addColorStop(0.55, `rgba(192, 132, 252, ${this.opacity * 0.88})`);
        grad.addColorStop(1, `rgba(124, 58, 237, ${this.opacity * 0.78})`);
      } else {
        // Celestial Cyan-kissed Sakura
        grad.addColorStop(0, `rgba(235, 252, 255, ${this.opacity * 0.98})`);
        grad.addColorStop(0.5, `rgba(130, 235, 255, ${this.opacity * 0.88})`);
        grad.addColorStop(1, `rgba(0, 240, 255, ${this.opacity * 0.70})`);
      }

      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(255, 105, 180, 0.5)';
      ctx.shadowBlur = 12;

      // Draw Anatomical Japanese Sakura Petal (Heart/Notched Silhouette)
      const w = this.size * 0.7;
      const h = this.size;

      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.bezierCurveTo(w * 0.6, h * 0.6, w * 1.15, -h * 0.3, w * 0.7, -h * 0.9);
      // Center tip notch
      ctx.bezierCurveTo(w * 0.35, -h * 0.8, w * 0.1, -h * 0.72, 0, -h * 0.65);
      ctx.bezierCurveTo(-w * 0.1, -h * 0.72, -w * 0.35, -h * 0.8, -w * 0.7, -h * 0.9);
      ctx.bezierCurveTo(-w * 1.15, -h * 0.3, -w * 0.6, h * 0.6, 0, h);
      ctx.closePath();
      ctx.fill();

      // Delicate inner luminous spine
      ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.6})`;
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.8);
      ctx.quadraticCurveTo(w * 0.1, 0, 0, -h * 0.5);
      ctx.stroke();

      ctx.restore();
    }
  }

  /* ─────────────────────────────────────────────────────────────
     4. ANIME SPIRIT FIREFLIES / ENERGY WISPS (Ghibli / Mononoke)
     ───────────────────────────────────────────────────────────── */
  class SpiritWisp {
    constructor() {
      this.reset(true);
    }

    reset(isInitial) {
      this.x = Math.random() * width;
      this.y = isInitial ? Math.random() * height : height + 30;
      this.radius = 2.2 + Math.random() * 3.8;
      this.baseAlpha = 0.5 + Math.random() * 0.5;
      this.pulseSpeed = 0.025 + Math.random() * 0.035;
      this.pulseOffset = Math.random() * Math.PI * 2;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = -(0.5 + Math.random() * 0.9);
      this.colorType = Math.random();
    }

    update() {
      this.x += this.vx + Math.sin(time * 0.02 + this.pulseOffset) * 0.6;
      this.y += this.vy;

      if (this.y < -40 || this.x < -40 || this.x > width + 40) {
        this.reset(false);
      }
    }

    draw() {
      if (!isFinite(this.x) || !isFinite(this.y) || !isFinite(this.radius) || this.radius <= 0) return;
      const safeRadius = Math.max(1.5, this.radius);
      const alpha = this.baseAlpha * (0.6 + 0.4 * Math.sin(time * this.pulseSpeed + this.pulseOffset));

      ctx.save();

      let coreColor, glowColor;
      if (this.colorType < 0.4) {
        coreColor = `rgba(0, 240, 255, ${alpha})`;
        glowColor = `rgba(0, 240, 255, ${alpha * 0.4})`;
      } else if (this.colorType < 0.75) {
        coreColor = `rgba(192, 132, 252, ${alpha})`;
        glowColor = `rgba(168, 85, 247, ${alpha * 0.4})`;
      } else {
        coreColor = `rgba(255, 225, 120, ${alpha})`;
        glowColor = `rgba(255, 190, 60, ${alpha * 0.4})`;
      }

      // Outer Pulsing Aura
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, safeRadius * 6.5);
      grad.addColorStop(0, coreColor);
      grad.addColorStop(0.45, glowColor);
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, safeRadius * 6.5, 0, Math.PI * 2);
      ctx.fill();

      // Brilliant White Spirit Core
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = coreColor;
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(this.x, this.y, safeRadius * 0.85, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  /* ─────────────────────────────────────────────────────────────
     5. CINEMATIC SHOOTING METEORS ("Your Name" / Kimi no Na wa)
     ───────────────────────────────────────────────────────────── */
  class AnimeMeteor {
    constructor() {
      this.active = false;
      this.timer = 50 + Math.random() * 100;
    }

    spawn() {
      this.active = true;
      this.length = 160 + Math.random() * 200;
      this.speed = 15 + Math.random() * 14;
      this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.25; // ~45 deg
      this.x = Math.random() * (width * 0.85);
      this.y = Math.random() * (height * 0.35);
      this.opacity = 1;
      this.decay = 0.012 + Math.random() * 0.014;
      this.color = Math.random() > 0.45 ? '#00f0ff' : '#ff77bb';
    }

    update() {
      if (!this.active) {
        this.timer--;
        if (this.timer <= 0) this.spawn();
        return;
      }

      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.opacity -= this.decay;

      // Spawn tail stardust
      if (Math.random() < 0.45 && stardustParticles.length < 120) {
        stardustParticles.push(new Stardust(this.x, this.y, -Math.cos(this.angle) * 2.5, -Math.sin(this.angle) * 2.5));
      }

      if (this.opacity <= 0 || this.x > width + 260 || this.y > height + 260) {
        this.active = false;
        this.timer = 80 + Math.random() * 180;
      }
    }

    draw() {
      if (!this.active) return;
      ctx.save();

      const tailX = this.x - Math.cos(this.angle) * this.length;
      const tailY = this.y - Math.sin(this.angle) * this.length;

      const grad = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.65, this.color === '#00f0ff' ? 'rgba(0, 240, 255, 0.6)' : 'rgba(255, 119, 187, 0.6)');
      grad.addColorStop(1, '#ffffff');

      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.8;
      ctx.lineCap = 'round';
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 20;

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(this.x, this.y);
      ctx.stroke();

      // Brilliant Meteor Head Starburst
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  /* ─────────────────────────────────────────────────────────────
     6. INTERACTIVE MAGIC STARDUST TRAIL (Follows Mouse Cursor)
     ───────────────────────────────────────────────────────────── */
  class Stardust {
    constructor(x, y, vx, vy) {
      this.x = x + (Math.random() - 0.5) * 18;
      this.y = y + (Math.random() - 0.5) * 18;
      this.vx = (vx || 0) * 0.4 + (Math.random() - 0.5) * 2.0;
      this.vy = (vy || 0) * 0.4 + (Math.random() - 0.5) * 2.0 - 0.4;
      this.size = 1.5 + Math.random() * 2.8;
      this.life = 1;
      this.decay = 0.016 + Math.random() * 0.022;
      this.color = Math.random() < 0.45 ? '#00f0ff' : (Math.random() < 0.8 ? '#ffb7d5' : '#ffffff');
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life -= this.decay;
    }

    draw() {
      if (this.life <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.life);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 12;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Populate System Collections
  const petalCount = Math.min(Math.floor(window.innerWidth / 18), 75);
  const petals = [];
  for (let i = 0; i < petalCount; i++) {
    petals.push(new SakuraPetal(true));
  }

  const wispCount = Math.min(Math.floor(window.innerWidth / 30), 40);
  const wisps = [];
  for (let i = 0; i < wispCount; i++) {
    wisps.push(new SpiritWisp());
  }

  const meteors = [new AnimeMeteor(), new AnimeMeteor(), new AnimeMeteor()];
  let stardustParticles = [];

  // Wind Oscillation System
  function updateWind() {
    wind.gustTimer++;
    if (wind.gustTimer > 160) {
      wind.targetX = 0.9 + Math.random() * 2.0;
      wind.gustTimer = 0;
    }
    wind.x += (wind.targetX - wind.x) * 0.025;
  }

  /* ─────────────────────────────────────────────────────────────
     MAIN ANIMATION LOOP
     ───────────────────────────────────────────────────────────── */
  function animate() {
    time++;
    updateWind();

    ctx.clearRect(0, 0, width, height);

    // 1. Draw Sky, Aurora Nebula, & Starfield
    drawSkyAndStars();

    // 2. Draw Luminous Anime Moon
    drawAnimeMoon();

    // 3. Update & Draw Meteors
    for (let i = 0; i < meteors.length; i++) {
      meteors[i].update();
      meteors[i].draw();
    }

    // 4. Update & Draw Spirit Fireflies
    for (let i = 0; i < wisps.length; i++) {
      wisps[i].update();
      wisps[i].draw();
    }

    // 5. Update & Draw Sakura Petals
    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }

    // 6. Update & Draw Interactive Stardust Particles
    for (let i = stardustParticles.length - 1; i >= 0; i--) {
      stardustParticles[i].update();
      stardustParticles[i].draw();
      if (stardustParticles[i].life <= 0) {
        stardustParticles.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  resize();
  requestAnimationFrame(animate);
})();
