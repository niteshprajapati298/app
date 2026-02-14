"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ geometry, position, scale, color, wireframe }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.25;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} geometry={geometry} position={position} scale={scale}>
        <meshStandardMaterial
          color={color}
          wireframe={wireframe}
          emissive={wireframe ? color : "#000"}
          emissiveIntensity={wireframe ? 0.4 : 0}
          metalness={wireframe ? 0 : 0.6}
          roughness={wireframe ? 1 : 0.3}
          transparent
          opacity={wireframe ? 0.6 : 0.25}
        />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  const torusGeometry = useMemo(() => new THREE.TorusGeometry(0.4, 0.1, 16, 32), []);
  const icosahedronGeometry = useMemo(() => new THREE.IcosahedronGeometry(0.35, 1), []);
  const octahedronGeometry = useMemo(() => new THREE.OctahedronGeometry(0.4, 0), []);
  const dodecahedronGeometry = useMemo(() => new THREE.DodecahedronGeometry(0.35, 0), []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#7CFF3A" />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color="#7B5CFF" />

      <FloatingShape
        geometry={torusGeometry}
        position={[-2, 0.5, -3]}
        scale={1.2}
        color="#7CFF3A"
        wireframe
      />
      <FloatingShape
        geometry={icosahedronGeometry}
        position={[2, -0.3, -4]}
        scale={1}
        color="#7B5CFF"
        wireframe
      />
      <FloatingShape
        geometry={octahedronGeometry}
        position={[-1.5, -1, -2]}
        scale={0.8}
        color="#7CFF3A"
        wireframe
      />
      <FloatingShape
        geometry={dodecahedronGeometry}
        position={[1.5, 0.8, -3.5]}
        scale={0.9}
        color="#7B5CFF"
        wireframe
      />

      {/* Ambient wireframe grid */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[20, 20, 20, 20]} />
        <meshBasicMaterial color="#7CFF3A" wireframe transparent opacity={0.04} />
      </mesh>
    </>
  );
}
