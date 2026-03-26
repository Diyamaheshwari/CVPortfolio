import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleUniverse = () => {
  const ref = useRef();

  // Generate random particles
  const [positions, colors] = useMemo(() => {
    const particleCount = 6000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Create a large sphere of particles
      const r = 25 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi) - 5; // offset backward

      positions.set([x, y, z], i * 3);

      // Tech/Cyberpunk colors
      const mixedColor = new THREE.Color();
      const randomTint = Math.random();
      if (randomTint > 0.7) {
        mixedColor.setHex(0xff007f); // Primary Pink
      } else if (randomTint > 0.4) {
        mixedColor.setHex(0x5a189a); // Deep Purple
      } else {
        mixedColor.setHex(0x00ffff); // Cyan
      }

      colors.set([mixedColor.r, mixedColor.g, mixedColor.b], i * 3);
    }

    return [positions, colors];
  }, []);

  // Map scroll progress to camera Z position
  useFrame((state) => {
    // Determine scroll percentage
    const scrollY = window.scrollY;
    // Fallback if document height isn't fully calculated yet
    const maxScroll = Math.max(
      document.body.scrollHeight - window.innerHeight,
      1 // Prevent division by zero
    );
    const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

    // Zoom into the scene as we scroll down
    // Start at z = 10, move to z = -15
    const targetZ = 10 - (scrollProgress * 25);

    // Smooth camera movement using linear interpolation
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);

    // Add subtle ambient rotation to the particles
    if (ref.current) {
      ref.current.rotation.x -= 0.0003;
      ref.current.rotation.y -= 0.0005;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const Background3D = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#0a0a0a]">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: false, antialias: false }}>
        {/* Subtle fog for depth effect */}
        <fog attach="fog" args={['#0a0a0a', 5, 30]} />
        <ParticleUniverse />
      </Canvas>
    </div>
  );
};

export default Background3D;
