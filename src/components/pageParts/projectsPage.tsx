import { Canvas, context } from '@react-three/fiber';
import { Lighting } from '../scene/lighting';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { VoronoiScene } from '../scene/voronoiScene';
import { PerspectiveCamera as PCamera, Vector3 } from 'three';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../utils';

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
        height: 'calc(100svh - 8rem)',
        position: 'relative',
      }}
    >
      <Canvas ref={canvasRef}>
        <color attach="background" args={[theme.mainColor]} />
        <Lighting />
        <PerspectiveCamera ref={cam} makeDefault position={[10, 20, -38]} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={autoRotate} />
        <VoronoiScene />
      </Canvas>
    </div>
  );
};
