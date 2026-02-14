"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Orb({ position, color, scale }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.35}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

function TorusRing({ position, color }) {
  const meshRef = useRef();
  const geometry = useMemo(() => new THREE.TorusGeometry(0.5, 0.08, 16, 48), []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} geometry={geometry}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.25}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export default function FounderScene3D() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#7CFF3A" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#7B5CFF" />
      <pointLight position={[0, 5, -2]} intensity={0.3} color="#7B5CFF" />

      <Orb position={[-1.5, 0.5, -2]} color="#7CFF3A" scale={0.4} />
      <Orb position={[2, -0.5, -3]} color="#7B5CFF" scale={0.5} />
      <Orb position={[0.5, 1.2, -2.5]} color="#7CFF3A" scale={0.25} />

      <TorusRing position={[-2, -0.8, -1.5]} color="#7B5CFF" />
      <TorusRing position={[1.5, 0.3, -3.5]} color="#7CFF3A" />

      {/* Subtle grid plane */}
      <mesh position={[0, 0, -4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 12, 24, 24]} />
        <meshBasicMaterial
          color="#7CFF3A"
          wireframe
          transparent
          opacity={0.04}
        />
      </mesh>
    </>
  );
}
