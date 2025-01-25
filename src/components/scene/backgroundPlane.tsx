import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { DoubleSide, Mesh } from 'three';
import { useTheme } from '../../utils';

export const BackgroundPlane = () => {
  const scroll = useScroll();
  const backgroundPlane = useRef<Mesh>(null);
  const theme = useTheme();

  // Update opacity of background plane. If scrolled down more than the first page,
  // the plane is fully visible.
  useFrame(() => {
    if (!backgroundPlane.current) return;

    const scrollPercentage = scroll.offset * scroll.pages;
    const opacity = Math.min(1.0, scrollPercentage);

    if (Array.isArray(backgroundPlane.current.material)) {
      backgroundPlane.current.material.forEach(m => (m.opacity = opacity));
    } else {
      backgroundPlane.current.material.opacity = opacity;
    }
  });

  return (
    <mesh ref={backgroundPlane} position={[0, 0, 0]}>
      <boxGeometry args={[200, 1000, 1000]} />
      <meshBasicMaterial side={DoubleSide} transparent color={theme.mainColor} />
    </mesh>
  );
};
