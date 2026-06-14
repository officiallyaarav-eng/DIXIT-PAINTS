"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useAccent } from "@/components/providers/AccentProvider";
import { useMousePosition } from "@/hooks/useMousePosition";

/**
 * Generates a CanvasTexture for the bucket label — drawn at runtime so the
 * brand mark always renders crisply without shipping an image asset.
 */
function useLabelTexture(accentHex: string) {
  return useMemo(() => {
    if (typeof document === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Base
    ctx.fillStyle = "#f6f4ef";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Accent stripe
    ctx.fillStyle = accentHex;
    ctx.fillRect(0, canvas.height - 64, canvas.width, 64);

    // Wordmark
    ctx.fillStyle = "#0f0e16";
    ctx.font = "700 160px 'Arial', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("DIXIT", canvas.width / 2, 240);

    // Sub label
    ctx.font = "500 48px 'Arial', sans-serif";
    ctx.fillStyle = "#5e5a6b";
    ctx.letterSpacing = "12px";
    ctx.fillText("APEX  SHYNE  —  ULTRA  MATTE", canvas.width / 2, 380);

    // Spec line
    ctx.font = "400 28px 'Arial', sans-serif";
    ctx.fillStyle = "#9d99aa";
    ctx.letterSpacing = "6px";
    ctx.fillText("1 LITRE  ·  INTERIOR EMULSION", canvas.width / 2, 460);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 4;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [accentHex]);
}

function PaintBucket() {
  const group = useRef<THREE.Group>(null);
  const lidGroup = useRef<THREE.Mesh>(null);
  const { accent } = useAccent();
  const pointer = useMousePosition();

  const accentColor = useMemo(() => new THREE.Color(accent.hex), [accent.hex]);
  const labelTexture = useLabelTexture(accent.hex);

  useFrame((_, delta) => {
    if (!group.current) return;

    // Slow ambient rotation — the bucket drifts in space on its own.
    group.current.rotation.y += delta * 0.15;

    // Mouse-driven perspective: the bucket tilts toward the cursor,
    // smoothed with a lerp so it always feels weighted, never snappy.
    const targetRotX = pointer.y * 0.22;
    const targetRotZ = -pointer.x * 0.22;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetRotX,
      0.04
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      targetRotZ,
      0.04
    );
  });

  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.6}>
      <group ref={group} dispose={null}>
        {/* Body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.15, 1.02, 1.7, 80]} />
          <meshPhysicalMaterial
            color="#f6f4ef"
            roughness={0.22}
            metalness={0.04}
            clearcoat={1}
            clearcoatRoughness={0.12}
          />
        </mesh>

        {/* Front label */}
        {labelTexture && (
          <mesh position={[0, -0.05, 1.04]}>
            <planeGeometry args={[1.7, 1.06]} />
            <meshStandardMaterial
              map={labelTexture}
              roughness={0.35}
              metalness={0}
            />
          </mesh>
        )}

        {/* Lid */}
        <mesh ref={lidGroup} position={[0, 0.92, 0]}>
          <cylinderGeometry args={[1.19, 1.19, 0.16, 80]} />
          <meshPhysicalMaterial
            color="#15131f"
            roughness={0.28}
            metalness={0.65}
            clearcoat={0.7}
            clearcoatRoughness={0.2}
          />
        </mesh>

        {/* Wet paint surface — glowing, tinted by the live accent */}
        <mesh position={[0, 1.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.05, 64]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={1.6}
            roughness={0.05}
            metalness={0.1}
          />
        </mesh>

        {/* Handle */}
        <mesh position={[0, 1.45, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.92, 0.045, 16, 64, Math.PI]} />
          <meshStandardMaterial color="#2a2733" roughness={0.35} metalness={0.75} />
        </mesh>

        {/* Ground glow disc */}
        <mesh position={[0, -0.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[3.2, 64]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.16} />
        </mesh>
      </group>
    </Float>
  );
}

function SceneLights() {
  const { accent } = useAccent();
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} castShadow />
      <pointLight position={[-4, 1.5, 3]} color={accent.hex} intensity={6} distance={12} />
      <pointLight position={[3, -1, -3]} color="#ffffff" intensity={1.2} distance={10} />
    </>
  );
}

/**
 * Full-bleed WebGL hero scene: a floating paint bucket that rotates slowly
 * on its own and tilts toward the cursor, lit with an accent-tinted glow
 * and surrounded by drifting pigment particles.
 */
export default function PaintBucket3D() {
  const { accent } = useAccent();

  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.4, 5.4], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
    >
      <SceneLights />
      <PaintBucket />
      <Sparkles
        count={60}
        scale={[6, 4, 6]}
        size={3}
        speed={0.25}
        color={accent.hex}
        opacity={0.6}
      />
      <Sparkles
        count={40}
        scale={[8, 5, 8]}
        size={1.5}
        speed={0.12}
        color="#f6f4ef"
        opacity={0.3}
      />
      <Environment preset="city" />
    </Canvas>
  );
}
