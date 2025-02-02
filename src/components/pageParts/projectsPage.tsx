import { Canvas } from '@react-three/fiber';
import { Lighting } from '../scene/lighting';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { VoronoiScene } from '../scene/voronoiScene';
import { BackSide, PerspectiveCamera as PCamera, Vector3 } from 'three';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../utils';
import { Bloom, EffectComposer, N8AO } from '@react-three/postprocessing';
import { isBrowser } from 'react-device-detect';
// import { Stats } from '@react-three/drei';

const SkyBox = () => {
  const theme = useTheme();
  return (
    <mesh>
      <boxGeometry args={[1000, 1000, 1000]} />
      <meshBasicMaterial color={theme.mainColor} side={BackSide} />
    </mesh>
  );
};

export const ProjectsPage = () => {
  const cam = useRef<PCamera>(null);
  const theme = useTheme();
  const [autoRotate, setAutoRotate] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!cam.current) return;

    cam.current.lookAt(new Vector3(0, 0, 0));
  }, [cam]);

  return (
    <div
      style={{
        width: '100%',
        height: '100svh',
        position: 'relative',
      }}
    >
      <Canvas ref={canvasRef}>
        <SkyBox />
        {/* <Stats /> */}
        <color attach="background" args={[theme.mainColor]} />
        <Lighting />
        <PerspectiveCamera ref={cam} makeDefault position={[10, 20, -38]} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={autoRotate} />
        <VoronoiScene />
        <EffectComposer>
          <>
            <Bloom luminanceThreshold={0} luminanceSmoothing={0.8} height={400} />
            {isBrowser && <N8AO halfRes color="black" aoRadius={2} intensity={1} aoSamples={6} denoiseSamples={4} />}
          </>
        </EffectComposer>
      </Canvas>
    </div>
  );
};
