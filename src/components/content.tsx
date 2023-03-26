import { PerspectiveCamera, Scroll, ScrollControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ReactElement } from 'react';
import { Lighting } from './scene/lighting';
import { Scene } from './scene/scene';

type ContentProps = {
  children: ReactElement | ReactElement[];
};

export const Content = ({ children }: ContentProps) => {
  return (
    <Canvas frameloop="demand">
      <Lighting />
      <PerspectiveCamera makeDefault position={[0, 0, 20]} />
      <ScrollControls pages={1.6}>
        <Scene />
        <Scroll html>{children}</Scroll>
      </ScrollControls>
    </Canvas>
  );
};
