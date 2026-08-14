import { type MutableRefObject, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ---------- camera path keyframes ----------
// 0.00 → Entry (z=12)
// 0.20 → Living Room (z=0)
// 0.40 → Kitchen (z=-18)
// 0.60 → Bedroom (z=-36)
// 0.80 → Office (z=-54)
// 1.00 → Blueprint (z=-70)

const POSITIONS: [number, number, number][] = [
  [0, 1.9, 12], // 0.00  Entry hall (wide view into living room)
  [0, 1.6, 2], // 0.20  Living room
  [0.4, 1.6, -15], // 0.40  Kitchen approach
  [0, 1.5, -32], // 0.60  Bedroom interior
  [-0.4, 1.5, -50], // 0.80  Office desk view
  [0, 2.5, -64], // 1.00  Blueprint 3D wireframe zone
];

const TARGETS: [number, number, number][] = [
  [0, 1.4, 0], // 0.00  looking at living room
  [0, 1.3, -4], // 0.20  living room focus
  [0, 1.5, -20], // 0.40  kitchen focus
  [0, 1.4, -38], // 0.60  bedroom focus
  [0, 1.3, -56], // 0.80  office focus
  [0, 1.2, -70], // 1.00  blueprint wireframe focus
];

const toV3 = (arr: [number, number, number]) => new THREE.Vector3(...arr);

const posCurve = new THREE.CatmullRomCurve3(POSITIONS.map(toV3), false, "catmullrom", 0.5);
const tgtCurve = new THREE.CatmullRomCurve3(TARGETS.map(toV3), false, "catmullrom", 0.5);

const _pos = new THREE.Vector3();
const _tgt = new THREE.Vector3();

export function CameraRig({ scrollProgress }: { scrollProgress: MutableRefObject<number> }) {
  const smooth = useRef(0);
  const liveTarget = useRef(new THREE.Vector3(0, 1.4, 0));

  useFrame(({ camera }, delta) => {
    // Ease the raw scroll value for smooth frame-rate independent camera motion
    const dt = Math.min(0.1, delta);
    smooth.current += (scrollProgress.current - smooth.current) * (1 - Math.exp(-6.0 * dt));
    const p = Math.max(0, Math.min(1, smooth.current));

    posCurve.getPoint(p, _pos);
    tgtCurve.getPoint(p, _tgt);

    camera.position.copy(_pos);
    liveTarget.current.lerp(_tgt, 1 - Math.exp(-8.0 * dt));
    camera.lookAt(liveTarget.current);
  });

  return null;
}
