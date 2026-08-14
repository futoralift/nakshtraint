/*
 * Blueprint Room — floating 3D architectural wireframe grid zone.
 * Room position offset z: -70
 */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BRASS = "#c9a45a";

const outerBoxGeo = new THREE.BoxGeometry(4.5, 3.0, 4.5);
const innerBoxGeo = new THREE.BoxGeometry(2.2, 2.2, 2.2);

export function BlueprintRoom({ position = [0, 0, -70] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group position={position}>
      {/* ── AMBIENT GLOW ── */}
      <pointLight position={[0, 1.5, 0]} intensity={10} color="#ffaa33" distance={16} decay={2} />

      {/* ── ROTATING ARCHITECTURAL WIREFRAME ── */}
      <group ref={groupRef} position={[0, 1.2, 0]}>
        {/* Outer cube wireframe */}
        <lineSegments>
          <edgesGeometry args={[outerBoxGeo]} />
          <lineBasicMaterial color={BRASS} linewidth={1.5} transparent opacity={0.65} />
        </lineSegments>

        {/* Inner room division wireframes */}
        <lineSegments>
          <edgesGeometry args={[innerBoxGeo]} />
          <lineBasicMaterial color="#ffffff" linewidth={1} transparent opacity={0.35} />
        </lineSegments>

        {/* Floor grid */}
        <gridHelper args={[10, 20, BRASS, "#1b3320"]} position={[0, -1.5, 0]} />
      </group>
    </group>
  );
}
