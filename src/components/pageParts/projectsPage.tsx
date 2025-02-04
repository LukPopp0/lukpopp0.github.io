import { Canvas, useThree } from '@react-three/fiber';
import { Lighting } from '../scene/lighting';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { VoronoiScene } from '../scene/voronoiScene';
import { BackSide, NoToneMapping, Object3D, Vector3 } from 'three';
import { useEffect, useState } from 'react';
import { useTheme } from '../../utils';
import { Bloom, EffectComposer, N8AO, SelectiveBloom } from '@react-three/postprocessing';
import { isBrowser } from 'react-device-detect';
import { InnerCube } from '../scene/innerCube';
// import { Stats } from '@react-three/drei';

const SkyBox = () => {
  const theme = useTheme();
  return (
    <mesh>
      <sphereGeometry args={[500, 36, 36]} />
      <meshBasicMaterial color={theme.mainColor} side={BackSide} />
    </mesh>
  );
};

const Content = () => {
  const { scene } = useThree();
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
      <InnerCube size={12.5} />
      <VoronoiScene />
      <EffectComposer>
        <>
          {/* // TODO: Selective Bloom sometimes shows a warning in the console */}
          <SelectiveBloom
            lights={[scene.getObjectByName('innerCubeLight') || new Object3D()]}
            selection={[scene.getObjectByName('innerCube') || new Object3D()]}
            intensity={0.75}
            luminanceThreshold={0}
            luminanceSmoothing={0.8}
            height={400}
          />
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
      <Canvas
        onCreated={({ gl }) => {
          gl.toneMapping = NoToneMapping;
        }}
      >
        <Content />
      </Canvas>
    </div>
  );
};
