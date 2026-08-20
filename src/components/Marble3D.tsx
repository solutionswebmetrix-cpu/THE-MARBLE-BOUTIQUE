import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

function MarbleBlock() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // Gentle auto rotation + mouse influence
    meshRef.current.rotation.y += delta * 0.25;
    const targetX = mouse.y * 0.6;
    const targetZ = mouse.x * 0.4;
    meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.z += (targetZ - meshRef.current.rotation.z) * 0.05;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[2.2, 2.8, 0.5]} />
        <meshPhysicalMaterial
          color="#f4f1ea"
          roughness={0.08}
          metalness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.04}
          reflectivity={0.9}
          envMapIntensity={1.2}
          sheen={0.5}
          sheenColor={new THREE.Color('#e8e2d6')}
        />
      </mesh>
    </Float>
  );
}

function MarbleVeins() {
  // Thin translucent overlay planes to suggest marble veining on the block faces
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.25;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
      <mesh ref={ref} position={[0, 0, 0.26]}>
        <planeGeometry args={[2.1, 2.7]} />
        <meshBasicMaterial
          color="#c8a646"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </Float>
  );
}

function GoldAccentRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.3;
      ref.current.rotation.x += delta * 0.1;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <torusGeometry args={[3.4, 0.015, 16, 100]} />
      <meshStandardMaterial color="#c8a646" metalness={1} roughness={0.2} emissive="#9c7e2e" emissiveIntensity={0.3} />
    </mesh>
  );
}

export default function Marble3D() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-4, 2, 3]} intensity={1.2} color="#e3c97a" />
      <pointLight position={[3, -2, 2]} intensity={0.8} color="#ffffff" />

      <Suspense fallback={null}>
        <MarbleBlock />
        <MarbleVeins />
        <GoldAccentRing />
        <ContactShadows position={[0, -2.2, 0]} opacity={0.35} scale={10} blur={2.5} far={4} color="#000000" />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
