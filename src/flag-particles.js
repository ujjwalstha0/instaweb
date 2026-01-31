// Particle physics engine for Nepal flag
// Each particle has position, velocity, acceleration, and target (flag shape)
// Exports: generateFlagParticles, stepParticles

export function generateFlagParticles({
  count = 600,
  width = 300,
  height = 420,
  flagShapeFn,
  colorFn
}) {
  // Generate random start positions, and target positions inside the Nepal flag
  const particles = [];
  let tries = 0;
  for (let i = 0; i < count; ) {
    // Randomly sample inside bounding box
    const tx = Math.random() * width;
    const ty = Math.random() * height;
    if (flagShapeFn(tx, ty)) {
      particles.push({
        // Start scattered above the flag
        x: Math.random() * width,
        y: -Math.random() * 200,
        z: Math.random() * 40 - 20,
        vx: 0,
        vy: 0,
        vz: 0,
        ax: 0,
        ay: 0,
        az: 0,
        tx,
        ty,
        tz: 0,
        color: colorFn ? colorFn(tx, ty) : '#dc1f26',
        phase: Math.random() * Math.PI * 2
      });
      i++;
    }
    tries++;
    if (tries > count * 20) break; // avoid infinite loop
  }
  return particles;
}

export function stepParticles(particles, { dt = 0.016, gravity = 60, attract = 8, damp = 0.82, wave = 0, time = 0 }) {
  // Simulate physics for each particle
  for (const p of particles) {
    // Attraction to target
    const dx = p.tx - p.x;
    const dy = p.ty - p.y;
    const dz = (p.tz + Math.sin(time * 1.2 + p.phase) * wave) - p.z;
    p.ax = dx * attract;
    p.ay = dy * attract + gravity;
    p.az = dz * attract;
    // Integrate velocity
    p.vx = (p.vx + p.ax * dt) * damp;
    p.vy = (p.vy + p.ay * dt) * damp;
    p.vz = (p.vz + p.az * dt) * damp;
    // Integrate position
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.z += p.vz * dt;
  }
}
