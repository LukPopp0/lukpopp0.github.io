import { Canvas } from '@react-three/fiber';
import { Lighting } from '../scene/lighting';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { VoronoiScene } from '../scene/voronoiScene';
import { PerspectiveCamera as PCamera, Vector3 } from 'three';
import { useEffect, useRef } from 'react';
import { InnerCube } from '../scene/innerCube';

export const ProjectsPage = () => {
  const cam = useRef<PCamera>(null);

  useEffect(() => {
    if (!cam.current) return;

    cam.current.lookAt(new Vector3(0, 0, 0));
  }, [cam]);

  return (
    <div
      style={{
        width: '100%',
        height: 'calc(100svh - 8rem)',
        position: 'relative',
      }}
    >
      <Canvas>
        <Lighting />
        <PerspectiveCamera ref={cam} makeDefault position={[15, 30, -50]} />
        <OrbitControls enableZoom={false} />
        <InnerCube />
        <VoronoiScene />
      </Canvas>
    </div>
  );
};
