/*
 * Office — executive wood desk, acoustic wall slats, modern desk lamp.
 * Room position offset z: -54
 */
import * as THREE from "three";

const WALL = "#060f08";
const FLOOR = "#121713";
const DESK_WOOD = "#211306";
const LEATHER = "#141414";
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

export function Office({ position = [0, 0, -54] as [number, number, number] }) {
  return (
    <group position={position}>
      {/* ── LIGHTS ── */}
      {/* Desk focused spotlight */}
      <spotLight
        position={[0, 2.8, -6]}
        intensity={12}
        color="#ffb74d"
        angle={0.6}
        penumbra={0.5}
        distance={10}
        decay={2}
      />
      {/* Acoustic wall backlight strip */}
      <pointLight position={[0, 1.8, -9.5]} intensity={5} color="#ff9900" distance={8} decay={2} />
      {/* General ambient fill */}
      <pointLight position={[0, 3.0, -5]} intensity={3} color="#ffa843" distance={15} decay={2} />

      {/* ── ROOM SHELL ── */}
      <Box position={[0, -0.08, -D / 2]} size={[W, 0.15, D]} color={FLOOR} roughness={0.3} />
      <Box position={[0, H + 0.08, -D / 2]} size={[W + 0.3, 0.15, D]} color={WALL} />
      <Box position={[-W / 2 - 0.08, H / 2, -D / 2]} size={[0.15, H + 0.3, D]} color={WALL} />
      <Box position={[W / 2 + 0.08, H / 2, -D / 2]} size={[0.15, H + 0.3, D]} color={WALL} />
      <Box position={[0, H / 2, -D - 0.08]} size={[W + 0.3, H + 0.3, 0.15]} color="#111c13" />

      {/* Back acoustic vertical wood slats */}
      {Array.from({ length: 18 }).map((_, i) => (
        <Box
          key={i}
          position={[-4 + i * 0.46, H / 2, -D + 0.04]}
          size={[0.16, H - 0.2, 0.06]}
          color="#2d1d0e"
          roughness={0.6}
        />
      ))}

      {/* ── EXECUTIVE DESK ── */}
      {/* Top */}
      <Box
        position={[0, 0.74, -7]}
        size={[2.4, 0.08, 1.1]}
        color={DESK_WOOD}
        roughness={0.4}
        metalness={0.05}
      />
      {/* Left side panel leg */}
      <Box position={[-1.1, 0.36, -7]} size={[0.08, 0.7, 1.05]} color={DESK_WOOD} roughness={0.4} />
      {/* Right side panel leg */}
      <Box position={[1.1, 0.36, -7]} size={[0.08, 0.7, 1.05]} color={DESK_WOOD} roughness={0.4} />
      {/* Back modesty panel */}
      <Box position={[0, 0.36, -7.48]} size={[2.1, 0.6, 0.04]} color={DESK_WOOD} roughness={0.5} />

      {/* Desk mat */}
      <Box position={[0, 0.79, -6.95]} size={[0.9, 0.01, 0.55]} color="#1a1a1a" roughness={0.9} />
      {/* Laptop mock */}
      <Box
        position={[0, 0.81, -7.0]}
        size={[0.34, 0.015, 0.24]}
        color="#a0a0a0"
        roughness={0.2}
        metalness={0.8}
      />

      {/* ── EXECUTIVE CHAIR ── */}
      {/* Seat */}
      <Box position={[0, 0.48, -5.9]} size={[0.6, 0.08, 0.55]} color={LEATHER} roughness={0.7} />
      {/* Backrest */}
      <Box position={[0, 0.95, -5.62]} size={[0.56, 0.88, 0.08]} color={LEATHER} roughness={0.7} />
      {/* Base cylinder */}
      <mesh position={[0, 0.22, -5.9]}>
        <cylinderGeometry args={[0.04, 0.04, 0.44, 8]} />
        <meshStandardMaterial color={BRASS} roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Bookshelf right */}
      <group position={[4.1, 0, -7.5]}>
        <Box position={[0, 1.3, 0]} size={[0.6, 2.4, 2.2]} color="#17261a" roughness={0.7} />
        {/* Shelves */}
        {([0.5, 1.1, 1.7, 2.2] as number[]).map((y, i) => (
          <Box
            key={i}
            position={[0, y, 0]}
            size={[0.56, 0.04, 2.1]}
            color="#2d1d0e"
            roughness={0.5}
          />
        ))}
      </group>
    </group>
  );
}
