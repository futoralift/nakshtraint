import { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 600;
const SCENE_DEPTH = 78;
const ROOM_WIDTH = 11;

export function Particles() {
  const { geometry, velocities } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * ROOM_WIDTH;
      positions[i * 3 + 1] = Math.random() * 3.5;
      positions[i * 3 + 2] = -(Math.random() * SCENE_DEPTH);
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = Math.random() * 0.0025 + 0.0008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry: geo, velocities: vel };
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useFrame(() => {
    const attr = geometry.getAttribute("position") as THREE.BufferAttribute | undefined;
    if (!attr) return;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      const idx0 = i * 3;
      const idx1 = idx0 + 1;
      const idx2 = idx0 + 2;

      const v0 = velocities[idx0] ?? 0;
      const v1 = velocities[idx1] ?? 0;
      const v2 = velocities[idx2] ?? 0;

      const p0 = (arr[idx0] ?? 0) + v0;
      let p1 = (arr[idx1] ?? 0) + v1;
      const p2 = (arr[idx2] ?? 0) + v2;

      if (p1 > 3.9) p1 = 0.05;
      if (Math.abs(p0) > ROOM_WIDTH / 2) velocities[idx0] = -v0;

      arr[idx0] = p0;
      arr[idx1] = p1;
      arr[idx2] = p2;
    }
    attr.needsUpdate = true;
  });

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color="#c9a45a"
        size={0.018}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
