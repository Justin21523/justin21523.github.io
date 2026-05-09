import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";

function checkWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function GeometricShape({ position, color, speed = 1 }) {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.2 * speed;
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3 * speed;
    }
  });

  return (
    <Float speed={2 * speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={mesh} position={position}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.1} transparent opacity={0.6} />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  if (!checkWebGL()) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} />

        <GeometricShape position={[4, 2, 0]} color="#4F46E5" speed={0.8} />
        <GeometricShape position={[-5, -2, -2]} color="#06B6D4" speed={1.2} />
        <GeometricShape position={[3, -3, 1]} color="#7C3AED" speed={0.6} />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
