/**
 * Elegant Falling Golden Petals & Bokeh Particle System
 */

class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = 28;
    this.width = 0;
    this.height = 0;
    this.animId = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Generate initial particles (gold shimmer specks & soft petals)
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle(true));
    }

    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    this.width = this.canvas.width = parent.clientWidth || window.innerWidth;
    this.height = this.canvas.height = parent.clientHeight || window.innerHeight;
  }

  createParticle(randomY = false) {
    const isPetal = Math.random() > 0.45;
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -20,
      size: isPetal ? (Math.random() * 8 + 6) : (Math.random() * 4 + 2),
      speedY: Math.random() * 0.8 + 0.4,
      speedX: Math.random() * 0.6 - 0.3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.5 + 0.25,
      isPetal: isPetal,
      // Gold & Sage/Cream subtle palette
      color: isPetal 
        ? (Math.random() > 0.5 ? 'rgba(212, 175, 55, ' : 'rgba(235, 222, 195, ')
        : 'rgba(212, 175, 55, '
    };
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.015) * 0.6 + p.speedX;
      p.rotation += p.rotationSpeed;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.isPetal) {
        // Draw soft golden leaf/petal
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color + p.opacity + ')';
        this.ctx.fill();
      } else {
        // Draw glowing golden dust speck
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color + p.opacity + ')';
        this.ctx.shadowBlur = 6;
        this.ctx.shadowColor = 'rgba(212, 175, 55, 0.6)';
        this.ctx.fill();
      }

      this.ctx.restore();

      // Reset when falling out of bounds
      if (p.y > this.height + 20 || p.x < -20 || p.x > this.width + 20) {
        this.particles[i] = this.createParticle(false);
      }
    }

    this.animId = requestAnimationFrame(() => this.animate());
  }
}

window.initPetals = () => {
  new ParticleSystem('petal-canvas');
};
