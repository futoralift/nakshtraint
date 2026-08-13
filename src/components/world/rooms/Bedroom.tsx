/*
 * Bedroom — warm wood panelling, upholstered bed, ambient nightstand lamps.
 * Room position offset z: -36
 */
import * as THREE from "three";

const WALL = "#0a120b";
const FLOOR = "#1c140a";
const FABRIC = "#d9d0c1";
const ACCENT = "#1f3623";
const WOOD = "#2e1a0b";
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

export function Bedroom({ position = [0, 0, -36] as [number, number, number] }) {
  return (
    <group position={position}>
      {/* ── LIGHTS ── */}
      {/* Left nightstand lamp */}
      <pointLight
        position={[-2.4, 1.4, -7]}
        intensity={4.5}
        color="#ffb043"
        distance={6}
        decay={2}
      />
      {/* Right nightstand lamp */}
      <pointLight
        position={[2.4, 1.4, -7]}
        intensity={4.5}
        color="#ffb043"
        distance={6}
        decay={2}
      />
      {/* Headboard warm backlight */}
      <pointLight
        position={[0, 1.8, -8.6]}
        intensity={3.5}
        color="#ff8800"
        distance={8}
        decay={2}
      />
      {/* Soft fill */}
      <pointLight position={[0, 3.0, -5]} intensity={2.5} color="#ffaa55" distance={14} decay={2} />

      {/* ── ROOM SHELL ── */}
      <Box position={[0, -0.08, -D / 2]} size={[W, 0.15, D]} color={FLOOR} roughness={0.4} />
      <Box position={[0, H + 0.08, -D / 2]} size={[W + 0.3, 0.15, D]} color={WALL} />
      <Box position={[-W / 2 - 0.08, H / 2, -D / 2]} size={[0.15, H + 0.3, D]} color={WALL} />
      <Box position={[W / 2 + 0.08, H / 2, -D / 2]} size={[0.15, H + 0.3, D]} color={WALL} />
      <Box position={[0, H / 2, -D - 0.08]} size={[W + 0.3, H + 0.3, 0.15]} color={ACCENT} />

      {/* Back feature wood panelling */}
      <Box
        position={[0, H / 2, -D + 0.04]}
        size={[5.2, H - 0.2, 0.08]}
        color={WOOD}
        roughness={0.5}
      />

      {/* ── BED ── */}
      {/* Bed base */}
      <Box position={[0, 0.25, -6.5]} size={[2.4, 0.35, 2.6]} color={WOOD} roughness={0.6} />
      {/* Mattress */}
      <Box position={[0, 0.52, -6.5]} size={[2.28, 0.28, 2.48]} color={FABRIC} roughness={0.9} />
      {/* Duvet / Blanket */}
      <Box position={[0, 0.62, -6.1]} size={[2.3, 0.12, 1.6]} color="#172b1a" roughness={0.95} />
      {/* Pillows */}
      <Box position={[-0.6, 0.72, -7.4]} size={[0.75, 0.14, 0.45]} color={FABRIC} roughness={0.9} />
      <Box position={[0.6, 0.72, -7.4]} size={[0.75, 0.14, 0.45]} color={FABRIC} roughness={0.9} />

      {/* Headboard */}
      <Box position={[0, 1.25, -7.8]} size={[3.8, 1.2, 0.18]} color={ACCENT} roughness={0.7} />
      <Box position={[0, 1.25, -7.7]} size={[3.6, 1.1, 0.05]} color="#2d4231" roughness={0.85} />

      {/* ── NIGHTSTANDS & LAMPS ── */}
      {/* Left nightstand */}
      <Box position={[-2.4, 0.35, -7.2]} size={[0.6, 0.5, 0.5]} color={WOOD} roughness={0.5} />
      {/* Left lamp */}
      <mesh position={[-2.4, 0.8, -7.2]}>
        <cylinderGeometry args={[0.06, 0.1, 0.2, 8]} />
        <meshStandardMaterial color={BRASS} roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[-2.4, 1.05, -7.2]}>
        <coneGeometry args={[0.18, 0.25, 12]} />
        <meshStandardMaterial
          color="#faebd7"
          roughness={0.9}
          transparent
          opacity={0.9}
          emissive="#ffaa44"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Right nightstand */}
      <Box position={[2.4, 0.35, -7.2]} size={[0.6, 0.5, 0.5]} color={WOOD} roughness={0.5} />
      {/* Right lamp */}
      <mesh position={[2.4, 0.8, -7.2]}>
        <cylinderGeometry args={[0.06, 0.1, 0.2, 8]} />
        <meshStandardMaterial color={BRASS} roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[2.4, 1.05, -7.2]}>
        <coneGeometry args={[0.18, 0.25, 12]} />
        <meshStandardMaterial
          color="#faebd7"
          roughness={0.9}
          transparent
          opacity={0.9}
          emissive="#ffaa44"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Area rug under bed */}
      <Box position={[0, 0.01, -6.2]} size={[3.8, 0.02, 3.4]} color="#3a3227" roughness={0.98} />
    </group>
  );
}
