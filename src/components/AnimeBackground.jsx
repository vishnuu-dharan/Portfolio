import React, { useEffect, useRef } from 'react';

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
    let wind = { x: 0.35, y: 0.3, targetX: 0.35, gustTimer: 0 };
    let animationFrameId;
    let isTabVisible = true;

    /* ── Scroll-Reactive State (Smooth Lerped) ── */
    let targetScrollY = window.scrollY || 0;
    let currentScrollY = targetScrollY;
    let lastScrollY = targetScrollY;
    let scrollVelocity = 0;
    let smoothVelocity = 0;

    /* ── Offscreen Pre-rendered Assets Cache ── */
    let moonCanvas;
    let petalSprites = [];
    let wispSprites = [];

    function buildMoonCache() {
      moonCanvas = document.createElement('canvas');
      const size = 320;
      moonCanvas.width = size;
      moonCanvas.height = size;
      const mCtx = moonCanvas.getContext('2d');
      const cx = size / 2;
      const cy = size / 2;
      const r = 42;

      const halo = mCtx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 3.4);
      halo.addColorStop(0, 'rgba(255, 240, 250, 0.32)');
      halo.addColorStop(0.4, 'rgba(192, 132, 252, 0.16)');
      halo.addColorStop(0.7, 'rgba(0, 240, 255, 0.06)');
      halo.addColorStop(1, 'rgba(0,0,0,0)');
      mCtx.fillStyle = halo;
      mCtx.beginPath();
      mCtx.arc(cx, cy, r * 3.4, 0, Math.PI * 2);
      mCtx.fill();

      mCtx.fillStyle = 'rgba(255, 250, 254, 0.96)';
      mCtx.beginPath();
      mCtx.arc(cx, cy, r, 0, Math.PI * 2, false);
      mCtx.fill();

      mCtx.globalCompositeOperation = 'destination-out';
      mCtx.beginPath();
      mCtx.arc(cx - r * 0.52, cy - r * 0.28, r * 0.92, 0, Math.PI * 2, false);
      mCtx.fill();
      mCtx.globalCompositeOperation = 'source-over';

      mCtx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
      mCtx.lineWidth = 1.4;
      mCtx.beginPath();
      mCtx.ellipse(cx, cy, r * 2.0, r * 0.48, -0.32, 0, Math.PI * 2);
      mCtx.stroke();
    }

    function buildPetalSprites() {
      petalSprites = [];
      const palettes = [
        ['#ffd7e6', '#ff7daf', '#e91e8c'],
        ['#fffbfe', '#ffb4d2', '#ff69b4'],
        ['#f0e1ff', '#c084fc', '#7c3aed'],
        ['#ebfcff', '#82ebff', '#00f0ff'],
      ];

      palettes.forEach((colors) => {
        const pCanvas = document.createElement('canvas');
        pCanvas.width = 48;
        pCanvas.height = 48;
        const pCtx = pCanvas.getContext('2d');
        const cx = 24;
        const cy = 24;
        const size = 18;
        const w = size * 0.7;
        const h = size;

        pCtx.translate(cx, cy);
        const grad = pCtx.createLinearGradient(0, -h, 0, h);
        grad.addColorStop(0, colors[0]);
        grad.addColorStop(0.5, colors[1]);
        grad.addColorStop(1, colors[2]);

        pCtx.fillStyle = grad;
        pCtx.beginPath();
        pCtx.moveTo(0, h);
        pCtx.bezierCurveTo(w * 0.6, h * 0.6, w * 1.15, -h * 0.3, w * 0.7, -h * 0.9);
        pCtx.bezierCurveTo(w * 0.35, -h * 0.8, w * 0.1, -h * 0.72, 0, -h * 0.65);
        pCtx.bezierCurveTo(-w * 0.1, -h * 0.72, -w * 0.35, -h * 0.8, -w * 0.7, -h * 0.9);
        pCtx.bezierCurveTo(-w * 1.15, -h * 0.3, -w * 0.6, h * 0.6, 0, h);
        pCtx.closePath();
        pCtx.fill();

        pCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        pCtx.lineWidth = 0.8;
        pCtx.beginPath();
        pCtx.moveTo(0, h * 0.8);
        pCtx.quadraticCurveTo(w * 0.1, 0, 0, -h * 0.5);
        pCtx.stroke();

        petalSprites.push(pCanvas);
      });
    }

    function buildWispSprites() {
      wispSprites = [];
      const colors = [
        { core: 'rgba(0, 240, 255, 1)', glow: 'rgba(0, 240, 255, 0.35)' },
        { core: 'rgba(192, 132, 252, 1)', glow: 'rgba(168, 85, 247, 0.35)' },
        { core: 'rgba(255, 225, 120, 1)', glow: 'rgba(255, 190, 60, 0.35)' },
      ];

      colors.forEach((c) => {
        const wCanvas = document.createElement('canvas');
        wCanvas.width = 40;
        wCanvas.height = 40;
        const wCtx = wCanvas.getContext('2d');
        const cx = 20;
        const cy = 20;
        const r = 4;

        const grad = wCtx.createRadialGradient(cx, cy, 0, cx, cy, r * 4.5);
        grad.addColorStop(0, c.core);
        grad.addColorStop(0.4, c.glow);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        wCtx.fillStyle = grad;
        wCtx.beginPath();
        wCtx.arc(cx, cy, r * 4.5, 0, Math.PI * 2);
        wCtx.fill();

        wCtx.fillStyle = '#ffffff';
        wCtx.beginPath();
        wCtx.arc(cx, cy, r * 0.8, 0, Math.PI * 2);
        wCtx.fill();

        wispSprites.push(wCanvas);
      });
    }

    let stars = [];
    let constellationLines = [];
    function initStars() {
      stars = [];
      const count = Math.min(Math.floor((width * height) / 11000), 100);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          baseY: Math.random() * height,
          depth: 0.2 + Math.random() * 0.8,
          radius: 0.8 + Math.random() * 1.4,
          baseAlpha: 0.35 + Math.random() * 0.65,
          twinkleSpeed: 0.008 + Math.random() * 0.016, // Slow gentle twinkling
          twinkleOffset: Math.random() * Math.PI * 2,
          isCrossStar: Math.random() < 0.2,
          crossSize: 4 + Math.random() * 5,
          color: Math.random() < 0.45 ? '#00f0ff' : (Math.random() < 0.75 ? '#ffffff' : '#ffaacc'),
        });
      }

      constellationLines = [];
      for (let i = 0; i < stars.length; i += 3) {
        for (let j = i + 1; j < Math.min(i + 4, stars.length); j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].baseY - stars[j].baseY;
          if (dx * dx + dy * dy < 11000) {
            constellationLines.push([stars[i], stars[j]]);
          }
        }
      }
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      buildMoonCache();
      buildPetalSprites();
      buildWispSprites();
      initStars();
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

      if (stardustParticles.length < 35) {
        stardustParticles.push(new Stardust(mouse.x, mouse.y, mouse.vx, mouse.vy));
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
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
    document.addEventListener('visibilitychange', handleVisibilityChange);

    /* ── Sakura Petals (Slow & Serene Drifting) ── */
    class SakuraPetal {
      constructor(isInitial) {
        this.reset(isInitial);
      }

      reset(isInitial) {
        this.x = Math.random() * (width + 200) - 100;
        this.y = isInitial ? Math.random() * height : -30 - Math.random() * 60;
        this.scale = 0.75 + Math.random() * 0.55;
        this.speedY = 0.32 + Math.random() * 0.42; // Slow, graceful descent
        this.speedX = 0.18 + Math.random() * 0.35; // Gentle horizontal drift
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.012; // Slow rotation
        this.tilt = Math.random() * Math.PI;
        this.tiltSpeed = 0.008 + Math.random() * 0.012;
        this.swayFreq = 0.006 + Math.random() * 0.010; // Slow soothing sway
        this.swayAmp = 0.8 + Math.random() * 1.2;
        this.opacity = 0.75 + Math.random() * 0.25;
        this.spriteIdx = Math.floor(Math.random() * petalSprites.length);
      }

      update(dt, scrollWindX, scrollWindY) {
        this.rotation += (this.rotSpeed + scrollWindX * 0.01) * dt;
        this.tilt += this.tiltSpeed * dt;

        const sway = Math.sin(time * this.swayFreq) * this.swayAmp;
        this.y += (this.speedY + wind.y * 0.2 + scrollWindY) * dt;
        this.x += (this.speedX + wind.x * 0.4 + sway + scrollWindX) * dt;

        if (mouse.x > -500) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 18000) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 134) * 2.0 * dt;
            this.x += (dx / dist) * force;
            this.y += (dy / dist) * force;
          }
        }

        if (this.y > height + 40 || this.x > width + 150 || this.x < -150) {
          this.reset(false);
        }
      }

      draw() {
        const sprite = petalSprites[this.spriteIdx];
        if (!sprite) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(Math.cos(this.tilt) * this.scale, this.scale);
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(sprite, -24, -24);
        ctx.restore();
      }
    }

    /* ── Spirit Wisps (Slow Floating) ── */
    class SpiritWisp {
      constructor() {
        this.reset(true);
      }

      reset(isInitial) {
        this.x = Math.random() * width;
        this.y = isInitial ? Math.random() * height : height + 25;
        this.spriteIdx = Math.floor(Math.random() * wispSprites.length);
        this.scale = 0.7 + Math.random() * 0.6;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = -(0.16 + Math.random() * 0.22); // Slow upward float
      }

      update(dt, scrollWindY) {
        this.x += (this.vx + Math.sin(time * 0.01 + this.pulseOffset) * 0.3) * dt;
        this.y += (this.vy - scrollWindY * 0.3) * dt;

        if (this.y < -30 || this.x < -30 || this.x > width + 30) {
          this.reset(false);
        }
      }

      draw() {
        const sprite = wispSprites[this.spriteIdx];
        if (!sprite) return;

        ctx.save();
        const alpha = 0.55 + 0.45 * Math.sin(time * 0.015 + this.pulseOffset);
        ctx.globalAlpha = alpha;
        ctx.drawImage(sprite, this.x - 20, this.y - 20, 40 * this.scale, 40 * this.scale);
        ctx.restore();
      }
    }

    /* ── Shooting Meteors (Graceful Speed) ── */
    class AnimeMeteor {
      constructor() {
        this.active = false;
        this.timer = 150 + Math.random() * 250;
      }

      spawn() {
        this.active = true;
        this.length = 120 + Math.random() * 140;
        this.speed = 7 + Math.random() * 5; // Slow, majestic streak
        this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2;
        this.x = Math.random() * (width * 0.8);
        this.y = Math.random() * (height * 0.35);
        this.opacity = 1;
        this.decay = 0.009 + Math.random() * 0.009;
        this.color = Math.random() > 0.45 ? '#00f0ff' : '#ff77bb';
      }

      update(dt) {
        if (!this.active) {
          this.timer -= dt;
          if (this.timer <= 0) this.spawn();
          return;
        }

        this.x += Math.cos(this.angle) * this.speed * dt;
        this.y += Math.sin(this.angle) * this.speed * dt;
        this.opacity -= this.decay * dt;

        if (this.opacity <= 0 || this.x > width + 200 || this.y > height + 200) {
          this.active = false;
          this.timer = 180 + Math.random() * 320;
        }
      }

      draw() {
        if (!this.active) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.opacity);

        const tailX = this.x - Math.cos(this.angle) * this.length;
        const tailY = this.y - Math.sin(this.angle) * this.length;

        const grad = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(0.7, this.color);
        grad.addColorStop(1, '#ffffff');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    /* ── Stardust ── */
    class Stardust {
      constructor(x, y, vx, vy) {
        this.x = x + (Math.random() - 0.5) * 12;
        this.y = y + (Math.random() - 0.5) * 12;
        this.vx = (vx || 0) * 0.2 + (Math.random() - 0.5) * 0.8;
        this.vy = (vy || 0) * 0.2 + (Math.random() - 0.5) * 0.8 - 0.15;
        this.size = 1.3 + Math.random() * 1.8;
        this.life = 1;
        this.decay = 0.018 + Math.random() * 0.018;
        this.color = Math.random() < 0.5 ? '#00f0ff' : '#ffb7d5';
      }

      update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.life -= this.decay * dt;
      }

      draw() {
        if (this.life <= 0) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const petalCount = Math.min(Math.floor(window.innerWidth / 26), 45);
    const petals = [];
    for (let i = 0; i < petalCount; i++) {
      petals.push(new SakuraPetal(true));
    }

    const wispCount = Math.min(Math.floor(window.innerWidth / 50), 20);
    const wisps = [];
    for (let i = 0; i < wispCount; i++) {
      wisps.push(new SpiritWisp());
    }

    const meteors = [new AnimeMeteor(), new AnimeMeteor()];
    let stardustParticles = [];

    function updateWind(dt) {
      wind.gustTimer += dt;
      if (wind.gustTimer > 240) {
        wind.targetX = 0.25 + Math.random() * 0.4;
        wind.gustTimer = 0;
      }
      wind.x += (wind.targetX - wind.x) * 0.015 * dt;
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

      // Soft, gentle scroll wind influence
      const scrollWindY = Math.max(Math.min(smoothVelocity * 0.015, 1.0), -0.8);
      const scrollWindX = Math.max(Math.min(smoothVelocity * 0.010, 0.8), -0.6);

      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1000);
      const scrollProgress = Math.min(Math.max(currentScrollY / maxScroll, 0), 1);

      time += dt;
      updateWind(dt);

      // 1. Dynamic Scroll-Progress Sky & Aurora Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, width * 0.5, height);
      if (scrollProgress < 0.35) {
        skyGrad.addColorStop(0, '#020512');
        skyGrad.addColorStop(0.4, '#060d24');
        skyGrad.addColorStop(1, '#120b2e');
      } else if (scrollProgress < 0.7) {
        skyGrad.addColorStop(0, '#040718');
        skyGrad.addColorStop(0.45, '#120b30');
        skyGrad.addColorStop(1, '#081432');
      } else {
        skyGrad.addColorStop(0, '#020914');
        skyGrad.addColorStop(0.4, '#07152c');
        skyGrad.addColorStop(1, '#110c28');
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Soft Aurora Nebulae
      const auroraX1 = width * 0.72 + Math.sin(time * 0.003) * 35 - scrollProgress * 60;
      const auroraY1 = height * 0.22 + Math.cos(time * 0.002) * 30 - currentScrollY * 0.03;
      const neb1 = ctx.createRadialGradient(auroraX1, auroraY1, 30, auroraX1, auroraY1, width * 0.6);
      neb1.addColorStop(0, scrollProgress > 0.5 ? 'rgba(233, 30, 140, 0.16)' : 'rgba(124, 58, 237, 0.20)');
      neb1.addColorStop(0.5, 'rgba(0, 240, 255, 0.07)');
      neb1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, width, height);

      // 2. Parallax Constellation Lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (let i = 0; i < constellationLines.length; i++) {
        const pair = constellationLines[i];
        const y1 = (pair[0].baseY - currentScrollY * 0.025 * pair[0].depth + height) % height;
        const y2 = (pair[1].baseY - currentScrollY * 0.025 * pair[1].depth + height) % height;
        ctx.moveTo(pair[0].x, y1);
        ctx.lineTo(pair[1].x, y2);
      }
      ctx.stroke();

      // 3. Parallax Starfield
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const starY = (s.baseY - currentScrollY * 0.03 * s.depth + height) % height;
        const alpha = s.baseAlpha * (0.5 + 0.5 * Math.sin(time * s.twinkleSpeed + s.twinkleOffset));

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, starY, s.radius, 0, Math.PI * 2);
        ctx.fill();

        if (s.isCrossStar && alpha > 0.5) {
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.8;
          const arm = s.crossSize * alpha;
          ctx.beginPath();
          ctx.moveTo(s.x - arm, starY);
          ctx.lineTo(s.x + arm, starY);
          ctx.moveTo(s.x, starY - arm);
          ctx.lineTo(s.x, starY + arm);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 4. Parallax Crescent Moon
      if (moonCanvas) {
        const moonX = width * 0.84 - 160;
        const moonY = Math.min(height * 0.16, 130) - 160 - currentScrollY * 0.04;
        ctx.drawImage(moonCanvas, moonX, moonY);
      }

      // 5. Meteors
      for (let i = 0; i < meteors.length; i++) {
        meteors[i].update(dt);
        meteors[i].draw();
      }

      // 6. Wisps
      for (let i = 0; i < wisps.length; i++) {
        wisps[i].update(dt, scrollWindY);
        wisps[i].draw();
      }

      // 7. Sakura Petals
      for (let i = 0; i < petals.length; i++) {
        petals[i].update(dt, scrollWindX, scrollWindY);
        petals[i].draw();
      }

      // 8. Stardust
      for (let i = stardustParticles.length - 1; i >= 0; i--) {
        stardustParticles[i].update(dt);
        stardustParticles[i].draw();
        if (stardustParticles[i].life <= 0) {
          stardustParticles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    resize();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
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
