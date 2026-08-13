/*
 * Kitchen — deep olive green cabinets, marble island counter, brass pendants.
 * Room position offset z: -18
 */
import * as THREE from "three";

const WALL = "#08130a";
const FLOOR = "#121412";
const CABINET = "#142617";
const MARBLE = "#e6e4df";
const BRASS = "#b8914a";

const W = 10,
  H = 3.2,
  D = 14;

interface BoxProps {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  roughness?: number;
  metalness?: number;
  emissive?: string;
  emissiveIntensity?: number;
}

function Box({
  position,
  size,
  color,
  roughness = 0.8,
  metalness = 0,
  emissive,
  emissiveIntensity = 0,
}: BoxProps) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
        emissive={emissive ?? color}
        emissiveIntensity={emissive ? emissiveIntensity : 0}
      />
    </mesh>
  );
}

export function Kitchen({ position = [0, 0, -18] as [number, number, number] }) {
  return (
    <group position={position}>
      {/* ── LIGHTS ── */}
      {/* Under-cabinet LED strip glow */}
      <pointLight
        position={[-4.1, 1.55, -7]}
        intensity={5}
        color="#ffcc77"
        distance={10}
        decay={2}
      />
      {/* Island pendant lights wash */}
      <pointLight position={[0.5, 2.3, -7]} intensity={8} color="#ffb84d" distance={12} decay={2} />
      {/* Ceiling ambient */}
      <pointLight position={[0, 3.0, -7]} intensity={4} color="#ffa64d" distance={16} decay={2} />

      {/* ── ROOM SHELL ── */}
      <Box
        position={[0, -0.08, -D / 2]}
        size={[W, 0.15, D]}
        color={FLOOR}
        roughness={0.3}
        metalness={0.1}
      />
      <Box position={[0, H + 0.08, -D / 2]} size={[W + 0.3, 0.15, D]} color={WALL} />
      <Box position={[-W / 2 - 0.08, H / 2, -D / 2]} size={[0.15, H + 0.3, D]} color={WALL} />
      <Box position={[W / 2 + 0.08, H / 2, -D / 2]} size={[0.15, H + 0.3, D]} color={WALL} />

      {/* ── LEFT KITCHEN RUN ── */}
      {/* Base cabinets */}
      <Box position={[-4.1, 0.44, -7]} size={[1.3, 0.88, 10]} color={CABINET} roughness={0.6} />
      {/* Countertop */}
      <Box
        position={[-4.1, 0.89, -7]}
        size={[1.36, 0.05, 10.05]}
        color={MARBLE}
        roughness={0.25}
        metalness={0.05}
      />
      {/* Backsplash */}
      <Box position={[-4.72, 1.25, -7]} size={[0.05, 0.68, 10]} color="#212923" roughness={0.4} />
      {/* Upper cabinets */}
      <Box position={[-4.2, 2.0, -7]} size={[1.0, 0.72, 9.6]} color={CABINET} roughness={0.6} />

      {/* Under-cabinet light fixture strip geometry */}
      <Box
        position={[-4.2, 1.63, -7]}
        size={[0.8, 0.02, 9.5]}
        color="#ffdd99"
        emissive="#ffbb55"
        emissiveIntensity={1.5}
      />

      {/* ── CENTER KITCHEN ISLAND ── */}
      {/* Island base */}
      <Box position={[0.5, 0.45, -7]} size={[1.8, 0.9, 4.2]} color={CABINET} roughness={0.6} />
      {/* Island waterfall marble counter top */}
      <Box
        position={[0.5, 0.91, -7]}
        size={[1.9, 0.06, 4.3]}
        color={MARBLE}
        roughness={0.2}
        metalness={0.05}
      />
      {/* Waterfall side left */}
      <Box
        position={[0.5, 0.45, -9.13]}
        size={[1.9, 0.9, 0.06]}
        color={MARBLE}
        roughness={0.2}
        metalness={0.05}
      />
      {/* Waterfall side right */}
      <Box
        position={[0.5, 0.45, -4.87]}
        size={[1.9, 0.9, 0.06]}
        color={MARBLE}
        roughness={0.2}
        metalness={0.05}
      />

      {/* Bar stools */}
      {([-8.2, -7.0, -5.8] as number[]).map((z, i) => (
        <group key={i} position={[1.8, 0, z]}>
          {/* Seat */}
          <Box position={[0, 0.65, 0]} size={[0.38, 0.04, 0.38]} color="#2d1c0c" roughness={0.7} />
          {/* Legs */}
          {(
            [
              [-0.15, -0.15],
              [0.15, -0.15],
              [-0.15, 0.15],
              [0.15, 0.15],
            ] as [number, number][]
          ).map(([x, dz], j) => (
            <Box
              key={j}
              position={[x, 0.32, dz]}
              size={[0.03, 0.64, 0.03]}
              color={BRASS}
              roughness={0.3}
              metalness={0.7}
            />
          ))}
        </group>
      ))}

      {/* ── PENDANT LIGHT FIXTURES ABOVE ISLAND ── */}
      {([-8.2, -7.0, -5.8] as number[]).map((z, i) => (
        <group key={i} position={[0.5, 0, z]}>
          {/* Cable */}
          <Box position={[0, 2.7, 0]} size={[0.015, 1.0, 0.015]} color="#000000" />
          {/* Shade */}
          <mesh position={[0, 2.15, 0]}>
            <coneGeometry args={[0.22, 0.28, 16, 1, true]} />
            <meshStandardMaterial
              color={BRASS}
              roughness={0.2}
              metalness={0.8}
              side={THREE.DoubleSide}
              emissive={BRASS}
              emissiveIntensity={0.5}
            />
          </mesh>
          {/* Glowing bulb inside */}
          <mesh position={[0, 2.1, 0]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color="#ffeedd" emissive="#ffaa33" emissiveIntensity={3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
