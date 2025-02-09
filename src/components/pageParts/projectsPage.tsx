import { Canvas, useThree } from '@react-three/fiber';
import { Lighting } from '../scene/lighting';
import { OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei';
import { VoronoiScene } from '../scene/voronoiScene';
import { BackSide, NoToneMapping, Vector3 } from 'three';
import { useEffect } from 'react';
import { useTheme } from '../../utils';
// import { Bloom, EffectComposer, N8AO, SelectiveBloom } from '@react-three/postprocessing';
import { isBrowser } from 'react-device-detect';
import { InnerCube } from '../scene/innerCube';
import { useMainStore } from '../../utils/store';

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
  // const { scene } = useThree();
  const debug = useMainStore(s => s.debug);
  const rotateCube = useMainStore(s => s.rotateCube);
  const showBloom = useMainStore(s => s.showBloom);
  const theme = useTheme();
  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(new Vector3(0, 0, 0));
  }, [camera]);

  return (
    <>
      <SkyBox />
      {debug && <Stats />}
      <color attach="background" args={[theme.mainColor]} />
      <Lighting />
      <PerspectiveCamera makeDefault position={isBrowser ? [10, 20, 38] : [15, 30, 57]} />
      {/* {isBrowser && ( */}
      <OrbitControls enabled={true} enableRotate={true} enableZoom={false} enablePan={false} autoRotate={rotateCube} />
      {/* )} */}
      <InnerCube size={12.5} />
      <VoronoiScene />
      {showBloom && (
        <></>
        // <EffectComposer>
        //   <>
        //     <SelectiveBloom
        //       lights={[scene.getObjectByName('innerCubeLight') || new Object3D()]}
        //       selection={[scene.getObjectByName('innerCube') || new Object3D()]}
        //       intensity={10.75}
        //       luminanceThreshold={0.25}
        //       luminanceSmoothing={0}
        //       height={400}
        //       kernelSize={KernelSize.SMALL}
        //     />
        //   </>
        // </EffectComposer>
      )}
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
