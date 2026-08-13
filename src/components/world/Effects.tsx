import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";

export function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={1.1}
        luminanceThreshold={0.5}
        luminanceSmoothing={0.85}
        kernelSize={KernelSize.LARGE}
        blendFunction={BlendFunction.ADD}
        mipmapBlur
      />
      <Vignette offset={0.22} darkness={0.78} blendFunction={BlendFunction.NORMAL} />
    </EffectComposer>
  );
}
