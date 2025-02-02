import { Canvas, useThree } from '@react-three/fiber';
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

const Content = () => {
  const theme = useTheme();
  const { camera } = useThree();
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    camera.lookAt(new Vector3(0, 0, 0));
  }, [camera]);

  return (
    <>
      <SkyBox />
      {/* <Stats /> */}
      <color attach="background" args={[theme.mainColor]} />
      <Lighting />
      <PerspectiveCamera makeDefault position={isBrowser ? [10, 20, 38] : [15, 30, 57]} />
      {isBrowser && (
        <OrbitControls
          enabled={true}
          enableRotate={isBrowser}
          enableZoom={false}
          enablePan={false}
          autoRotate={autoRotate}
        />
      )}
      <VoronoiScene />
      <EffectComposer>
        <>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.8} height={400} />
          {isBrowser && <N8AO halfRes color="black" aoRadius={2} intensity={1} aoSamples={6} denoiseSamples={4} />}
        </>
      </EffectComposer>
    </>
  );
};

export const ProjectsPage = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100svh',
        position: 'relative',
      }}
    >
      <Canvas>
        <Content />
      </Canvas>
    </div>
  );
};
