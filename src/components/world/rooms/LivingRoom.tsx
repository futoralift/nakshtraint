/*
 * Living Room — deep forest-green walls, warm walnut floor, cream sofa.
 * Room local coords: x ∈ [-5,5], y ∈ [0,3.2], z ∈ [0,-12]
 * Group should be placed at [0,0,0] so the camera (starting at z=12) enters from the front.
 */
import * as THREE from "three";

const DARK_WOOD = "#110900";
const FOREST_WALL = "#0b1a0e";
const FEATURE = "#152818";
const CEIL = "#070e09";
const SOFA = "#c8b9a0";
const BRASS = "#b8914a";
const TABLE_DARK = "#1e0f03";

const W = 10,
  H = 3.2,
  D = 12;

interface MeshProps {
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
  roughness = 0.88,
  metalness = 0,
  emissive,
  emissiveIntensity = 0,
}: MeshProps) {
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

export function LivingRoom({ position = [0, 0, 0] as [number, number, number] }) {
  return (
    <group position={position}>
      {/* ── LIGHTS ── */}
      {/* Main ceiling warm wash */}
      <pointLight position={[0, 3.0, -5]} intensity={7} color="#ff9933" distance={20} decay={2} />
      {/* Left wall sconce A */}
      <pointLight
        position={[-4.7, 2.2, -3.5]}
        intensity={3}
        color="#ffaa44"
        distance={7}
        decay={2}
      />
      {/* Left wall sconce B */}
      <pointLight position={[-4.7, 2.2, -9]} intensity={3} color="#ffaa44" distance={7} decay={2} />
      {/* Soft right fill */}
      <pointLight position={[4.5, 1.4, -6]} intensity={2} color="#ff8000" distance={12} decay={2} />
      {/* Floor bounce (very dim warm) */}
      <pointLight position={[0, 0.2, -7]} intensity={0.6} color="#ff6600" distance={8} decay={2} />

      {/* ── SHELL ── */}
      {/* Floor */}
      <Box
        position={[0, -0.08, -6]}
        size={[W, 0.15, D]}
        color={DARK_WOOD}
        roughness={0.4}
        metalness={0.05}
      />
      {/* Ceiling */}
      <Box position={[0, H + 0.08, -6]} size={[W + 0.3, 0.15, D]} color={CEIL} />
      {/* Left wall */}
      <Box position={[-W / 2 - 0.08, H / 2, -6]} size={[0.15, H + 0.3, D]} color={FOREST_WALL} />
      {/* Right wall */}
      <Box position={[W / 2 + 0.08, H / 2, -6]} size={[0.15, H + 0.3, D]} color={FOREST_WALL} />
      {/* Back wall – feature wall */}
      <Box
        position={[0, H / 2, -D - 0.08]}
        size={[W + 0.3, H + 0.3, 0.15]}
        color={FEATURE}
        roughness={0.75}
      />

      {/* Feature wall vertical panels */}
      {([-3.5, -1.5, 0.5, 2.5] as number[]).map((x, i) => (
        <Box
          key={i}
          position={[x, H / 2, -D + 0.04]}
          size={[0.55, H - 0.5, 0.09]}
          color="#1c3322"
          roughness={0.6}
          metalness={0.08}
        />
      ))}

      {/* Brass skirting strip along back wall */}
      <Box
        position={[0, 0.04, -D + 0.04]}
        size={[W, 0.08, 0.12]}
        color={BRASS}
        roughness={0.3}
        metalness={0.7}
      />

      {/* ── FURNITURE ── */}
      {/* Sofa body */}
      <Box position={[0, 0.47, -9.6]} size={[3.8, 0.7, 1.2]} color={SOFA} roughness={0.95} />
      {/* Sofa back cushion */}
      <Box position={[0, 1.05, -10.1]} size={[3.8, 0.5, 0.22]} color={SOFA} roughness={0.95} />
      {/* Sofa left arm */}
      <Box position={[-1.88, 0.74, -9.7]} size={[0.2, 0.38, 1.0]} color={SOFA} roughness={0.95} />
      {/* Sofa right arm */}
      <Box position={[1.88, 0.74, -9.7]} size={[0.2, 0.38, 1.0]} color={SOFA} roughness={0.95} />

      {/* Rug */}
      <Box position={[0, 0.01, -8]} size={[3.4, 0.02, 3.2]} color="#2a1e0e" roughness={1} />

      {/* Coffee table top */}
      <Box
        position={[0, 0.44, -7.6]}
        size={[1.6, 0.05, 0.9]}
        color={TABLE_DARK}
        roughness={0.5}
        metalness={0.08}
      />
      {/* Table legs */}
      {(
        [
          [-0.74, -0.37],
          [0.74, -0.37],
          [-0.74, 0.37],
          [0.74, 0.37],
        ] as [number, number][]
      ).map(([x, dz], i) => (
        <Box
          key={i}
          position={[x, 0.22, -7.6 + dz]}
          size={[0.05, 0.42, 0.05]}
          color={TABLE_DARK}
          roughness={0.5}
        />
      ))}

      {/* Left side table */}
      <Box position={[-4, 0.5, -9.3]} size={[0.5, 1.0, 0.5]} color={TABLE_DARK} roughness={0.5} />
      {/* Side table top */}
      <Box
        position={[-4, 1.0, -9.3]}
        size={[0.6, 0.05, 0.6]}
        color={TABLE_DARK}
        roughness={0.4}
        metalness={0.1}
      />

      {/* Lamp on side table */}
      <pointLight position={[-4, 1.4, -9.3]} intensity={4} color="#ffbb44" distance={5} decay={2} />
      <mesh position={[-4, 1.15, -9.3]}>
        <cylinderGeometry args={[0.08, 0.14, 0.25, 8]} />
        <meshStandardMaterial
          color={BRASS}
          roughness={0.25}
          metalness={0.85}
          emissive={BRASS}
          emissiveIntensity={1.2}
        />
      </mesh>
      <mesh position={[-4, 1.35, -9.3]}>
        <coneGeometry args={[0.22, 0.28, 12]} />
        <meshStandardMaterial
          color="#f5dab0"
          roughness={0.9}
          transparent
          opacity={0.85}
          emissive="#ffcc88"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Plant corner right */}
      <group position={[4.2, 0, -10.5]}>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.18, 0.14, 0.44, 10]} />
          <meshStandardMaterial color="#1c3020" roughness={0.8} />
        </mesh>
        {/* Foliage cluster */}
        {(
          [
            [0, 1.0, 0, 0.52],
            [0.28, 1.2, 0.12, 0.34],
            [-0.22, 1.22, -0.1, 0.3],
          ] as [number, number, number, number][]
        ).map(([x, y, z, r], i) => (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[r, 8, 8]} />
            <meshStandardMaterial color="#0e2612" roughness={1} />
          </mesh>
        ))}
      </group>

      {/* Wall sconce fixtures (decorative geometry) */}
      {([-3.5, -9] as number[]).map((z, i) => (
        <group key={i} position={[-4.88, 2.25, z]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.055, 0.08, 0.16, 8]} />
            <meshStandardMaterial
              color={BRASS}
              roughness={0.25}
              metalness={0.85}
              emissive={BRASS}
              emissiveIntensity={0.8}
            />
          </mesh>
          <mesh position={[0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.005, 0.005, 0.25, 4]} />
            <meshStandardMaterial color={BRASS} roughness={0.25} metalness={0.85} />
          </mesh>
        </group>
      ))}

      {/* Ceiling downlight housing */}
      <mesh position={[0, H + 0.01, -5]}>
        <cylinderGeometry args={[0.12, 0.1, 0.07, 12]} />
        <meshStandardMaterial
          color={BRASS}
          roughness={0.2}
          metalness={0.9}
          emissive={BRASS}
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}
