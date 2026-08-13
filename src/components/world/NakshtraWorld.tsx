import { type MutableRefObject, Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import { CameraRig } from "@/components/world/CameraRig";
import { Effects } from "@/components/world/Effects";
import { Particles } from "@/components/world/Particles";
import { Bedroom } from "@/components/world/rooms/Bedroom";
import { BlueprintRoom } from "@/components/world/rooms/BlueprintRoom";
import { Kitchen } from "@/components/world/rooms/Kitchen";
import { LivingRoom } from "@/components/world/rooms/LivingRoom";
import { Office } from "@/components/world/rooms/Office";

export function NakshtraWorld({ scrollProgress }: { scrollProgress: MutableRefObject<number> }) {
  return (
    <div className="fixed inset-0 z-0 size-full bg-forest-deep">
      <Canvas
        camera={{ position: [0, 1.9, 12], fov: 50, near: 0.1, far: 120 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#030a04"]} />
        <fog attach="fog" args={["#030a04", 10, 85]} />

        {/* Global low ambient fill */}
        <ambientLight intensity={0.4} color="#ffebcc" />

        <CameraRig scrollProgress={scrollProgress} />

        <Suspense fallback={null}>
          <LivingRoom position={[0, 0, 0]} />
          <Kitchen position={[0, 0, -18]} />
          <Bedroom position={[0, 0, -36]} />
          <Office position={[0, 0, -54]} />
          <BlueprintRoom position={[0, 0, -70]} />
          <Particles />
          <Effects />
        </Suspense>
      </Canvas>
    </div>
  );
}
