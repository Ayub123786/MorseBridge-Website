import React, { useRef, useEffect, memo } from 'react';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

function AnimatedGridBackgroundComponent() {
  const canvasRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for ambient 3D field
    const count = Math.min(35, Math.floor(width / 40));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 0.8 + 0.2, // 3D depth factor
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.8 + 0.8,
      color: Math.random() > 0.6 ? '#A855F7' : '#EAB308',
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let t = 0;
    const render = () => {
      t += 0.005;
      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Subtle ambient 3D particles with depth parallax
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!prefersReducedMotion) {
          p.x += p.vx * p.z;
          p.y += p.vy * p.z;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        // Parallax displacement
        const parallaxX = p.x + (mouseX - width / 2) * 0.02 * p.z;
        const parallaxY = p.y + (mouseY - height / 2) * 0.02 * p.z;

        ctx.beginPath();
        ctx.arc(parallaxX, parallaxY, p.radius * p.z, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.12 * p.z;
        ctx.fill();

        // Connect nearby particles with subtle dashed lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(parallaxX, parallaxY);
            ctx.lineTo(
              p2.x + (mouseX - width / 2) * 0.02 * p2.z,
              p2.y + (mouseY - height / 2) * 0.02 * p2.z
            );
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 120) * 0.04;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* Dynamic 3D perspective grid canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
      {/* Soft gradient mesh overlay for ambient lighting */}
      <div className="ambient-mesh-glow" />
    </div>
  );
}

export const AnimatedGridBackground = memo(AnimatedGridBackgroundComponent);
export default AnimatedGridBackground;
